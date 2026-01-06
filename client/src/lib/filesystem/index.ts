/**
 * Sovereign File System (SFS)
 * 
 * A local-first file system built on the Origin Private File System (OPFS).
 * Provides VFS abstraction, mount points, and optional encryption.
 */

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export interface FileMetadata {
    name: string;
    path: string;
    size: number;
    type: 'file' | 'directory';
    created: number;
    modified: number;
    encrypted: boolean;
    mimeType?: string;
}

export interface FileEntry extends FileMetadata {
    handle: FileSystemFileHandle | FileSystemDirectoryHandle;
}

export interface MountPoint {
    path: string;
    type: 'opfs' | 'memory' | 'vault';
    label: string;
    encrypted: boolean;
    readonly: boolean;
}

export interface VaultConfig {
    name: string;
    keyDerivationIterations: number;
}

export interface FileSystemStats {
    totalFiles: number;
    totalDirectories: number;
    totalSize: number;
    mountPoints: MountPoint[];
}

export type FileEvent = 'created' | 'modified' | 'deleted' | 'renamed';

export interface FileWatchEvent {
    type: FileEvent;
    path: string;
    timestamp: number;
}

type FileWatchCallback = (event: FileWatchEvent) => void;

// ============================================================================
// CONSTANTS
// ============================================================================

const SFS_ROOT = 'sovereign-fs';
const METADATA_FILE = '.sfs-metadata.json';

// ============================================================================
// CRYPTO UTILS (Web Crypto API)
// ============================================================================

class CryptoUtils {
    private static encoder = new TextEncoder();
    private static decoder = new TextDecoder();

    /**
     * Derive an encryption key from a password using PBKDF2
     */
    static async deriveKey(password: string, salt: Uint8Array, iterations: number = 100000): Promise<CryptoKey> {
        const keyMaterial = await crypto.subtle.importKey(
            'raw',
            this.encoder.encode(password),
            'PBKDF2',
            false,
            ['deriveBits', 'deriveKey']
        );

        return crypto.subtle.deriveKey(
            {
                name: 'PBKDF2',
                salt: salt as BufferSource,
                iterations,
                hash: 'SHA-256',
            },
            keyMaterial,
            { name: 'AES-GCM', length: 256 },
            false,
            ['encrypt', 'decrypt']
        );
    }

    /**
     * Generate a random salt
     */
    static generateSalt(): Uint8Array {
        return crypto.getRandomValues(new Uint8Array(16));
    }

    /**
     * Generate a random IV for AES-GCM
     */
    static generateIV(): Uint8Array {
        return crypto.getRandomValues(new Uint8Array(12));
    }

    /**
     * Encrypt data with AES-GCM
     */
    static async encrypt(data: ArrayBuffer, key: CryptoKey): Promise<{ encrypted: ArrayBuffer; iv: Uint8Array }> {
        const iv = this.generateIV();
        const encrypted = await crypto.subtle.encrypt(
            { name: 'AES-GCM', iv: iv as BufferSource },
            key,
            data
        );
        return { encrypted, iv };
    }

    /**
     * Decrypt data with AES-GCM
     */
    static async decrypt(encrypted: ArrayBuffer, key: CryptoKey, iv: Uint8Array): Promise<ArrayBuffer> {
        return crypto.subtle.decrypt(
            { name: 'AES-GCM', iv: iv as BufferSource },
            key,
            encrypted
        );
    }

    /**
     * Encrypt a string
     */
    static async encryptString(text: string, key: CryptoKey): Promise<{ encrypted: ArrayBuffer; iv: Uint8Array }> {
        const data = this.encoder.encode(text);
        return this.encrypt(data.buffer, key);
    }

    /**
     * Decrypt to string
     */
    static async decryptString(encrypted: ArrayBuffer, key: CryptoKey, iv: Uint8Array): Promise<string> {
        const decrypted = await this.decrypt(encrypted, key, iv);
        return this.decoder.decode(decrypted);
    }
}

// ============================================================================
// FILE SYSTEM MANAGER
// ============================================================================

class FileSystemManager {
    private root: FileSystemDirectoryHandle | null = null;
    private watchers: Map<string, Set<FileWatchCallback>> = new Map();
    private mountPoints: MountPoint[] = [];
    private vaultKeys: Map<string, CryptoKey> = new Map();
    private isInitialized = false;

    /**
     * Initialize the file system
     */
    async initialize(): Promise<boolean> {
        try {
            // Get OPFS root
            // @ts-ignore - navigator.storage.getDirectory is available in modern browsers
            const opfsRoot = await navigator.storage.getDirectory();

            // Create or get our app's root directory
            this.root = await opfsRoot.getDirectoryHandle(SFS_ROOT, { create: true });

            // Initialize default mount points
            this.mountPoints = [
                { path: '/', type: 'opfs', label: 'Root', encrypted: false, readonly: false },
                { path: '/documents', type: 'opfs', label: 'Documents', encrypted: false, readonly: false },
                { path: '/vault', type: 'vault', label: 'Encrypted Vault', encrypted: true, readonly: false },
            ];

            // Ensure directories exist
            await this.ensureDirectory('/documents');
            await this.ensureDirectory('/vault');
            await this.ensureDirectory('/temp');

            this.isInitialized = true;
            return true;
        } catch (error) {
            console.error('Failed to initialize file system:', error);
            return false;
        }
    }

    /**
     * Check if initialized
     */
    isReady(): boolean {
        return this.isInitialized && this.root !== null;
    }

    /**
     * Ensure a directory exists
     */
    private async ensureDirectory(path: string): Promise<FileSystemDirectoryHandle> {
        if (!this.root) throw new Error('File system not initialized');

        const parts = path.split('/').filter(Boolean);
        let current = this.root;

        for (const part of parts) {
            current = await current.getDirectoryHandle(part, { create: true });
        }

        return current;
    }

    /**
     * Get directory handle for a path
     */
    private async getDirectoryHandle(path: string): Promise<FileSystemDirectoryHandle> {
        if (!this.root) throw new Error('File system not initialized');

        if (path === '/' || path === '') return this.root;

        const parts = path.split('/').filter(Boolean);
        let current = this.root;

        for (const part of parts) {
            current = await current.getDirectoryHandle(part);
        }

        return current;
    }

    /**
     * Parse a path into directory and filename
     */
    private parsePath(path: string): { directory: string; filename: string } {
        const parts = path.split('/').filter(Boolean);
        const filename = parts.pop() || '';
        const directory = '/' + parts.join('/');
        return { directory, filename };
    }

    // ===================== FILE OPERATIONS =====================

    /**
     * Write a file
     */
    async writeFile(path: string, content: string | ArrayBuffer, options?: { encrypt?: boolean }): Promise<boolean> {
        try {
            const { directory, filename } = this.parsePath(path);
            const dirHandle = await this.ensureDirectory(directory);
            const fileHandle = await dirHandle.getFileHandle(filename, { create: true });

            let data: ArrayBuffer;
            if (typeof content === 'string') {
                data = new TextEncoder().encode(content).buffer;
            } else {
                data = content;
            }

            // Check if path is in encrypted vault
            const isVaultPath = path.startsWith('/vault');
            const shouldEncrypt = options?.encrypt || isVaultPath;

            if (shouldEncrypt) {
                const vaultKey = this.vaultKeys.get('/vault');
                if (!vaultKey) {
                    throw new Error('Vault not unlocked. Call unlockVault() first.');
                }
                const { encrypted, iv } = await CryptoUtils.encrypt(data, vaultKey);

                // Prepend IV to encrypted data
                const combined = new Uint8Array(iv.length + encrypted.byteLength);
                combined.set(iv, 0);
                combined.set(new Uint8Array(encrypted), iv.length);
                data = combined.buffer;
            }

            // Write using sync access handle for better performance
            const writable = await fileHandle.createWritable();
            await writable.write(data);
            await writable.close();

            this.emitEvent('created', path);
            return true;
        } catch (error) {
            console.error('Write file error:', error);
            return false;
        }
    }

    /**
     * Read a file
     */
    async readFile(path: string): Promise<string | null> {
        try {
            const { directory, filename } = this.parsePath(path);
            const dirHandle = await this.getDirectoryHandle(directory);
            const fileHandle = await dirHandle.getFileHandle(filename);
            const file = await fileHandle.getFile();
            let data = await file.arrayBuffer();

            // Check if path is in encrypted vault
            const isVaultPath = path.startsWith('/vault');
            if (isVaultPath) {
                const vaultKey = this.vaultKeys.get('/vault');
                if (!vaultKey) {
                    throw new Error('Vault not unlocked. Call unlockVault() first.');
                }

                // Extract IV and decrypt
                const combined = new Uint8Array(data);
                const iv = combined.slice(0, 12);
                const encrypted = combined.slice(12);
                data = await CryptoUtils.decrypt(encrypted.buffer, vaultKey, iv);
            }

            return new TextDecoder().decode(data);
        } catch (error) {
            console.error('Read file error:', error);
            return null;
        }
    }

    /**
     * Read file as binary
     */
    async readFileBuffer(path: string): Promise<ArrayBuffer | null> {
        try {
            const { directory, filename } = this.parsePath(path);
            const dirHandle = await this.getDirectoryHandle(directory);
            const fileHandle = await dirHandle.getFileHandle(filename);
            const file = await fileHandle.getFile();
            let data = await file.arrayBuffer();

            // Check if path is in encrypted vault
            const isVaultPath = path.startsWith('/vault');
            if (isVaultPath) {
                const vaultKey = this.vaultKeys.get('/vault');
                if (!vaultKey) {
                    throw new Error('Vault not unlocked');
                }
                const combined = new Uint8Array(data);
                const iv = combined.slice(0, 12);
                const encrypted = combined.slice(12);
                data = await CryptoUtils.decrypt(encrypted.buffer, vaultKey, iv);
            }

            return data;
        } catch (error) {
            console.error('Read file buffer error:', error);
            return null;
        }
    }

    /**
     * Delete a file
     */
    async deleteFile(path: string): Promise<boolean> {
        try {
            const { directory, filename } = this.parsePath(path);
            const dirHandle = await this.getDirectoryHandle(directory);
            await dirHandle.removeEntry(filename);
            this.emitEvent('deleted', path);
            return true;
        } catch (error) {
            console.error('Delete file error:', error);
            return false;
        }
    }

    /**
     * Check if file exists
     */
    async exists(path: string): Promise<boolean> {
        try {
            const { directory, filename } = this.parsePath(path);
            const dirHandle = await this.getDirectoryHandle(directory);
            await dirHandle.getFileHandle(filename);
            return true;
        } catch {
            return false;
        }
    }

    // ===================== DIRECTORY OPERATIONS =====================

    /**
     * Create a directory
     */
    async createDirectory(path: string): Promise<boolean> {
        try {
            await this.ensureDirectory(path);
            this.emitEvent('created', path);
            return true;
        } catch (error) {
            console.error('Create directory error:', error);
            return false;
        }
    }

    /**
     * List directory contents
     */
    async listDirectory(path: string): Promise<FileMetadata[]> {
        try {
            const dirHandle = await this.getDirectoryHandle(path);
            const entries: FileMetadata[] = [];

            // @ts-ignore - entries() is available on FileSystemDirectoryHandle
            for await (const [name, handle] of dirHandle.entries()) {
                const isFile = handle.kind === 'file';
                let size = 0;
                let mimeType: string | undefined;

                if (isFile) {
                    const file = await (handle as FileSystemFileHandle).getFile();
                    size = file.size;
                    mimeType = file.type || undefined;
                }

                entries.push({
                    name,
                    path: path === '/' ? `/${name}` : `${path}/${name}`,
                    size,
                    type: isFile ? 'file' : 'directory',
                    created: Date.now(), // OPFS doesn't expose creation time
                    modified: Date.now(),
                    encrypted: path.startsWith('/vault'),
                    mimeType,
                });
            }

            return entries.sort((a, b) => {
                // Directories first, then alphabetically
                if (a.type !== b.type) return a.type === 'directory' ? -1 : 1;
                return a.name.localeCompare(b.name);
            });
        } catch (error) {
            console.error('List directory error:', error);
            return [];
        }
    }

    /**
     * Delete a directory (recursive)
     */
    async deleteDirectory(path: string, recursive: boolean = false): Promise<boolean> {
        try {
            const { directory: parentPath, filename } = this.parsePath(path);
            const parentDir = await this.getDirectoryHandle(parentPath);
            await parentDir.removeEntry(filename, { recursive });
            this.emitEvent('deleted', path);
            return true;
        } catch (error) {
            console.error('Delete directory error:', error);
            return false;
        }
    }

    // ===================== VAULT OPERATIONS =====================

    /**
     * Unlock an encrypted vault with a password
     */
    async unlockVault(password: string, vaultPath: string = '/vault'): Promise<boolean> {
        try {
            // Try to read salt from vault, or create new one
            let salt: Uint8Array;
            const saltPath = `${vaultPath}/.salt`;

            const existingSalt = await this.readFileBuffer(saltPath);
            if (existingSalt) {
                salt = new Uint8Array(existingSalt);
            } else {
                salt = CryptoUtils.generateSalt();
                // Store salt (unencrypted)
                await this.writeRawFile(saltPath, salt.buffer as ArrayBuffer);
            }

            // Derive key from password
            const key = await CryptoUtils.deriveKey(password, salt);
            this.vaultKeys.set(vaultPath, key);

            return true;
        } catch (error) {
            console.error('Unlock vault error:', error);
            return false;
        }
    }

    /**
     * Lock a vault (remove key from memory)
     */
    lockVault(vaultPath: string = '/vault'): void {
        this.vaultKeys.delete(vaultPath);
    }

    /**
     * Check if vault is unlocked
     */
    isVaultUnlocked(vaultPath: string = '/vault'): boolean {
        return this.vaultKeys.has(vaultPath);
    }

    /**
     * Write raw file (bypasses encryption)
     */
    private async writeRawFile(path: string, data: ArrayBuffer): Promise<boolean> {
        try {
            const { directory, filename } = this.parsePath(path);
            const dirHandle = await this.ensureDirectory(directory);
            const fileHandle = await dirHandle.getFileHandle(filename, { create: true });
            const writable = await fileHandle.createWritable();
            await writable.write(data);
            await writable.close();
            return true;
        } catch {
            return false;
        }
    }

    // ===================== MOUNT POINTS =====================

    /**
     * Get all mount points
     */
    getMountPoints(): MountPoint[] {
        return [...this.mountPoints];
    }

    /**
     * Add a mount point
     */
    addMountPoint(mountPoint: MountPoint): void {
        this.mountPoints.push(mountPoint);
    }

    // ===================== FILE WATCH =====================

    /**
     * Watch a path for changes
     */
    watch(path: string, callback: FileWatchCallback): () => void {
        if (!this.watchers.has(path)) {
            this.watchers.set(path, new Set());
        }
        this.watchers.get(path)!.add(callback);

        return () => {
            this.watchers.get(path)?.delete(callback);
        };
    }

    /**
     * Emit a file event
     */
    private emitEvent(type: FileEvent, path: string): void {
        const event: FileWatchEvent = { type, path, timestamp: Date.now() };

        // Notify path-specific watchers
        const pathWatchers = this.watchers.get(path);
        if (pathWatchers) {
            const watchersArray = Array.from(pathWatchers);
            for (const callback of watchersArray) {
                callback(event);
            }
        }

        // Notify parent directory watchers
        const { directory } = this.parsePath(path);
        const dirWatchers = this.watchers.get(directory);
        if (dirWatchers) {
            const watchersArray = Array.from(dirWatchers);
            for (const callback of watchersArray) {
                callback(event);
            }
        }

        // Notify root watchers
        const rootWatchers = this.watchers.get('/');
        if (rootWatchers) {
            const watchersArray = Array.from(rootWatchers);
            for (const callback of watchersArray) {
                callback(event);
            }
        }
    }

    // ===================== STATS =====================

    /**
     * Get file system statistics
     */
    async getStats(): Promise<FileSystemStats> {
        let totalFiles = 0;
        let totalDirectories = 0;
        let totalSize = 0;

        const countRecursive = async (path: string): Promise<void> => {
            const entries = await this.listDirectory(path);
            for (const entry of entries) {
                if (entry.type === 'file') {
                    totalFiles++;
                    totalSize += entry.size;
                } else {
                    totalDirectories++;
                    await countRecursive(entry.path);
                }
            }
        };

        await countRecursive('/');

        return {
            totalFiles,
            totalDirectories,
            totalSize,
            mountPoints: this.getMountPoints(),
        };
    }
}

// ============================================================================
// SINGLETON INSTANCE
// ============================================================================

let fsInstance: FileSystemManager | null = null;

export function getFileSystem(): FileSystemManager {
    if (!fsInstance) {
        fsInstance = new FileSystemManager();
    }
    return fsInstance;
}

export async function initFileSystem(): Promise<boolean> {
    const fs = getFileSystem();
    return fs.initialize();
}

export { FileSystemManager, CryptoUtils };
