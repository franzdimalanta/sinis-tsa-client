import { useCallback, useState } from 'react'
import { getBestSellers } from '../../api/analytics'
import { useManagementData } from '../../hooks/useManagementData'
import { getAnalyticsError } from '../../utils/analytics'
import { formatPeso } from '../../utils/formatPeso'
import LoadingState from '../common/LoadingState'
import ErrorState from '../common/ErrorState'
import EmptyState from '../common/EmptyState'
export default function BestSellers() {
 const [limit, setLimit] = useState(5)
 const load = useCallback(async (signal: AbortSignal) => ({ limit, items: await getBestSellers(limit, signal) }), [limit])
 const { data, loading, error, refresh } = useManagementData(load, getAnalyticsError)
 return <section aria-label="Best sellers" className="space-y-4"><div className="flex flex-wrap items-center justify-between gap-4"><h2 className="text-xl font-semibold">Best sellers</h2><label>Show<select value={limit} onChange={e => { const value = Number(e.target.value); if ([5, 10, 20].includes(value)) { setLimit(value); refresh() } }} className="ml-3 rounded-lg border bg-white p-2 focus-visible:outline-2">{[5, 10, 20].map(value => <option key={value} value={value}>Top {value}</option>)}</select></label></div><p className="text-sm text-stone-600">All completed orders. Revenue uses historical item totals before order discounts.</p>
 {error ? <ErrorState message={error} onRetry={refresh} /> : loading || data?.limit !== limit ? <LoadingState message="Loading best sellers..." /> : !data.items.length ? <EmptyState message="No completed-order sales yet." /> : <ol className="space-y-3">{data.items.map((item, index) => <li key={item.menuItem ?? item.name} className="rounded-xl border border-stone-200 bg-white p-5"><div className="flex flex-wrap justify-between gap-3"><h3 className="font-semibold break-words">{index + 1}. {item.name}</h3><p className="font-semibold">{formatPeso(item.revenue)}</p></div><p className="mt-2 text-sm text-stone-600">Quantity sold: {item.quantitySold}</p></li>)}</ol>}
 </section>
}
