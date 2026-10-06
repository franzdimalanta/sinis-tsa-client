import type { MenuSize } from './menu'

export interface CartItem {
  menuItemId: string
  name: string
  size: MenuSize
  quantity: number
  // Display snapshot only. The backend rechecks pricing during checkout.
  unitPrice: number
}

export interface CartState {
  items: CartItem[]
  totalQuantity: number
  subtotal: number
  addItem: (item: CartItem) => boolean
  removeItem: (menuItemId: string, size: MenuSize) => void
  updateQuantity: (menuItemId: string, size: MenuSize, quantity: number) => void
  clearCart: () => void
}
