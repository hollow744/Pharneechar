import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import ProductGrid from '@/components/products/ProductGrid';
import { getAllProducts } from '@/lib/products';
import { generatePageMeta } from '@/lib/seo';

export const metadata: Metadata = generatePageMeta({
  title: 'Our Products',
  description:
    'Browse the complete collection of sculptural furniture by Pharneechar — executive desks, console tables, infinity-loop beds, and glass-panel wardrobes crafted with premium metals and contemporary design.',
  path: '/products',
});

export default function ProductsPage() {
  const products = getAllProducts();

  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeading
          title="Our Products"
          subtitle="Explore our curated collection of sculptural furniture designed for premium spaces."
        />

        <p className="mx-auto mb-12 max-w-3xl text-center text-base leading-relaxed text-neutral-600">
          From sculptural executive desks and architectural console tables to infinity-loop 
          beds and glass-panel wardrobes, our furniture is crafted using Galvanized Iron (GI), 
          structural Mild Steel (MS), and architectural powder-coated finishes. Each piece is designed 
          to make a bold statement in luxury interiors.
        </p>

        <ProductGrid products={products} />
      </Container>
    </section>
  );
}
