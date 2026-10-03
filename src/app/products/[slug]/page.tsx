import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Container from '@/components/ui/Container';
import Breadcrumb from '@/components/products/Breadcrumb';
import ProductDetails from '@/components/products/ProductDetails';
import SectionHeading from '@/components/ui/SectionHeading';
import ProductGrid from '@/components/products/ProductGrid';
import JsonLd, { getProductSchema, getBreadcrumbSchema } from '@/components/seo/JsonLd';
import { getProductBySlug, getAllSlugs, getRelatedProducts } from '@/lib/products';
import { siteConfig } from '@/lib/seo';
import company from '@/data/company.json';

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await props.params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  const title = product.seo?.title ?? `${product.name} | ${company.name}`;
  const description =
    product.seo?.description ??
    `${product.shortDescription} Manufactured by ${company.name}.`;
  const url = `${siteConfig.url}/products/${product.slug}`;

  return {
    title: product.seo?.title ? product.name : title,
    description,
    keywords: product.seo?.keywords,
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
          url: `${siteConfig.url}${product.featuredImage}`,
          width: 800,
          height: 600,
          alt: product.altText,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${siteConfig.url}${product.featuredImage}`],
    },
  };
}

export default async function ProductPage(
  props: { params: Promise<{ slug: string }> }
) {
  const { slug } = await props.params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(slug, 3);

  const breadcrumbItems = [
    { name: 'Home', url: siteConfig.url },
    { name: 'Products', url: `${siteConfig.url}/products` },
    { name: product.name, url: `${siteConfig.url}/products/${product.slug}` },
  ];

  return (
    <section className="py-10 md:py-16">
      <Container>
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' },
            { label: product.name },
          ]}
        />

        <JsonLd data={getProductSchema(product)} />
        <JsonLd data={getBreadcrumbSchema(breadcrumbItems)} />

        <ProductDetails product={product} />

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 md:mt-24 border-t border-neutral-200 pt-16">
            <SectionHeading
              title="Related Products"
              subtitle="Explore more metallic furniture from our range."
            />
            <ProductGrid products={relatedProducts} />
          </div>
        )}
      </Container>
    </section>
  );
}
