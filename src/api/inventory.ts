import api from './api'
import type { Ingredient, LowStockIngredient, InventoryTransaction, StockInInput, IngredientInput, CreateIngredientInput, TransactionFilters } from '../types/inventory'
export async function getIngredients(signal?: AbortSignal) { return (await api.get<Ingredient[]>('/ingredients', { signal })).data }
export async function getLowStock(signal?: AbortSignal) { return (await api.get<LowStockIngredient[]>('/inventory/low-stock', { signal })).data }
export async function getInventoryTransactions(filters: TransactionFilters = {}, signal?: AbortSignal) { return (await api.get<InventoryTransaction[]>('/inventory/transactions', { params: filters, signal })).data }
export async function stockIn(payload: StockInInput) { return (await api.post<{ ingredient: Ingredient; transaction: InventoryTransaction }>('/inventory/stock-in', payload)).data }
export async function createIngredient(payload: CreateIngredientInput) { return (await api.post<Ingredient>('/ingredients', payload)).data }
export async function updateIngredient(id: string, payload: IngredientInput) {
 // Explicit allowlist: existing stock can only change through inventory operations.
 const { name, unit, reorderLevel, isActive } = payload
 return (await api.put<Ingredient>('/ingredients/' + encodeURIComponent(id), { name, unit, reorderLevel, isActive })).data
}
export async function deleteIngredient(id: string) { return (await api.delete<{ message: string }>('/ingredients/' + encodeURIComponent(id))).data }
