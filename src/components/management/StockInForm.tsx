import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Ingredient } from '../../types/inventory'
import { stockIn } from '../../api/inventory'
import { stockInSchema } from '../../utils/inventoryForms'
import type { StockInValues } from '../../utils/inventoryForms'
import { useManagementMutation } from '../../hooks/useManagementMutation'
export default function StockInForm({ ingredients, onSuccess }: { ingredients: Ingredient[]; onSuccess: () => void }) {
 const { register, handleSubmit, reset, formState: { errors } } = useForm<StockInValues>({ resolver: zodResolver(stockInSchema), defaultValues: { ingredient: '', reason: '' } })
 const { busy, error, run } = useManagementMutation('ingredient')
 const active = ingredients.filter(ingredient => ingredient.isActive)
 async function submit(values: StockInValues) {
  await run(async () => { if (!active.some(i => i._id === values.ingredient)) throw new Error('Invalid selection'); await stockIn(values); reset(); onSuccess() })
 }
 const input = 'mt-2 w-full rounded-lg border border-stone-300 bg-white p-3 focus-visible:outline-2 focus-visible:outline-amber-800'
 return <form noValidate onSubmit={event => { void handleSubmit(submit)(event) }}><fieldset disabled={busy || !active.length} className="space-y-4">
  <label className="block">Ingredient<select {...register('ingredient')} className={input}><option value="">Choose active ingredient</option>{active.map(i => <option key={i._id} value={i._id}>{i.name} ({i.unit})</option>)}</select>{errors.ingredient && <span role="alert" className="block text-sm text-red-800">{errors.ingredient.message}</span>}</label>
  <label className="block">Quantity<input type="number" step="any" {...register('quantity', { valueAsNumber: true })} className={input} />{errors.quantity && <span role="alert" className="block text-sm text-red-800">{errors.quantity.message}</span>}</label>
  <label className="block">Reason<input {...register('reason')} className={input} />{errors.reason && <span role="alert" className="block text-sm text-red-800">{errors.reason.message}</span>}</label>
  <button type="submit" className="rounded-lg bg-amber-950 px-5 py-3 font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50">{busy ? 'Adding stock...' : 'Add stock'}</button>
 </fieldset>{!active.length && <p>No active ingredients are available for stock-in.</p>}{error && <p role="alert" className="mt-3 text-red-800">{error}</p>}<p role="status" className="mt-3 text-sm">{busy ? 'Adding stock...' : ''}</p></form>
}
