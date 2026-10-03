import company from '@/data/company.json';

interface JsonLdProps {
  data: Record<string, unknown>;
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data, null, 0),
      }}
    />
  );
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pharneechar.com';

export function getOrganizationSchema() {
  const socialLinks = Object.values(company.social || {}).filter(Boolean);

  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness', 'FurnitureStore'],
    '@id': `${siteUrl}/#organization`,
    name: company.name,
    legalName: company.name,
    url: siteUrl,
    logo: `${siteUrl}${company.logo}`,
    image: `${siteUrl}/images/hero/hero-executive-desk.jpg`,
    description: company.description,
    priceRange: '₹₹₹',
    currenciesAccepted: 'INR',
    paymentAccepted: 'Cash, Credit Card, Bank Transfer, UPI',
    areaServed: {
      '@type': 'Country',
      name: 'India',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: company.phone,
      email: company.email,
      contactType: 'customer service',
      availableLanguage: ['English', 'Hindi', 'Gujarati'],
      areaServed: 'IN',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: company.address.street || undefined,
      addressLocality: company.address.city || 'Surat',
      addressRegion: company.address.state || 'Gujarat',
      postalCode: company.address.postalCode || '394210',
      addressCountry: company.address.country || 'India',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 21.1285354,
      longitude: 72.8470003,
    },
    hasMap: company.googleMapsUrl || 'https://maps.google.com/?q=21.1285354,72.8470003',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    sameAs: socialLinks.length > 0 ? socialLinks : undefined,
  };
}

export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    name: company.name,
    url: siteUrl,
    description: company.description,
    inLanguage: 'en-IN',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/products?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function getProductSchema(product: {
  name: string;
  description: string;
  featuredImage: string;
  slug: string;
  category: string;
  specifications: Record<string, string>;
  defaultSize?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${siteUrl}/products/${product.slug}/#product`,
    name: product.name,
    description: product.description,
    image: `${siteUrl}${product.featuredImage}`,
    url: `${siteUrl}/products/${product.slug}`,
    category: product.category,
    sku: `PHRN-${product.slug.toUpperCase().replace(/-/g, '')}`,
    mpn: `PHRN-${product.slug.toUpperCase()}`,
    brand: {
      '@type': 'Brand',
      name: company.name,
    },
    manufacturer: {
      '@type': 'Organization',
      name: company.name,
      url: siteUrl,
    },
    material: product.specifications?.Material || 'Galvanized Iron & Mild Steel',
    offers: {
      '@type': 'Offer',
      url: `${siteUrl}/products/${product.slug}`,
      priceCurrency: 'INR',
      price: '0.00',
      priceValidUntil: '2028-12-31',
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: company.name,
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '34',
      bestRating: '5',
      worstRating: '1',
    },
  };
}

export function getBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
