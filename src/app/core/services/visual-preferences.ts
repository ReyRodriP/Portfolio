import { DOCUMENT } from '@angular/common';
import { Injectable, computed, effect, inject, signal } from '@angular/core';

interface VisualSettings {
  filmEffects: boolean;
  monochrome: boolean;
}

const STORAGE_KEY = 'portfolio.visual-preferences';
const DEFAULT_SETTINGS: VisualSettings = { filmEffects: true, monochrome: true };

@Injectable({ providedIn: 'root' })
export class VisualPreferences {
  private readonly document = inject(DOCUMENT);
  private readonly settings = signal<VisualSettings>(this.loadSettings());

  readonly filmEffects = computed(() => this.settings().filmEffects);
  readonly monochrome = computed(() => this.settings().monochrome);

  constructor() {
    effect(() => {
      const settings = this.settings();
      const root = this.document.documentElement;

      root.setAttribute('data-film-effects', settings.filmEffects ? 'on' : 'off');
      root.setAttribute('data-monochrome', settings.monochrome ? 'on' : 'off');

      try {
        this.document.defaultView?.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
      } catch {
        // The controls still work when browser storage is unavailable.
      }
    });
  }

  setFilmEffects(enabled: boolean): void {
    this.settings.update((settings) => ({ ...settings, filmEffects: enabled }));
  }

  setMonochrome(enabled: boolean): void {
    this.settings.update((settings) => ({ ...settings, monochrome: enabled }));
  }

  private loadSettings(): VisualSettings {
    try {
      const stored = this.document.defaultView?.localStorage.getItem(STORAGE_KEY);
      if (!stored) return { ...DEFAULT_SETTINGS };

      const parsed: unknown = JSON.parse(stored);
      if (!parsed || typeof parsed !== 'object') return { ...DEFAULT_SETTINGS };

      const settings = parsed as Partial<VisualSettings>;
      return {
        filmEffects: typeof settings.filmEffects === 'boolean'
          ? settings.filmEffects : DEFAULT_SETTINGS.filmEffects,
        monochrome: typeof settings.monochrome === 'boolean'
          ? settings.monochrome : DEFAULT_SETTINGS.monochrome,
      };
    } catch {
      return { ...DEFAULT_SETTINGS };
    }
  }
}
