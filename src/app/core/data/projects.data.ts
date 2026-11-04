import type { FeaturedProject, PracticeProject } from '../models/project';

export const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    id: 'evaluacion-quinquenal',
    title: 'Evaluación Quinquenal UASD-MESCYT',
    summary: 'Centraliza la carga, el seguimiento y la evaluación de documentos de la UASD para el MESCYT.',
    description:
      'Sistema de gestión documental para apoyar la evaluación quinquenal que realiza el Ministerio de Educación Superior, Ciencia y Tecnología (MESCYT) a las instituciones de educación superior. Combina una interfaz en Angular, un servidor con Django y una base de datos PostgreSQL.',
    context:
      'El personal de la UASD utilizaba Gmail y Google Drive para compartir los documentos. Ese proceso dificultaba el seguimiento de los archivos enviados y de su evaluación.',
    contribution:
      'Participé en la mejora de este proceso mediante una plataforma que centraliza la carga y el seguimiento de documentos, y permite al personal del MESCYT acceder a las evidencias y evaluarlas dentro del mismo sistema.',
    status: 'Proyecto institucional',
    technologies: ['Angular', 'Django', 'PostgreSQL'],
    repositoryUrl: 'https://github.com/ReyRodriP/Evaluaci-n-Quinquenal-UASDMESCyT.git',
    images: [
      {
        src: 'img/UASD-Mescyt/Captura de pantalla 2026-07-31 222758.png',
        alt: 'Detalle de una evidencia con historial de versiones, observaciones y carga de archivos',
      },
      {
        src: 'img/UASD-Mescyt/Captura de pantalla 2026-07-30 205917.png',
        alt: 'Panel de seguimiento de asignaciones y avance de la evaluación por facultad',
      },
      {
        src: 'img/UASD-Mescyt/Captura de pantalla 2026-08-01 193705.png',
        alt: 'Formulario de edición de la cuenta y los datos personales del usuario',
      },
      {
        src: 'img/UASD-Mescyt/Captura de pantalla 2026-08-02 122813.png',
        alt: 'Reporte de evidencias con filtros por estado, departamento, período y criterio',
      },
    ],
  },
  {
    id: 'mi-pensum-uasd',
    title: 'Mi Pensum UASD',
    summary: 'Plan de estudios digital para consultar las asignaturas pendientes y organizar el avance académico.',
    description:
      'Aplicación en desarrollo para que los estudiantes de la UASD puedan llevar un seguimiento digital de su plan de estudios, en lugar de marcar las asignaturas en un pénsum impreso.',
    context:
      'Los estudiantes necesitan identificar las asignaturas pendientes y planificar cuáles cursar. Además, la actualización del índice académico puede tardar después de cada semestre.',
    contribution:
      'Estoy desarrollando la interfaz con JavaScript y el servidor con Express sobre Node.js para reunir el seguimiento de asignaturas y las calificaciones en una sola herramienta.',
    nextSteps:
      'Completar las recomendaciones de próximas asignaturas y el cálculo de un índice estimado al registrar cada asignatura aprobada, sin depender de la actualización semestral. La migración de la interfaz a Angular está prevista para una etapa posterior.',
    status: 'En desarrollo',
    technologies: ['JavaScript', 'Express', 'Node.js'],
    repositoryUrl: 'https://github.com/ReyRodriP/Plan-de-estudio.git',
    images: [
      {
        src: 'img/UASD-Pensum/Captura de pantalla 2026-10-21 202436.png',
        alt: 'Plan de estudios de Informática con asignaturas, créditos y calificaciones por semestre',
      },
      {
        src: 'img/UASD-Pensum/Captura de pantalla 2026-10-21 202447.png',
        alt: 'Pantalla de inicio de sesión de Mi Pensum UASD',
      },
      {
        src: 'img/UASD-Pensum/Captura de pantalla 2026-10-21 202502.png',
        alt: 'Formulario de registro con nombre de usuario, matrícula y correo electrónico',
      },
    ],
  },
  {
    id: 'reto-100-dias',
    title: 'Reto de 100 días',
    summary: 'Colección de proyectos frontend para reforzar conocimientos y explorar nuevas tecnologías. Actualmente incluye 4 de una meta de 100.',
    description:
      'Reto personal de aprendizaje que reúne pequeños proyectos web en una misma aplicación. La meta es construir una colección de 100 proyectos; por ahora, hay 4 incorporados.',
    context:
      'Quería mantener una práctica constante, repasar las tecnologías que ya conozco y aprender otras mediante ejercicios concretos.',
    contribution:
      'Desarrollo la aplicación recopilatoria con Angular y TypeScript y voy incorporando los proyectos a medida que avanzo en el reto.',
    nextSteps:
      'Ampliar la colección hasta alcanzar los 100 proyectos y explorar nuevas tecnologías y soluciones de interfaz durante el proceso.',
    status: 'En desarrollo · 4 de 100',
    technologies: ['Angular', 'TypeScript'],
    repositoryUrl: 'https://github.com/ReyRodriP/Reto-Frontend-1-100.git',
    images: [
      {
        src: 'img/small/CapturaExtra.png',
        alt: 'Vista de la colección de proyectos frontend del Reto de 100 días',
      },
    ],
  },
];

export const PRACTICE_PROJECTS: PracticeProject[] = [
  {
    id: 'citas',
    title: 'Citas',
    description: 'Muestra una cita motivacional en cada carga. Un ejercicio para practicar el consumo de una API y la presentación de sus respuestas en la interfaz.',
    image: { src: 'img/small/Captura1.png', alt: 'Aplicación de citas motivacionales' },
    repositoryUrl: 'https://github.com/ReyRodriP/Citas.git',
    demoUrl: 'https://reyrodrip.github.io/Citas/',
  },
  {
    id: 'colores-aleatorios',
    title: 'Colores aleatorios',
    description: 'Genera un color aleatorio y lo aplica al fondo al pulsar un botón. Una práctica de eventos y actualización de estilos en la interfaz.',
    image: { src: 'img/small/Captura2.png', alt: 'Generador de colores de fondo aleatorios' },
    repositoryUrl: 'https://github.com/ReyRodriP/Colores-aleatorios.git',
    demoUrl: 'https://reyrodrip.github.io/Colores-aleatorios/',
  },
  {
    id: 'colores-rgb',
    title: 'Colores RGB',
    description: 'Permite combinar los canales rojo, verde y azul mediante tres controles deslizantes para cambiar el fondo y explorar el modelo de color RGB.',
    image: { src: 'img/small/Captura3.png', alt: 'Controles deslizantes para combinar los canales de color RGB' },
    repositoryUrl: 'https://github.com/ReyRodriP/Colores-RGB.git',
    demoUrl: 'https://reyrodrip.github.io/Colores-RGB/',
  },
  {
    id: 'declaracion',
    title: 'Declaración',
    description: 'Una de mis primeras experiencias con interfaces interactivas: una propuesta de San Valentín con una respuesta negativa difícil de alcanzar.',
    image: { src: 'img/small/Captura4.png', alt: 'Propuesta interactiva de San Valentín' },
    repositoryUrl: 'https://github.com/ReyRodriP/Declaracion.git',
    demoUrl: 'https://reyrodrip.github.io/Declaracion/',
  },
  {
    id: 'notificaciones',
    title: 'Notificaciones',
    description: 'Sistema de notificaciones emergentes personalizables. Lo desarrollé para reutilizar mis propios avisos y adaptar su apariencia sin depender de una biblioteca externa.',
    image: { src: 'img/small/Captura5.png', alt: 'Notificaciones emergentes personalizadas' },
    repositoryUrl: 'https://github.com/ReyRodriP/Notificaciones.git',
    demoUrl: 'https://reyrodrip.github.io/Notificaciones/',
  },
  {
    id: 'cronometro',
    title: 'Cronómetro',
    description: 'Cronómetro interactivo con opciones para pausar, reanudar y reiniciar. Una práctica de temporizadores y actualización del estado de la interfaz.',
    image: { src: 'img/small/Captura6.png', alt: 'Cronómetro con controles de pausa, reanudación y reinicio' },
    repositoryUrl: 'https://github.com/ReyRodriP/Cronometro.git',
    demoUrl: 'https://reyrodrip.github.io/Cronometro/',
  },
  {
    id: 'gestor-de-tareas',
    title: 'Gestor de tareas',
    description: 'Permite añadir tareas a una lista, marcarlas como completadas y eliminarlas. Un ejercicio de gestión de listas e interacción con el usuario.',
    image: { src: 'img/small/Captura7.png', alt: 'Lista de tareas con acciones para completar y eliminar elementos' },
    repositoryUrl: 'https://github.com/ReyRodriP/Gestor-de-tareas.git',
    demoUrl: 'https://reyrodrip.github.io/Gestor-de-tareas/',
  },
];
