/**
 * Kernel Status Component
 * 
 * Visual display of the Sovereign OS kernel state, boot sequence,
 * running processes, and system information.
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PHYSICS } from '@/lib/animation-constants';
import { useKernel } from '@/hooks/useKernel';
import {
    Cpu,
    Power,
    Activity,
    Box,
    MessageSquare,
    Clock,
    Zap,
    CheckCircle,
    Loader2,
    XCircle,
    Play,
    Square,
    Trash2,
    Plus,
    Terminal
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// Priority colors
const PRIORITY_COLORS: Record<string, string> = {
    realtime: 'text-error bg-error/20',
    high: 'text-warning bg-warning/20',
    normal: 'text-primary bg-primary/20',
    low: 'text-info bg-info/20',
    idle: 'text-muted-foreground bg-muted/20',
};

// State colors
const STATE_COLORS: Record<string, string> = {
    running: 'text-success',
    ready: 'text-primary',
    blocked: 'text-warning',
    created: 'text-info',
    terminated: 'text-error',
};

export function KernelStatus() {
    const {
        isBooted,
        isBooting,
        bootStages,
        processes,
        systemInfo,
        boot,
        shutdown,
        spawn,
        kill
    } = useKernel();

    const [newProcessName, setNewProcessName] = useState('');
    const [showSpawnInput, setShowSpawnInput] = useState(false);

    const handleSpawn = () => {
        if (newProcessName.trim()) {
            spawn(newProcessName.trim());
            setNewProcessName('');
            setShowSpawnInput(false);
        }
    };

    const formatUptime = (ms: number): string => {
        const seconds = Math.floor(ms / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);

        if (hours > 0) return `${hours}h ${minutes % 60}m`;
        if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
        return `${seconds}s`;
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${isBooted ? 'bg-success/20' : 'bg-muted/20'
                        }`}>
                        <Cpu className={`h-6 w-6 ${isBooted ? 'text-success' : 'text-muted-foreground'}`} />
                    </div>
                    <div>
                        <h2 className="text-title text-foreground flex items-center gap-2">
                            Sovereign Kernel
                            <span className={`text-xs px-2 py-0.5 rounded-full ${isBooted ? 'bg-success/20 text-success' : 'bg-muted/20 text-muted-foreground'
                                }`}>
                                {isBooted ? 'Running' : isBooting ? 'Booting' : 'Offline'}
                            </span>
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            {systemInfo ? `v${systemInfo.kernelVersion} • Uptime: ${formatUptime(systemInfo.uptime)}` : 'Browser Microkernel'}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {!isBooted && !isBooting && (
                        <Button onClick={() => boot()} className="bg-success hover:bg-success/90">
                            <Power className="h-4 w-4 mr-2" />
                            Boot Kernel
                        </Button>
                    )}
                    {isBooted && (
                        <Button onClick={shutdown} variant="destructive">
                            <Square className="h-4 w-4 mr-2" />
                            Shutdown
                        </Button>
                    )}
                </div>
            </div>

            {/* Boot Sequence */}
            <AnimatePresence>
                {isBooting && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="raycast-panel p-5"
                    >
                        <h3 className="text-sm font-medium text-foreground mb-4 flex items-center gap-2">
                            <Terminal className="h-4 w-4 text-primary" />
                            Boot Sequence
                        </h3>
                        <div className="space-y-3">
                            {bootStages.map((stage, index) => (
                                <motion.div
                                    key={stage.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-center gap-3"
                                >
                                    <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${stage.status === 'complete' ? 'bg-success/20' :
                                            stage.status === 'running' ? 'bg-primary/20' :
                                                stage.status === 'failed' ? 'bg-error/20' :
                                                    'bg-muted/20'
                                        }`}>
                                        {stage.status === 'complete' && <CheckCircle className="h-4 w-4 text-success" />}
                                        {stage.status === 'running' && <Loader2 className="h-4 w-4 text-primary animate-spin" />}
                                        {stage.status === 'failed' && <XCircle className="h-4 w-4 text-error" />}
                                        {stage.status === 'pending' && <span className="text-xs text-muted-foreground">{index + 1}</span>}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-foreground">{stage.name}</p>
                                        {stage.duration && (
                                            <p className="text-xs text-muted-foreground">{stage.duration}ms</p>
                                        )}
                                        {stage.error && (
                                            <p className="text-xs text-error">{stage.error}</p>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* System Stats */}
            {isBooted && systemInfo && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="raycast-panel p-4 text-center">
                        <Box className="h-5 w-5 text-primary mx-auto mb-2" />
                        <p className="text-2xl font-bold text-foreground">{systemInfo.processCount}</p>
                        <p className="text-xs text-muted-foreground">Processes</p>
                    </div>
                    <div className="raycast-panel p-4 text-center">
                        <Zap className="h-5 w-5 text-warning mx-auto mb-2" />
                        <p className="text-2xl font-bold text-foreground">{(systemInfo.totalCpuTime / 1000).toFixed(1)}s</p>
                        <p className="text-xs text-muted-foreground">CPU Time</p>
                    </div>
                    <div className="raycast-panel p-4 text-center">
                        <Clock className="h-5 w-5 text-success mx-auto mb-2" />
                        <p className="text-2xl font-bold text-foreground">{formatUptime(systemInfo.uptime)}</p>
                        <p className="text-xs text-muted-foreground">Uptime</p>
                    </div>
                    <div className="raycast-panel p-4 text-center">
                        <Activity className="h-5 w-5 text-info mx-auto mb-2" />
                        <p className="text-2xl font-bold text-foreground">v{systemInfo.kernelVersion}</p>
                        <p className="text-xs text-muted-foreground">Version</p>
                    </div>
                </div>
            )}

            {/* Process Table */}
            {isBooted && (
                <div className="raycast-panel overflow-hidden">
                    <div className="p-4 border-b border-border/30 flex items-center justify-between">
                        <h3 className="text-sm font-medium text-foreground flex items-center gap-2">
                            <Box className="h-4 w-4 text-primary" />
                            Process Table
                        </h3>
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setShowSpawnInput(true)}
                            disablePhysics
                        >
                            <Plus className="h-4 w-4 mr-1" />
                            Spawn
                        </Button>
                    </div>

                    {/* Spawn Input */}
                    <AnimatePresence>
                        {showSpawnInput && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="border-b border-border/30 p-3 bg-card/30"
                            >
                                <div className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        value={newProcessName}
                                        onChange={(e) => setNewProcessName(e.target.value)}
                                        placeholder="Process name..."
                                        className="flex-1 bg-card border border-border/30 rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                                        onKeyDown={(e) => e.key === 'Enter' && handleSpawn()}
                                        autoFocus
                                    />
                                    <Button size="sm" onClick={handleSpawn}>
                                        <Play className="h-4 w-4" />
                                    </Button>
                                    <Button size="sm" variant="ghost" onClick={() => setShowSpawnInput(false)}>
                                        <XCircle className="h-4 w-4" />
                                    </Button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Process List */}
                    <div className="divide-y divide-border/20">
                        {processes.map((process) => (
                            <motion.div
                                key={process.pid}
                                className="p-3 flex items-center gap-4 hover:bg-card/30 transition-colors"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                <div className="w-12 text-center">
                                    <span className="text-xs font-mono text-muted-foreground">{process.pid}</span>
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-foreground">{process.name}</p>
                                    <p className="text-xs text-muted-foreground">
                                        CPU: {(process.cpuTime / 1000).toFixed(2)}s
                                    </p>
                                </div>
                                <div className={`px-2 py-1 rounded-md text-xs font-medium ${PRIORITY_COLORS[process.priority]}`}>
                                    {process.priority}
                                </div>
                                <div className={`text-xs font-medium ${STATE_COLORS[process.state]}`}>
                                    {process.state}
                                </div>
                                {process.pid >= 10 && (
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        className="h-7 w-7"
                                        onClick={() => kill(process.pid)}
                                        disablePhysics
                                    >
                                        <Trash2 className="h-3.5 w-3.5 text-muted-foreground hover:text-error" />
                                    </Button>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}

            {/* Offline State */}
            {!isBooted && !isBooting && (
                <div className="raycast-panel p-8 text-center">
                    <div className="h-16 w-16 bg-muted/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <Power className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium text-foreground mb-2">Kernel Offline</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                        Boot the kernel to enable process management, IPC, and system services.
                    </p>
                    <Button onClick={() => boot()} className="bg-gradient-primary">
                        <Zap className="h-4 w-4 mr-2" />
                        Initialize System
                    </Button>
                </div>
            )}
        </div>
    );
}

export default KernelStatus;
