/**
 * Sovereign OS - Acoustic Branding System
 * 
 * Skeuomorphic sonification using high-end mechanical switch samples.
 * Creates the "click hypothesis" - quality sounds = perceived quality.
 */

// Sound URLs - In production, these would be actual sound files
// For now, using Web Audio API to synthesize similar sounds
const AUDIO_CONTEXT = typeof window !== 'undefined' ? new (window.AudioContext || (window as any).webkitAudioContext)() : null;

export type SoundType = 'click' | 'toggle' | 'error' | 'success' | 'thinking' | 'notification';

interface SoundConfig {
    frequency: number;
    duration: number;
    type: OscillatorType;
    volume: number;
    decay: number;
}

const SOUND_CONFIGS: Record<SoundType, SoundConfig> = {
    // Topre 45g capacitive switch: deep, resonant thock
    click: {
        frequency: 180,
        duration: 0.08,
        type: 'sine',
        volume: 0.15,
        decay: 0.05
    },
    // Blue Alps metallic: high-pitched, crisp
    toggle: {
        frequency: 800,
        duration: 0.03,
        type: 'square',
        volume: 0.08,
        decay: 0.02
    },
    // Plastic key bottom: dull thud
    error: {
        frequency: 100,
        duration: 0.12,
        type: 'sawtooth',
        volume: 0.2,
        decay: 0.1
    },
    // Confirmation chime
    success: {
        frequency: 523.25, // C5
        duration: 0.15,
        type: 'sine',
        volume: 0.12,
        decay: 0.1
    },
    // Ambient hum for agent processing
    thinking: {
        frequency: 60,
        duration: 2.0,
        type: 'sine',
        volume: 0.02,
        decay: 1.5
    },
    // Soft notification ping
    notification: {
        frequency: 440,
        duration: 0.1,
        type: 'sine',
        volume: 0.1,
        decay: 0.08
    }
};

let isMuted = false;
let masterVolume = 0.5;

/**
 * Play a sound effect
 */
export function playSound(type: SoundType): void {
    if (isMuted || !AUDIO_CONTEXT) return;

    const config = SOUND_CONFIGS[type];

    try {
        // Resume context if suspended (browser autoplay policy)
        if (AUDIO_CONTEXT.state === 'suspended') {
            AUDIO_CONTEXT.resume();
        }

        const oscillator = AUDIO_CONTEXT.createOscillator();
        const gainNode = AUDIO_CONTEXT.createGain();

        oscillator.type = config.type;
        oscillator.frequency.setValueAtTime(config.frequency, AUDIO_CONTEXT.currentTime);

        // Volume envelope
        gainNode.gain.setValueAtTime(config.volume * masterVolume, AUDIO_CONTEXT.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(
            0.01,
            AUDIO_CONTEXT.currentTime + config.decay
        );

        oscillator.connect(gainNode);
        gainNode.connect(AUDIO_CONTEXT.destination);

        oscillator.start(AUDIO_CONTEXT.currentTime);
        oscillator.stop(AUDIO_CONTEXT.currentTime + config.duration);
    } catch (e) {
        console.debug('Sound playback failed:', e);
    }
}

/**
 * Play success chord (C-E-G progression)
 */
export function playSuccessChord(): void {
    if (isMuted || !AUDIO_CONTEXT) return;

    const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
    notes.forEach((freq, i) => {
        setTimeout(() => {
            if (AUDIO_CONTEXT) {
                const osc = AUDIO_CONTEXT.createOscillator();
                const gain = AUDIO_CONTEXT.createGain();

                osc.frequency.value = freq;
                osc.type = 'sine';
                gain.gain.setValueAtTime(0.08 * masterVolume, AUDIO_CONTEXT.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, AUDIO_CONTEXT.currentTime + 0.3);

                osc.connect(gain);
                gain.connect(AUDIO_CONTEXT.destination);
                osc.start();
                osc.stop(AUDIO_CONTEXT.currentTime + 0.3);
            }
        }, i * 80);
    });
}

/**
 * Mute/unmute all sounds
 */
export function setMuted(muted: boolean): void {
    isMuted = muted;
}

export function getMuted(): boolean {
    return isMuted;
}

/**
 * Set master volume (0-1)
 */
export function setVolume(volume: number): void {
    masterVolume = Math.max(0, Math.min(1, volume));
}

export function getVolume(): number {
    return masterVolume;
}

/**
 * Check if audio is supported
 */
export function audioSupported(): boolean {
    return AUDIO_CONTEXT !== null;
}
