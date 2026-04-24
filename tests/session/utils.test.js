import {
  asArray,
  clone,
  findLastIndex,
  getPhaseSignature,
  isPlainObject,
  isRestStep,
  nonNegativeInteger,
  nonNegativeNumber,
  normalizeIsoDate,
  normalizeString,
  nowIso,
  positiveInteger,
} from '../../js/session/utils.js';

describe('session utils', () => {
  test('normalizes primitive values', () => {
    expect(positiveInteger('-2')).toBe(0);
    expect(positiveInteger('3.8')).toBe(3);
    expect(nonNegativeInteger('bad', 7)).toBe(7);
    expect(nonNegativeNumber('2.5', 0)).toBe(2.5);
    expect(normalizeString('  value  ')).toBe('value');
    expect(normalizeString(123)).toBe('');
    expect(asArray(['a'])).toEqual(['a']);
    expect(asArray('a')).toEqual([]);
    expect(isPlainObject({})).toBe(true);
    expect(isPlainObject([])).toBe(false);
  });

  test('handles dates, cloning, phases, rest steps, and reverse search', () => {
    expect(normalizeIsoDate('bad', 'fallback')).toBe('fallback');
    expect(normalizeIsoDate('2026-04-01T00:00:00.000Z', 'fallback')).toBe(
      '2026-04-01T00:00:00.000Z',
    );
    expect(nowIso()).toEqual(expect.any(String));
    expect(clone({ nested: { value: 1 } })).toEqual({ nested: { value: 1 } });
    expect(clone(undefined)).toBeUndefined();
    expect(getPhaseSignature(null)).toBe('');
    expect(getPhaseSignature('phase')).toBe('phase');
    expect(
      getPhaseSignature({
        type: 'rep',
        key: 'eccentric',
        stepId: 'step-a',
        exerciseIndex: 0,
        setIndex: 1,
        repIndex: 2,
        phaseIndex: 3,
      }),
    ).toBe('rep:eccentric:step-a:0:1:2:3');
    expect(isRestStep({ type: 'rest-between-sets' })).toBe(true);
    expect(isRestStep({ type: 'exercise' })).toBe(false);
    expect(findLastIndex([1, 2, 3, 2], (value) => value === 2)).toBe(3);
    expect(findLastIndex([1, 2], (value) => value === 4)).toBe(-1);
  });
});
