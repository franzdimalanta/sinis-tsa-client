import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Ingredient } from '../../types/inventory'
import { createIngredient, updateIngredient } from '../../api/inventory'
import { createIngredientSchema } from '../../utils/inventoryForms'
import type { CreateIngredientValues } from '../../utils/inventoryForms'
import { useManagementMutation } from '../../hooks/useManagementMutation'
export default function IngredientForm({ ingredient, onSuccess, onCancel }: { ingredient?: Ingredient; onSuccess: () => void; onCancel: () => void }) {
 // For editing, stockQuantity stays a hidden default and is never sent in PUT.
 const { register, handleSubmit, formState: { errors } } = useForm<CreateIngredientValues>({ resolver: zodResolver(createIngredientSchema), defaultValues: { name: ingredient?.name ?? '', unit: ingredient?.unit ?? 'g', stockQuantity: ingredient?.stockQuantity ?? 0, reorderLevel: ingredient?.reorderLevel ?? 0, isActive: ingredient?.isActive ?? true } })
 const { busy, error, run } = useManagementMutation('ingredient')
 async function submit(values: CreateIngredientValues) { await run(async () => { if (ingredient) { const { name, unit, reorderLevel, isActive } = values; await updateIngredient(ingredient._id, { name, unit, reorderLevel, isActive }) } else await createIngredient(values); onSuccess() }) }
 const input = 'mt-2 w-full rounded-lg border border-stone-300 bg-white p-3 focus-visible:outline-2 focus-visible:outline-amber-800'
 return <form noValidate onSubmit={event => { void handleSubmit(submit)(event) }} className="management-editor rounded-xl border border-stone-200 bg-white p-5"><h3 className="text-lg font-semibold">{ingredient ? 'Edit ingredient' : 'Create ingredient'}</h3><fieldset disabled={busy} className="mt-4 space-y-4">
 <label className="block">Name<input {...register('name')} className={input} />{errors.name && <span role="alert" className="text-sm text-red-800">{errors.name.message}</span>}</label>
 <label className="block">Unit<select {...register('unit')} className={input}>{['g','ml','pcs'].map(unit => <option key={unit}>{unit}</option>)}</select>{errors.unit && <span role="alert">{errors.unit.message}</span>}</label>
 {!ingredient && <label className="block">Initial stock<input type="number" step="any" {...register('stockQuantity', { valueAsNumber: true })} className={input} />{errors.stockQuantity && <span role="alert" className="text-sm text-red-800">{errors.stockQuantity.message}</span>}</label>}
 <label className="block">Reorder level<input type="number" step="any" {...register('reorderLevel', { valueAsNumber: true })} className={input} />{errors.reorderLevel && <span role="alert" className="text-sm text-red-800">{errors.reorderLevel.message}</span>}</label>
 <label className="flex gap-3"><input type="checkbox" {...register('isActive')} />Active ingredient</label>
 {ingredient && <p className="text-sm text-stone-600">Stock changes must use inventory operations.</p>}
 <div className="flex flex-wrap gap-3"><button type="submit" className="rounded-lg bg-amber-950 px-5 py-3 font-semibold text-white focus-visible:outline-2">{busy ? 'Saving...' : 'Save ingredient'}</button><button type="button" onClick={onCancel} className="rounded-lg border px-5 py-3 focus-visible:outline-2">Cancel</button></div>
 </fieldset>{error && <p role="alert" className="mt-3 text-red-800">{error}</p>}<p role="status" className="mt-3 text-sm">{busy ? 'Saving ingredient...' : ''}</p></form>
}
