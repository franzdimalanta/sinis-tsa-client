import type { MenuItem, MenuItemAvailabilityResponse } from '../types/menu'

export function availableProductSizes(item: MenuItem, availability: MenuItemAvailabilityResponse) {
  return item.sizes.filter(size => item.isActive && availability.sizes.some(stock => stock.size === size.size && stock.available))
}
