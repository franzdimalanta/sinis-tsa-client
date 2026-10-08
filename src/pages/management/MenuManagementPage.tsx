import { useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { getCategories, getMenuItems } from '../../api/menu'
import { deleteMenuItem } from '../../api/management'
import { useManagementData } from '../../hooks/useManagementData'
import { getManagementError } from '../../utils/managementError'
import { formatPeso } from '../../utils/formatPeso'
import type { MenuItem } from '../../types/menu'
import LoadingState from '../../components/common/LoadingState'
import ErrorState from '../../components/common/ErrorState'
import EmptyState from '../../components/common/EmptyState'
async function loadMenu(signal: AbortSignal) { const [items, categories] = await Promise.all([getMenuItems(signal), getCategories(signal)]); return { items, categories } }
export default function MenuManagementPage() {
 const { data, loading, error, refresh } = useManagementData(loadMenu)
 const [search, setSearch] = useState(''); const [category, setCategory] = useState(''); const [status, setStatus] = useState('all')
 const location = useLocation()
 const initialState: unknown = location.state
 const [feedback, setFeedback] = useState(typeof initialState === 'object' && initialState !== null && 'message' in initialState && typeof initialState.message === 'string' ? initialState.message : '')
 const [actionError, setActionError] = useState<string | null>(null)
 const [deleting, setDeleting] = useState<string | null>(null)
 const locked = useRef(false)
 async function remove(item: MenuItem) {
  if (locked.current || !window.confirm('Delete ' + item.name + '? This cannot be undone.')) return
  locked.current = true; setDeleting(item._id); setActionError(null); setFeedback('')
  try { await deleteMenuItem(item._id); setFeedback(item.name + ' deleted successfully.'); refresh() }
  catch (error: unknown) { setActionError(getManagementError(error)) }
  finally { locked.current = false; setDeleting(null) }
 }
 const filtered = data?.items.filter(item => item.name.toLowerCase().includes(search.trim().toLowerCase()) && (!category || item.category?._id === category) && (status === 'all' || item.isActive === (status === 'active'))) ?? []
 const inputStyle = 'mt-2 w-full rounded-lg border border-stone-300 bg-white p-3 focus-visible:outline-2 focus-visible:outline-amber-800'
 return <div className="space-y-6"><div className="flex flex-wrap items-center justify-between gap-4"><h1 className="text-3xl font-semibold">Menu management</h1><Link to="/manage/menu/new" className="rounded-xl bg-amber-950 px-5 py-3 font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2">Add menu item</Link></div>
 <div className="grid gap-4 sm:grid-cols-3"><label>Search by name<input value={search} onChange={e => setSearch(e.target.value)} className={inputStyle} /></label><label>Category<select value={category} onChange={e => setCategory(e.target.value)} className={inputStyle}><option value="">All categories</option>{data?.categories.map(category => <option key={category._id} value={category._id}>{category.name}</option>)}</select></label><label>Status<select value={status} onChange={e => setStatus(e.target.value)} className={inputStyle}><option value="all">All</option><option value="active">Active</option><option value="inactive">Inactive</option></select></label></div>
 <p role="status" className="text-sm text-amber-900">{feedback}</p>{actionError && <p role="alert" className="rounded-xl bg-red-50 p-4 text-red-900">{actionError}</p>}
 {loading ? <LoadingState message="Loading all menu items..." /> : error ? <ErrorState message={error} onRetry={refresh} /> : !filtered.length ? <EmptyState message="No menu items match your filters." /> : <div className="space-y-4">{filtered.map(item => <article key={item._id} className="rounded-2xl border border-stone-200 bg-white p-5 sm:p-6"><div className="flex flex-wrap items-start justify-between gap-3"><div className="min-w-0"><h2 className="text-xl font-semibold break-words">{item.name}</h2><p className="mt-1 text-sm text-stone-600">{item.category?.name ?? 'Uncategorized'}</p></div><span className={'rounded-full px-3 py-1 text-sm ' + (item.isActive ? 'bg-amber-100 text-amber-950' : 'bg-stone-100 text-stone-600')}>{item.isActive ? 'Active' : 'Inactive'}</span></div><p className="mt-3 text-sm leading-6 text-stone-600">{item.description}</p><ul className="mt-4 flex flex-wrap gap-3">{item.sizes.map(size => <li key={size.size} className="rounded-lg bg-stone-50 px-3 py-2 text-sm capitalize">{size.size}: {formatPeso(size.price)}</li>)}</ul><div className="mt-5 flex gap-4"><Link to={'/manage/menu/' + item._id + '/edit'} aria-label={'Edit ' + item.name} className="rounded-lg border border-stone-300 px-4 py-2 font-medium focus-visible:outline-2 focus-visible:outline-offset-2">Edit</Link><button onClick={() => { void remove(item) }} disabled={deleting !== null} aria-label={'Delete ' + item.name} className="rounded-lg border border-red-200 px-4 py-2 font-medium text-red-800 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50">{deleting === item._id ? 'Deleting...' : 'Delete'}</button></div></article>)}</div>}
 </div>
}
