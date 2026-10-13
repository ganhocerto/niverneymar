/**
 * Web Audio API Synthesizer for luxury gift box sound effects.
 * Produces crisp, organic, crystal-clear soundscapes without external audio files.
 */

class LuxurySoundSynthesizer {
  private ctx: AudioContext | null = null;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  /**
   * Delicate crystal chime on initial gift touch
   */
  playTouchChime() {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, now); // D5
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.15); // A5

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.4);
  }

  /**
   * Harmonious golden ribbon untying shimmer
   */
  playRibbonUntie() {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const freqs = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C major pentatonic luxury arpeggio

    freqs.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const delay = index * 0.06;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + delay);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.05, now + delay + 0.5);

      gain.gain.setValueAtTime(0.05, now + delay);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + delay + 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + delay);
      osc.stop(now + delay + 0.65);
    });
  }

  /**
   * Deep smooth resonance when the box lid lifts
   */
  playLidOpen() {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // Warm deep swell
    const subOsc = ctx.createOscillator();
    const subGain = ctx.createGain();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(130.81, now); // C3
    subOsc.frequency.exponentialRampToValueAtTime(261.63, now + 0.6); // C4

    subGain.gain.setValueAtTime(0.09, now);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);

    subOsc.connect(subGain);
    subGain.connect(ctx.destination);

    subOsc.start(now);
    subOsc.stop(now + 0.9);

    // Filtered golden shimmer
    const shimmerOsc = ctx.createOscillator();
    const shimmerGain = ctx.createGain();
    shimmerOsc.type = 'sine';
    shimmerOsc.frequency.setValueAtTime(880, now + 0.2);
    shimmerOsc.frequency.exponentialRampToValueAtTime(1760, now + 0.8);

    shimmerGain.gain.setValueAtTime(0.04, now + 0.2);
    shimmerGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

    shimmerOsc.connect(shimmerGain);
    shimmerGain.connect(ctx.destination);

    shimmerOsc.start(now + 0.2);
    shimmerOsc.stop(now + 1.2);
  }

  /**
   * Confetti sparkling pop
   */
  playConfettiBurst() {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // Pop sound using noise buffer
    const bufferSize = ctx.sampleRate * 0.15;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1200, now);
    filter.Q.setValueAtTime(3, now);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start(now);
    noise.stop(now + 0.2);

    // Sparkle bells
    [1046.50, 1567.98, 2093.00].forEach((freq, idx) => {
      const bell = ctx.createOscillator();
      const bellGain = ctx.createGain();
      const t = now + 0.05 + idx * 0.05;

      bell.type = 'sine';
      bell.frequency.setValueAtTime(freq, t);

      bellGain.gain.setValueAtTime(0.04, t);
      bellGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.5);

      bell.connect(bellGain);
      bellGain.connect(ctx.destination);

      bell.start(t);
      bell.stop(t + 0.5);
    });
  }
}

export const soundEffects = new LuxurySoundSynthesizer();
