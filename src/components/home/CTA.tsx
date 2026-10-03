import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

export default function CTA() {
  return (
    <section className="py-16 md:py-24 bg-primary-800 relative overflow-hidden">
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-5" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at 25% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
          }}
        />
      </div>

      <Container>
        <div className="relative text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Looking for Reliable Metallic Furniture?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-300">
            Contact our team to discuss your requirements. We provide metallic furniture solutions 
            for offices, institutions, and commercial spaces.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button href="/contact" variant="primary" size="lg">
              Request a Quote
            </Button>
            <Button
              href="/products"
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 hover:text-white"
            >
              Browse Products
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
