import type { Metadata } from 'next';
import Image from 'next/image';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import { generatePageMeta } from '@/lib/seo';
import company from '@/data/company.json';

export const metadata: Metadata = generatePageMeta({
  title: 'About Us | Architectural Metallic Furniture Craftsmanship',
  description: `Discover ${company.name} — Indian designers and manufacturers of luxury architectural metallic furniture, Galvanized Iron & Mild Steel executive desks, beds, consoles, and modern workspaces.`,
  path: '/about',
});

const pillars = [
  {
    title: 'Galvanized Iron & Mild Steel Engineering',
    description:
      'We combine rust-resistant Galvanized Iron outer framing with heavy-gauge structural Mild Steel cores. Every frame undergoes precision CNC cutting, 45-degree miter cuts, and rigorous structural stress balancing.',
  },
  {
    title: 'Flawless Mandrel Bending & Seamless Welds',
    description:
      'Our signature curves and continuous infinity loops are achieved through specialized CNC mandrel pipe bending. Weld seams are meticulously ground flush by master fabricators for a solid, continuous aesthetic.',
  },
  {
    title: 'Architectural Electrostatic Powder Coating',
    description:
      'Every piece is cured with multi-stage electrostatic powder coating in pure white, matte black, and custom architectural shades for superior scratch resistance and UV stability.',
  },
  {
    title: 'Engineered Precision & Load Certification',
    description:
      'From executive desks tested to 250+ kg to bed frames with interlocking steel slat grids rated for 500+ kg, our furniture delivers unyielding durability with zero creaks and zero wobble.',
  },
];

const values = [
  { title: 'Designed Differently', desc: 'Sculptural geometry and bold silhouettes that challenge conventional furniture.' },
  { title: 'Built Fearlessly', desc: 'Heavy Galvanized Iron and structural steel with zero wobble, zero creaks, and extreme load capacity.' },
  { title: 'Made to Inspire', desc: 'Monolithic forms and architectural lines that elevate every executive space.' },
  { title: 'Crafted to Perfection', desc: 'Hand-finished weld joints, custom sizing, and obsessive attention to detail.' },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero Header */}
      <section className="relative bg-primary-900 py-20 md:py-28 overflow-hidden text-white border-b border-white/10">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-accent-500/10 rounded-full blur-[100px] pointer-events-none" 
          aria-hidden="true" 
        />
        <Container>
          <div className="relative max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-widest text-accent-400">
              The Pharneechar Story
            </p>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Architectural Metal Furniture.
              <span className="block mt-2 bg-gradient-to-r from-accent-300 via-accent-400 to-accent-500 bg-clip-text text-transparent">
                Engineered for Greatness.
              </span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-neutral-300">
              Born from a passion for architectural metal, precision engineering, and bold sculptural silhouettes. 
              We craft iconic statement furniture designed to command executive offices, modern workspaces, and luxury residences.
            </p>
          </div>
        </Container>
      </section>

      {/* Brand Vision Section */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-center">
            <div className="lg:col-span-6">
              <p className="text-xs font-bold uppercase tracking-wider text-accent-600">
                Our Foundation
              </p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-primary-800 sm:text-4xl">
                Designed Bold. Crafted Precisely.
              </h2>
              <div className="mt-3 h-1 w-16 bg-accent-500 rounded-full" aria-hidden="true" />

              <div className="mt-6 space-y-4 text-base leading-relaxed text-neutral-600">
                <p>
                  <strong>{company.name}</strong> was founded with a clear mission: to challenge generic, 
                  fragile wooden furniture by unleashing the structural power and sculptural possibilities of 
                  Galvanized Iron (GI) and structural Mild Steel (MS).
                </p>
                <p>
                  Every piece we engineer — from the continuous rounded frame of our <em>Vellora Executive Desk</em> 
                  and the twin-loop rhythm of our <em>Cavelle Console</em> to the sweeping loops of our <em>Vayura Infinity Bed</em>, 
                  the smoky glass elegance of the <em>Linea Wardrobe</em>, and the wireframe silhouette of the <em>Aeris Rocking Chair</em> — represents a balance of structural strength and visual lightness.
                </p>
                <p>
                  Finished with multi-stage electrostatic powder coating, our furniture stands resilient against moisture, 
                  wear, and time, defining the atmosphere of modern executive and luxury living spaces.
                </p>
              </div>

              <div className="mt-8 flex gap-4">
                <Button href="/products" variant="primary">
                  Explore Collection
                </Button>
                <Button href="/contact" variant="outline">
                  Commission Custom Piece
                </Button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden border border-neutral-200 shadow-xl aspect-[4/3]">
                <Image
                  src="/images/hero/hero-executive-desk.webp"
                  alt="Pharneechar architectural steel furniture workshop & executive showcase"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Core Values / Slogans */}
      <section className="py-16 bg-primary-900 text-white border-y border-white/10">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-widest text-accent-400">Our Core Tenets</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">The 4 Pillars of Every Build</h2>
          </div>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <h3 className="text-lg font-bold text-accent-400">{v.title}</h3>
                <p className="mt-2 text-sm text-neutral-300 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Brand Identity & First Logo Image Showcase */}
      <section className="py-16 md:py-24 bg-neutral-900 text-white border-b border-white/10">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/15 aspect-[16/10]">
                <Image
                  src="/images/general/pharneechar-logo-first.jpg"
                  alt="Pharneechar — Crafted Spaces. Timeless Stories."
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-accent-400/30 bg-accent-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-accent-400">
                Brand Identity
              </div>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl text-white">
                Crafted Spaces.<br />Timeless Stories.
              </h2>
              <p className="mt-4 text-sm sm:text-base text-neutral-300 leading-relaxed">
                The Pharneechar mark unites the letter <strong>P</strong> with the silhouette of an architectural lounge chair and a hanging pendant lamp — symbolizing the harmony of structural metal, thoughtful illumination, and enduring comfort.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-accent-400">Quality Materials</h4>
                  <p className="text-xs text-neutral-400 mt-1">Galvanized Iron & Heavy-Gauge Mild Steel</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-accent-400">Modern Designs</h4>
                  <p className="text-xs text-neutral-400 mt-1">Sculptural silhouettes and bold profiles</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-accent-400">Crafted With Care</h4>
                  <p className="text-xs text-neutral-400 mt-1">Seamless weld joints & precision detailing</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-accent-400">Built to Last</h4>
                  <p className="text-xs text-neutral-400 mt-1">Industrial electrostatic powder coating</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Craftsmanship & Process */}
      <section className="py-16 md:py-24 bg-neutral-50">
        <Container>
          <SectionHeading
            title="Engineering & Craftsmanship"
            subtitle="The uncompromising standards behind every weld, cut, and finish."
          />
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {pillars.map((item, index) => (
              <div
                key={item.title}
                className="rounded-xl border border-neutral-200 bg-white p-7 shadow-sm transition-all duration-200 hover:shadow-md hover:border-accent-400"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-500/10 text-accent-600 font-bold text-sm">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <h3 className="mt-4 text-lg font-bold text-primary-800">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Custom Commission CTA */}
      <section className="py-16 md:py-20 bg-white text-center">
        <Container>
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-primary-800">Have a Bespoke Vision in Mind?</h2>
            <p className="mt-4 text-base text-neutral-600 leading-relaxed">
              We collaborate with architects, interior consultants, corporate leaders, and homeowners to 
              create custom dimensioned furniture, unique powder coat tones, and specialized architectural metalwork.
            </p>
            <div className="mt-8">
              <Button href="/contact" variant="primary" size="lg">
                Discuss Your Custom Project
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
