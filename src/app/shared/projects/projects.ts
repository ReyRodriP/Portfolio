import { Component } from '@angular/core';
import { FEATURED_PROJECTS, PRACTICE_PROJECTS } from '../../core/data/projects.data';
import type { ProjectDetails } from '../../core/models/project';
import { Modal } from '../modal/modal';

@Component({
  selector: 'app-projects',
  imports: [Modal],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects {
  selectedProject: ProjectDetails | null = null;
  readonly featuredProjects = FEATURED_PROJECTS;
  readonly practiceProjects = PRACTICE_PROJECTS;

  openProject(project: ProjectDetails): void {
    this.selectedProject = project;
  }

  closeProject(): void {
    this.selectedProject = null;
  }

  scrollReel(viewport: HTMLElement, direction: -1 | 1): void {
    const card = viewport.querySelector<HTMLElement>('.project-card');
    const track = viewport.querySelector<HTMLElement>('.reel-track');

    if (!card || !track) return;

    const gap = Number.parseFloat(window.getComputedStyle(track).columnGap) || 0;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    viewport.scrollBy({
      left: (card.offsetWidth + gap) * direction,
      behavior: reducedMotion ? 'auto' : 'smooth',
    });
  }
}
