import type { MenuItem } from '../../types/menu'
import { signatureAssets } from './signatureAssets'
const confirmedSignatureIds: Record<string, string> = {
  'aura-americano': '6ac7bb0d53ee9c5d90b27d0c',
  'sini-tsa-matcha': '6ac7bb0d53ee9c5d90b27d0e',
}

export type SignatureSlide = {
  id: string
  name: string
  description: string
  menuItemId?: string
  image?: string
  imageAlt?: string
  imageScale?: number
  imageBottomPadding?: number
  tone: string
}

// Presentation only. Add verified catalog IDs and transparent image paths here.
// Seed products with similar names are deliberately not treated as aliases.
export const signatureSlides: SignatureSlide[] = [
  { id: 'sinister-coffee', name: 'Sinister Chocolate Drizzle Iced Coffee', description: 'Rich iced coffee, creamy milk, and a wicked chocolate drizzle. Sweet with a sinister streak.', tone: '#78513B' },
  { id: 'hyper-macchiato', name: 'Hyper Macchiato', description: 'Creamy milk, rich espresso, and a sweet caramel finish. Your daily dose of delightful trouble.', tone: '#BC9165' },
  { id: 'aura-americano', name: 'Aura Americano Iced', description: 'Bold espresso over ice. Cool, confident, and just a little intimidating.', tone: '#493326' },
  { id: 'sini-tsa-matcha', name: 'Tsa Matcha Latte', description: 'Earthy matcha meets creamy milk. Looks innocent. Tastes wickedly good.', tone: '#A8B982' },
].map(slide => {
  const asset = signatureAssets[slide.id as keyof typeof signatureAssets]
  return { ...slide, menuItemId: confirmedSignatureIds[slide.id], image: asset.src, imageAlt: asset.alt, imageScale: asset.scale, imageBottomPadding: asset.bottomPadding }
})

export function resolveSignatureItem(slide: SignatureSlide, items: MenuItem[]) {
  if (slide.menuItemId) return items.find(item => item.isActive && item._id === slide.menuItemId)
  // Presentation names do not establish a confirmed database mapping.
  return undefined
}
