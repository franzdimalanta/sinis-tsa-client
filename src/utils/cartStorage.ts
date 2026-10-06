import type { CartItem } from '../types/cart'

export const cartStorageKey = 'brewlogic-cart'

export function isCartItem(value: unknown): value is CartItem {
  if (!value || typeof value !== 'object') return false
  const item = value as Record<string, unknown>
  return typeof item.menuItemId === 'string' && /^[a-f\d]{24}$/i.test(item.menuItemId)
    && typeof item.name === 'string' && item.name.trim().length > 0 && item.name.length <= 100
    && (item.size === 'small' || item.size === 'medium' || item.size === 'large')
    && typeof item.quantity === 'number' && Number.isSafeInteger(item.quantity) && item.quantity > 0
    && typeof item.unitPrice === 'number' && Number.isFinite(item.unitPrice) && item.unitPrice >= 0
    && Number.isFinite(item.unitPrice * item.quantity)
}

export function loadCart(): CartItem[] {
  try {
    const saved: unknown = JSON.parse(localStorage.getItem(cartStorageKey) ?? '[]')
    if (!Array.isArray(saved) || !saved.every(isCartItem)) return []
    const items: CartItem[] = []
    for (const item of saved) {
      const existing = items.find(line => line.menuItemId === item.menuItemId && line.size === item.size)
      if (existing) {
        existing.quantity += item.quantity
        existing.unitPrice = item.unitPrice
        if (!isCartItem(existing)) return []
      } else {
        // Copy only known display fields from untrusted persisted data.
        items.push({ menuItemId: item.menuItemId, name: item.name, size: item.size,
          quantity: item.quantity, unitPrice: item.unitPrice })
      }
    }
    const quantity = items.reduce((sum, item) => sum + item.quantity, 0)
    const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0)
    return Number.isSafeInteger(quantity) && Number.isFinite(subtotal) ? items : []
  } catch {
    return []
  }
}
