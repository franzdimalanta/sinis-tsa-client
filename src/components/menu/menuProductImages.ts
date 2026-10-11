import type { MenuItem } from '../../types/menu'

type ProductImage = { src: string; alt: string }
// No suitable catalog cutouts are supplied. Add verified assets by API item ID
// here; promotional homepage photos are not individual product images.
export const menuProductImages: Record<string, ProductImage | undefined> = {}

export function isDrink(item: MenuItem) {
  return ['Coffee', 'Non-Coffee', 'Tea'].includes(item.category?.name ?? '')
}
