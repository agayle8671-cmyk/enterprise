/**
 * File Explorer Component
 * 
 * Visual file browser for the Sovereign File System with
 * navigation, file preview, vault management, and CRUD operations.
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PHYSICS } from '@/lib/animation-constants';
import { useFileSystem } from '@/hooks/useFileSystem';
import {
    Folder,
    File,
    ChevronRight,
    ChevronUp,
    RefreshCw,
    Plus,
    Trash2,
    Lock,
    Unlock,
    HardDrive,
    Shield,
    FileText,
    Image,
    Video,
    Music,
    Archive,
    Code,
    Loader2,
    AlertCircle,
    FolderPlus,
    FilePlus,
    X,
    Eye,
    Download
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// File type icons
const getFileIcon = (name: string, mimeType?: string) => {
    if (mimeType?.startsWith('image/')) return Image;
    if (mimeType?.startsWith('video/')) return Video;
    if (mimeType?.startsWith('audio/')) return Music;
    if (mimeType?.includes('zip') || mimeType?.includes('archive')) return Archive;

    const ext = name.split('.').pop()?.toLowerCase();
    if (['js', 'ts', 'tsx', 'jsx', 'py', 'json', 'html', 'css'].includes(ext || '')) return Code;
    if (['txt', 'md', 'doc', 'docx', 'pdf'].includes(ext || '')) return FileText;

    return File;
};

export function FileExplorer() {
    const {
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
    } = useFileSystem();

    const [isCreating, setIsCreating] = useState<'file' | 'directory' | null>(null);
    const [newItemName, setNewItemName] = useState('');
    const [vaultPassword, setVaultPassword] = useState('');
    const [showVaultPrompt, setShowVaultPrompt] = useState(false);
    const [previewContent, setPreviewContent] = useState<string | null>(null);
    const [previewPath, setPreviewPath] = useState<string | null>(null);

    // Handle create new item
    const handleCreate = async () => {
        if (!newItemName.trim()) return;

        const fullPath = currentPath === '/'
            ? `/${newItemName}`
            : `${currentPath}/${newItemName}`;

        if (isCreating === 'directory') {
            await createDirectory(fullPath);
        } else {
            await writeFile(fullPath, '');
        }

        setIsCreating(null);
        setNewItemName('');
    };

    // Handle vault unlock
    const handleUnlockVault = async () => {
        if (!vaultPassword.trim()) return;

        const success = await unlockVault(vaultPassword);
        if (success) {
            setShowVaultPrompt(false);
            setVaultPassword('');
        }
    };

    // Handle preview file
    const handlePreview = async (path: string) => {
        const content = await readFile(path);
        if (content !== null) {
            setPreviewContent(content);
            setPreviewPath(path);
        }
    };

    // Breadcrumb navigation
    const pathParts = currentPath.split('/').filter(Boolean);

    if (isInitializing) {
        return (
            <div className="raycast-panel p-8 text-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
                <p className="text-muted-foreground">Initializing File System...</p>
            </div>
        );
    }

    if (!isReady) {
        return (
            <div className="raycast-panel p-8 text-center">
                <AlertCircle className="h-8 w-8 text-error mx-auto mb-4" />
                <h3 className="font-medium text-foreground mb-2">File System Unavailable</h3>
                <p className="text-sm text-muted-foreground">
                    {error || 'Origin Private File System (OPFS) is not available in this browser.'}
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="h-12 w-12 bg-primary/20 rounded-xl flex items-center justify-center">
                        <HardDrive className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <h2 className="text-title text-foreground">Sovereign File System</h2>
                        <p className="text-sm text-muted-foreground">
                            {stats ? `${stats.totalFiles} files, ${stats.totalDirectories} folders • ${formatSize(stats.totalSize)}` : 'Loading...'}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" onClick={refresh} disablePhysics>
                        <RefreshCw className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setIsCreating('directory')} disablePhysics>
                        <FolderPlus className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setIsCreating('file')} disablePhysics>
                        <FilePlus className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Error Banner */}
            <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-error/10 border border-error/30 rounded-lg p-3 flex items-center gap-2"
                    >
                        <AlertCircle className="h-4 w-4 text-error shrink-0" />
                        <p className="text-sm text-error">{error}</p>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Sidebar - Mount Points */}
                <div className="raycast-panel p-4 space-y-2">
                    <h3 className="text-sm font-medium text-foreground mb-3">Mount Points</h3>
                    {getMountPoints().map((mount) => (
                        <button
                            key={mount.path}
                            onClick={() => {
                                if (mount.encrypted && !isVaultUnlocked) {
                                    setShowVaultPrompt(true);
                                } else {
                                    navigate(mount.path);
                                }
                            }}
                            className={`w-full flex items-center gap-3 p-2 rounded-lg text-left transition-colors ${currentPath.startsWith(mount.path) && mount.path !== '/'
                                    ? 'bg-primary/20 text-primary'
                                    : 'hover:bg-card/50 text-foreground'
                                }`}
                        >
                            {mount.encrypted ? (
                                isVaultUnlocked ? (
                                    <Unlock className="h-4 w-4 text-success" />
                                ) : (
                                    <Lock className="h-4 w-4 text-warning" />
                                )
                            ) : (
                                <Folder className="h-4 w-4" />
                            )}
                            <span className="text-sm">{mount.label}</span>
                        </button>
                    ))}

                    {/* Vault Controls */}
                    {isVaultUnlocked && (
                        <Button
                            size="sm"
                            variant="ghost"
                            className="w-full justify-start text-warning"
                            onClick={lockVault}
                        >
                            <Lock className="h-4 w-4 mr-2" />
                            Lock Vault
                        </Button>
                    )}
                </div>

                {/* Main Content */}
                <div className="lg:col-span-3 raycast-panel overflow-hidden">
                    {/* Breadcrumb */}
                    <div className="p-3 border-b border-border/30 flex items-center gap-1 overflow-x-auto">
                        <button
                            onClick={goUp}
                            disabled={currentPath === '/'}
                            className="p-1.5 rounded-md hover:bg-card/50 disabled:opacity-50"
                        >
                            <ChevronUp className="h-4 w-4" />
                        </button>
                        <button
                            onClick={() => navigate('/')}
                            className="px-2 py-1 text-sm hover:bg-card/50 rounded-md"
                        >
                            Root
                        </button>
                        {pathParts.map((part, index) => (
                            <div key={index} className="flex items-center">
                                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                <button
                                    onClick={() => navigate('/' + pathParts.slice(0, index + 1).join('/'))}
                                    className="px-2 py-1 text-sm hover:bg-card/50 rounded-md"
                                >
                                    {part}
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Create New Item */}
                    <AnimatePresence>
                        {isCreating && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="p-3 border-b border-border/30 bg-card/30"
                            >
                                <div className="flex items-center gap-2">
                                    {isCreating === 'directory' ? (
                                        <Folder className="h-4 w-4 text-primary" />
                                    ) : (
                                        <File className="h-4 w-4 text-muted-foreground" />
                                    )}
                                    <input
                                        type="text"
                                        value={newItemName}
                                        onChange={(e) => setNewItemName(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
                                        placeholder={isCreating === 'directory' ? 'Folder name...' : 'File name...'}
                                        className="flex-1 bg-transparent border-none text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                                        autoFocus
                                    />
                                    <Button size="sm" onClick={handleCreate}>Create</Button>
                                    <Button size="sm" variant="ghost" onClick={() => setIsCreating(null)}>
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* File List */}
                    <div className="divide-y divide-border/20">
                        {entries.length === 0 ? (
                            <div className="p-8 text-center text-muted-foreground">
                                <Folder className="h-12 w-12 mx-auto mb-3 opacity-30" />
                                <p>This folder is empty</p>
                            </div>
                        ) : (
                            entries.map((entry) => {
                                const FileIcon = entry.type === 'directory' ? Folder : getFileIcon(entry.name, entry.mimeType);

                                return (
                                    <motion.div
                                        key={entry.path}
                                        className="flex items-center gap-3 p-3 hover:bg-card/30 transition-colors cursor-pointer group"
                                        whileHover={{ x: 4 }}
                                        transition={PHYSICS.interaction}
                                        onClick={() => {
                                            if (entry.type === 'directory') {
                                                if (entry.path.startsWith('/vault') && !isVaultUnlocked) {
                                                    setShowVaultPrompt(true);
                                                } else {
                                                    navigate(entry.path);
                                                }
                                            }
                                        }}
                                    >
                                        <div className={`h-9 w-9 rounded-lg flex items-center justify-center ${entry.type === 'directory' ? 'bg-primary/20 text-primary' : 'bg-muted/20 text-muted-foreground'
                                            }`}>
                                            <FileIcon className="h-5 w-5" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-foreground truncate">{entry.name}</p>
                                            <p className="text-xs text-muted-foreground">
                                                {entry.type === 'file' ? formatSize(entry.size) : 'Folder'}
                                                {entry.encrypted && (
                                                    <span className="ml-2 text-warning">
                                                        <Shield className="h-3 w-3 inline-block" /> Encrypted
                                                    </span>
                                                )}
                                            </p>
                                        </div>
                                        <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1 transition-opacity">
                                            {entry.type === 'file' && (
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    className="h-7 w-7"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handlePreview(entry.path);
                                                    }}
                                                    disablePhysics
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                            )}
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="h-7 w-7 text-error"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    if (entry.type === 'directory') {
                                                        deleteDirectory(entry.path);
                                                    } else {
                                                        deleteFile(entry.path);
                                                    }
                                                }}
                                                disablePhysics
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </motion.div>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>

            {/* Vault Password Modal */}
            <AnimatePresence>
                {showVaultPrompt && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                        onClick={() => setShowVaultPrompt(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-card border border-border rounded-xl p-6 w-full max-w-md shadow-xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="h-10 w-10 bg-warning/20 rounded-lg flex items-center justify-center">
                                    <Lock className="h-5 w-5 text-warning" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-foreground">Unlock Vault</h3>
                                    <p className="text-sm text-muted-foreground">Enter your vault password</p>
                                </div>
                            </div>
                            <input
                                type="password"
                                value={vaultPassword}
                                onChange={(e) => setVaultPassword(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleUnlockVault()}
                                placeholder="Password..."
                                className="w-full bg-background border border-border/50 rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 mb-4"
                                autoFocus
                            />
                            <div className="flex gap-2">
                                <Button className="flex-1" onClick={handleUnlockVault}>
                                    <Unlock className="h-4 w-4 mr-2" />
                                    Unlock
                                </Button>
                                <Button variant="ghost" onClick={() => setShowVaultPrompt(false)}>
                                    Cancel
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* File Preview Modal */}
            <AnimatePresence>
                {previewContent !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                        onClick={() => setPreviewContent(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-card border border-border rounded-xl w-full max-w-2xl max-h-[80vh] shadow-xl overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-4 border-b border-border/30 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <FileText className="h-4 w-4 text-primary" />
                                    <span className="text-sm font-medium text-foreground">{previewPath}</span>
                                </div>
                                <Button size="icon" variant="ghost" onClick={() => setPreviewContent(null)}>
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                            <div className="p-4 overflow-auto max-h-[60vh]">
                                <pre className="text-sm text-foreground font-mono whitespace-pre-wrap">
                                    {previewContent || '(Empty file)'}
                                </pre>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default FileExplorer;
