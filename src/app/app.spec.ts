import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';

describe('App', () => {
  let fixture: ComponentFixture<App>;
  let previousOverflow: string;

  beforeEach(async () => {
    previousOverflow = document.body.style.overflow;
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(App);
  });

  afterEach(() => {
    fixture.destroy();
    document.body.style.overflow = previousOverflow;
  });

  function finishAnimation(name: string): void {
    const event = new Event('animationend');
    Object.defineProperty(event, 'animationName', { value: name });
    fixture.nativeElement.querySelector('.iris').dispatchEvent(event);
    fixture.detectChanges();
  }

  it('blocks the underlying page and scrolling while the intro is visible', () => {
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('main').inert).toBeTrue();
    expect(document.body.style.overflow).toBe('hidden');
    expect(fixture.nativeElement.querySelector('app-intro')).not.toBeNull();
  });

  it('unlocks the page and transfers focus only after both iris animations finish', async () => {
    document.body.style.overflow = 'clip';
    fixture.detectChanges();
    fixture.nativeElement.querySelector('.intro-content').click();
    fixture.detectChanges();

    expect(fixture.componentInstance.irisFase()).toBe('cerrando');
    expect(fixture.nativeElement.querySelector('.intro-content').getAttribute('aria-disabled'))
      .toBe('true');

    finishAnimation('unrelated-animation');
    expect(fixture.componentInstance.irisFase()).toBe('cerrando');

    const iris = fixture.nativeElement.querySelector('.iris');
    finishAnimation(window.getComputedStyle(iris).animationName);
    expect(fixture.nativeElement.querySelector('app-intro')).toBeNull();
    expect(fixture.nativeElement.querySelector('main').inert).toBeTrue();
    expect(document.body.style.overflow).toBe('hidden');

    finishAnimation(window.getComputedStyle(iris).animationName);
    await fixture.whenStable();

    const main = fixture.nativeElement.querySelector('main');
    expect(main.inert).toBeFalse();
    expect(document.body.style.overflow).toBe('clip');
    expect(document.activeElement).toBe(main);
    expect(fixture.componentInstance.irisFase()).toBe('idle');

    fixture.componentInstance.iniciarTransicion();
    expect(fixture.componentInstance.irisFase()).toBe('idle');
  });

  it('restores the original scrolling style if destroyed during the intro', () => {
    document.body.style.overflow = 'clip';
    fixture.detectChanges();
    fixture.destroy();

    expect(document.body.style.overflow).toBe('clip');
  });

  it('finishes the real CSS iris animations without leaving a black overlay', async () => {
    fixture.detectChanges();
    const iris: HTMLElement = fixture.nativeElement.querySelector('.iris');
    const animationNames: string[] = [];

    await new Promise<void>((resolve, reject) => {
      const timeout = window.setTimeout(() => {
        iris.removeEventListener('animationend', onAnimationEnd);
        reject(new Error('The iris transition did not finish'));
      }, 4000);

      const onAnimationEnd = (event: AnimationEvent) => {
        if (event.target !== iris) return;
        animationNames.push(event.animationName);
        fixture.detectChanges();

        if (fixture.componentInstance.irisFase() === 'idle') {
          window.clearTimeout(timeout);
          iris.removeEventListener('animationend', onAnimationEnd);
          resolve();
        }
      };

      iris.addEventListener('animationend', onAnimationEnd);
      fixture.nativeElement.querySelector('.intro-content').click();
      fixture.detectChanges();
    });
    await fixture.whenStable();

    expect(animationNames.length).toBe(2);
    expect(animationNames[0]).toMatch(/iris-cerrar$/);
    expect(animationNames[1]).toMatch(/iris-abrir$/);
    expect(fixture.nativeElement.querySelector('app-intro')).toBeNull();
    expect(fixture.nativeElement.querySelector('main').inert).toBeFalse();
    expect(window.getComputedStyle(iris).visibility).toBe('hidden');
  });
});
