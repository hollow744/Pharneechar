import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/types';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className }: ProductCardProps) {
  return (
    <article
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-lg border border-neutral-200 bg-white transition-shadow duration-300 hover:shadow-lg',
        className
      )}
    >
      {/* Image */}
      <Link
        href={`/products/${product.slug}`}
        className="relative aspect-[4/3] overflow-hidden bg-neutral-100"
        aria-label={`View ${product.name}`}
      >
        <Image
          src={product.featuredImage}
          alt={product.altText}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-medium uppercase tracking-wider text-accent-600">
          {product.category}
        </p>
        <h3 className="mt-1.5 text-lg font-semibold text-primary-800">
          <Link
            href={`/products/${product.slug}`}
            className="hover:text-accent-600 transition-colors duration-150"
          >
            {product.name}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-500">
          {product.shortDescription}
        </p>

        {product.defaultSize && (
          <div className="mt-3 flex items-center gap-1.5 rounded-md bg-neutral-50 border border-neutral-200/80 px-2.5 py-1 text-xs text-neutral-600">
            <svg className="h-3.5 w-3.5 text-accent-600 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
            </svg>
            <span className="font-mono text-[11px] sm:text-xs font-medium truncate">{product.defaultSize}</span>
          </div>
        )}

        <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between">
          <Link
            href={`/products/${product.slug}`}
            className="inline-flex w-full items-center justify-between rounded-md bg-neutral-50 px-3.5 py-2 text-xs font-semibold text-primary-800 border border-neutral-200 hover:border-accent-500 hover:bg-accent-50 hover:text-accent-700 transition-all duration-150 group/btn"
          >
            <span>View Product Details</span>
            <svg className="h-4 w-4 transition-transform duration-150 group-hover/btn:translate-x-1 text-accent-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}
