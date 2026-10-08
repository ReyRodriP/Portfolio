import { Component, HostListener } from '@angular/core';
import { Intro } from '../../shared/intro/intro';
import { Hero } from '../../shared/hero/hero';


@Component({
  selector: 'app-home',
  imports: [/*Intro,*/ Hero],
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
