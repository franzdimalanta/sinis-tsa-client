import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Category, MenuItem } from '../../types/menu'
import type { MenuItemInput } from '../../types/management'
import { menuItemSchema, menuSizes, getMenuDefaults, toMenuItemInput } from '../../utils/menuItemForm'
import type { MenuItemFormValues } from '../../utils/menuItemForm'
import { getManagementError } from '../../utils/managementError'
const inputStyle = 'mt-2 w-full rounded-lg border border-stone-300 bg-white p-3 focus-visible:outline-2 focus-visible:outline-amber-800'
export default function MenuItemForm({ categories, item, onSave }: { categories: Category[]; item?: MenuItem; onSave: (input: MenuItemInput) => Promise<void> }) {
 const { register, control, handleSubmit, formState: { errors } } = useForm<MenuItemFormValues>({ resolver: zodResolver(menuItemSchema), defaultValues: getMenuDefaults(item) })
 const sizes = useWatch({ control, name: 'sizes' })
 const [saving, setSaving] = useState(false)
 const [error, setError] = useState<string | null>(null)
 const locked = useRef(false)
 async function submit(values: MenuItemFormValues) {
  if (locked.current) return
  if (!categories.some(category => category._id === values.category)) { setError('Choose an existing category.'); return }
  locked.current = true; setSaving(true); setError(null)
  try { await onSave(toMenuItemInput(values)) } catch (error: unknown) { setError(getManagementError(error)) }
  finally { locked.current = false; setSaving(false) }
 }
 return <form noValidate onSubmit={event => { void handleSubmit(submit)(event) }} className="management-editor max-w-3xl rounded-2xl border border-stone-200 bg-white p-6">
  <fieldset disabled={saving} className="space-y-5"><h2 className="management-form-heading">Basic information</h2>
   <div><label htmlFor="name" className="font-medium">Name</label><input id="name" {...register('name')} className={inputStyle} aria-invalid={!!errors.name} aria-describedby="name-error" />{errors.name && <p id="name-error" role="alert" className="mt-2 text-sm text-red-800">{errors.name.message}</p>}</div>
   <div><label htmlFor="description" className="font-medium">Description</label><textarea id="description" rows={3} {...register('description')} className={inputStyle} aria-invalid={!!errors.description} aria-describedby="description-error" />{errors.description && <p id="description-error" role="alert" className="mt-2 text-sm text-red-800">{errors.description.message}</p>}</div>
   <h2 className="management-form-heading">Category &amp; visibility</h2><div><label htmlFor="category" className="font-medium">Category</label><select id="category" {...register('category')} className={inputStyle} aria-invalid={!!errors.category} aria-describedby="category-error"><option value="">Choose a category</option>{categories.map(category => <option key={category._id} value={category._id}>{category.name}{category.isActive ? '' : ' (inactive)'}</option>)}</select>{errors.category && <p id="category-error" role="alert" className="mt-2 text-sm text-red-800">{errors.category.message}</p>}</div>
   <label className="flex items-center gap-3"><input type="checkbox" {...register('isActive')} className="accent-amber-900" />Active menu item</label>
   <fieldset><legend className="management-form-heading">Available sizes &amp; pricing (PHP)</legend><p className="mt-2 text-sm text-stone-600">Enable at least one size and enter its price.</p>
    {menuSizes.map(size => <div key={size} className="mt-4 rounded-xl border border-stone-200 p-4"><label className="flex items-center gap-3 capitalize"><input type="checkbox" {...register(`sizes.${size}.enabled`)} className="accent-amber-900" />{size}</label><label htmlFor={size + '-price'} className="mt-3 block text-sm capitalize">{size} price</label><input id={size + '-price'} type="number" step="any" min="0" disabled={!sizes[size]?.enabled} {...register(`sizes.${size}.price`)} className={inputStyle} aria-invalid={!!errors.sizes?.[size]?.price} aria-describedby={size + '-error'} />{errors.sizes?.[size]?.price && <p id={size + '-error'} role="alert" className="mt-2 text-sm text-red-800">{errors.sizes[size]?.price?.message}</p>}</div>)}
    {errors.sizes?.root && <p role="alert" className="mt-3 text-sm text-red-800">{errors.sizes.root.message}</p>}
   </fieldset>
   <div className="flex flex-wrap gap-3"><button type="submit" className="ui-button ui-button-primary">{saving ? 'Saving...' : item ? 'Save changes' : 'Create menu item'}</button><Link to="/manage/menu" className="ui-button ui-button-secondary">Cancel</Link></div>
  </fieldset>
  {error && <p role="alert" className="mt-5 text-red-800">{error}</p>}
  <p role="status" className="mt-3 text-sm text-stone-600">{saving ? 'Saving menu item...' : ''}</p>
 </form>
}
