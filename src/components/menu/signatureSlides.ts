import type { MenuItem } from '../../types/menu'

export type SignatureSlide = {
  id: string
  name: string
  description: string
  menuItemId?: string
  image?: string
  tone: string
}

// Presentation only. Add verified catalog IDs and transparent image paths here.
// Seed products with similar names are deliberately not treated as aliases.
export const signatureSlides: SignatureSlide[] = [
  { id: 'sinister-coffee', name: 'Sinister Coffee', description: 'A bold little boost for your next adventure.', tone: '#78513B' },
  { id: 'hyper-macchiato', name: 'Hyper Macchiato', description: 'Bring a little extra energy to your everyday.', tone: '#BC9165' },
  { id: 'aura-americano', name: 'Aura Americano', description: 'Keep it simple. Find your focus, one sip at a time.', tone: '#493326' },
  { id: 'sini-tsa-matcha', name: 'Sini Tsa Matcha', description: 'A little matcha magic for your daily escape.', tone: '#A8B982' },
]

export function resolveSignatureItem(slide: SignatureSlide, items: MenuItem[]) {
  if (slide.menuItemId) return items.find(item => item.isActive && item._id === slide.menuItemId)
  // No stable IDs are supplied by the seed. Require a unique exact-name match;
  // navigation always uses the real ID returned by the API.
  const matches = items.filter(item => item.isActive && item.name === slide.name)
  return matches.length === 1 ? matches[0] : undefined
}
