import { useForm, useFieldArray, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Recipe } from '../../types/recipe'
import type { MenuItem } from '../../types/menu'
import type { Ingredient } from '../../types/inventory'
import { createRecipe, updateRecipe } from '../../api/recipes'
import { recipeSchema } from '../../utils/inventoryForms'
import type { RecipeValues } from '../../utils/inventoryForms'
import { useManagementMutation } from '../../hooks/useManagementMutation'
export default function RecipeForm({ recipe, menuItems, ingredients, onSuccess, onCancel }: { recipe?: Recipe; menuItems: MenuItem[]; ingredients: Ingredient[]; onSuccess: () => void; onCancel: () => void }) {
 const { register, control, handleSubmit, setValue, setError, formState: { errors } } = useForm<RecipeValues>({ resolver: zodResolver(recipeSchema), defaultValues: { menuItem: typeof recipe?.menuItem === 'string' ? recipe.menuItem : recipe?.menuItem?._id ?? '', size: recipe?.size,
 ingredients: recipe?.ingredients.map(row => ({ ingredient: typeof row.ingredient === 'string' ? row.ingredient : row.ingredient?._id ?? '', quantity: row.quantity })) ?? [{ ingredient: '', quantity: 1 }] } })
 const { fields, append, remove } = useFieldArray({ control, name: 'ingredients' })
 const menuId = useWatch({ control, name: 'menuItem' })
 const rows = useWatch({ control, name: 'ingredients' })
 const selected = menuItems.find(item => item._id === menuId)
 const { busy, error, run } = useManagementMutation('recipe')
 async function submit(values: RecipeValues) {
  if (!selected) { setError('menuItem', { message: 'Choose an existing menu item.' }); return }
  if (!selected.sizes.some(size => size.size === values.size)) { setError('size', { message: 'Choose a size listed on this menu item.' }); return }
  if (!values.ingredients.every(row => ingredients.some(i => i._id === row.ingredient))) { setError('ingredients', { message: 'Choose existing ingredients for every row.' }); return }
  await run(async () => { if (recipe) await updateRecipe(recipe._id, values); else await createRecipe(values); onSuccess() })
 }
 const input = 'mt-2 w-full rounded-lg border border-stone-300 bg-white p-3 focus-visible:outline-2 focus-visible:outline-amber-800'
 return <form noValidate onSubmit={event => { void handleSubmit(submit)(event) }} className="management-editor rounded-xl border border-stone-200 bg-white p-5"><h2 className="text-xl font-semibold">{recipe ? 'Edit recipe' : 'Add recipe'}</h2><fieldset disabled={busy} className="mt-5 space-y-4">
 <label className="block">Menu item<select {...register('menuItem', { onChange: () => setValue('size', '' as RecipeValues['size']) })} className={input}><option value="">Choose menu item</option>{menuItems.map(item => <option key={item._id} value={item._id}>{item.name}{item.isActive ? '' : ' (inactive)'}</option>)}</select>{errors.menuItem && <span role="alert" className="text-sm text-red-800">{errors.menuItem.message}</span>}</label>
 <label className="block">Size<select {...register('size')} disabled={!selected} className={input}><option value="">Choose size</option>{selected?.sizes.map(size => <option key={size.size} value={size.size}>{size.size}</option>)}</select>{errors.size && <span role="alert" className="text-sm text-red-800">{errors.size.message}</span>}</label>
 <fieldset><legend className="font-semibold">Ingredients per serving</legend>{fields.map((field, index) => <div key={field.id} className="mt-4 rounded-xl border border-stone-200 p-4"><label className="block">Ingredient {index + 1}<select {...register(`ingredients.${index}.ingredient`)} className={input}><option value="">Choose ingredient</option>{ingredients.map(i => <option key={i._id} value={i._id} disabled={rows.some((row, rowIndex) => rowIndex !== index && row.ingredient === i._id)}>{i.name} ({i.unit}){i.isActive ? '' : ' (inactive)'}</option>)}</select>{errors.ingredients?.[index]?.ingredient && <span role="alert" className="text-sm text-red-800">{errors.ingredients[index]?.ingredient?.message}</span>}</label><label className="mt-3 block">Quantity ({ingredients.find(i => i._id === rows[index]?.ingredient)?.unit ?? 'unit'})<input type="number" step="any" {...register(`ingredients.${index}.quantity`, { valueAsNumber: true })} className={input} />{errors.ingredients?.[index]?.quantity && <span role="alert" className="text-sm text-red-800">{errors.ingredients[index]?.quantity?.message}</span>}</label><button type="button" onClick={() => remove(index)} className="mt-3 rounded-lg border px-3 py-2 text-sm focus-visible:outline-2" aria-label={'Remove ingredient row ' + (index + 1)}>Remove row</button></div>)}
 {errors.ingredients?.root && <p role="alert" className="text-sm text-red-800">{errors.ingredients.root.message}</p>}{errors.ingredients?.message && <p role="alert" className="text-sm text-red-800">{errors.ingredients.message}</p>}
 <button type="button" onClick={() => append({ ingredient: '', quantity: 1 })} className="mt-4 rounded-lg border px-4 py-2 focus-visible:outline-2">Add ingredient row</button></fieldset>
 <div className="flex flex-wrap gap-3"><button type="submit" className="rounded-lg bg-amber-950 px-5 py-3 font-semibold text-white focus-visible:outline-2">{busy ? 'Saving...' : 'Save recipe'}</button><button type="button" onClick={onCancel} className="rounded-lg border px-5 py-3 focus-visible:outline-2">Cancel</button></div>
 </fieldset>{error && <p role="alert" className="mt-3 text-red-800">{error}</p>}<p role="status" className="mt-3 text-sm">{busy ? 'Saving recipe...' : ''}</p></form>
}
