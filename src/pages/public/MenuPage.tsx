import { useState } from 'react'
import { useMenuItems } from '../../hooks/useMenuItems'
import MenuCard from '../../components/menu/MenuCard'
import LoadingState from '../../components/common/LoadingState'
import ErrorState from '../../components/common/ErrorState'
import EmptyState from '../../components/common/EmptyState'
export default function MenuPage() {
 const { items, categories, loading, error, refresh } = useMenuItems()
 const [categoryId, setCategoryId] = useState('')
 const filtered = items.filter(item => !categoryId || item.category?._id === categoryId)
 return <div><p className="text-sm font-semibold uppercase tracking-widest text-amber-800">Something for your coffee break</p><h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Our menu</h1><p className="mt-3 text-stone-600">Find your favorite, then check its sizes and current availability.</p>
 <div className="mt-6 flex flex-wrap gap-2" aria-label="Filter by category">{[{ _id: '', name: 'All' }, ...categories].map(category => <button key={category._id} onClick={() => setCategoryId(category._id)} aria-pressed={categoryId === category._id} className={'rounded-full border px-4 py-2 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 ' + (categoryId === category._id ? 'border-amber-950 bg-amber-950 text-white' : 'border-stone-300 bg-white text-stone-700 hover:bg-amber-50')}>{category.name}</button>)}</div>
 <div className="mt-6">{loading ? <LoadingState /> : error ? <ErrorState message={error} onRetry={refresh} /> : !filtered.length ? <EmptyState message={items.length ? 'No menu items in this category right now. Try another category.' : 'Our menu is currently empty. Please check back soon.'} /> : <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{filtered.map(item => <MenuCard key={item._id} item={item} />)}</div>}</div></div>
}
