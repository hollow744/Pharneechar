export interface ProductSEO {
  title?: string;
  description?: string;
  keywords?: string[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  category: string;
  subcategory?: string;
  images: string[];
  featuredImage: string;
  altText: string;
  defaultSize?: string;
  keyFeatures?: string[];
  materials: string[];
  features: string[];
  applications: string[];
  specifications: Record<string, string>;
  seo?: ProductSEO;
  isFeatured?: boolean;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

export interface SocialLinks {
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  twitter?: string;
  youtube?: string;
}

export interface Company {
  name: string;
  legalName?: string;
  description: string;
  tagline: string;
  email: string;
  phone: string;
  whatsapp?: string;
  whatsappUrl?: string;
  alternatePhone?: string;
  address: Address;
  googleMapsUrl?: string;
  social: SocialLinks;
  foundedYear?: string;
  logo?: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
}
