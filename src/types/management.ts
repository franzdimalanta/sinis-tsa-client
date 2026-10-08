import type { MenuItemSize } from './menu'
import type { OrderStatus } from './order'
export interface MenuItemInput { name: string; description: string; category: string; sizes: MenuItemSize[]; isActive: boolean }
export interface SalesSummary { totalRevenue: number; totalOrders: number; totalItemsSold: number; averageOrderValue: number; totalDiscounts: number }
export type OrderStatusCounts = Record<OrderStatus, number>
export interface LowStockIngredient { _id: string; name: string; unit: 'g' | 'ml' | 'pcs'; stockQuantity: number; reorderLevel: number; shortage: number; isActive: boolean; createdAt: string; updatedAt: string }
