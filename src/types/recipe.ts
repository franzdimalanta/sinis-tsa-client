import type { MenuItem, MenuSize } from './menu'
import type { Ingredient } from './inventory'
export interface RecipeIngredient { ingredient: Ingredient | string | null; quantity: number }
export interface Recipe { _id: string; menuItem: MenuItem | string | null; size: MenuSize; ingredients: RecipeIngredient[]; createdAt: string; updatedAt: string }
export interface RecipeInput { menuItem: string; size: MenuSize; ingredients: { ingredient: string; quantity: number }[] }
