import { z } from 'zod'
export const objectIdSchema = z.string().regex(/^[a-f\d]{24}$/i, 'Choose a valid record.')
export const stockInSchema = z.object({ ingredient: objectIdSchema, quantity: z.number().finite().positive('Quantity must be greater than 0.'), reason: z.string().trim().min(1, 'Reason is required.').max(300, 'Use at most 300 characters.') })
export type StockInValues = z.infer<typeof stockInSchema>
export const ingredientSchema = z.object({ name: z.string().trim().min(2, 'Use at least 2 characters.').max(100, 'Use at most 100 characters.'), unit: z.enum(['g', 'ml', 'pcs']), reorderLevel: z.number().finite().min(0, 'Reorder level cannot be negative.'), isActive: z.boolean() })
export const createIngredientSchema = ingredientSchema.extend({ stockQuantity: z.number().finite().min(0, 'Initial stock cannot be negative.') })
export type IngredientValues = z.infer<typeof ingredientSchema>
export type CreateIngredientValues = z.infer<typeof createIngredientSchema>
export const recipeSchema = z.object({ menuItem: objectIdSchema, size: z.enum(['small', 'medium', 'large']), ingredients: z.array(z.object({ ingredient: objectIdSchema, quantity: z.number().finite().positive('Quantity must be greater than 0.') })).min(1, 'Add at least one ingredient.') }).superRefine((value, ctx) => {
 const seen = new Set<string>()
 value.ingredients.forEach((row, index) => { if (seen.has(row.ingredient)) ctx.addIssue({ code: 'custom', path: ['ingredients', index, 'ingredient'], message: 'This ingredient is already selected.' }); seen.add(row.ingredient) })
})
export type RecipeValues = z.infer<typeof recipeSchema>
