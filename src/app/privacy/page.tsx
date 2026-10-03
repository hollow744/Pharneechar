import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import { generatePageMeta } from '@/lib/seo';
import company from '@/data/company.json';

export const metadata: Metadata = generatePageMeta({
  title: 'Privacy Policy',
  description: `Privacy policy for ${company.name}. Learn how we handle your personal information.`,
  path: '/privacy',
});

export default function PrivacyPage() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight text-primary-800 sm:text-4xl">
            Privacy Policy
          </h1>
          <div className="mt-4 h-1 w-16 bg-accent-500 rounded-full" aria-hidden="true" />

          <div className="mt-8 space-y-8 text-sm leading-relaxed text-neutral-600">
            <div>
              <h2 className="text-lg font-semibold text-primary-800">Information We Collect</h2>
              <p className="mt-2">
                When you use our contact form or inquiry features, we may collect your name, 
                email address, phone number, company name, and message content. This information 
                is provided voluntarily by you for the purpose of responding to your inquiry.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-primary-800">How We Use Your Information</h2>
              <p className="mt-2">
                The information you provide is used solely to respond to your inquiry, provide 
                product information, and communicate regarding your furniture requirements. We do 
                not sell, trade, or otherwise transfer your personal information to third parties.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-primary-800">Data Security</h2>
              <p className="mt-2">
                We implement reasonable security measures to protect the personal information 
                submitted through our website. However, no method of electronic transmission or 
                storage is completely secure.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-primary-800">Cookies</h2>
              <p className="mt-2">
                This website may use essential cookies required for its basic functionality. 
                We do not use tracking cookies or third-party analytics unless explicitly stated.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-primary-800">Contact</h2>
              <p className="mt-2">
                If you have questions about this privacy policy, please contact us at{' '}
                <a href={`mailto:${company.email}`} className="text-accent-600 hover:underline">
                  {company.email}
                </a>.
              </p>
            </div>

            <p className="text-xs text-neutral-400 border-t border-neutral-200 pt-6">
              This privacy policy is a general template and should be reviewed by a legal professional 
              before deployment. Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long' })}.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
