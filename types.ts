
export interface Project {
  id: string;
  title: string;
  location: string;
  year: string;
  scale: string;
  category: string;
  image: string;
  gallery: string[];
  description: string;
  keyResponsibilities: string[];
}

export interface Service {
  title: string;
  description: string;
  price?: string;
  icon: string;
}

export interface Testimonial {
  name: string;
  location: string;
  quote: string;
  rating: number;
  image: string;
}

export interface PhilosophyItem {
  icon: string;
  title: string;
  description: string;
}
