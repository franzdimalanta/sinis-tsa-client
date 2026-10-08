import api from './api'
import type { Order, OrderPreviewResponse, OrderRequest, OrderStatus } from '../types/order'

export async function previewOrder(payload: OrderRequest) {
  return (await api.post<OrderPreviewResponse>('/orders/preview', payload)).data
}
export async function createOrder(payload: OrderRequest) {
  return (await api.post<Order>('/orders', payload)).data
}
export async function getOrder(id: string, signal?: AbortSignal) {
  return (await api.get<Order>(`/orders/${encodeURIComponent(id)}`, { signal })).data
}

export async function getOrders(status?: OrderStatus, signal?: AbortSignal) {
  return (await api.get<Order[]>('/orders', { params: status ? { status } : undefined, signal })).data
}

export async function updateOrderStatus(id: string, status: OrderStatus) {
  return (await api.patch<Order>(`/orders/${encodeURIComponent(id)}/status`, { status })).data
}
