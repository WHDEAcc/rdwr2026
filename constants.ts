
import { Project, Service, Testimonial, PhilosophyItem } from './types';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Shenzhen Xili Railway Station Hub Silk Park',
    location: 'Shenzhen, China',
    year: '2022-ongoing',
    scale: '42 hectares',
    category: 'Transportation Infrastructure',
    image: 'https://ryondu-portfolio-2025.lovable.app/lovable-uploads/d6ae6425-624a-4cd7-8ea7-5b97b73a8e87.png',
    gallery: [
      'https://ryondu-portfolio-2025.lovable.app/lovable-uploads/dfa276b5-718e-4883-98a4-53b94f788872.png',
      'https://ryondu-portfolio-2025.lovable.app/lovable-uploads/f6be006d-e0ad-480a-8dee-05d66337c7e1.png',
      'https://ryondu-portfolio-2025.lovable.app/lovable-uploads/d778e006-99e3-415d-8091-47ec7d89234d.png',
      'https://ryondu-portfolio-2025.lovable.app/lovable-uploads/2f9fac9c-59d7-4104-894f-190fd793ed42.png',
      'https://ryondu-portfolio-2025.lovable.app/lovable-uploads/155051fa-56b8-4f62-86c7-b4401a686cdf.png',
      'https://ryondu-portfolio-2025.lovable.app/lovable-uploads/ea490ce2-3972-4a51-9b52-64acc781238f.png',
      'https://ryondu-portfolio-2025.lovable.app/lovable-uploads/7b592e40-3194-4f14-92ba-ad0bb6693b73.png',
      'https://ryondu-portfolio-2025.lovable.app/lovable-uploads/e5a3e1e9-dab3-4afd-bf19-02bab1207c09.png',
      'https://ryondu-portfolio-2025.lovable.app/lovable-uploads/dc96336c-9355-4209-a420-b79a39fcb05e.png',
    ],
    description: 'Sustainable urban park design integrating high-speed railway infrastructure with public green spaces and water management systems. Project value: $42.8 million USD.',
    keyResponsibilities: [
      'Project management from conceptual design to construction documentation',
      'Design leadership coordinating internal teams and external consultants',
      'Weekly meetings with architectural consultants to align design documents',
      'Team collaboration and mentorship of junior staff'
    ]
  },
  {
    id: '2',
    title: 'Nanshan Innovation Boulevard',
    location: 'Shenzhen, China',
    year: '2018-2020',
    scale: '8 kilometers',
    category: 'Urban Design',
    image: 'https://ryondu-portfolio-2025.lovable.app/lovable-uploads/c685f113-2e54-4e7b-99fd-6c2991b528df.png',
    gallery: [
      'https://ryondu-portfolio-2025.lovable.app/lovable-uploads/d312aa57-bf9c-401f-9357-ff0d97925267.png',
      'https://ryondu-portfolio-2025.lovable.app/lovable-uploads/9b4a42ff-fea5-46cd-ba3b-828f513b6b63.png',
      'https://ryondu-portfolio-2025.lovable.app/lovable-uploads/26eee4db-b88c-467c-b675-71d6300e3948.png',
      'https://ryondu-portfolio-2025.lovable.app/lovable-uploads/ba1ff681-4ec0-497d-8f39-0462279e9016.png',
      'https://ryondu-portfolio-2025.lovable.app/lovable-uploads/4f850b63-42c1-4802-a42c-1a9c0c2bd580.png',
      'https://ryondu-portfolio-2025.lovable.app/lovable-uploads/809c153a-e79d-496e-bc67-dbc999dbc35b.png',
      'https://ryondu-portfolio-2025.lovable.app/lovable-uploads/c3967c73-9ac2-46ff-94fa-2ad992edf47f.png',
    ],
    description: 'Comprehensive boulevard landscape design promoting innovation district connectivity and sustainable transportation. Project value: $85.71 million USD.',
    keyResponsibilities: [
      'Design schedule creation and weekly client meetings',
      'Contract and client management',
      'Quality control through site inspections',
      'Sustainability planning and environmental considerations'
    ]
  },
  {
    id: '3',
    title: 'Baguang Coastal Landscape Design',
    location: 'Shenzhen, China',
    year: '2019-2021',
    scale: '107 hectares',
    category: 'Waterfront Design',
    image: 'https://ryondu-portfolio-2025.lovable.app/lovable-uploads/755d5044-91cd-4284-b93f-e6fb31cb7ce5.png',
    gallery: [
      'https://ryondu-portfolio-2025.lovable.app/lovable-uploads/8a5f775d-334f-44aa-a44d-d91c34ceb8f0.png',
      'https://ryondu-portfolio-2025.lovable.app/lovable-uploads/1f80894f-e4d6-4dca-ac97-9c16e7adbe01.png',
      'https://ryondu-portfolio-2025.lovable.app/lovable-uploads/1b4befc6-5459-4542-b36a-603cddc0511f.png',
      'https://ryondu-portfolio-2025.lovable.app/lovable-uploads/17aa9729-1283-4b4c-8538-ba64938ccdab.png',
      'https://ryondu-portfolio-2025.lovable.app/lovable-uploads/43fe5b2b-3e53-4dd6-be76-8f1695af1a65.png',
      'https://ryondu-portfolio-2025.lovable.app/lovable-uploads/b4b3123a-8d18-4920-8e6f-5a6cc1167aca.png',
      'https://ryondu-portfolio-2025.lovable.app/lovable-uploads/34cf8e02-5fa7-4ea2-aa6f-2564eaee1e4e.png',
      'https://ryondu-portfolio-2025.lovable.app/lovable-uploads/08a2c8fe-cd2f-41b0-91fd-5e28addfb2a1.png',
      'https://ryondu-portfolio-2025.lovable.app/lovable-uploads/f1bb1cde-91b5-4718-8846-119030d352e2.png',
      'https://ryondu-portfolio-2025.lovable.app/lovable-uploads/dee048ed-88d7-41c3-8651-117076549a66.png',
    ],
    description: 'Resilient coastal design addressing climate change impacts while creating diverse public spaces and ecological restoration. Project value: $57.2 million USD.',
    keyResponsibilities: [
      'Multi-disciplinary team coordination (ecologists, hydrologists, planners)',
      'Diverse public space design for parks, plazas, streetscapes',
      'City resilience design integration',
      'Stakeholder engagement with communities and government agencies'
    ]
  },
  {
    id: '4',
    title: 'Dongguan Humen TOD Railway Station',
    location: 'Dongguan, China',
    year: '2020-2021',
    scale: '14 hectares',
    category: 'Transportation Infrastructure',
    image: 'https://ryondu-portfolio-2025.lovable.app/lovable-uploads/53d60306-7e25-4bce-bac4-bccb4a1a8471.png',
    gallery: [
      'https://ryondu-portfolio-2025.lovable.app/lovable-uploads/e5f85d8d-de98-40c9-85f0-ba28f02330c9.png',
      'https://ryondu-portfolio-2025.lovable.app/lovable-uploads/4f9627d2-42ed-4cbb-b5ec-d842ce25f3e2.png',
      'https://ryondu-portfolio-2025.lovable.app/lovable-uploads/994e4750-ad5d-436d-918f-71973afaf20d.png',
      'https://ryondu-portfolio-2025.lovable.app/lovable-uploads/e358d76a-4ec7-46ca-8c09-978900b8f6ca.png',
      'https://ryondu-portfolio-2025.lovable.app/lovable-uploads/be2dfe9d-38d0-42f2-b509-7e2fe89ff78c.png',
      'https://ryondu-portfolio-2025.lovable.app/lovable-uploads/33cb1319-8347-4f2b-a0b4-884ce03ab5d7.png',
      'https://ryondu-portfolio-2025.lovable.app/lovable-uploads/9657963f-9769-4a9a-8af3-5af023df1687.png',
      'https://ryondu-portfolio-2025.lovable.app/lovable-uploads/b76d2a91-9fc7-4be6-bc98-bf8031cde836.png',
    ],
    description: 'Award-winning TOD development integrating landscape design with high-speed rail infrastructure. Winner of 2021 Yuanye Award Gold Prize.',
    keyResponsibilities: [
      'Project bidding and creative design concept development',
      'Site survey organization and condition assessment',
      'Design sketches from concept to construction stages',
      'Monthly site inspection reports and budget management'
    ]
  },
  {
    id: '5',
    title: 'Avenue of Stars, Tsim Sha Tsui',
    location: 'Hong Kong',
    year: '2015',
    scale: '1 kilometer',
    category: 'Civic Spaces',
    image: 'https://ryondu-portfolio-2025.lovable.app/lovable-uploads/5b747fb7-14f1-4a41-b1eb-fda784cff9f1.png',
    gallery: [
      'https://ryondu-portfolio-2025.lovable.app/lovable-uploads/349ef80e-83fc-4391-9cb9-1036d29d8a7e.png',
      'https://ryondu-portfolio-2025.lovable.app/lovable-uploads/4022239a-f4fc-4504-a3b2-69b547f646ee.png',
      'https://ryondu-portfolio-2025.lovable.app/lovable-uploads/e7ad35aa-ca9e-40ec-b32e-d43eaec9b886.png',
      'https://ryondu-portfolio-2025.lovable.app/lovable-uploads/a2ee90f3-92a0-4362-8451-a66e230ebbe4.png',
    ],
    description: 'Iconic waterfront promenade renovation combining cultural heritage with modern landscape design. Project value: $10 million USD.',
    keyResponsibilities: [
      'Construction documentation and quality control specialist',
      'Design development and technical coordination',
      'Site supervision and implementation oversight',
      'Cultural heritage integration and design preservation'
    ]
  },
  {
    id: '6',
    title: 'Yantai Bajiao Bay International Convention Center',
    location: 'Yantai, Shandong, China',
    year: '2021-2024',
    scale: '200,000 m²',
    category: 'Convention Centers',
    image: 'https://ryondu-portfolio-2025.lovable.app/lovable-uploads/edbeaf74-809e-4b26-9e8b-1e5b9c5c9971.png',
    gallery: [
      'https://ryondu-portfolio-2025.lovable.app/lovable-uploads/ab7b89ee-7023-4b26-90ca-cc4429368b7b.png',
      'https://ryondu-portfolio-2025.lovable.app/lovable-uploads/f18a120e-1dd0-4373-8522-35215f0e8d43.png',
      'https://ryondu-portfolio-2025.lovable.app/lovable-uploads/d737749b-10fc-4f24-9892-6abdbb1e8564.png',
      'https://ryondu-portfolio-2025.lovable.app/lovable-uploads/da3fac46-c3a8-4764-9e77-805d1c2eb919.png',
      'https://ryondu-portfolio-2025.lovable.app/lovable-uploads/35c67d3a-3708-40c2-ae83-abc87dc78a61.png',
      'https://ryondu-portfolio-2025.lovable.app/lovable-uploads/e365b775-3f9c-4e19-a173-8dd3379facef.png',
    ],
    description: 'Large-scale convention center landscape design integrating "City Shore Cloud Waves & Sea Cloud Shell" concept. 8 indoor exhibition halls covering 56,000m². Project investment: $465 million USD.',
    keyResponsibilities: [
      'Project Manager overseeing full design and construction lifecycle',
      'Concept design and design development',
      'Client presentation leadership for design concepts and scheme proposals',
      'Creative scheme development and design iteration management'
    ]
  },
  {
    id: '7',
    title: 'Yuen Long South Residential Development',
    location: 'Hong Kong',
    year: '2012-2015',
    scale: '120 hectares',
    category: 'Residential',
    image: 'https://ryondu-portfolio-2025.lovable.app/lovable-uploads/3c11fe38-33ac-4670-8cbf-87c0619facaa.png',
    gallery: [
      'https://ryondu-portfolio-2025.lovable.app/lovable-uploads/c37fbafd-2d22-4029-a3a2-11074c4008e8.png',
      'https://ryondu-portfolio-2025.lovable.app/lovable-uploads/241ba0f5-38a3-4550-a163-43854d1eebca.png',
      'https://ryondu-portfolio-2025.lovable.app/lovable-uploads/529da3e1-5837-4ad4-a77a-3b728809ad84.png',
    ],
    description: 'Environmental assessment and landscape design strategy for large-scale residential development planning.',
    keyResponsibilities: [
      'Environmental assessment and landscape design strategy',
      'Large-scale residential development planning',
      'Sustainability analysis and implementation',
      'Multi-disciplinary coordination and reporting'
    ]
  },
  {
    id: '8',
    title: 'Mountain and Blue Residential Project',
    location: 'Shekou, Shenzhen, China',
    year: '2016-2023',
    scale: '40,000 m²',
    category: 'Residential',
    image: 'https://ryondu-portfolio-2025.lovable.app/lovable-uploads/9cc08866-9f0d-465e-ac08-94e5153b98a8.png',
    gallery: [
      'https://ryondu-portfolio-2025.lovable.app/lovable-uploads/b9d9b02b-3c6f-4d9b-87db-0ad849f0601e.png',
      'https://ryondu-portfolio-2025.lovable.app/lovable-uploads/1a126a95-a69d-45a0-8082-7011208a7f19.png',
      'https://ryondu-portfolio-2025.lovable.app/lovable-uploads/eccf72a8-d7cc-4b4e-999b-b24d18d31006.png',
      'https://ryondu-portfolio-2025.lovable.app/lovable-uploads/c5927f96-7371-42e2-9486-c5d40fca8747.png',
      'https://ryondu-portfolio-2025.lovable.app/lovable-uploads/ba373eff-21fc-44a1-9a5c-bf10805bf7c7.png',
      'https://ryondu-portfolio-2025.lovable.app/lovable-uploads/2743872a-938e-44cd-8e10-d59c03d4f542.png',
      'https://ryondu-portfolio-2025.lovable.app/lovable-uploads/4199e890-03ca-4ecc-a162-648fd998e6a0.png',
      'https://ryondu-portfolio-2025.lovable.app/lovable-uploads/1ece340b-36ed-49c4-8be2-29d13247c283.png',
    ],
    description: 'Remarkable landscape design by New World Group capitalizing on "three-sided mountain, one-sided sea" terrain. Features a 24-meter three-tiered waterfall, 360-meter spring water system, and terraced design.',
    keyResponsibilities: [
      'Terrain elevation management through ingenious terrace design',
      'Super high-rise setback and overhang design mimicking mountain shapes',
      '24-meter three-tiered waterfall and spring water system design',
      'Rock-wall waterfalls and native plant ecological buffer creation'
    ]
  },
  {
    id: '9',
    title: 'Yuexiu Nanzhou Road Residential Garden',
    location: 'Guangzhou, China',
    year: '2022',
    scale: '25,000 m²',
    category: 'Residential',
    image: 'https://ryondu-portfolio-2025.lovable.app/lovable-uploads/e7708483-1000-49cd-8ab7-cbf185dbda22.png',
    gallery: [
      'https://ryondu-portfolio-2025.lovable.app/lovable-uploads/8ebf9e8e-e3ed-4187-89be-8883e6be9f6a.png',
      'https://ryondu-portfolio-2025.lovable.app/lovable-uploads/1366c1de-fea4-4608-96a4-23f80ee74fc4.png',
      'https://ryondu-portfolio-2025.lovable.app/lovable-uploads/0a31f838-0c16-405b-8950-7cdd2c8373c6.png',
      'https://ryondu-portfolio-2025.lovable.app/lovable-uploads/b1d3c1c5-9465-42cb-821e-cae41749c122.png',
    ],
    description: 'Premium residential landscape featuring integrated water systems, modern architectural elements, and sustainable urban design with innovative circular building forms and terraced landscaping.',
    keyResponsibilities: [
      'Cross-disciplinary team coordination between architects, engineers, and landscape consultants',
      'Project timeline management and milestone tracking',
      'Quality assurance and design compliance monitoring throughout construction',
      'Budget coordination and resource allocation management'
    ]
  }
];

export const SERVICES: Service[] = [
  {
    title: 'Residential Design',
    description: 'Custom garden concepts, outdoor living spaces, and detailed planting plans tailored to your home.',
    price: 'Starting at $8,000',
    icon: '🏡'
  },
  {
    title: 'Commercial Architecture',
    description: 'Strategic landscape planning for corporate campuses, hospitality venues, and public developments.',
    price: 'Custom Quotation',
    icon: '🏢'
  },
  {
    title: 'Garden Renovation',
    description: 'Historic restoration or modern updates to breathe new life into existing outdoor environments.',
    price: 'Starting at $5,000',
    icon: '✨'
  }
];

export const PHILOSOPHY: PhilosophyItem[] = [
  {
    icon: '🌱',
    title: 'Sustainable Practices',
    description: 'Using native plants and eco-friendly irrigation to support local ecosystems.'
  },
  {
    icon: '🎨',
    title: 'Artistic Vision',
    description: 'Award-winning aesthetics that harmonize with your home\'s architecture.'
  },
  {
    icon: '🏠',
    title: 'Client-Centered',
    description: 'Collaborative designs that reflect your personal lifestyle and aspirations.'
  },
  {
    icon: '📐',
    title: 'Technical Excellence',
    description: 'Precise engineering ensures longevity and functional brilliance in every build.'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Eleanor Vance',
    location: 'Pacific Heights, CA',
    quote: 'The team transformed our messy backyard into a masterpiece. We spend every evening on our new terrace.',
    rating: 5,
    image: 'https://i.pravatar.cc/150?u=eleanor'
  },
  {
    name: 'Julian Blackwood',
    location: 'Austin, TX',
    quote: 'Sustainable design was our priority, and Verdant Vision delivered a beautiful, water-wise oasis.',
    rating: 5,
    image: 'https://i.pravatar.cc/150?u=julian'
  },
  {
    name: 'Sarah Chen',
    location: 'Brooklyn, NY',
    quote: 'Incredible attention to detail. Our rooftop garden is now the envy of the neighborhood.',
    rating: 5,
    image: 'https://i.pravatar.cc/150?u=sarah'
  }
];
