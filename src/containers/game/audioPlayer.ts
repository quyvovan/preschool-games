// audioPlayer.ts
import { AUDIO_KEYS } from './audioKeys';
import { allSounds } from './shared';

// Paths to your audio files
const correctSound = '/sounds/game_sounds/correct.wav';
const flipSound = '/sounds/game_sounds/flip.wav';

class AudioPlayer {
  private audioMap: Map<string, HTMLAudioElement>;
  private isBrowser: boolean;
  
  constructor(sounds: string[]) {
    this.isBrowser = typeof window !== 'undefined';
    this.audioMap = new Map();

    if (!this.isBrowser) return;
    
    // Initialize all sounds
    sounds.forEach(sound => {
      const audio = new Audio(`/sounds/alphabet_sounds/${sound}.mp3`);
      this.audioMap.set(sound, audio);
    });
    
    // Add special sounds
    this.audioMap.set(AUDIO_KEYS.CORRECT, new Audio(correctSound));
    this.audioMap.set(AUDIO_KEYS.FLIP, new Audio(flipSound));
  }

  playFlip(sound?: string): void {
    if (!this.isBrowser) return;

    const flipAudio = this.audioMap.get(AUDIO_KEYS.FLIP);
    if (!flipAudio) return;

    if (!sound) {
      flipAudio.onended = null;
    } else {
      const audio = this.audioMap.get(sound);
      if (!audio) {
        console.error('Could not find audio for key: ' + sound);
      } else {
        flipAudio.onended = () => {
          audio.play().catch(r => console.error('Could not play audio: ' + r));
        };
      }
    }
    
    flipAudio.play().catch(r => console.error('Could not play audio: ' + r));
  }

  play(sound: string) {
    if (!this.isBrowser) return;
    
    const audio = this.audioMap.get(sound);
    if (!audio) {
      console.error('Could not find audio for key: ' + sound);
    } else {
      audio.play().catch(r => console.error('Could not play audio: ' + r));
    }
  }
}

// Create and export the audio player instance
const audioPlayer = new AudioPlayer(allSounds);
export default audioPlayer;