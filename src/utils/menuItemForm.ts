import { z } from 'zod'
import type { MenuItem } from '../types/menu'
import type { MenuItemInput } from '../types/management'
export const menuSizes = ['small', 'medium', 'large'] as const
const sizeField = z.object({ enabled: z.boolean(), price: z.string() })
export const menuItemSchema = z.object({
 name: z.string().trim().min(2, 'Use at least 2 characters.').max(100, 'Use at most 100 characters.'),
 description: z.string().trim().min(1, 'Description is required.').max(500, 'Use at most 500 characters.'),
 category: z.string().regex(/^[a-f\d]{24}$/i, 'Choose a category.'),
 isActive: z.boolean(),
 sizes: z.object({ small: sizeField, medium: sizeField, large: sizeField }),
}).superRefine((data, ctx) => {
 if (!menuSizes.some(size => data.sizes[size].enabled)) ctx.addIssue({ code: 'custom', path: ['sizes', 'root'], message: 'Enable at least one size.' })
 for (const size of menuSizes) {
  const field = data.sizes[size]
  if (field.enabled && (!field.price.trim() || !Number.isFinite(Number(field.price)) || Number(field.price) < 0)) ctx.addIssue({ code: 'custom', path: ['sizes', size, 'price'], message: 'Enter a finite price of 0 or more.' })
 }
})
export type MenuItemFormValues = z.infer<typeof menuItemSchema>
export function getMenuDefaults(item?: MenuItem): MenuItemFormValues {
 const sizeValue = (size: typeof menuSizes[number]) => { const entry = item?.sizes.find(entry => entry.size === size); return { enabled: !!entry, price: entry ? String(entry.price) : '' } }
 return { name: item?.name ?? '', description: item?.description ?? '', category: item?.category?._id ?? '', isActive: item?.isActive ?? true,
  sizes: { small: sizeValue('small'), medium: sizeValue('medium'), large: sizeValue('large') } }
}
export function toMenuItemInput(values: MenuItemFormValues): MenuItemInput {
 return { name: values.name, description: values.description, category: values.category, isActive: values.isActive,
  sizes: menuSizes.filter(size => values.sizes[size].enabled).map(size => ({ size, price: Number(values.sizes[size].price) })) }
}
