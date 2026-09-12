import { Component, HostListener } from '@angular/core';
import { Intro } from '../../shared/intro/intro';


@Component({
  selector: 'app-home',
  imports: [Intro],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  isAnimating = true;

  @HostListener('document:click')
  dispararAnimacion() {
    this.isAnimating = false;

    setTimeout(() => {
      this.isAnimating = true;
    }, 50)
  }
}
