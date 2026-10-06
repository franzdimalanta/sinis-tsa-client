import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useMenuItem } from '../../hooks/useMenuItem'
import type { MenuSize } from '../../types/menu'
import { formatPeso } from '../../utils/formatPeso'
import LoadingState from '../../components/common/LoadingState'
import ErrorState from '../../components/common/ErrorState'
import { useCart } from '../../hooks/useCart'
function MenuItemDetails({ id }: { id: string }) {
 const { data, loading, error, refresh } = useMenuItem(id)
 const [choice, setChoice] = useState<MenuSize | null>(null)
 const { addItem } = useCart()
 const [feedback, setFeedback] = useState('')
 if (loading) return <LoadingState message="Loading drink details and availability..." />
 if (error || !data) return <ErrorState message={error ?? 'This menu item could not be found.'} onRetry={refresh} />
 const { item, availability } = data
 const availableSizes = availability.sizes.filter(size => item.isActive && size.available)
 const selected = availableSizes.find(size => size.size === choice)?.size ?? availableSizes[0]?.size
 const selectedSize = item.sizes.find(size => size.size === selected)
 function handleAdd() {
  if (!selectedSize) return
  const added = addItem({ menuItemId: item._id, name: item.name, size: selectedSize.size,
    quantity: 1, unitPrice: selectedSize.price })
  setFeedback(added ? `${selectedSize.size} ${item.name} added to cart.` : 'This item could not be added to cart.')
 }
 return <section className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-10"><p className="text-sm font-semibold uppercase tracking-widest text-amber-800">{item.category?.name ?? 'Uncategorized'}</p><h1 className="mt-3 text-3xl font-semibold sm:text-4xl">{item.name}</h1><p className="mt-4 max-w-2xl leading-7 text-stone-600">{item.description}</p>
 <fieldset className="mt-8"><legend className="text-lg font-semibold">Choose your size</legend><div className="mt-4 grid gap-4 sm:grid-cols-3">{item.sizes.map(size => {
  const stock = availability.sizes.find(entry => entry.size === size.size)
  const available = item.isActive && stock?.available === true
  return <label key={size.size} className={'relative rounded-2xl border-2 p-5 focus-within:ring-2 focus-within:ring-amber-800 focus-within:ring-offset-2 ' + (available ? 'cursor-pointer ' : 'bg-stone-50 text-stone-500 ') + (selected === size.size ? 'border-amber-900 bg-amber-50' : 'border-stone-200')}><input type="radio" name="size" value={size.size} checked={selected === size.size} disabled={!available} onChange={() => setChoice(size.size)} className="mr-2 accent-amber-900" /><span className="font-semibold capitalize">{size.size}</span><span className="mt-3 block text-lg font-semibold">{formatPeso(size.price)}</span><span className="mt-3 block text-sm font-medium">{available ? 'Available' : 'Unavailable'}</span><span className="mt-1 block text-sm">{available ? String(stock?.maxServings) + ' servings available' : !item.isActive ? 'Menu item is inactive' : stock?.reason ?? 'Availability information is missing'}</span></label>
 })}</div></fieldset>
 {!availableSizes.length && <p role="status" className="mt-6 rounded-xl bg-amber-50 p-4 text-amber-950">This item cannot currently be ordered. Please explore another item.</p>}
 <button onClick={handleAdd} disabled={!selectedSize} className="mt-8 rounded-xl bg-amber-950 px-6 py-3 font-semibold text-white hover:bg-amber-900 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:bg-stone-200 disabled:text-stone-500">Add to cart</button>
 <p role="status" aria-live="polite" className="mt-3 text-sm text-amber-900">{feedback}</p>
 {feedback && <Link to="/cart" className="mt-2 inline-block text-sm font-medium underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2">View cart</Link>}
 <p className="mt-3 text-sm text-stone-500">Availability reflects current stock and may change.</p></section>
}
export default function MenuItemPage() { const { id = '' } = useParams(); return <div className="space-y-6"><Link to="/menu" className="inline-block text-sm font-medium text-amber-900 underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2">Back to menu</Link><MenuItemDetails key={id} id={id} /></div> }
