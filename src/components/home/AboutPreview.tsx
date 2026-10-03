import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import company from '@/data/company.json';

export default function AboutPreview() {
  return (
    <section className="py-16 md:py-24 bg-neutral-50 border-y border-neutral-200/60">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          {/* Content */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-accent-600">
              The Pharneechar Philosophy
            </p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-primary-800 sm:text-4xl">
              Where Design Meets Purpose.
              <span className="block text-accent-600">Built Fearlessly.</span>
            </h2>
            <div className="mt-3 h-1 w-20 bg-accent-500 rounded-full" aria-hidden="true" />

            <p className="mt-6 text-base leading-relaxed text-neutral-600">
              At <strong className="font-semibold text-primary-800">{company.name}</strong>, we believe
              furniture shouldn&apos;t just fill a space — it should define it. We design and manufacture
              architectural metallic furniture engineered with high-grade Galvanized Iron (GI) and structural Mild Steel (MS),
              finished with durable electrostatic powder coating.
            </p>
            <p className="mt-4 text-base leading-relaxed text-neutral-600">
              From our flagship <em>Vellora Executive Desk</em> and <em>Cavelle Console</em> to the sculptural{' '}
              <em>Vayura Infinity Bed</em>, <em>Linea Wardrobe</em>, and <em>Aeris Rocking Chair</em>, every piece is sculpted, bent, and welded to perfection in India.
              Built to inspire authority and outlast generations.
            </p>

            <div className="mt-8 flex items-center gap-4">
              <Button href="/about" variant="primary">
                Discover Our Craft
              </Button>
              <Button href="/products" variant="outline">
                View Full Catalog
              </Button>
            </div>
          </div>

          {/* Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {[
              {
                title: 'Galvanized Iron & MS',
                text: 'Corrosion-proof GI and heavy mild steel core',
                highlight: 'Hybrid Core',
              },
              {
                title: 'Powder Coated',
                text: 'Thermoset electrostatic architectural finish',
                highlight: 'Durable',
              },
              {
                title: 'Sculptural Geometry',
                text: 'Precision mandrel loops & seamless welds',
                highlight: 'Iconic Design',
              },
              {
                title: 'Bespoke Sizing',
                text: 'Default sizes plus custom blueprints',
                highlight: '100% Custom',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="group relative rounded-xl border border-neutral-200/80 bg-white p-5 sm:p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-accent-400 hover:shadow-md"
              >
                <span className="inline-block text-xs font-bold uppercase tracking-wider text-accent-600 mb-2">
                  {item.highlight}
                </span>
                <h3 className="text-base font-bold text-primary-800">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-neutral-500">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
