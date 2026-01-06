/**
 * useFileSystem Hook
 * 
 * React hook for interacting with the Sovereign File System.
 * Provides reactive access to file operations and vault management.
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import {
    getFileSystem,
    initFileSystem,
    FileMetadata,
    FileSystemStats,
    MountPoint,
    FileWatchEvent
} from '@/lib/filesystem';

export interface UseFileSystemReturn {
    // State
    isReady: boolean;
    isInitializing: boolean;
    currentPath: string;
    entries: FileMetadata[];
    stats: FileSystemStats | null;
    isVaultUnlocked: boolean;
    error: string | null;

    // Navigation
    navigate: (path: string) => Promise<void>;
    goUp: () => Promise<void>;
    refresh: () => Promise<void>;

    // File Operations
    writeFile: (path: string, content: string) => Promise<boolean>;
    readFile: (path: string) => Promise<string | null>;
    deleteFile: (path: string) => Promise<boolean>;

    // Directory Operations
    createDirectory: (path: string) => Promise<boolean>;
    deleteDirectory: (path: string) => Promise<boolean>;

    // Vault Operations
    unlockVault: (password: string) => Promise<boolean>;
    lockVault: () => void;

    // Utils
    getMountPoints: () => MountPoint[];
    formatSize: (bytes: number) => string;
}

export function useFileSystem(): UseFileSystemReturn {
    const fs = useRef(getFileSystem());
    const [isReady, setIsReady] = useState(false);
    const [isInitializing, setIsInitializing] = useState(false);
    const [currentPath, setCurrentPath] = useState('/');
    const [entries, setEntries] = useState<FileMetadata[]>([]);
    const [stats, setStats] = useState<FileSystemStats | null>(null);
    const [isVaultUnlocked, setIsVaultUnlocked] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Initialize file system
    useEffect(() => {
        const init = async () => {
            setIsInitializing(true);
            setError(null);

            try {
                const success = await initFileSystem();
                setIsReady(success);

                if (success) {
                    await loadDirectory('/');
                    await loadStats();
                } else {
                    setError('Failed to initialize file system. OPFS may not be available.');
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error');
            } finally {
                setIsInitializing(false);
            }
        };

        init();
    }, []);

    // Watch current directory for changes
    useEffect(() => {
        if (!isReady) return;

        const handleChange = (event: FileWatchEvent) => {
            loadDirectory(currentPath);
            loadStats();
        };

        const unwatch = fs.current.watch(currentPath, handleChange);
        return unwatch;
    }, [isReady, currentPath]);

    // Load directory contents
    const loadDirectory = async (path: string): Promise<void> => {
        try {
            const items = await fs.current.listDirectory(path);
            setEntries(items);
            setCurrentPath(path);
        } catch (err) {
            setError(`Failed to load directory: ${path}`);
        }
    };

    // Load stats
    const loadStats = async (): Promise<void> => {
        try {
            const fsStats = await fs.current.getStats();
            setStats(fsStats);
        } catch (err) {
            console.error('Failed to load stats:', err);
        }
    };

    // Navigate to a path
    const navigate = useCallback(async (path: string): Promise<void> => {
        setError(null);
        await loadDirectory(path);
    }, []);

    // Go up one level
    const goUp = useCallback(async (): Promise<void> => {
        if (currentPath === '/') return;

        const parts = currentPath.split('/').filter(Boolean);
        parts.pop();
        const parentPath = '/' + parts.join('/');
        await navigate(parentPath || '/');
    }, [currentPath, navigate]);

    // Refresh current directory
    const refresh = useCallback(async (): Promise<void> => {
        await loadDirectory(currentPath);
        await loadStats();
    }, [currentPath]);

    // Write a file
    const writeFile = useCallback(async (path: string, content: string): Promise<boolean> => {
        setError(null);
        const success = await fs.current.writeFile(path, content);
        if (success) {
            await refresh();
        } else {
            setError(`Failed to write file: ${path}`);
        }
        return success;
    }, [refresh]);

    // Read a file
    const readFile = useCallback(async (path: string): Promise<string | null> => {
        setError(null);
        const content = await fs.current.readFile(path);
        if (content === null) {
            setError(`Failed to read file: ${path}`);
        }
        return content;
    }, []);

    // Delete a file
    const deleteFile = useCallback(async (path: string): Promise<boolean> => {
        setError(null);
        const success = await fs.current.deleteFile(path);
        if (success) {
            await refresh();
        } else {
            setError(`Failed to delete file: ${path}`);
        }
        return success;
    }, [refresh]);

    // Create a directory
    const createDirectory = useCallback(async (path: string): Promise<boolean> => {
        setError(null);
        const success = await fs.current.createDirectory(path);
        if (success) {
            await refresh();
        } else {
            setError(`Failed to create directory: ${path}`);
        }
        return success;
    }, [refresh]);

    // Delete a directory
    const deleteDirectory = useCallback(async (path: string): Promise<boolean> => {
        setError(null);
        const success = await fs.current.deleteDirectory(path, true);
        if (success) {
            await refresh();
        } else {
            setError(`Failed to delete directory: ${path}`);
        }
        return success;
    }, [refresh]);

    // Unlock vault
    const unlockVault = useCallback(async (password: string): Promise<boolean> => {
        setError(null);
        const success = await fs.current.unlockVault(password);
        setIsVaultUnlocked(success);
        if (!success) {
            setError('Failed to unlock vault. Check your password.');
        }
        return success;
    }, []);

    // Lock vault
    const lockVault = useCallback((): void => {
        fs.current.lockVault();
        setIsVaultUnlocked(false);
    }, []);

    // Get mount points
    const getMountPoints = useCallback((): MountPoint[] => {
        return fs.current.getMountPoints();
    }, []);

    // Format file size
    const formatSize = useCallback((bytes: number): string => {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
    }, []);

    return {
        isReady,
        isInitializing,
        currentPath,
        entries,
        stats,
        isVaultUnlocked,
        error,
        navigate,
        goUp,
        refresh,
        writeFile,
        readFile,
        deleteFile,
        createDirectory,
        deleteDirectory,
        unlockVault,
        lockVault,
        getMountPoints,
        formatSize,
    };
}

export default useFileSystem;
