import { getSettings } from './storage.js';

export const audioEvents = [
  'phaseChange',
  'exerciseStart',
  'restStart',
  'restEnd',
  'exerciseComplete',
  'workoutComplete',
];

const eventAliases = Object.freeze({
  startExercise: 'exerciseStart',
  exerciseStart: 'exerciseStart',
  phaseChange: 'phaseChange',
  startRest: 'restStart',
  restStart: 'restStart',
  endRest: 'restEnd',
  restEnd: 'restEnd',
  endExercise: 'exerciseComplete',
  exerciseComplete: 'exerciseComplete',
  workoutComplete: 'workoutComplete',
});

const signalPatterns = Object.freeze({
  exerciseStart: [
    { frequency: 660, duration: 0.11 },
    { frequency: 880, duration: 0.14, delay: 0.04 },
  ],
  phaseChange: [
    { frequency: 520, duration: 0.08 },
  ],
  restStart: [
    { frequency: 440, duration: 0.14 },
    { frequency: 330, duration: 0.16, delay: 0.04 },
  ],
  restEnd: [
    { frequency: 700, duration: 0.09 },
    { frequency: 920, duration: 0.09, delay: 0.03 },
    { frequency: 1120, duration: 0.12, delay: 0.03 },
  ],
  exerciseComplete: [
    { frequency: 784, duration: 0.1 },
    { frequency: 988, duration: 0.16, delay: 0.05 },
  ],
  workoutComplete: [
    { frequency: 660, duration: 0.13 },
    { frequency: 880, duration: 0.13, delay: 0.05 },
    { frequency: 1320, duration: 0.22, delay: 0.06 },
  ],
});

const DEFAULT_VOLUME = 0.7;
const MASTER_GAIN = 0.24;
const FADE_SEC = 0.015;

let audioContext = null;
let runtimeVolume = null;
const activeSources = new Set();
const activeMedia = new Set();

export function play(eventName) {
  const normalizedEvent = normalizeEventName(eventName);

  if (!normalizedEvent) {
    return;
  }

  const settings = getAudioSettings();

  if (!settings.soundEnabled) {
    return;
  }

  const customAudioUrl = getCustomAudioUrl(settings.customAudio?.[normalizedEvent]);

  if (customAudioUrl) {
    playCustomAudio(customAudioUrl, settings.volume, normalizedEvent);
    return;
  }

  playBeepPattern(signalPatterns[normalizedEvent], settings.volume);
}

export function preview(eventName) {
  const normalizedEvent = normalizeEventName(eventName);

  if (!normalizedEvent) {
    return;
  }

  const settings = getAudioSettings();
  const customAudioUrl = getCustomAudioUrl(settings.customAudio?.[normalizedEvent]);

  stopAll();

  if (customAudioUrl) {
    playCustomAudio(customAudioUrl, settings.volume, normalizedEvent);
    return;
  }

  playBeepPattern(signalPatterns[normalizedEvent], settings.volume);
}

export function setVolume(value) {
  runtimeVolume = clampVolume(value);
}

export function stopAll() {
  activeSources.forEach((source) => {
    try {
      source.stop();
    } catch (error) {
      // Already stopped sources are safe to ignore.
    }
  });

  activeSources.clear();

  activeMedia.forEach((media) => {
    media.pause();
    media.currentTime = 0;
  });

  activeMedia.clear();
}

export function playSignal(eventName) {
  play(eventName);
}

function playBeepPattern(pattern, volume) {
  const context = getAudioContext();

  if (!context || !Array.isArray(pattern)) {
    return;
  }

  if (context.state === 'suspended') {
    context.resume().catch(() => {});
  }

  let offset = 0;

  pattern.forEach((tone) => {
    offset += nonNegativeNumber(tone.delay, 0);
    scheduleTone(context, {
      frequency: tone.frequency,
      type: tone.type || 'sine',
      startTime: context.currentTime + offset,
      duration: nonNegativeNumber(tone.duration, 0.1),
      volume,
    });
    offset += nonNegativeNumber(tone.duration, 0.1);
  });
}

function scheduleTone(context, tone) {
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  const volume = clampVolume(tone.volume) * MASTER_GAIN;
  const startTime = tone.startTime;
  const stopTime = startTime + tone.duration;
  const fadeEndTime = Math.min(stopTime, startTime + FADE_SEC);
  const fadeStartTime = Math.max(startTime, stopTime - FADE_SEC);

  oscillator.type = tone.type;
  oscillator.frequency.setValueAtTime(nonNegativeNumber(tone.frequency, 440), startTime);
  gain.gain.setValueAtTime(0, startTime);
  gain.gain.linearRampToValueAtTime(volume, fadeEndTime);
  gain.gain.setValueAtTime(volume, fadeStartTime);
  gain.gain.linearRampToValueAtTime(0, stopTime);

  oscillator.connect(gain);
  gain.connect(context.destination);
  activeSources.add(oscillator);
  oscillator.addEventListener('ended', () => activeSources.delete(oscillator), { once: true });
  oscillator.start(startTime);
  oscillator.stop(stopTime);
}

function playCustomAudio(url, volume, fallbackEventName = 'phaseChange') {
  if (typeof Audio !== 'function') {
    playBeepPattern(signalPatterns[fallbackEventName] || signalPatterns.phaseChange, volume);
    return;
  }

  const media = new Audio(url);
  media.volume = clampVolume(volume);
  media.preload = 'auto';
  activeMedia.add(media);
  media.addEventListener('ended', () => activeMedia.delete(media), { once: true });
  media.addEventListener('error', () => {
    activeMedia.delete(media);
    playBeepPattern(signalPatterns[fallbackEventName] || signalPatterns.phaseChange, volume);
  }, { once: true });
  media.play().catch(() => activeMedia.delete(media));
}

function getAudioContext() {
  if (audioContext) {
    return audioContext;
  }

  const AudioContextConstructor = globalThis.AudioContext || globalThis.webkitAudioContext;

  if (!AudioContextConstructor) {
    return null;
  }

  audioContext = new AudioContextConstructor();
  return audioContext;
}

function getAudioSettings() {
  const settings = getSettings();

  return {
    soundEnabled: settings.soundEnabled !== false,
    volume: runtimeVolume ?? clampVolume(settings.volume ?? DEFAULT_VOLUME),
    customAudio: settings.customAudio || {},
  };
}

function normalizeEventName(eventName) {
  const key = typeof eventName === 'string' ? eventName.trim() : '';
  const normalizedEvent = eventAliases[key];
  return audioEvents.includes(normalizedEvent) ? normalizedEvent : '';
}

function getCustomAudioUrl(value) {
  if (typeof value === 'string') {
    return value;
  }

  if (value && typeof value === 'object' && typeof value.dataUrl === 'string') {
    return value.dataUrl;
  }

  return '';
}

function clampVolume(value) {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return DEFAULT_VOLUME;
  }

  return Math.min(1, Math.max(0, number));
}

function nonNegativeNumber(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) && number >= 0 ? number : fallback;
}
