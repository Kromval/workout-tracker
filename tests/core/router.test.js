/**
 * @module tests/core/router.test
 */
import { defaultRoute, getCurrentRoute, getRouteParams } from '../../js/core/router.js';

describe('core router', () => {
  beforeEach(() => {
    globalThis.window = {
      location: {
        hash: '',
      },
    };
  });

  afterEach(() => {
    delete globalThis.window;
  });

  test('decodes route params without crashing on malformed URI components', () => {
    globalThis.window.location.hash = '#workout-view/workout%201';
    expect(getCurrentRoute()).toBe('workout-view');
    expect(getRouteParams()).toEqual({ id: 'workout 1' });

    globalThis.window.location.hash = '#workout-view/%E0%A4%A';
    expect(getCurrentRoute()).toBe('workout-view');
    expect(getRouteParams()).toEqual({ id: '%E0%A4%A' });
  });

  test('falls back to default route for unknown hashes', () => {
    globalThis.window.location.hash = '#unknown/id';
    expect(getCurrentRoute()).toBe(defaultRoute);
  });
});
