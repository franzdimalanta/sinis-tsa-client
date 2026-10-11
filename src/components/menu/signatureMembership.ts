import type { MenuItem } from '../../types/menu'
import { signatureSlides } from './signatureSlides'

export const signaturesFilterId = 'presentation:signatures'
// Membership is independent of database categories and showcase presentation.
// Only add menuItemId after the actual catalog ID has been confirmed.
export const signatureMembership = signatureSlides.map(slide => ({ slideId: slide.id, menuItemId: slide.menuItemId }))

export function getSignatureEntries(items: MenuItem[]) {
  return signatureMembership.flatMap(member => {
    const presentation = signatureSlides.find(slide => slide.id === member.slideId)
    if (!presentation) return []
    const item = member.menuItemId ? items.find(item => item.isActive && item._id === member.menuItemId) : undefined
    return [{ presentation, item }]
  })
}
