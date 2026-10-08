import { useState } from 'react'
import { getIngredients, getLowStock, deleteIngredient } from '../../api/inventory'
import type { Ingredient } from '../../types/inventory'
import { useManagementData } from '../../hooks/useManagementData'
import { useManagementMutation } from '../../hooks/useManagementMutation'
import StockInForm from '../../components/management/StockInForm'
import IngredientForm from '../../components/management/IngredientForm'
import TransactionHistory from '../../components/management/TransactionHistory'
import LoadingState from '../../components/common/LoadingState'
import ErrorState from '../../components/common/ErrorState'
import EmptyState from '../../components/common/EmptyState'
async function loadInventory(signal: AbortSignal) { const [ingredients, lowStock] = await Promise.all([getIngredients(signal), getLowStock(signal)]); return { ingredients, lowStock } }
export default function InventoryPage() {
 const { data, loading, error, refresh } = useManagementData(loadInventory)
 const [editor, setEditor] = useState<Ingredient | 'new' | null>(null)
 const [feedback, setFeedback] = useState('')
 const [version, setVersion] = useState(0)
 const mutation = useManagementMutation('ingredient')
 function changed(message: string) { setFeedback(message); setEditor(null); setVersion(value => value + 1); refresh() }
 async function remove(ingredient: Ingredient) { if (mutation.busy || !window.confirm('Delete ' + ingredient.name + '? Recipes may prevent deletion.')) return; await mutation.run(async () => { await deleteIngredient(ingredient._id); changed('Ingredient deleted successfully.') }) }
 return <div className="space-y-8"><h1 className="text-3xl font-semibold">Inventory management</h1><p role="status" className="text-sm text-amber-900">{mutation.busy ? 'Deleting ingredient...' : feedback}</p>{mutation.error && <p role="alert" className="rounded-xl bg-red-50 p-4 text-red-800">{mutation.error}</p>}
 {loading ? <LoadingState message="Loading inventory..." /> : error ? <ErrorState message={error} onRetry={refresh} /> : data && <>
 <section><div className="mb-4 flex flex-wrap justify-between gap-4"><h2 className="text-xl font-semibold">Current ingredient stock</h2><button onClick={() => setEditor('new')} disabled={mutation.busy} className="rounded-lg bg-amber-950 px-4 py-2 font-medium text-white focus-visible:outline-2">Create ingredient</button></div>
 {editor && <div className="mb-5"><IngredientForm key={editor === 'new' ? 'new' : editor._id} ingredient={editor === 'new' ? undefined : editor} onSuccess={() => changed(editor === 'new' ? 'Ingredient created successfully.' : 'Ingredient updated successfully.')} onCancel={() => setEditor(null)} /></div>}
 {!data.ingredients.length ? <EmptyState message="No ingredients yet. Create an ingredient to get started." /> : <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{data.ingredients.map(i => <article key={i._id} className="rounded-xl border border-stone-200 bg-white p-5"><h3 className="font-semibold break-words">{i.name}</h3><p className="mt-2">Stock: {i.stockQuantity} {i.unit}</p><p className="mt-1 text-sm text-stone-600">Reorder level: {i.reorderLevel} {i.unit}</p><p className="mt-2 text-sm">{i.isActive ? 'Active' : 'Inactive'}{i.stockQuantity <= i.reorderLevel ? ' / Low stock' : ''}</p><div className="mt-4 flex flex-wrap gap-3"><button onClick={() => setEditor(i)} disabled={mutation.busy} aria-label={'Edit ' + i.name} className="rounded-lg border px-3 py-2 focus-visible:outline-2">Edit</button><button onClick={() => { void remove(i) }} disabled={mutation.busy} aria-label={'Delete ' + i.name} className="rounded-lg border border-red-200 px-3 py-2 text-red-800 focus-visible:outline-2">Delete</button></div></article>)}</div>}</section>
 <section><h2 className="mb-4 text-xl font-semibold">Low-stock warnings</h2>{!data.lowStock.length ? <EmptyState message="No active ingredients are at or below their reorder level." /> : <ul className="grid gap-4 sm:grid-cols-2">{data.lowStock.map(i => <li key={i._id} className="rounded-xl border border-amber-200 bg-amber-50 p-5"><h3 className="font-semibold">{i.name}</h3><p className="mt-2 text-sm">Stock: {i.stockQuantity} {i.unit} / Reorder: {i.reorderLevel} {i.unit}</p><p className="mt-2 text-sm">Shortage: {i.shortage} {i.unit}</p></li>)}</ul>}</section>
 <section className="max-w-2xl rounded-xl border border-stone-200 bg-white p-5"><h2 className="mb-5 text-xl font-semibold">Manual stock-in</h2><StockInForm ingredients={data.ingredients} onSuccess={() => changed('Stock added successfully. Inventory and transaction history refreshed.')} /></section>
 <TransactionHistory ingredients={data.ingredients} version={version} />
 </>}
 </div>
}
