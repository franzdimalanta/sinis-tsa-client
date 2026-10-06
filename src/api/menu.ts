import api from './api'
import type { Category, MenuItem, MenuItemAvailabilityResponse } from '../types/menu'
export async function getCategories(signal?: AbortSignal) { return (await api.get<Category[]>('/categories', { signal })).data }
export async function getMenuItems(signal?: AbortSignal) { return (await api.get<MenuItem[]>('/menu-items', { signal })).data }
export async function getMenuItem(id: string, signal?: AbortSignal) { return (await api.get<MenuItem>(`/menu-items/${encodeURIComponent(id)}`, { signal })).data }
export async function getMenuItemAvailability(id: string, signal?: AbortSignal) { return (await api.get<MenuItemAvailabilityResponse>(`/menu-items/${encodeURIComponent(id)}/availability`, { signal })).data }
