export interface Category { _id: string; name: string; description: string; isActive: boolean; createdAt: string; updatedAt: string }
export type MenuSize = 'small' | 'medium' | 'large'
export interface MenuItemSize { size: MenuSize; price: number }
export interface MenuItem { _id: string; name: string; description: string; category: Category | null; sizes: MenuItemSize[]; isActive: boolean; createdAt: string; updatedAt: string }
export interface MenuItemAvailabilitySize extends MenuItemSize { available: boolean; maxServings: number; reason?: string }
export interface MenuItemAvailabilityResponse { menuItem: Pick<MenuItem, '_id' | 'name' | 'isActive'>; sizes: MenuItemAvailabilitySize[] }
