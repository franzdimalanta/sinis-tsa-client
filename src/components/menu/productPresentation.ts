import type { MenuItem } from '../../types/menu'
import { productAssets } from './productAssets'

// Verified against the local API recipes; frontend copy only, not DB writes.
export const productPresentation: Record<string, { name: string; description: string }> = {
  '6ac7bb0d53ee9c5d90b27d0c': { name: 'Aura Americano Iced', description: 'Bold espresso over ice. Cool, confident, and just a little intimidating.' },
  '6ac7bb0d53ee9c5d90b27d0e': { name: 'Tsa Matcha Latte', description: 'Earthy matcha meets creamy milk. Looks innocent. Tastes wickedly good.' },
  '6ac7bb0d53ee9c5d90b27d0b': { name: 'Cloud Nine Latte', description: 'Rich espresso and silky milk. A soft landing for your daily mischief.' },
  '6ac7bb0c53ee9c5d90b27d0a': { name: 'Sweet Veil Spanish Latte', description: 'Espresso, creamy milk, and condensed milk. Sweet enough to lower your guard.' },
  '6ac7bb0d53ee9c5d90b27d0f': { name: 'Dark Pulse Chocolate', description: 'Smooth chocolate and creamy milk. A little darkness, a lot of comfort.' },
  '6ac7bb0d53ee9c5d90b27d11': { name: 'Night Slash Croissant', description: 'A flaky chocolate-filled croissant. Your coffee’s partner in crime.' },
}
export function presentMenuItem(item: MenuItem): MenuItem {
  return { ...item, ...productPresentation[item._id] }
}
// Presentation suppression only. Keep the API record, direct route and cart IDs.
// Hyper's final recipe has not been confirmed against Caramel Macchiato.
export const hiddenMenuProductIds = new Set(['6ac7bb0d53ee9c5d90b27d0d'])
export const plannedWaffles = [
  { id: 'magma-waffles', name: 'Magma Waffles', description: 'Waffles with a strawberry topping. A sweet little eruption of mischief.', tone: '#526B3F' },
  { id: 'aqua-waffles', name: 'Aqua Waffles', description: 'Waffles with a blueberry topping. Make a splash at snack time.', tone: '#526B3F' },
].map(product => {
  const asset = product.id === 'magma-waffles' ? productAssets.magma : productAssets.aqua
  return { ...product, image: asset.src, imageAlt: asset.alt, imageScale: asset.scale, imageBottomPadding: asset.bottomPadding }
})
export const presentationRoute = (id: string) => `/menu/${encodeURIComponent('presentation:' + id)}`
