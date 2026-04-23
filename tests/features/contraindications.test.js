import {
  getContraindicationRelatedJoints,
  getContraindicationRelatedMuscles,
  normalizeContraindicationTag,
  normalizeContraindicationTags,
} from '../../js/features/contraindications.js';

describe('contraindication normalization', () => {
  test('maps legacy strings to canonical contraindication tags', () => {
    expect(normalizeContraindicationTag('wrist pain')).toEqual(['joint-wrist-pain']);
    expect(normalizeContraindicationTag('knee/ankle issues')).toEqual([
      'joint-knee-instability',
      'joint-ankle-instability',
    ]);
  });

  test('returns canonical muscle and joint associations for tags', () => {
    expect(getContraindicationRelatedJoints('joint-knee-pain')).toEqual(['joint-knee']);
    expect(getContraindicationRelatedMuscles('joint-knee-pain')).toEqual(
      expect.arrayContaining(['quads', 'hamstrings', 'glutes', 'calves'])
    );
  });

  test('normalizes and de-duplicates contraindication arrays', () => {
    expect(normalizeContraindicationTags([
      'wrist pain',
      'joint-wrist-pain',
      'elbow issues',
    ])).toEqual([
      'joint-wrist-pain',
      'joint-elbow-irritation',
    ]);
  });
});
