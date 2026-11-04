import { Component, ElementRef, afterNextRender, input, output, viewChild } from '@angular/core';

@Component({
  selector: 'app-intro',
  imports: [],
  templateUrl: './intro.html',
  styleUrl: './intro.css',
})
export class Intro {
  readonly disabled = input(false);
  readonly salir = output<void>();
  private readonly introScreen = viewChild.required<ElementRef<HTMLElement>>('introScreen');

  constructor() {
    afterNextRender(() => {
      this.introScreen().nativeElement.focus({ preventScroll: true });
    });
  }

  irAlPortafolio() {
    if (this.disabled()) return;
    this.salir.emit();
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key !== 'Enter' && event.key !== ' ') return;

    event.preventDefault();
    if (!event.repeat) this.irAlPortafolio();
  }
}
