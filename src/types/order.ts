import type { MenuItem, MenuSize } from './menu'

export type OrderType = 'dine-in' | 'takeout'
export type OrderStatus = 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled'
export interface OrderRequestItem { menuItem: string; size: MenuSize; quantity: number }
export interface OrderRequest {
  customerName: string
  orderType: OrderType
  notes?: string
  items: OrderRequestItem[]
}
export interface OrderItem {
  menuItem: string | MenuItem | null
  name: string
  size: MenuSize
  quantity: number
  unitPrice: number
  lineTotal: number
}
export interface OrderTotals {
  items: OrderItem[]
  subtotal: number
  discountAmount: number
  total: number
}
export interface Order extends OrderTotals {
  _id: string
  customerName: string
  orderType: OrderType
  notes: string
  status: OrderStatus
  createdAt: string
  updatedAt: string
}
// Preview is an unsaved Order, so it has an ID but no persisted timestamps.
export interface OrderPreviewResponse extends OrderTotals {
  _id: string
  customerName: string
  orderType: OrderType
  notes: string
  status: OrderStatus
  stockAvailable: boolean
  ingredientRequirements: {
    ingredient: string; name: string; unit: 'g' | 'ml' | 'pcs'
    quantity: number; stockQuantity: number
  }[]
}
