import type { Product } from '@/types';
import ProductGallery from '@/components/products/ProductGallery';
import Button from '@/components/ui/Button';

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
      {/* Gallery */}
      <ProductGallery
        images={product.images}
        altText={product.altText}
        productName={product.name}
      />

      {/* Product Info */}
      <div>
        <p className="text-sm font-medium uppercase tracking-wider text-accent-600">
          {product.category}
          {product.subcategory && ` / ${product.subcategory}`}
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-primary-800 sm:text-4xl">
          {product.name}
        </h1>

        <p className="mt-6 text-base leading-relaxed text-neutral-600">
          {product.description}
        </p>

        {/* Default Size Callout */}
        {product.defaultSize && (
          <div className="mt-6 rounded-xl border border-accent-200/80 bg-accent-50/60 p-4 sm:p-5">
            <div className="flex items-start gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-600 text-white shadow-sm">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="text-xs font-bold uppercase tracking-wider text-accent-700">Default Size</span>
                  <span className="rounded-full bg-accent-100/90 px-2.5 py-0.5 text-[11px] font-semibold text-accent-800 border border-accent-200">
                    Bespoke Custom Sizes Available
                  </span>
                </div>
                <p className="mt-1.5 text-base sm:text-lg font-bold tracking-tight text-primary-900 font-mono">
                  {product.defaultSize}
                </p>
                <p className="mt-1 text-xs text-neutral-500">
                  Precision-fabricated in Galvanized Iron &amp; Mild Steel with electrostatic powder coating.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Key Features */}
        {((product.keyFeatures && product.keyFeatures.length > 0) || product.features.length > 0) && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-primary-800">Key Features &amp; Engineering</h2>
            <ul className="mt-3 space-y-2.5">
              {(product.keyFeatures || product.features).map((feature) => {
                const colonIdx = feature.indexOf(':');
                if (colonIdx > 0 && colonIdx < 40) {
                  const title = feature.substring(0, colonIdx);
                  const body = feature.substring(colonIdx + 1).trim();
                  return (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-neutral-600">
                      <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent-500" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      <span>
                        <strong className="font-semibold text-primary-850 text-neutral-800">{title}:</strong> {body}
                      </span>
                    </li>
                  );
                }
                return (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-neutral-600">
                    <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent-500" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {/* Materials */}
        {product.materials.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-primary-800">Materials</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.materials.map((material) => (
                <span
                  key={material}
                  className="inline-flex rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700"
                >
                  {material}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Specifications */}
        {Object.keys(product.specifications).length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-primary-800">Specifications</h2>
            <dl className="mt-3 divide-y divide-neutral-200 border-t border-neutral-200">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex flex-col sm:flex-row sm:justify-between py-2.5 text-sm gap-0.5 sm:gap-4">
                  <dt className="font-medium text-neutral-800 shrink-0">{key}</dt>
                  <dd className="text-neutral-600 sm:text-right break-words">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        {/* Applications */}
        {product.applications.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-primary-800">Applications</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.applications.map((app) => (
                <span
                  key={app}
                  className="inline-flex rounded-md border border-neutral-200 bg-white px-3 py-1 text-xs font-medium text-neutral-600"
                >
                  {app}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button href={`/contact?product=${encodeURIComponent(product.name)}`} variant="primary" size="lg" className="gap-2 shadow-sm w-full sm:w-auto justify-center">
            <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
            Request a Quote
          </Button>
          <Button href={`/contact?subject=${encodeURIComponent(`Custom Specification for ${product.name}`)}`} variant="outline" size="lg" className="gap-2 w-full sm:w-auto justify-center">
            <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l2.846-.813a4.5 4.5 0 003.09-3.09L21.75 8.034a2.25 2.25 0 000-3.182l-2.602-2.602a2.25 2.25 0 00-3.182 0l-6.812 6.812a4.5 4.5 0 00-1.343 2.846z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 9.75L14.25 13.5" />
            </svg>
            Inquire Custom Size
          </Button>
        </div>
      </div>
    </div>
  );
}
