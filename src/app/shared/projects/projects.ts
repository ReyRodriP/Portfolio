import { Component } from '@angular/core';
import { Modal, type ModalProject } from '../modal/modal';

@Component({
  selector: 'app-projects',
  imports: [Modal],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects {
  selectedProject: ModalProject | null = null;

  readonly projectGalleries: ModalProject[] = [
    {
      title: 'Evaluación Quinquenal',
      description:
        'Proyecto institucional para facilitar la evaluación quinquenal del MESCYT a instituciones de educación superior.',
      images: [
        {
          src: 'img/UASD-Mescyt/Captura de pantalla 2026-07-31 222758.png',
          alt: 'Detalle de una evidencia en el sistema de evaluación quinquenal',
        },
        {
          src: 'img/UASD-Mescyt/Captura de pantalla 2026-07-30 205917.png',
          alt: 'Segunda captura del sistema de evaluación quinquenal',
        },
        {
          src: 'img/UASD-Mescyt/Captura de pantalla 2026-08-01 193705.png',
          alt: 'Tercera captura del sistema de evaluación quinquenal',
        },
        {
          src: 'img/UASD-Mescyt/Captura de pantalla 2026-08-02 122813.png',
          alt: 'Cuarta captura del sistema de evaluación quinquenal',
        },
      ],
    },
    {
      title: 'Mi Pensum UASD',
      description:
        'Aplicación para seguir el avance del pensum y consultar el índice académico.',
      images: [
        {
          src: 'img/UASD-Pensum/Captura de pantalla 2026-10-21 202436.png',
          alt: 'Primera captura de Mi Pensum UASD',
        },
        {
          src: 'img/UASD-Pensum/Captura de pantalla 2026-10-21 202447.png',
          alt: 'Segunda captura de Mi Pensum UASD',
        },
        {
          src: 'img/UASD-Pensum/Captura de pantalla 2026-10-21 202502.png',
          alt: 'Tercera captura de Mi Pensum UASD',
        },
      ],
    },
    {
      title: 'Reto 100 días',
      description:
        'Recopilación de proyectos de práctica frontend.',
      images: [
        {
          src: 'img/small/CapturaExtra.png',
          alt: 'Vista del recopilatorio de proyectos frontend',
        },
      ],
    },
  ];
  
  openProject(project: ModalProject): void {
    this.selectedProject = project;
  }

  closeProject(): void {
    this.selectedProject = null;
  }
}
