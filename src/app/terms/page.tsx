import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import { generatePageMeta } from '@/lib/seo';
import company from '@/data/company.json';

export const metadata: Metadata = generatePageMeta({
  title: 'Terms & Conditions',
  description: `Terms and conditions for ${company.name}. Review our terms of service and usage policies.`,
  path: '/terms',
});

export default function TermsPage() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight text-primary-800 sm:text-4xl">
            Terms &amp; Conditions
          </h1>
          <div className="mt-4 h-1 w-16 bg-accent-500 rounded-full" aria-hidden="true" />

          <div className="mt-8 space-y-8 text-sm leading-relaxed text-neutral-600">
            <div>
              <h2 className="text-lg font-semibold text-primary-800">General</h2>
              <p className="mt-2">
                By accessing and using this website, you accept and agree to be bound by 
                these terms and conditions. If you do not agree with any part of these terms, 
                please do not use our website.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-primary-800">Products & Services</h2>
              <p className="mt-2">
                Product images, descriptions, and specifications on this website are for 
                informational purposes. Actual products may vary slightly in appearance 
                from their website representations. Specifications, availability, and pricing 
                are subject to change without prior notice. All orders are subject to separate 
                terms agreed upon at the time of purchase.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-primary-800">Pricing & Quotations</h2>
              <p className="mt-2">
                Prices are provided on a quotation basis and may vary depending on specifications, 
                quantity, and delivery requirements. Quotations are valid for the period specified 
                in the quotation document.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-primary-800">Intellectual Property</h2>
              <p className="mt-2">
                All content on this website, including text, images, logos, and design elements, 
                is the property of {company.name} and is protected by applicable intellectual 
                property laws. You may not reproduce, distribute, or use any content without 
                prior written permission.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-primary-800">Limitation of Liability</h2>
              <p className="mt-2">
                {company.name} shall not be liable for any indirect, incidental, or consequential 
                damages arising from the use of this website or reliance on information provided herein.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-primary-800">Contact</h2>
              <p className="mt-2">
                For questions regarding these terms, please contact us at{' '}
                <a href={`mailto:${company.email}`} className="text-accent-600 hover:underline">
                  {company.email}
                </a>.
              </p>
            </div>

            <p className="text-xs text-neutral-400 border-t border-neutral-200 pt-6">
              These terms are a general template and should be reviewed by a legal professional 
              before deployment. Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long' })}.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
