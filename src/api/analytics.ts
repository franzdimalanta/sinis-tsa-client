import api from './api'
import type { AnalyticsSummary, BestSeller, SalesAnalytics, SalesFilters, OrderStatusCounts } from '../types/analytics'
export async function getAnalyticsSummary(signal?: AbortSignal) { return (await api.get<AnalyticsSummary>('/analytics/summary', { signal })).data }
export async function getBestSellers(limit = 5, signal?: AbortSignal) { return (await api.get<BestSeller[]>('/analytics/best-sellers', { params: { limit }, signal })).data }
export async function getSalesAnalytics(filters: SalesFilters = {}, signal?: AbortSignal) { return (await api.get<SalesAnalytics>('/analytics/sales', { params: filters, signal })).data }
export async function getOrderStatusCounts(signal?: AbortSignal) { return (await api.get<OrderStatusCounts>('/analytics/order-status', { signal })).data }
