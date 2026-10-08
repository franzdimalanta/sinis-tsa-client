import { useCallback, useState } from 'react'
import { getInventoryTransactions } from '../../api/inventory'
import type { Ingredient, InventoryTransactionType } from '../../types/inventory'
import { useManagementData } from '../../hooks/useManagementData'
import { formatDate } from '../../utils/formatDate'
import LoadingState from '../common/LoadingState'
import ErrorState from '../common/ErrorState'
import EmptyState from '../common/EmptyState'
export default function TransactionHistory({ ingredients, version }: { ingredients: Ingredient[]; version: number }) {
 const [type, setType] = useState<InventoryTransactionType | ''>('')
 const [ingredient, setIngredient] = useState('')
 const tag = JSON.stringify([type, ingredient, version])
 const load = useCallback(async (signal: AbortSignal) => ({ tag, records: await getInventoryTransactions({ type: type || undefined, ingredient: ingredient || undefined }, signal) }), [tag, type, ingredient])
 const { data, loading, error, refresh } = useManagementData(load)
 return <section className="management-history space-y-4"><h2 className="text-xl font-semibold">Inventory transaction history</h2><div className="management-filters grid gap-4 sm:grid-cols-2"><label>Transaction type<select value={type} onChange={e => { setType(e.target.value as InventoryTransactionType | ''); refresh() }} className="mt-2 w-full rounded-lg border bg-white p-3 focus-visible:outline-2"><option value="">All</option><option value="stock-in">Stock In</option><option value="stock-out">Stock Out</option><option value="adjustment">Adjustment</option></select></label><label>Transaction ingredient<select value={ingredient} onChange={e => { setIngredient(e.target.value); refresh() }} className="mt-2 w-full rounded-lg border bg-white p-3 focus-visible:outline-2"><option value="">All ingredients</option>{ingredients.map(i => <option key={i._id} value={i._id}>{i.name}</option>)}</select></label></div>
 {error ? <ErrorState message={error} onRetry={refresh} /> : loading || data?.tag !== tag ? <LoadingState message="Loading transaction history..." /> : !data.records.length ? <EmptyState message="No inventory transactions match these filters." /> : <ul className="space-y-3">{data.records.map(record => <li key={record._id} className="rounded-xl border border-stone-200 bg-white p-5"><div className="flex flex-wrap justify-between gap-3"><h3 className="font-semibold">{typeof record.ingredient === 'object' ? record.ingredient?.name ?? 'Deleted ingredient' : record.ingredient}</h3><span className="management-badge" data-transaction-type={record.type}>{record.type}</span></div><p className="mt-2">Quantity: {record.quantity} {typeof record.ingredient === 'object' ? record.ingredient?.unit : ''}</p><p className="mt-2 break-words text-sm text-stone-600">{record.reason}</p>{record.order && <p className="mt-2 break-all text-sm">Order: {typeof record.order === 'string' ? record.order : record.order._id}</p>}<time dateTime={record.createdAt} className="mt-3 block text-sm text-stone-500">{formatDate(record.createdAt)}</time></li>)}</ul>}
 </section>
}
