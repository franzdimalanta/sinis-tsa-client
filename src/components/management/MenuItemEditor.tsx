import { useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getCategories, getMenuItem } from '../../api/menu'
import { createMenuItem, updateMenuItem } from '../../api/management'
import type { MenuItemInput } from '../../types/management'
import { useManagementData } from '../../hooks/useManagementData'
import LoadingState from '../common/LoadingState'
import ErrorState from '../common/ErrorState'
import EmptyState from '../common/EmptyState'
import MenuItemForm from './MenuItemForm'
export default function MenuItemEditor({ id }: { id?: string }) {
 const navigate = useNavigate()
 const load = useCallback(async (signal: AbortSignal) => {
  const [categories, item] = await Promise.all([getCategories(signal), id ? getMenuItem(id, signal) : Promise.resolve(undefined)])
  return { categories, item }
 }, [id])
 const { data, loading, error, refresh } = useManagementData(load)
 async function save(input: MenuItemInput) {
  if (id) await updateMenuItem(id, input); else await createMenuItem(input)
  navigate('/manage/menu', { state: { message: id ? 'Menu item updated successfully.' : 'Menu item created successfully.' } })
 }
 return <div className="space-y-6"><Link to="/manage/menu" className="underline underline-offset-4 focus-visible:outline-2">Back to menu management</Link><h1 className="text-3xl font-semibold">{id ? 'Edit menu item' : 'Add menu item'}</h1>
  {loading ? <LoadingState message="Loading menu form..." /> : error ? <ErrorState message={error} onRetry={refresh} /> : data && data.categories.length ? <MenuItemForm categories={data.categories} item={data.item} onSave={save} /> : <EmptyState message="No categories are available. A category is required before adding a menu item." />}
 </div>
}
