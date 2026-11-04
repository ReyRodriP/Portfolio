import { TestBed } from '@angular/core/testing';
import { VisualPreferences } from './visual-preferences';

describe('VisualPreferences persistence', () => {
  const key = 'portfolio.visual-preferences';
  let previousSettings: string | null;
  let previousFilmAttribute: string | null;
  let previousMonochromeAttribute: string | null;

  beforeEach(() => {
    previousSettings = localStorage.getItem(key);
    previousFilmAttribute = document.documentElement.getAttribute('data-film-effects');
    previousMonochromeAttribute = document.documentElement.getAttribute('data-monochrome');
    localStorage.removeItem(key);
  });

  afterEach(() => {
    TestBed.resetTestingModule();
    if (previousSettings === null) localStorage.removeItem(key);
    else localStorage.setItem(key, previousSettings);

    for (const [attribute, value] of [
      ['data-film-effects', previousFilmAttribute],
      ['data-monochrome', previousMonochromeAttribute],
    ]) {
      if (value === null) document.documentElement.removeAttribute(attribute!);
      else document.documentElement.setAttribute(attribute!, value!);
    }
  });

  it('restores independent preferences after the service is recreated', () => {
    const first = TestBed.inject(VisualPreferences);
    first.setFilmEffects(false);
    first.setMonochrome(false);
    TestBed.tick();

    TestBed.resetTestingModule();
    const restored = TestBed.inject(VisualPreferences);
    TestBed.tick();

    expect(restored.filmEffects()).toBeFalse();
    expect(restored.monochrome()).toBeFalse();

    restored.setMonochrome(true);
    TestBed.tick();
    expect(JSON.parse(localStorage.getItem(key)!))
      .toEqual({ filmEffects: false, monochrome: true });
  });

  it('recovers from malformed stored JSON', () => {
    localStorage.setItem(key, '{broken-json');

    const preferences = TestBed.inject(VisualPreferences);
    TestBed.tick();

    expect(preferences.filmEffects()).toBeTrue();
    expect(preferences.monochrome()).toBeTrue();
    expect(JSON.parse(localStorage.getItem(key)!))
      .toEqual({ filmEffects: true, monochrome: true });
  });

  it('validates each stored setting instead of interpreting strings as booleans', () => {
    localStorage.setItem(key, JSON.stringify({ filmEffects: false, monochrome: 'false' }));

    const preferences = TestBed.inject(VisualPreferences);

    expect(preferences.filmEffects()).toBeFalse();
    expect(preferences.monochrome()).toBeTrue();
  });

  it('still applies changes when browser storage is blocked', () => {
    const getItem = spyOn(Storage.prototype, 'getItem').and.throwError('Storage blocked');
    const setItem = spyOn(Storage.prototype, 'setItem').and.throwError('Storage blocked');

    try {
      const preferences = TestBed.inject(VisualPreferences);
      preferences.setFilmEffects(false);
      preferences.setMonochrome(false);
      expect(() => TestBed.tick()).not.toThrow();

      expect(document.documentElement.getAttribute('data-film-effects')).toBe('off');
      expect(document.documentElement.getAttribute('data-monochrome')).toBe('off');
    } finally {
      getItem.and.callThrough();
      setItem.and.callThrough();
    }
  });
});
