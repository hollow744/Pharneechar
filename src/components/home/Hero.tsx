import Image from 'next/image';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

export default function Hero() {
  return (
    <section className="relative bg-primary-900 overflow-hidden border-b border-white/10">
      {/* Background radial glow */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-accent-500/10 rounded-full blur-[120px] pointer-events-none" 
        aria-hidden="true" 
      />

      {/* Industrial grid overlay */}
      <div className="absolute inset-0 opacity-[0.03]" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <Container>
        <div className="relative py-16 sm:py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-accent-400/30 bg-accent-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent-400 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-500"></span>
                </span>
                Architectural Metal Furniture • India
              </div>

              {/* H1 Headline */}
              <h1 className="mt-6 text-3xl min-[400px]:text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.15]">
                Designed Bold.{' '}
                <span className="block mt-1 sm:mt-2 bg-gradient-to-r from-accent-300 via-accent-400 to-accent-500 bg-clip-text text-transparent">
                  Crafted Precisely.
                </span>
              </h1>

              {/* Subtitle */}
              <p className="mt-5 sm:mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-neutral-300 sm:text-xl">
                Where design meets purpose. Sculptural executive desks, infinity-loop beds, 
                glass-panel wardrobes, and architectural console tables crafted with premium 
                materials and contemporary elegance.
              </p>

              {/* CTAs */}
              <div className="mt-8 flex flex-col gap-3.5 sm:flex-row items-stretch sm:items-center">
                <Button href="/products" variant="primary" size="lg" className="shadow-lg shadow-accent-500/20 justify-center">
                  Explore Collection
                </Button>
                <Button 
                  href="/contact" 
                  variant="outline" 
                  size="lg" 
                  className="border-white/20 text-white hover:bg-white/10 hover:text-white justify-center"
                >
                  Request Custom Quote
                </Button>
              </div>

              {/* Pillars / Trust Indicators */}
              <div className="mt-10 sm:mt-12 grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 border-t border-white/10 pt-6 sm:pt-8">
                <div>
                  <p className="text-lg sm:text-2xl font-bold text-white tracking-tight">GI &amp; Mild Steel</p>
                  <p className="text-xs sm:text-sm text-neutral-400 mt-0.5">Powder-coated metal builds</p>
                </div>
                <div>
                  <p className="text-lg sm:text-2xl font-bold text-accent-400 tracking-tight">Sculptural</p>
                  <p className="text-xs sm:text-sm text-neutral-400 mt-0.5">Architectural silhouettes</p>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <p className="text-lg sm:text-2xl font-bold text-white tracking-tight">Custom Craft</p>
                  <p className="text-xs sm:text-sm text-neutral-400 mt-0.5">Bespoke sizes &amp; finishes</p>
                </div>
              </div>
            </div>

            {/* Right Showcase Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-lg lg:max-w-none rounded-2xl overflow-hidden border border-white/15 bg-neutral-900/60 shadow-2xl backdrop-blur-sm group">
                <div className="aspect-[4/3] sm:aspect-[16/11] relative overflow-hidden">
                  <Image
                    src="/images/hero/hero-executive-desk.jpg"
                    alt="Vellora Executive Desk with bold sculptural rounded frame in pure white premium finish"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Subtle inner shadow gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-950/80 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Floating caption badge */}
                <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-white/10 bg-primary-900/85 p-4 backdrop-blur-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-accent-400">Featured Masterpiece</p>
                      <p className="text-sm font-bold text-white mt-0.5">Vellora Executive Desk</p>
                    </div>
                    <span className="inline-flex items-center text-xs font-medium text-accent-300">
                      Pure White Premium &rarr;
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
