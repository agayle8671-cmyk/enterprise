/**
 * Sovereign OS - Haptic Feedback System
 * 
 * Web Vibration API patterns for tactile feedback.
 * Creates physical confirmation of digital actions.
 */

// Pattern definitions from design spec (ms)
export const HAPTIC_PATTERNS = {
    hover: [1],           // Micro-tick: cursor engaged magnetic target
    click: [15],          // Sharp tap: button press registered
    success: [40, 60, 40], // Double-clutch: task completed (lock tumbling feel)
    thinking: [10, 200, 10, 200], // Flutter: agent processing (heartbeat)
    error: [100, 50, 100], // Heavy buzz: action failed/blocked
    ghost: [5, 50, 5],    // Faint vibration: agent proposing action
    toggle: [8],          // Quick tick: switch toggled
    drag: [3],            // Subtle pulse: element grabbed
    drop: [20, 10, 20],   // Confirmation: element dropped
} as const;

export type HapticPattern = keyof typeof HAPTIC_PATTERNS;

/**
 * Trigger a haptic pattern
 */
export function haptic(pattern: HapticPattern): void {
    if (!navigator.vibrate) return;

    try {
        navigator.vibrate(HAPTIC_PATTERNS[pattern]);
    } catch (e) {
        // Vibration not supported or blocked
        console.debug('Haptic feedback unavailable:', e);
    }
}

/**
 * Stop any ongoing vibration
 */
export function hapticStop(): void {
    if (!navigator.vibrate) return;
    navigator.vibrate(0);
}

/**
 * Check if haptics are supported
 */
export function hapticSupported(): boolean {
    return 'vibrate' in navigator;
}

/**
 * Custom haptic sequence for special effects
 */
export function hapticSequence(pattern: number[]): void {
    if (!navigator.vibrate) return;
    navigator.vibrate(pattern);
}
