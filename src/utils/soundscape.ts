/**
 * Procedural luxury soundscape generator using Web Audio API.
 * Synthesizes alpine mist wind, thermal mineral springs, singing bowls, and rain on cedar.
 */

import { SoundscapeMood } from '../types';

class SoundscapeManager {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private masterGain: GainNode | null = null;
  private noiseNode: AudioBufferSourceNode | null = null;
  private filterNode: BiquadFilterNode | null = null;
  private intervalId: number | null = null;
  private currentMood: SoundscapeMood = 'wind';
  private listeners: Set<(isPlaying: boolean, mood: SoundscapeMood) => void> = new Set();

  public subscribe(cb: (isPlaying: boolean, mood: SoundscapeMood) => void) {
    this.listeners.add(cb);
    cb(this.isPlaying, this.currentMood);
    return () => {
      this.listeners.delete(cb);
    };
  }

  private notify() {
    this.listeners.forEach((cb) => cb(this.isPlaying, this.currentMood));
  }

  public init() {
    if (this.ctx) return;
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    this.ctx = new AudioCtx();
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);
  }

  public toggle(): boolean {
    if (!this.ctx) {
      this.init();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public setMood(mood: SoundscapeMood) {
    this.currentMood = mood;
    if (!this.isPlaying) {
      this.start();
    } else {
      this.applyMoodParameters();
      if (mood === 'bell') {
        this.playBowlChime(329.63);
      }
    }
    this.notify();
  }

  public getMood(): SoundscapeMood {
    return this.currentMood;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  private applyMoodParameters() {
    if (!this.ctx || !this.filterNode) return;
    const now = this.ctx.currentTime;
    if (this.currentMood === 'wind') {
      this.filterNode.type = 'lowpass';
      this.filterNode.frequency.setTargetAtTime(340, now, 0.5);
      this.filterNode.Q.setTargetAtTime(1.8, now, 0.5);
    } else if (this.currentMood === 'spring') {
      this.filterNode.type = 'bandpass';
      this.filterNode.frequency.setTargetAtTime(650, now, 0.5);
      this.filterNode.Q.setTargetAtTime(3.2, now, 0.5);
    } else if (this.currentMood === 'rain') {
      this.filterNode.type = 'highpass';
      this.filterNode.frequency.setTargetAtTime(900, now, 0.5);
      this.filterNode.Q.setTargetAtTime(1.2, now, 0.5);
    } else if (this.currentMood === 'bell') {
      this.filterNode.type = 'lowpass';
      this.filterNode.frequency.setTargetAtTime(200, now, 0.5);
      this.filterNode.Q.setTargetAtTime(1.0, now, 0.5);
    }
  }

  private start() {
    if (!this.ctx) this.init();
    if (!this.ctx || !this.masterGain) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    // Fade in master gain
    const now = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
    this.masterGain.gain.exponentialRampToValueAtTime(0.2, now + 2);

    // 1. Generate organic continuous noise buffer
    const bufferSize = this.ctx.sampleRate * 4;
    const noiseBuffer = this.ctx.createBuffer(2, bufferSize, this.ctx.sampleRate);
    
    for (let channel = 0; channel < 2; channel++) {
      const output = noiseBuffer.getChannelData(channel);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        output[i] = (lastOut + 0.025 * white) / 1.025;
        lastOut = output[i];
        output[i] *= 0.16;
      }
    }

    this.noiseNode = this.ctx.createBufferSource();
    this.noiseNode.buffer = noiseBuffer;
    this.noiseNode.loop = true;

    this.filterNode = this.ctx.createBiquadFilter();
    this.applyMoodParameters();

    // Subtle LFO breath
    const lfo = this.ctx.createOscillator();
    lfo.frequency.setValueAtTime(0.12, now);
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(120, now);
    lfo.connect(lfoGain);
    lfoGain.connect(this.filterNode.frequency);
    lfo.start();

    this.noiseNode.connect(this.filterNode);
    this.filterNode.connect(this.masterGain);
    this.noiseNode.start();

    // Occasional gentle chime
    this.playBowlChime(440);
    this.intervalId = window.setInterval(() => {
      if (this.isPlaying) {
        const baseFreqs = [261.63, 329.63, 392.00, 523.25];
        const f = baseFreqs[Math.floor(Math.random() * baseFreqs.length)];
        this.playBowlChime(f);
      }
    }, 22000);

    this.isPlaying = true;
    this.notify();
  }

  private stop() {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
    this.masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

    setTimeout(() => {
      if (this.noiseNode) {
        try {
          this.noiseNode.stop();
          this.noiseNode.disconnect();
        } catch {
          // ignore
        }
        this.noiseNode = null;
      }
      if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
    }, 1300);

    this.isPlaying = false;
    this.notify();
  }

  public playBowlChime(freq = 440) {
    if (!this.ctx || !this.masterGain || !this.isPlaying) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 2.76, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(0.07, now + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.00001, now + 6.0);

    osc.connect(gain);
    osc2.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc2.start(now);
    osc.stop(now + 6.5);
    osc2.stop(now + 6.5);
  }
}

export const soundscape = new SoundscapeManager();

