import type { Metadata } from 'next';
import company from '@/data/company.json';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pharneechar.com';

export const siteConfig = {
  name: company.name,
  description: company.description,
  url: siteUrl,
  ogImage: `${siteUrl}/images/general/og-default.jpeg`,
  companyName: company.name,
  email: company.email,
  phone: company.phone,
};

export function generatePageMeta({
  title,
  description,
  path = '',
  ogImage,
  noIndex = false,
}: {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
  noIndex?: boolean;
}): Metadata {
  const url = `${siteConfig.url}${path}`;
  const image = ogImage || siteConfig.ogImage;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_IN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
