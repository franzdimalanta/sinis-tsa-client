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
 return <div className="customer-page"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Something for your coffee break</p><h1 className="mt-4 text-4xl tracking-tight text-primary sm:text-5xl">Our menu</h1><p className="mt-4 max-w-xl leading-7 text-muted">Find your favorite, then check its sizes and current availability.</p>
 <div className="mt-8 flex flex-wrap gap-2 border-y border-border py-5" aria-label="Filter by category">{[{ _id: '', name: 'All' }, ...categories].map(category => <button key={category._id} onClick={() => setCategoryId(category._id)} aria-pressed={categoryId === category._id} className={'min-h-11 rounded-lg border px-5 py-2 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 ' + (categoryId === category._id ? 'border-primary bg-primary text-background' : 'border-border bg-surface-warm text-primary hover:bg-border')}>{category.name}</button>)}</div>
 <div className="mt-8">{loading ? <LoadingState /> : error ? <ErrorState message={error} onRetry={refresh} /> : !filtered.length ? <EmptyState message={items.length ? 'No menu items in this category right now. Try another category.' : 'Our menu is currently empty. Please check back soon.'} /> : <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">{filtered.map(item => <MenuCard key={item._id} item={item} />)}</div>}</div></div>
}
