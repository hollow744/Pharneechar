import Link from 'next/link';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <div className="mx-auto max-w-lg text-center">
          <p className="text-6xl font-bold text-accent-500">404</p>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-primary-800 sm:text-3xl">
            Page Not Found
          </h1>
          <p className="mt-4 text-base text-neutral-500">
            The page you are looking for does not exist or may have been moved.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button href="/" variant="primary">
              Back to Home
            </Button>
            <Button href="/products" variant="outline">
              View Products
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
