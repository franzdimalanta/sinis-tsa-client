import api from './api'
import type { MenuItem } from '../types/menu'
import type { MenuItemInput, SalesSummary, OrderStatusCounts, LowStockIngredient } from '../types/management'
export async function createMenuItem(payload: MenuItemInput) { return (await api.post<MenuItem>('/menu-items', payload)).data }
export async function updateMenuItem(id: string, payload: MenuItemInput) { return (await api.put<MenuItem>('/menu-items/' + encodeURIComponent(id), payload)).data }
export async function deleteMenuItem(id: string) { return (await api.delete<{ message: string }>('/menu-items/' + encodeURIComponent(id))).data }
export async function getDashboard(signal?: AbortSignal) {
 const [summary, statuses, lowStock] = await Promise.all([
  api.get<SalesSummary>('/analytics/summary', { signal }),
  api.get<OrderStatusCounts>('/analytics/order-status', { signal }),
  api.get<LowStockIngredient[]>('/inventory/low-stock', { signal }),
 ])
 return { summary: summary.data, statuses: statuses.data, lowStock: lowStock.data }
}
