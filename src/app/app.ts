import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Intro } from './shared/intro/intro';

type IrisFase = 'idle' | 'cerrando' | 'abriendo';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Intro],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('portfolio_web');

  public readonly introVisible = signal(true);
  public readonly irisFase = signal<IrisFase>('idle');

  public iniciarTransicion() {
    if (this.irisFase() !== 'idle') return;
    this.irisFase.set('cerrando');
  }

  public onIrisFin() {
    if (this.irisFase() === 'cerrando') {
      this.introVisible.set(false);
      this.irisFase.set('abriendo');
    } else if (this.irisFase() === 'abriendo') {
      this.irisFase.set('idle');
    }
  }
}
