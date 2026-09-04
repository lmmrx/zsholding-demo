export interface GalleryImage {
  src: string;
  alt: string;
}

export interface RoomItem {
  title: string;
  image: string;
  description: string;
  beds?: string;
}

export interface InfoGroup {
  title: string;
  items: string[];
}

export interface SubAmenity {
  slug: string;
  title: string;
  tileImage: string;
  tileDescription: string;
  tileArrowLabel: string;
  pageDescription: string;
  images?: GalleryImage[];
  infoGroups?: InfoGroup[];
}

export interface Amenity {
  slug: string;
  title: string;
  tileImage: string;
  tileDescription: string;
  tileArrowLabel: string;
  pageDescription: string;
  type: 'gallery' | 'rooms';
  images?: GalleryImage[];
  rooms?: RoomItem[];
  infoGroups?: InfoGroup[];
  subAmenities?: SubAmenity[];
}

export interface Property {
  slug: string;
  name: string;
  address: string;
  bookingPhone: string;
  fax?: string;
  image: string;
  order: number;
  accent: 'steel' | 'amber';
  hubLede?: string;
  amenities?: Amenity[];
}

export interface OrgNode {
  role: string;
  name: string;
  properties?: string;
}

export interface ValueCard {
  title: string;
  description: string;
  accent: 'steel' | 'amber';
}

export interface PriorityCard {
  label: string;
  title: string;
  description: string;
}

export interface HomeContent {
  heroEyebrow: string;
  heroTitle: string;
  heroLede: string;
  stampLabel: string;
  stampValue: string;
  welcomeVideoUrl: string;
  overviewEyebrow: string;
  overviewTitle: string;
  overviewLede: string;
  mission: { label: string; title: string; description: string };
  vision: { label: string; title: string; description: string };
  values: ValueCard[];
  orgEyebrow: string;
  orgTitle: string;
  orgLede: string;
  orgLeadership: OrgNode[];
  orgDirectors: OrgNode[];
  orgGeneralManagers: OrgNode[];
  prioritiesEyebrow: string;
  prioritiesTitle: string;
  prioritiesLede: string;
  priorities: PriorityCard[];
}

export interface TrainingItem {
  icon: 'document' | 'hat' | 'shield' | 'chart' | 'list';
  title: string;
  description: string;
  duration: string;
  format: string;
}

export interface VideoItem {
  title: string;
  description: string;
  duration: string;
  url: string;
}

export interface LearningPortalContent {
  eyebrow: string;
  title: string;
  lede: string;
  requiredLabel: string;
  requiredTraining: TrainingItem[];
  recommendedLabel: string;
  recommendedTraining: TrainingItem[];
  videos: VideoItem[];
}

export interface ContactDesk {
  code: string;
  title: string;
  description: string;
  hours: string;
  contactLine: string;
  accent: 'steel' | 'amber';
}

export interface Faq {
  question: string;
  answer: string;
  open?: boolean;
}

export interface FaqCategory {
  category: string;
  faqs: Faq[];
}

export interface SupportContent {
  eyebrow: string;
  title: string;
  lede: string;
  contacts: ContactDesk[];
  faqCategories: FaqCategory[];
}
