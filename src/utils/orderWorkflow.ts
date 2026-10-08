import type { OrderStatus } from '../types/order'

export const orderStatuses: OrderStatus[] = ['pending', 'preparing', 'ready', 'completed', 'cancelled']
export const orderActions: Record<OrderStatus, { status: OrderStatus; label: string }[]> = {
  pending: [{ status: 'preparing', label: 'Start preparing' }, { status: 'cancelled', label: 'Cancel order' }],
  preparing: [{ status: 'ready', label: 'Mark ready' }],
  ready: [{ status: 'completed', label: 'Complete order' }],
  completed: [],
  cancelled: [],
}
export const statusMessages: Partial<Record<OrderStatus, string>> = {
  preparing: 'Order moved to Preparing.',
  ready: 'Order marked Ready.',
  completed: 'Order completed.',
  cancelled: 'Order cancelled and inventory restored.',
}
export const statusStyles: Record<OrderStatus, string> = {
  pending: 'bg-amber-100 text-amber-950',
  preparing: 'bg-blue-100 text-blue-950',
  ready: 'bg-teal-100 text-teal-950',
  completed: 'bg-green-100 text-green-950',
  cancelled: 'bg-stone-200 text-stone-700',
}
