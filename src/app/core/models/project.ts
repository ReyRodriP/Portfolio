export interface ProjectImage {
  src: string;
  alt: string;
}

export interface ProjectDetails {
  title: string;
  description: string;
  images: ProjectImage[];
  status?: string;
  technologies?: string[];
  context?: string;
  contribution?: string;
  nextSteps?: string;
}

export interface FeaturedProject extends ProjectDetails {
  id: string;
  summary: string;
  repositoryUrl: string;
  technologies: string[];
}

export interface PracticeProject {
  id: string;
  title: string;
  description: string;
  image: ProjectImage;
  repositoryUrl: string;
  demoUrl: string;
}
