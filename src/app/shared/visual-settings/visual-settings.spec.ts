import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from '../../app';

describe('Visual settings panel integration', () => {
  const key = 'portfolio.visual-preferences';
  let fixture: ComponentFixture<App>;
  let previousSettings: string | null;
  let previousOverflow: string;
  let previousFilmAttribute: string | null;
  let previousMonochromeAttribute: string | null;

  beforeEach(async () => {
    previousSettings = localStorage.getItem(key);
    previousOverflow = document.body.style.overflow;
    previousFilmAttribute = document.documentElement.getAttribute('data-film-effects');
    previousMonochromeAttribute = document.documentElement.getAttribute('data-monochrome');
    localStorage.removeItem(key);

    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
    TestBed.resetTestingModule();
    document.body.style.overflow = previousOverflow;
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

  function openPanel(): HTMLDialogElement {
    fixture.nativeElement.querySelector('.settings-trigger').click();
    fixture.detectChanges();
    return fixture.nativeElement.querySelector('.settings-dialog');
  }

  it('opens over the intro and restores focus on dismissal without entering the portfolio', async () => {
    const dialog = openPanel();
    expect(dialog.matches(':modal')).toBeTrue();
    expect(document.activeElement).toBe(dialog.querySelector('.close-button'));

    dialog.dispatchEvent(new Event('cancel', { cancelable: true }));
    await fixture.whenStable();
    fixture.detectChanges();

    const trigger = fixture.nativeElement.querySelector('.settings-trigger');
    expect(dialog.open).toBeFalse();
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
    expect(document.activeElement).toBe(trigger);
    expect(document.body.style.overflow).toBe('hidden');
    expect(fixture.componentInstance.introVisible()).toBeTrue();
    expect(fixture.componentInstance.irisFase()).toBe('idle');
  });

  it('independently removes the overlays and restores image colors through the switches', () => {
    const dialog = openPanel();
    const switches = dialog.querySelectorAll<HTMLInputElement>('input[role="switch"]');
    const main = fixture.nativeElement.querySelector('main');
    expect(getComputedStyle(main).filter).toBe('grayscale(1)');

    switches[0].click();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.film-overlay')).toBeNull();
    expect(fixture.nativeElement.querySelector('.vignette')).toBeNull();
    expect(switches[1].checked).toBeTrue();
    expect(getComputedStyle(main).filter).toBe('grayscale(1)');
    expect(getComputedStyle(document.documentElement).getPropertyValue('--section-sepia').trim())
      .toBe('0');
    expect(getComputedStyle(document.documentElement).getPropertyValue('--image-contrast').trim())
      .toBe('1');

    switches[1].click();
    fixture.detectChanges();

    expect(getComputedStyle(document.documentElement).getPropertyValue('--image-grayscale').trim())
      .toBe('0');
    expect(getComputedStyle(main).filter).toBe('grayscale(0)');
    expect(JSON.parse(localStorage.getItem(key)!))
      .toEqual({ filmEffects: false, monochrome: false });
  });

  it('keeps the selected appearance when closing and reopening the compact panel', async () => {
    const dialog = openPanel();
    const switches = dialog.querySelectorAll<HTMLInputElement>('input[role="switch"]');
    switches[0].click();
    switches[1].click();
    fixture.detectChanges();

    dialog.querySelector<HTMLButtonElement>('.close-button')!.click();
    await fixture.whenStable();
    fixture.detectChanges();
    openPanel();

    expect(switches[0].checked).toBeFalse();
    expect(switches[1].checked).toBeFalse();
    expect(fixture.nativeElement.querySelector('.film-overlay')).toBeNull();
    expect(fixture.nativeElement.querySelector('.vignette')).toBeNull();
    expect(dialog.querySelectorAll('button').length).toBe(1);
    expect(JSON.parse(localStorage.getItem(key)!))
      .toEqual({ filmEffects: false, monochrome: false });
  });

  it('closes on the backdrop without triggering the intro', async () => {
    const dialog = openPanel();
    dialog.dispatchEvent(new MouseEvent('click', { clientX: 0, clientY: 0 }));
    await fixture.whenStable();
    fixture.detectChanges();

    expect(dialog.open).toBeFalse();
    expect(fixture.componentInstance.introVisible()).toBeTrue();
  });
});
