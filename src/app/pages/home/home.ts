import { Component } from '@angular/core';
import { Hero } from '../../shared/hero/hero';
import { About } from '../../shared/about/about';
import { Projects } from '../../shared/projects/projects';


@Component({
  selector: 'app-home',
  imports: [Hero, About, Projects],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
