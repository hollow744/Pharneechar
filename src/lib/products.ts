import type { Product } from '@/types';
import productsData from '@/data/products.json';

const products: Product[] = productsData as unknown as Product[];

export function getAllProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((product) => product.isFeatured);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((product) => product.category === category);
}

export function getRelatedProducts(currentSlug: string, limit: number = 3): Product[] {
  const currentProduct = getProductBySlug(currentSlug);
  if (!currentProduct) return products.slice(0, limit);

  const sameCategory = products.filter(
    (p) => p.category === currentProduct.category && p.slug !== currentSlug
  );

  const others = products.filter(
    (p) => p.category !== currentProduct.category && p.slug !== currentSlug
  );

  return [...sameCategory, ...others].slice(0, limit);
}

export function getAllCategories(): string[] {
  const categories = new Set(products.map((p) => p.category));
  return Array.from(categories);
}

export function getAllSlugs(): string[] {
  return products.map((p) => p.slug);
}
