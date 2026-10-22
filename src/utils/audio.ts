/**
 * Web Audio API based radio sound effects and Background Music Manager
 */

export const BGM_URL =
  'https://raw.githubusercontent.com/W4vy0/-/main/222/deuslower-apathias-dark-ambient-sad-music-277034.mp3';

class SoundManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private bgmAudio: HTMLAudioElement | null = null;
  private isBgmActive: boolean = false;
  private bgmListeners: Array<(isPlaying: boolean) => void> = [];

  constructor() {
    if (typeof window !== 'undefined') {
      this.initBgm();
    }
  }

  private initBgm() {
    if (!this.bgmAudio && typeof Audio !== 'undefined') {
      this.bgmAudio = new Audio(BGM_URL);
      this.bgmAudio.loop = true;
      this.bgmAudio.volume = 0.4;
      this.bgmAudio.preload = 'auto';

      this.bgmAudio.addEventListener('play', () => {
        this.isBgmActive = true;
        this.notifyBgmListeners(true);
      });

      this.bgmAudio.addEventListener('pause', () => {
        this.isBgmActive = false;
        this.notifyBgmListeners(false);
      });
    }
  }

  public subscribeBgm(listener: (isPlaying: boolean) => void): () => void {
    this.bgmListeners.push(listener);
    listener(this.isBgmActive && !this.isMuted);
    return () => {
      this.bgmListeners = this.bgmListeners.filter((l) => l !== listener);
    };
  }

  private notifyBgmListeners(isPlaying: boolean) {
    this.bgmListeners.forEach((l) => l(isPlaying && !this.isMuted));
  }

  public async startBgm(): Promise<boolean> {
    if (this.isMuted) return false;
    this.initBgm();
    if (!this.bgmAudio) return false;

    try {
      this.initCtx();
      await this.bgmAudio.play();
      this.isBgmActive = true;
      this.notifyBgmListeners(true);
      return true;
    } catch {
      // Browser autoplay restriction before user interaction
      return false;
    }
  }

  public pauseBgm() {
    if (this.bgmAudio) {
      this.bgmAudio.pause();
      this.isBgmActive = false;
      this.notifyBgmListeners(false);
    }
  }

  public toggleBgm(): boolean {
    if (this.isBgmActive && !this.bgmAudio?.paused) {
      this.pauseBgm();
      return false;
    } else {
      this.isMuted = false;
      this.startBgm();
      return true;
    }
  }

  public isBgmPlaying(): boolean {
    return !!(this.bgmAudio && !this.bgmAudio.paused && !this.isMuted);
  }

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.bgmAudio) {
      if (this.isMuted) {
        this.bgmAudio.pause();
      } else if (this.isBgmActive) {
        this.bgmAudio.play().catch(() => {});
      }
    }
    this.notifyBgmListeners(!this.isMuted && this.isBgmActive);
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  // Plays a walkie-talkie chirp / beep
  public playBeep(freq = 880, duration = 0.08, type: OscillatorType = 'sine') {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // AudioContext policy catch
    }
  }

  // Radio signal acquired chime
  public playSignalLock() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      [587.33, 880, 1174.66].forEach((f, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, now + idx * 0.07);
        gain.gain.setValueAtTime(0.15, now + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.12);
        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 0.15);
      });
    } catch {
      // ignore
    }
  }

  // Click on item
  public playClick() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(240, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch {
      // ignore
    }
  }

  // Radio frequency static squelch sound
  public playStaticBurst(duration = 0.25) {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const bufferSize = this.ctx.sampleRate * duration;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 1800;
      filter.Q.value = 2.0;

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start();
    } catch {
      // ignore
    }
  }
}

export const soundManager = new SoundManager();
