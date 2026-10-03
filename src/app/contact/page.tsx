import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import ContactForm from '@/components/contact/ContactForm';
import { generatePageMeta } from '@/lib/seo';
import company from '@/data/company.json';
import { formatPhoneHref, formatEmailHref } from '@/lib/utils';

export const metadata: Metadata = generatePageMeta({
  title: 'Contact Us',
  description: `Get in touch with ${company.name} for metallic furniture inquiries, product information, and custom requirements. Reach us by phone, email, or contact form.`,
  path: '/contact',
});

export default function ContactPage() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-primary-800 sm:text-4xl">
            Contact Us
          </h1>
          <div className="mt-4 mx-auto h-1 w-16 bg-accent-500 rounded-full" aria-hidden="true" />
          <p className="mt-6 text-lg text-neutral-500">
            Have a question about our products, need a custom quote, or want to discuss 
            your furniture requirements? Get in touch with our team.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-12 lg:grid-cols-5">
          {/* Contact Info */}
          <div className="lg:col-span-2">
            <h2 className="text-lg font-semibold text-primary-800">
              Business Information
            </h2>
            <div className="mt-1.5 h-0.5 w-12 bg-accent-500 rounded-full" aria-hidden="true" />

            <dl className="mt-6 space-y-6">
              {/* Email */}
              <div>
                <dt className="text-sm font-medium text-neutral-500">Email</dt>
                <dd className="mt-1">
                  <a
                    href={formatEmailHref(company.email)}
                    className="text-sm text-primary-800 hover:text-accent-600 transition-colors"
                  >
                    {company.email}
                  </a>
                </dd>
              </div>

              {/* Phone / WhatsApp */}
              <div>
                <dt className="text-sm font-medium text-neutral-500">Phone &amp; WhatsApp</dt>
                <dd className="mt-1 flex items-center gap-2 flex-wrap">
                  <a
                    href={company.whatsappUrl || "https://wa.me/919157333844"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-primary-800 hover:text-accent-600 transition-colors inline-flex items-center gap-2"
                  >
                    <span>{company.phone}</span>
                    <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-colors">
                      Chat on WhatsApp &rarr;
                    </span>
                  </a>
                </dd>
              </div>

              {/* Address */}
              <div>
                <dt className="text-sm font-medium text-neutral-500">Address &amp; Location</dt>
                <dd className="mt-1 text-sm font-medium text-primary-800">
                  {[company.address.street, company.address.city, company.address.state, company.address.country, company.address.postalCode]
                    .filter(Boolean)
                    .join(', ')}
                </dd>
                {company.googleMapsUrl && (
                  <div className="mt-2.5">
                    <a
                      href={company.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-md bg-accent-50 px-3 py-1.5 text-xs font-semibold text-accent-700 border border-accent-200 hover:bg-accent-100 hover:text-accent-800 transition-colors shadow-xs"
                    >
                      <svg className="h-4 w-4 text-accent-600 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                      Open in Google Maps &rarr;
                    </a>
                  </div>
                )}
              </div>

              {/* Live Google Map Preview */}
              <div className="pt-2">
                <div className="overflow-hidden rounded-xl border border-neutral-200/90 shadow-sm bg-neutral-100">
                  <iframe
                    src="https://maps.google.com/maps?q=21.1285354,72.8470003&z=16&output=embed"
                    width="100%"
                    height="200"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Pharneechar Workshop Location on Google Maps"
                    className="w-full"
                  />
                  <div className="bg-white p-2.5 flex items-center justify-between border-t border-neutral-200 text-xs">
                    <span className="text-neutral-500 flex items-center gap-1">
                      <span className="inline-block h-2 w-2 rounded-full bg-emerald-500"></span>
                      Pharneechar Studio
                    </span>
                    <a
                      href={company.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-accent-600 hover:text-accent-700 transition-colors"
                    >
                      Get Directions &rarr;
                    </a>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div>
                <dt className="text-sm font-medium text-neutral-500">Business Hours</dt>
                <dd className="mt-1 text-sm text-primary-800">
                  Monday – Saturday: 9:00 AM – 6:00 PM
                  <br />
                  <span className="text-neutral-500">Sunday: Closed</span>
                </dd>
              </div>
            </dl>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="rounded-lg border border-neutral-200 bg-white p-6 sm:p-8">
              <h2 className="text-lg font-semibold text-primary-800">
                Send Us a Message
              </h2>
              <p className="mt-1 text-sm text-neutral-500">
                Fill out the form below and we will respond to your inquiry promptly.
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
