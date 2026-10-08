import { Link } from 'react-router-dom'
import { getDashboard } from '../../api/management'
import { useManagementData } from '../../hooks/useManagementData'
import { formatPeso } from '../../utils/formatPeso'
import LoadingState from '../../components/common/LoadingState'
import ErrorState from '../../components/common/ErrorState'
import EmptyState from '../../components/common/EmptyState'
export default function DashboardPage() {
 const { data, loading, error, refresh } = useManagementData(getDashboard)
 return <div className="space-y-6"><h1 className="text-3xl font-semibold">Management dashboard</h1><p className="text-stone-600">Sales from completed orders, current order counts, and stock that needs attention.</p>
 {loading ? <LoadingState message="Loading dashboard..." /> : error ? <ErrorState message={error} onRetry={refresh} /> : data && <>
  <section aria-label="Sales summary" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{[['Total revenue', formatPeso(data.summary.totalRevenue)], ['Completed orders', data.summary.totalOrders], ['Items sold', data.summary.totalItemsSold], ['Average order value', formatPeso(data.summary.averageOrderValue)]].map(([label, value]) => <div key={label} className="rounded-xl border border-stone-200 bg-white p-5"><h2 className="text-sm text-stone-600">{label}</h2><p className="mt-3 text-2xl font-semibold break-words">{value}</p></div>)}</section>
  <section className="rounded-2xl border border-stone-200 bg-white p-6"><h2 className="text-xl font-semibold">Order status overview</h2><dl className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-5">{Object.entries(data.statuses).map(([status, count]) => <div key={status} className="rounded-xl bg-amber-50 p-4"><dt className="capitalize text-stone-600">{status}</dt><dd className="mt-2 text-2xl font-semibold">{count}</dd></div>)}</dl></section>
  <section><h2 className="mb-4 text-xl font-semibold">Low stock ({data.lowStock.length})</h2>{!data.lowStock.length ? <EmptyState message="No ingredients are currently at or below their reorder level." /> : <ul className="space-y-3">{data.lowStock.slice(0, 5).map(ingredient => <li key={ingredient._id} className="rounded-xl border border-stone-200 bg-white p-5"><h3 className="font-semibold">{ingredient.name}</h3><p className="mt-2 text-sm text-stone-600">Current stock: {ingredient.stockQuantity} {ingredient.unit} / Reorder level: {ingredient.reorderLevel} {ingredient.unit}</p></li>)}</ul>}</section>
 </>}
 <Link to="/manage/menu" className="inline-block rounded-xl bg-amber-950 px-5 py-3 font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2">Manage menu</Link></div>
}
