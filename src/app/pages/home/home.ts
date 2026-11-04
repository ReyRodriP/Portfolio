import { Component } from '@angular/core';
import { Hero } from '../../shared/hero/hero';
import { About } from '../../shared/about/about';
import { Projects } from '../../shared/projects/projects';
import { Contact } from '../../shared/contact/contact';
import { Outro } from '../../shared/outro/outro';


@Component({
  selector: 'app-home',
  imports: [Hero, About, Projects, Contact, Outro],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
