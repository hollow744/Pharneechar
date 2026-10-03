import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import ProductGrid from '@/components/products/ProductGrid';
import Button from '@/components/ui/Button';
import { getFeaturedProducts } from '@/lib/products';

export default function FeaturedProducts() {
  const featured = getFeaturedProducts();

  if (featured.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-white">
      <Container>
        <SectionHeading
          title="Our Products"
          subtitle="Explore our curated collection of sculptural furniture designed for premium spaces."
        />
        <ProductGrid products={featured} />
        <div className="mt-12 text-center">
          <Button href="/products" variant="secondary">
            View All Products
          </Button>
        </div>
      </Container>
    </section>
  );
}
