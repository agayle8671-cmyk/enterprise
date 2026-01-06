/**
 * Sovereign OS - Browser Microkernel
 * 
 * A lightweight kernel architecture running in the browser.
 * Manages processes, IPC, scheduling, and system resources.
 */

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export type ProcessState = 'created' | 'ready' | 'running' | 'blocked' | 'terminated';
export type ProcessPriority = 'realtime' | 'high' | 'normal' | 'low' | 'idle';
export type MessageType = 'request' | 'response' | 'event' | 'signal';

export interface Process {
    pid: number;
    name: string;
    state: ProcessState;
    priority: ProcessPriority;
    parentPid: number | null;
    createdAt: number;
    cpuTime: number; // milliseconds of CPU time used
    memoryUsage: number; // estimated bytes
    messageQueue: IPCMessage[];
}

export interface IPCMessage {
    id: string;
    type: MessageType;
    source: number; // PID
    target: number; // PID or -1 for broadcast
    channel: string;
    payload: unknown;
    timestamp: number;
}

export interface SystemInfo {
    bootTime: number;
    kernelVersion: string;
    processCount: number;
    totalCpuTime: number;
    uptime: number;
}

export interface BootStage {
    name: string;
    status: 'pending' | 'running' | 'complete' | 'failed';
    duration?: number;
    error?: string;
}

// ============================================================================
// KERNEL CONSTANTS
// ============================================================================

export const KERNEL_VERSION = '1.0.0';
export const MAX_PROCESSES = 256;
export const SCHEDULER_INTERVAL = 16; // ~60fps scheduling
export const TIME_SLICE = {
    realtime: 100,
    high: 50,
    normal: 25,
    low: 10,
    idle: 5,
} as const;

// System PIDs
export const KERNEL_PID = 0;
export const INIT_PID = 1;
export const SCHEDULER_PID = 2;

// ============================================================================
// PROCESS MANAGER
// ============================================================================

class ProcessManager {
    private processes: Map<number, Process> = new Map();
    private nextPid: number = 10; // Reserve 0-9 for system processes
    private runQueue: number[] = [];

    constructor() {
        // Create kernel process
        this.createSystemProcess(KERNEL_PID, 'kernel', 'realtime');
    }

    private createSystemProcess(pid: number, name: string, priority: ProcessPriority): Process {
        const process: Process = {
            pid,
            name,
            state: 'running',
            priority,
            parentPid: null,
            createdAt: Date.now(),
            cpuTime: 0,
            memoryUsage: 0,
            messageQueue: [],
        };
        this.processes.set(pid, process);
        return process;
    }

    spawn(name: string, priority: ProcessPriority = 'normal', parentPid: number | null = null): number {
        if (this.processes.size >= MAX_PROCESSES) {
            throw new Error('Maximum process limit reached');
        }

        const pid = this.nextPid++;
        const process: Process = {
            pid,
            name,
            state: 'created',
            priority,
            parentPid,
            createdAt: Date.now(),
            cpuTime: 0,
            memoryUsage: 0,
            messageQueue: [],
        };

        this.processes.set(pid, process);
        this.setReady(pid);
        return pid;
    }

    kill(pid: number): boolean {
        const process = this.processes.get(pid);
        if (!process || pid < 10) return false; // Can't kill system processes

        process.state = 'terminated';
        this.runQueue = this.runQueue.filter(p => p !== pid);

        // Kill children
        const entries = Array.from(this.processes.entries());
        for (const [childPid, childProcess] of entries) {
            if (childProcess.parentPid === pid) {
                this.kill(childPid);
            }
        }

        this.processes.delete(pid);
        return true;
    }

    setReady(pid: number): void {
        const process = this.processes.get(pid);
        if (process && process.state !== 'terminated') {
            process.state = 'ready';
            if (!this.runQueue.includes(pid)) {
                this.runQueue.push(pid);
            }
        }
    }

    setBlocked(pid: number): void {
        const process = this.processes.get(pid);
        if (process) {
            process.state = 'blocked';
            this.runQueue = this.runQueue.filter(p => p !== pid);
        }
    }

    getProcess(pid: number): Process | undefined {
        return this.processes.get(pid);
    }

    listProcesses(): Process[] {
        return Array.from(this.processes.values());
    }

    getRunQueue(): number[] {
        return [...this.runQueue];
    }

    getProcessCount(): number {
        return this.processes.size;
    }

    getTotalCpuTime(): number {
        let total = 0;
        const processes = Array.from(this.processes.values());
        for (const process of processes) {
            total += process.cpuTime;
        }
        return total;
    }

    addCpuTime(pid: number, time: number): void {
        const process = this.processes.get(pid);
        if (process) {
            process.cpuTime += time;
        }
    }
}

// ============================================================================
// SCHEDULER (Round Robin with Priority)
// ============================================================================

class Scheduler {
    private processManager: ProcessManager;
    private currentPid: number | null = null;
    private timeSliceRemaining: number = 0;
    private isRunning: boolean = false;
    private intervalId: number | null = null;

    constructor(processManager: ProcessManager) {
        this.processManager = processManager;
    }

    start(): void {
        if (this.isRunning) return;
        this.isRunning = true;
        this.intervalId = window.setInterval(() => this.tick(), SCHEDULER_INTERVAL);
    }

    stop(): void {
        this.isRunning = false;
        if (this.intervalId !== null) {
            window.clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    private tick(): void {
        const runQueue = this.processManager.getRunQueue();
        if (runQueue.length === 0) return;

        // Time slice expired or no current process
        if (this.currentPid === null || this.timeSliceRemaining <= 0) {
            this.scheduleNext();
        }

        // Execute current process
        if (this.currentPid !== null) {
            const process = this.processManager.getProcess(this.currentPid);
            if (process && process.state === 'ready') {
                process.state = 'running';
                this.processManager.addCpuTime(this.currentPid, SCHEDULER_INTERVAL);
                this.timeSliceRemaining -= SCHEDULER_INTERVAL;
            }
        }
    }

    private scheduleNext(): void {
        const runQueue = this.processManager.getRunQueue();
        if (runQueue.length === 0) {
            this.currentPid = null;
            return;
        }

        // Sort by priority (Round Robin within same priority)
        const priorityOrder: ProcessPriority[] = ['realtime', 'high', 'normal', 'low', 'idle'];
        const sorted = runQueue.sort((a, b) => {
            const processA = this.processManager.getProcess(a);
            const processB = this.processManager.getProcess(b);
            if (!processA || !processB) return 0;
            return priorityOrder.indexOf(processA.priority) - priorityOrder.indexOf(processB.priority);
        });

        // Pick the highest priority process
        this.currentPid = sorted[0];
        const process = this.processManager.getProcess(this.currentPid);
        if (process) {
            this.timeSliceRemaining = TIME_SLICE[process.priority];

            // Move to end of queue (Round Robin)
            const queue = this.processManager.getRunQueue();
            const idx = queue.indexOf(this.currentPid);
            if (idx > -1) {
                queue.splice(idx, 1);
                queue.push(this.currentPid);
            }
        }
    }

    getCurrentProcess(): number | null {
        return this.currentPid;
    }

    isActive(): boolean {
        return this.isRunning;
    }
}

// ============================================================================
// IPC BUS
// ============================================================================

type MessageHandler = (message: IPCMessage) => void;

class IPCBus {
    private processManager: ProcessManager;
    private handlers: Map<string, Set<MessageHandler>> = new Map();
    private messageIdCounter: number = 0;

    constructor(processManager: ProcessManager) {
        this.processManager = processManager;
    }

    send(source: number, target: number, channel: string, payload: unknown, type: MessageType = 'event'): string {
        const message: IPCMessage = {
            id: `msg-${++this.messageIdCounter}`,
            type,
            source,
            target,
            channel,
            payload,
            timestamp: Date.now(),
        };

        if (target === -1) {
            // Broadcast
            for (const process of this.processManager.listProcesses()) {
                if (process.pid !== source) {
                    this.deliverMessage(process.pid, message);
                }
            }
        } else {
            this.deliverMessage(target, message);
        }

        return message.id;
    }

    private deliverMessage(pid: number, message: IPCMessage): void {
        const process = this.processManager.getProcess(pid);
        if (process && process.state !== 'terminated') {
            process.messageQueue.push(message);

            // If blocked, wake up
            if (process.state === 'blocked') {
                this.processManager.setReady(pid);
            }
        }

        // Notify handlers
        const handlers = this.handlers.get(message.channel);
        if (handlers) {
            const handlersArray = Array.from(handlers);
            for (const handler of handlersArray) {
                handler(message);
            }
        }
    }

    receive(pid: number): IPCMessage | undefined {
        const process = this.processManager.getProcess(pid);
        if (process) {
            return process.messageQueue.shift();
        }
        return undefined;
    }

    subscribe(channel: string, handler: MessageHandler): () => void {
        if (!this.handlers.has(channel)) {
            this.handlers.set(channel, new Set());
        }
        this.handlers.get(channel)!.add(handler);

        return () => {
            this.handlers.get(channel)?.delete(handler);
        };
    }

    getQueueLength(pid: number): number {
        const process = this.processManager.getProcess(pid);
        return process?.messageQueue.length ?? 0;
    }
}

// ============================================================================
// BOOT SEQUENCE
// ============================================================================

export type BootCallback = (stage: BootStage) => void;

class BootManager {
    private stages: BootStage[] = [];
    private callbacks: BootCallback[] = [];

    constructor() {
        this.stages = [
            { name: 'POST', status: 'pending' },
            { name: 'KERNEL_INIT', status: 'pending' },
            { name: 'DAEMON_LOAD', status: 'pending' },
            { name: 'USER_SESSION', status: 'pending' },
        ];
    }

    onProgress(callback: BootCallback): void {
        this.callbacks.push(callback);
    }

    private notifyProgress(stage: BootStage): void {
        for (const callback of this.callbacks) {
            callback(stage);
        }
    }

    async boot(kernel: Kernel): Promise<boolean> {
        try {
            // POST - Power On Self Test
            await this.runStage(0, async () => {
                // Check browser capabilities
                if (typeof SharedWorker === 'undefined') {
                    console.warn('SharedWorker not available, using fallback mode');
                }
                if (typeof indexedDB === 'undefined') {
                    throw new Error('IndexedDB required for kernel operation');
                }
                await new Promise(r => setTimeout(r, 100)); // Simulate check time
            });

            // KERNEL_INIT
            await this.runStage(1, async () => {
                kernel.processManager.spawn('init', 'realtime', KERNEL_PID);
                kernel.processManager.spawn('scheduler', 'realtime', KERNEL_PID);
                await new Promise(r => setTimeout(r, 150));
            });

            // DAEMON_LOAD
            await this.runStage(2, async () => {
                // Spawn system daemons
                kernel.processManager.spawn('ipc-daemon', 'high', INIT_PID);
                kernel.processManager.spawn('event-daemon', 'high', INIT_PID);
                kernel.processManager.spawn('agent-daemon', 'normal', INIT_PID);
                await new Promise(r => setTimeout(r, 200));
            });

            // USER_SESSION
            await this.runStage(3, async () => {
                kernel.processManager.spawn('user-session', 'normal', INIT_PID);
                kernel.processManager.spawn('ui-renderer', 'high', INIT_PID);
                kernel.scheduler.start();
                await new Promise(r => setTimeout(r, 100));
            });

            return true;
        } catch (error) {
            console.error('Boot failed:', error);
            return false;
        }
    }

    private async runStage(index: number, task: () => Promise<void>): Promise<void> {
        const stage = this.stages[index];
        stage.status = 'running';
        this.notifyProgress(stage);

        const startTime = Date.now();
        try {
            await task();
            stage.status = 'complete';
            stage.duration = Date.now() - startTime;
        } catch (error) {
            stage.status = 'failed';
            stage.error = error instanceof Error ? error.message : 'Unknown error';
            throw error;
        } finally {
            this.notifyProgress(stage);
        }
    }

    getStages(): BootStage[] {
        return [...this.stages];
    }
}

// ============================================================================
// KERNEL CLASS
// ============================================================================

export class Kernel {
    processManager: ProcessManager;
    scheduler: Scheduler;
    ipc: IPCBus;
    bootManager: BootManager;

    private bootTime: number = 0;
    private isBooted: boolean = false;

    constructor() {
        this.processManager = new ProcessManager();
        this.scheduler = new Scheduler(this.processManager);
        this.ipc = new IPCBus(this.processManager);
        this.bootManager = new BootManager();
    }

    async boot(): Promise<boolean> {
        if (this.isBooted) return true;

        this.bootTime = Date.now();
        this.isBooted = await this.bootManager.boot(this);
        return this.isBooted;
    }

    shutdown(): void {
        this.scheduler.stop();

        // Kill all user processes
        for (const process of this.processManager.listProcesses()) {
            if (process.pid >= 10) {
                this.processManager.kill(process.pid);
            }
        }

        this.isBooted = false;
    }

    getSystemInfo(): SystemInfo {
        return {
            bootTime: this.bootTime,
            kernelVersion: KERNEL_VERSION,
            processCount: this.processManager.getProcessCount(),
            totalCpuTime: this.processManager.getTotalCpuTime(),
            uptime: this.isBooted ? Date.now() - this.bootTime : 0,
        };
    }

    isRunning(): boolean {
        return this.isBooted;
    }

    // Convenience methods
    spawn(name: string, priority?: ProcessPriority): number {
        return this.processManager.spawn(name, priority);
    }

    kill(pid: number): boolean {
        return this.processManager.kill(pid);
    }

    send(source: number, target: number, channel: string, payload: unknown): string {
        return this.ipc.send(source, target, channel, payload);
    }

    subscribe(channel: string, handler: MessageHandler): () => void {
        return this.ipc.subscribe(channel, handler);
    }
}

// ============================================================================
// SINGLETON KERNEL INSTANCE
// ============================================================================

let kernelInstance: Kernel | null = null;

export function getKernel(): Kernel {
    if (!kernelInstance) {
        kernelInstance = new Kernel();
    }
    return kernelInstance;
}

export function resetKernel(): void {
    if (kernelInstance) {
        kernelInstance.shutdown();
        kernelInstance = null;
    }
}
