import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import company from '@/data/company.json';
import { formatPhoneHref, formatEmailHref } from '@/lib/utils';

export default function ContactPreview() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-primary-800 sm:text-4xl">
            Get in Touch
          </h2>
          <div className="mt-4 mx-auto h-1 w-16 bg-accent-500 rounded-full" aria-hidden="true" />
          <p className="mt-6 text-lg text-neutral-500">
            Have a question about our products or need a custom furniture solution?
            Reach out to us and our team will respond promptly.
          </p>

          <div className="mt-10 flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
            <a
              href={formatEmailHref(company.email)}
              className="flex items-center gap-2.5 text-primary-700 hover:text-accent-600 transition-colors"
            >
              <svg className="h-5 w-5 text-accent-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              {company.email}
            </a>
            <a
              href={formatPhoneHref(company.phone)}
              className="flex items-center gap-2.5 text-primary-700 hover:text-accent-600 transition-colors"
            >
              <svg className="h-5 w-5 text-accent-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              {company.phone}
            </a>
          </div>

          <div className="mt-8">
            <Button href="/contact" variant="primary" size="lg">
              Contact Us
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
