/**
 * useKernel Hook
 * 
 * React hook for interacting with the Sovereign OS browser microkernel.
 * Provides reactive access to kernel state and operations.
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import {
    getKernel,
    Kernel,
    Process,
    ProcessPriority,
    BootStage,
    SystemInfo,
    IPCMessage
} from '@/lib/kernel';

export interface UseKernelReturn {
    // State
    isBooted: boolean;
    isBooting: boolean;
    bootStages: BootStage[];
    processes: Process[];
    systemInfo: SystemInfo | null;

    // Actions
    boot: () => Promise<boolean>;
    shutdown: () => void;
    spawn: (name: string, priority?: ProcessPriority) => number;
    kill: (pid: number) => boolean;

    // IPC
    send: (source: number, target: number, channel: string, payload: unknown) => string;
    subscribe: (channel: string, handler: (msg: IPCMessage) => void) => () => void;

    // Kernel instance
    kernel: Kernel;
}

export function useKernel(): UseKernelReturn {
    const kernel = useRef(getKernel());
    const [isBooted, setIsBooted] = useState(kernel.current.isRunning());
    const [isBooting, setIsBooting] = useState(false);
    const [bootStages, setBootStages] = useState<BootStage[]>([]);
    const [processes, setProcesses] = useState<Process[]>([]);
    const [systemInfo, setSystemInfo] = useState<SystemInfo | null>(null);

    // Update process list periodically
    useEffect(() => {
        if (!isBooted) return;

        const updateState = () => {
            setProcesses(kernel.current.processManager.listProcesses());
            setSystemInfo(kernel.current.getSystemInfo());
        };

        updateState();
        const interval = setInterval(updateState, 1000);
        return () => clearInterval(interval);
    }, [isBooted]);

    // Boot the kernel
    const boot = useCallback(async (): Promise<boolean> => {
        if (kernel.current.isRunning()) {
            setIsBooted(true);
            return true;
        }

        setIsBooting(true);
        setBootStages([]);

        kernel.current.bootManager.onProgress((stage) => {
            setBootStages(kernel.current.bootManager.getStages());
        });

        const success = await kernel.current.boot();
        setIsBooted(success);
        setIsBooting(false);

        if (success) {
            setProcesses(kernel.current.processManager.listProcesses());
            setSystemInfo(kernel.current.getSystemInfo());
        }

        return success;
    }, []);

    // Shutdown the kernel
    const shutdown = useCallback(() => {
        kernel.current.shutdown();
        setIsBooted(false);
        setProcesses([]);
        setSystemInfo(null);
    }, []);

    // Spawn a new process
    const spawn = useCallback((name: string, priority?: ProcessPriority): number => {
        const pid = kernel.current.spawn(name, priority);
        setProcesses(kernel.current.processManager.listProcesses());
        return pid;
    }, []);

    // Kill a process
    const kill = useCallback((pid: number): boolean => {
        const result = kernel.current.kill(pid);
        setProcesses(kernel.current.processManager.listProcesses());
        return result;
    }, []);

    // Send an IPC message
    const send = useCallback((source: number, target: number, channel: string, payload: unknown): string => {
        return kernel.current.send(source, target, channel, payload);
    }, []);

    // Subscribe to IPC channel
    const subscribe = useCallback((channel: string, handler: (msg: IPCMessage) => void): () => void => {
        return kernel.current.subscribe(channel, handler);
    }, []);

    return {
        isBooted,
        isBooting,
        bootStages,
        processes,
        systemInfo,
        boot,
        shutdown,
        spawn,
        kill,
        send,
        subscribe,
        kernel: kernel.current,
    };
}

export default useKernel;
