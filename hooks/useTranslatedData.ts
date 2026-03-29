import { useTranslation } from "react-i18next";
import { 
  PROJECT_STATIC_DATA, 
  SERVICE_STATIC_DATA, 
  TESTIMONIAL_STATIC_DATA,
  PHILOSOPHY_STATIC_DATA
} from "../constants";
import { Project, Service, Testimonial, PhilosophyItem, NavCategory } from "../types";

export function useTranslatedProjects(): Project[] {
  const { t } = useTranslation();
  
  return PROJECT_STATIC_DATA.map(project => {
    // Some keys might not be defined for specific items, we provide a fallback
    const keyRespRaw = t(`projects.${project.id}.keyResponsibilities`, { returnObjects: true });
    const keyResponsibilities = Array.isArray(keyRespRaw) ? keyRespRaw : [];

    return {
      id: project.id,
      title: t(`projects.${project.id}.title`),
      subtitle: t(`projects.${project.id}.subtitle`),
      description: t(`projects.${project.id}.description`),
      location: t(`locations.${project.locationKey}`),
      year: project.year,
      scale: project.scale,
      category: t(`categories.${project.categoryKey}`),
      image: project.image,
      gallery: project.gallery,
      keyResponsibilities: keyResponsibilities
    };
  });
}

export function useTranslatedServices(): Service[] {
  const { t } = useTranslation();
  
  return SERVICE_STATIC_DATA.map(service => ({
    title: t(`services.${service.id}.title`),
    description: t(`services.${service.id}.description`),
    price: t(`services.${service.id}.price`),
    icon: service.icon,
    image: service.image
  }));
}

export function useTranslatedPhilosophy(): PhilosophyItem[] {
  const { t } = useTranslation();
  
  return PHILOSOPHY_STATIC_DATA.map(item => ({
    icon: item.icon,
    title: t(`philosophyItems.${item.id}.title`),
    description: t(`philosophyItems.${item.id}.description`)
  }));
}

export function useTranslatedTestimonials(): Testimonial[] {
  const { t } = useTranslation();
  
  return TESTIMONIAL_STATIC_DATA.map(testimonial => ({
    name: t(`testimonialItems.${testimonial.id}.name`),
    role: t(`testimonialItems.${testimonial.id}.role`),
    location: "", // No longer specified in translations, keeping interface compatibility
    quote: t(`testimonialItems.${testimonial.id}.quote`),
    rating: testimonial.rating,
    image: testimonial.image
  }));
}

export function useTranslatedNavCategories(): NavCategory[] {
  const { t } = useTranslation();
  
  // We have 2 nav categories in the translation file
  return [0, 1].map(index => {
    const navCat = t(`navCategories.${index}`, { returnObjects: true }) as any;
    
    // Fallback if structure isn't fully loaded yet
    if (!navCat || typeof navCat !== 'object' || !navCat.label) {
      return { label: "", links: [] };
    }
    
    const linksMap = navCat.links || {};
    // Extract values from the links object map
    const linksValues = Object.values(linksMap) as string[];
    
    // Depending on the category, assign the correct href targets
    const hrefs = index === 0 
      ? ['#portfolio', '#portfolio', '#portfolio', '#portfolio'] 
      : ['#philosophy', '#services', '#contact'];
      
    return {
      label: navCat.label,
      links: linksValues.map((text, i) => ({
        text,
        href: hrefs[i] || '#'
      }))
    };
  });
}
