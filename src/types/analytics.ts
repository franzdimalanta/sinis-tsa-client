import type { SalesSummary, OrderStatusCounts } from './management'
export type AnalyticsSummary = SalesSummary
export type { OrderStatusCounts }
export interface BestSeller { menuItem: string | null; name: string; quantitySold: number; revenue: number }
export interface DailySales { date: string; revenue: number; orders: number; itemsSold: number }
export interface SalesFilters { start?: string; end?: string }
export interface SalesAnalytics { start: string | null; end: string | null; totalRevenue: number; totalOrders: number; totalItemsSold: number; averageOrderValue: number; dailySales: DailySales[] }
