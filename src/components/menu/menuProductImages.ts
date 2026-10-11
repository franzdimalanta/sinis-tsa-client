import type { MenuItem } from '../../types/menu'
import { signatureMembership } from './signatureMembership'
import { signatureAssets } from './signatureAssets'
import { productAssets } from './productAssets'

type ProductImage = { src: string; alt: string; scale: number; bottomPadding: number }
// Only confirmed membership IDs connect presentation assets to orderable items.
export const menuProductImages: Record<string, ProductImage | undefined> = {
  '6ac7bb0d53ee9c5d90b27d0b': productAssets.cloud,
  '6ac7bb0c53ee9c5d90b27d0a': productAssets.spanish,
  '6ac7bb0d53ee9c5d90b27d0f': productAssets.chocolate,
  '6ac7bb0d53ee9c5d90b27d11': productAssets.croissant,
  // Image only: no new brewed-tea recipe claim or database name change.
  '6ac7bb0d53ee9c5d90b27d10': productAssets.tea,
  ...Object.fromEntries(
  signatureMembership.flatMap(member => {
    const asset = signatureAssets[member.slideId as keyof typeof signatureAssets]
    return member.menuItemId && asset ? [[member.menuItemId, asset]] : []
  }),
  ),
}

export function isDrink(item: MenuItem) {
  return ['Coffee', 'Non-Coffee', 'Tea'].includes(item.category?.name ?? '')
}
