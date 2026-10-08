import api from './api'
import type { Recipe, RecipeInput } from '../types/recipe'
export async function getRecipes(signal?: AbortSignal) { return (await api.get<Recipe[]>('/recipes', { signal })).data }
export async function getRecipe(id: string, signal?: AbortSignal) { return (await api.get<Recipe>('/recipes/' + encodeURIComponent(id), { signal })).data }
export async function createRecipe(payload: RecipeInput) { return (await api.post<Recipe>('/recipes', payload)).data }
export async function updateRecipe(id: string, payload: RecipeInput) { return (await api.put<Recipe>('/recipes/' + encodeURIComponent(id), payload)).data }
export async function deleteRecipe(id: string) { return (await api.delete<{ message: string }>('/recipes/' + encodeURIComponent(id))).data }
