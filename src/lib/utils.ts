export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function formatPhoneDisplay(phone: string): string {
  return phone.replace(/\s+/g, ' ').trim();
}

export function formatPhoneHref(phone: string): string {
  return `tel:${phone.replace(/\s+/g, '')}`;
}

export function formatEmailHref(email: string): string {
  return `mailto:${email}`;
}

export function getCurrentYear(): number {
  return new Date().getFullYear();
}
