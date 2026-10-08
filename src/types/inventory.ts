import type { Order } from './order'
export type IngredientUnit = 'g' | 'ml' | 'pcs'
export interface Ingredient { _id: string; name: string; unit: IngredientUnit; stockQuantity: number; reorderLevel: number; isActive: boolean; createdAt: string; updatedAt: string }
export interface LowStockIngredient extends Ingredient { shortage: number }
export type InventoryTransactionType = 'stock-in' | 'stock-out' | 'adjustment'
export interface InventoryTransaction { _id: string; ingredient: Ingredient | string | null; type: InventoryTransactionType; quantity: number; reason: string; order: Order | string | null; createdAt: string; updatedAt: string }
export interface StockInInput { ingredient: string; quantity: number; reason: string }
export interface IngredientInput { name: string; unit: IngredientUnit; reorderLevel: number; isActive: boolean }
export interface CreateIngredientInput extends IngredientInput { stockQuantity: number }
export interface TransactionFilters { type?: InventoryTransactionType; ingredient?: string }
