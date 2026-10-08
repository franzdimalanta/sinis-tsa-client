import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useMenuItem } from '../../hooks/useMenuItem'
import type { MenuSize } from '../../types/menu'
import { formatPeso } from '../../utils/formatPeso'
import LoadingState from '../../components/common/LoadingState'
import ErrorState from '../../components/common/ErrorState'
import { useCart } from '../../hooks/useCart'
import CoffeeVisual from '../../components/menu/CoffeeVisual'
function MenuItemDetails({ id }: { id: string }) {
 const { data, loading, error, refresh } = useMenuItem(id)
 const [choice, setChoice] = useState<MenuSize | null>(null)
 const { addItem } = useCart()
 const [feedback, setFeedback] = useState('')
 const [feedbackSucceeded, setFeedbackSucceeded] = useState(false)
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
  setFeedbackSucceeded(added)
 }
 return <section className="grid items-start gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-10"><div className="overflow-hidden rounded-xl border border-border lg:sticky lg:top-8"><CoffeeVisual /></div><div className="min-w-0"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">{item.category?.name ?? 'Uncategorized'}</p><h1 className="mt-4 text-4xl leading-tight tracking-tight text-primary sm:text-5xl">{item.name}</h1><p className="mt-5 max-w-2xl leading-8 text-muted">{item.description}</p>
 <fieldset className="mt-8"><legend className="text-base font-semibold text-foreground">Choose your size</legend><div className="mt-4 grid gap-3 sm:grid-cols-3">{item.sizes.map(size => {
  const stock = availability.sizes.find(entry => entry.size === size.size)
  const available = item.isActive && stock?.available === true
  return <label key={size.size} className={'relative rounded-xl border p-4 focus-within:ring-2 focus-within:ring-focus focus-within:ring-offset-2 ' + (available ? 'cursor-pointer ' : 'bg-surface-warm text-muted ') + (selected === size.size ? 'border-primary bg-surface' : 'border-border')}><input type="radio" name="size" value={size.size} checked={selected === size.size} disabled={!available} onChange={() => setChoice(size.size)} className="mr-2 accent-amber-900" /><span className="font-semibold capitalize">{size.size}</span><span className="mt-3 block text-lg font-semibold">{formatPeso(size.price)}</span><span className={'mt-3 block text-xs font-semibold ' + (available ? 'text-green-800' : 'text-red-800')}>{available ? 'Available' : 'Unavailable'}</span><span className="mt-2 block text-xs leading-5">{available ? String(stock?.maxServings) + ' servings available' : !item.isActive ? 'Menu item is inactive' : stock?.reason ?? 'Availability information is missing'}</span></label>
 })}</div></fieldset>
 {!availableSizes.length && <p role="status" className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950">This item cannot currently be ordered. Please explore another item.</p>}
 <button onClick={handleAdd} disabled={!selectedSize} className="ui-button ui-button-primary mt-8 min-h-12 w-full sm:w-auto sm:min-w-52">Add to cart</button>
 <p role="status" aria-live="polite" className={'mt-4 text-sm ' + (feedbackSucceeded ? 'text-green-800' : 'text-red-800')}>{feedback}</p>
 {feedback && <Link to="/cart" className="mt-2 inline-block text-sm font-medium underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2">View cart</Link>}
 <p className="mt-4 text-xs leading-6 text-muted">Availability reflects current stock and may change.</p></div></section>
}
export default function MenuItemPage() { const { id = '' } = useParams(); return <div className="customer-page space-y-8"><Link to="/menu" className="inline-block text-sm font-medium text-amber-900 underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2">Back to menu</Link><MenuItemDetails key={id} id={id} /></div> }
