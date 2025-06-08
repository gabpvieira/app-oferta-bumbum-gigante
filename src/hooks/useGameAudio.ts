
import { useRef, useCallback, useEffect } from 'react';

type SoundName = 'click' | 'stepComplete' | 'progress' | 'success' | 'hover' | 'transition';

class GameAudio {
  private context: AudioContext | null = null;
  private sounds: Map<string, AudioBuffer> = new Map();
  private enabled: boolean = true;

  constructor() {
    this.initializeContext();
    this.loadSounds();
  }

  private async initializeContext() {
    try {
      // @ts-ignore - WebKit compatibility
      this.context = new (window.AudioContext || window.webkitAudioContext)();
      
      // Handle autoplay restrictions
      if (this.context.state === 'suspended') {
        document.addEventListener('click', () => {
          this.context?.resume();
        }, { once: true });
      }
    } catch (error) {
      console.warn('Web Audio API not supported:', error);
    }
  }

  private async loadSounds() {
    // Create simple synthetic sounds using Web Audio API
    const soundConfigs = {
      click: { frequency: 800, duration: 0.1, type: 'sine' as OscillatorType },
      stepComplete: { frequency: 523, duration: 0.3, type: 'triangle' as OscillatorType },
      progress: { frequency: 659, duration: 0.2, type: 'sine' as OscillatorType },
      success: { frequency: 783, duration: 0.5, type: 'triangle' as OscillatorType },
      hover: { frequency: 440, duration: 0.05, type: 'sine' as OscillatorType },
      transition: { frequency: 220, duration: 0.2, type: 'triangle' as OscillatorType }
    };

    for (const [name, config] of Object.entries(soundConfigs)) {
      try {
        const buffer = this.createSyntheticSound(config);
        this.sounds.set(name, buffer);
      } catch (error) {
        console.warn(`Failed to create sound: ${name}`, error);
      }
    }
  }

  private createSyntheticSound(config: { frequency: number; duration: number; type: OscillatorType }): AudioBuffer {
    if (!this.context) throw new Error('Audio context not available');

    const sampleRate = this.context.sampleRate;
    const length = sampleRate * config.duration;
    const buffer = this.context.createBuffer(1, length, sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < length; i++) {
      const t = i / sampleRate;
      let value = 0;

      // Generate wave based on type
      switch (config.type) {
        case 'sine':
          value = Math.sin(2 * Math.PI * config.frequency * t);
          break;
        case 'triangle':
          value = (2 / Math.PI) * Math.asin(Math.sin(2 * Math.PI * config.frequency * t));
          break;
        default:
          value = Math.sin(2 * Math.PI * config.frequency * t);
      }

      // Apply envelope (fade in/out)
      const envelope = Math.min(t * 10, 1) * Math.min((config.duration - t) * 10, 1);
      data[i] = value * envelope * 0.3; // Keep volume reasonable
    }

    return buffer;
  }

  play(soundName: string, volume = 0.3) {
    if (!this.enabled || !this.context || this.context.state !== 'running') return;

    const buffer = this.sounds.get(soundName);
    if (!buffer) return;

    try {
      const source = this.context.createBufferSource();
      const gainNode = this.context.createGain();

      source.buffer = buffer;
      gainNode.gain.value = Math.min(volume, 0.5); // Limit max volume

      source.connect(gainNode);
      gainNode.connect(this.context.destination);
      source.start();
    } catch (error) {
      console.warn('Failed to play sound:', error);
    }
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }
}

export const useGameAudio = () => {
  const audioRef = useRef<GameAudio>();

  useEffect(() => {
    audioRef.current = new GameAudio();
    
    return () => {
      // Cleanup if needed
    };
  }, []);

  const playSound = useCallback((sound: SoundName, volume?: number) => {
    audioRef.current?.play(sound, volume);
  }, []);

  const setEnabled = useCallback((enabled: boolean) => {
    audioRef.current?.setEnabled(enabled);
  }, []);

  return { playSound, setEnabled };
};
