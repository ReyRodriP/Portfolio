import { Component, output } from '@angular/core';

@Component({
  selector: 'app-intro',
  imports: [],
  templateUrl: './intro.html',
  styleUrl: './intro.css',
})
export class Intro {
  readonly salir = output<void>();

  irAlPortafolio() {
    this.salir.emit();
  }
}
