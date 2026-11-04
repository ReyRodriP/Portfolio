import { DOCUMENT } from '@angular/common';
import {
  Component,
  DestroyRef,
  ElementRef,
  Injector,
  afterNextRender,
  computed,
  effect,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Intro } from './shared/intro/intro';
import { VisualPreferences } from './core/services/visual-preferences';
import { VisualSettings } from './shared/visual-settings/visual-settings';

type IrisFase = 'idle' | 'cerrando' | 'abriendo';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Intro, VisualSettings],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  readonly visualPreferences = inject(VisualPreferences);
  protected readonly title = signal('portfolio_web');

  public readonly introVisible = signal(true);
  public readonly irisFase = signal<IrisFase>('idle');
  public readonly entradaBloqueada = computed(
    () => this.introVisible() || this.irisFase() !== 'idle'
  );

  private readonly document = inject(DOCUMENT);
  private readonly injector = inject(Injector);
  private readonly content = viewChild.required<ElementRef<HTMLElement>>('content');
  private previousOverflow: string | null = null;

  constructor() {
    effect(() => {
      if (this.entradaBloqueada()) {
        if (this.previousOverflow === null) {
          this.previousOverflow = this.document.body.style.overflow;
          this.document.body.style.overflow = 'hidden';
        }
      } else {
        this.restoreScroll();
      }
    });

    inject(DestroyRef).onDestroy(() => this.restoreScroll());
  }

  public iniciarTransicion() {
    if (!this.introVisible() || this.irisFase() !== 'idle') return;
    this.irisFase.set('cerrando');
  }

  public onIrisFin(event: AnimationEvent) {
    if (event.target !== event.currentTarget) return;

    // Angular prefixes component keyframe names when encapsulating their styles.
    if (this.irisFase() === 'cerrando' && event.animationName.endsWith('iris-cerrar')) {
      this.introVisible.set(false);
      this.irisFase.set('abriendo');
    } else if (this.irisFase() === 'abriendo' && event.animationName.endsWith('iris-abrir')) {
      this.irisFase.set('idle');
      afterNextRender(() => {
        this.content().nativeElement.focus({ preventScroll: true });
      }, { injector: this.injector });
    }
  }

  private restoreScroll(): void {
    if (this.previousOverflow === null) return;

    this.document.body.style.overflow = this.previousOverflow;
    this.previousOverflow = null;
  }
}
