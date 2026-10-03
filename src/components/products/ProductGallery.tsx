'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ProductGalleryProps {
  images: string[];
  altText: string;
  productName: string;
}

export default function ProductGallery({
  images,
  altText,
  productName,
}: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const displayImages = images.length > 0 ? images : ['/images/products/placeholder.webp'];
  const currentImage = displayImages[activeIndex];
  const isTechnicalView = 
    currentImage.includes('spec') || 
    currentImage.includes('dimension') || 
    currentImage.includes('exploded');

  const getThumbnailLabel = (img: string, idx: number) => {
    if (img.includes('main')) return 'With Cushion';
    if (img.includes('frame')) return 'Wireframe Structure';
    if (img.includes('spec')) return 'Spec Sheet';
    if (img.includes('dimension')) return 'Dimensions';
    if (img.includes('exploded')) return 'Engineering';
    return `View ${idx + 1}`;
  };

  return (
    <div className="space-y-4">
      {/* Main Image Viewport */}
      <div className={cn(
        "relative aspect-[4/3] overflow-hidden rounded-xl border border-neutral-200 transition-colors duration-200",
        isTechnicalView ? "bg-neutral-950" : "bg-neutral-100"
      )}>
        <Image
          src={currentImage}
          alt={activeIndex === 0 ? altText : `${productName} - ${getThumbnailLabel(currentImage, activeIndex)}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className={cn(
            "transition-all duration-300",
            isTechnicalView ? "object-contain p-2" : "object-cover"
          )}
          priority={activeIndex === 0}
        />

        {/* Full size preview link */}
        <a
          href={currentImage}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-md bg-black/75 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md hover:bg-black transition-colors"
          title="Open high-resolution image in new tab"
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
          </svg>
          Zoom View
        </a>
      </div>

      {/* Thumbnails Strip with labels */}
      {displayImages.length > 1 && (
        <div className="flex gap-2.5 sm:gap-3 overflow-x-auto pb-2 touch-pan-x overscroll-x-contain" role="list" aria-label="Product image gallery thumbnails">
          {displayImages.map((image, index) => {
            const isSelected = index === activeIndex;
            const label = getThumbnailLabel(image, index);
            return (
              <button
                key={image}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={cn(
                  'group relative flex flex-col items-center flex-shrink-0 rounded-lg p-1 transition-all duration-150',
                  isSelected
                    ? 'ring-2 ring-accent-500'
                    : 'opacity-70 hover:opacity-100'
                )}
                aria-label={`Switch to ${label}`}
                aria-current={isSelected ? 'true' : undefined}
              >
                <div className="relative h-16 w-20 overflow-hidden rounded-md border border-neutral-300 bg-neutral-900">
                  <Image
                    src={image}
                    alt=""
                    fill
                    sizes="80px"
                    className="object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
                <span className={cn(
                  "mt-1 text-[11px] font-medium tracking-tight",
                  isSelected ? "text-accent-600 font-semibold" : "text-neutral-500"
                )}>
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
