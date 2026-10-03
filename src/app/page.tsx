import type { Metadata } from 'next';
import Hero from '@/components/home/Hero';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import AboutPreview from '@/components/home/AboutPreview';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import Industries from '@/components/home/Industries';
import CTA from '@/components/home/CTA';
import ContactPreview from '@/components/home/ContactPreview';
import { generatePageMeta } from '@/lib/seo';

export const metadata: Metadata = generatePageMeta({
  title: 'Architectural Metallic Furniture Manufacturer & Supplier India',
  description:
    'Pharneechar designs and manufactures luxury sculptural metallic furniture in India — executive desks, infinity-loop beds, console tables, and wardrobes crafted in Galvanized Iron & Mild Steel.',
  path: '',
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <AboutPreview />
      <WhyChooseUs />
      <Industries />
      <CTA />
      <ContactPreview />
    </>
  );
}
