
export interface Project {
  id: string;
  title: string;
  subtitle?: string;
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
  image?: string;
}

export type Locale = "en" | "zh-CN" | "zh-TW" | "ar";
export type Direction = "ltr" | "rtl";

export interface Testimonial {
  name: string;
  role: string;
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

export interface NavCategory {
  label: string;
  links: { text: string; href: string }[];
}
