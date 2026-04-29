/**
 * @module tests/features/audio.test
 */
import { jest } from '@jest/globals';
import { audioEvents, preview, stopAll } from '../../js/features/audio.js';
import { saveStore } from '../../js/storage/core.js';
import { createMemoryStorage } from '../helpers/memory-storage.js';

describe('audio feature', () => {
  beforeEach(() => {
    globalThis.window = { localStorage: createMemoryStorage() };
  });

  afterEach(() => {
    stopAll();
    delete globalThis.Audio;
    delete globalThis.window;
  });

  test('exposes tick as a public configurable audio event', () => {
    expect(audioEvents).toContain('tick');
  });

  test('previews custom tick audio', () => {
    const media = {
      addEventListener: jest.fn(),
      pause: jest.fn(),
      play: jest.fn(() => Promise.resolve()),
      currentTime: 0,
      preload: '',
      volume: 0,
    };
    globalThis.Audio = jest.fn(() => media);

    saveStore({
      settings: {
        customAudio: {
          tick: {
            name: 'tick.wav',
            type: 'audio/wav',
            size: 12,
            dataUrl: 'data:audio/wav;base64,AAAA',
          },
        },
      },
    });

    preview('tick');

    expect(globalThis.Audio).toHaveBeenCalledWith('data:audio/wav;base64,AAAA');
    expect(media.play).toHaveBeenCalled();
  });
});
