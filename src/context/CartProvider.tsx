import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import type { CartItem } from '../types/cart'
import type { MenuSize } from '../types/menu'
import { CartContext } from './cartContext'
import { cartStorageKey, isCartItem, loadCart } from '../utils/cartStorage'

export default function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState(() => ({ items: loadCart(), additionRevision: 0 }))
  const { items, additionRevision } = cart
  function setItems(update: CartItem[] | ((current: CartItem[]) => CartItem[])) {
    setCart(current => ({ ...current, items: typeof update === 'function' ? update(current.items) : update }))
  }

  useEffect(() => {
    try {
      localStorage.setItem(cartStorageKey, JSON.stringify(items))
    } catch {
      // Storage may be disabled or full; the in-memory cart still works.
    }
  }, [items])

  function addItem(item: CartItem) {
    if (!isCartItem(item)) return false
    setCart(currentCart => {
      const current = currentCart.items
      const existing = current.find(line => line.menuItemId === item.menuItemId && line.size === item.size)
      const combined = existing ? { ...item, quantity: existing.quantity + item.quantity } : { ...item }
      if (!isCartItem(combined)) return currentCart
      const next = existing
        ? current.map(line => line === existing ? combined : line)
        : [...current, combined]
      if (!Number.isSafeInteger(next.reduce((sum, line) => sum + line.quantity, 0)) ||
          !Number.isFinite(next.reduce((sum, line) => sum + line.unitPrice * line.quantity, 0))) return currentCart
      return { items: next, additionRevision: currentCart.additionRevision + 1 }
    })
    return true
  }

  function removeItem(menuItemId: string, size: MenuSize) {
    setItems(current => current.filter(item => item.menuItemId !== menuItemId || item.size !== size))
  }

  function updateQuantity(menuItemId: string, size: MenuSize, quantity: number) {
    if (!Number.isSafeInteger(quantity) || quantity < 1) return
    setItems(current => {
      const next = current.map(item => item.menuItemId === menuItemId && item.size === size
        ? { ...item, quantity } : item)
      if (!next.every(isCartItem) || !Number.isSafeInteger(next.reduce((sum, item) => sum + item.quantity, 0)) ||
          !Number.isFinite(next.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0))) return current
      return next
    })
  }

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = Math.round((items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0) + Number.EPSILON) * 100) / 100

  return <CartContext.Provider value={{ items, totalQuantity, subtotal, additionRevision, addItem, removeItem,
    updateQuantity, clearCart: () => setItems([]) }}>{children}</CartContext.Provider>
}
