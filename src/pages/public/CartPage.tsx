import { Link } from 'react-router-dom'
import { useCart } from '../../hooks/useCart'
import { formatPeso } from '../../utils/formatPeso'
import EmptyState from '../../components/common/EmptyState'

const buttonStyle = 'inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-border bg-surface px-3 py-2 font-medium text-primary hover:bg-surface-warm focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-40'

export default function CartPage() {
  const { items, totalQuantity, subtotal, removeItem, updateQuantity, clearCart } = useCart()

  function confirmClear() {
    if (window.confirm('Clear all items from your cart?')) clearCart()
  }

  return <div className="customer-page">
    <h1 className="text-4xl tracking-tight text-primary sm:text-5xl">Your cart</h1>
    <p className="mt-3 text-stone-600">Your next coffee break, one cup at a time.</p>
    {!items.length ? <div className="mt-6 space-y-5">
      <EmptyState message="Your cart is empty. Explore the menu to find something you like." />
      <Link to="/menu" className="inline-block rounded-xl bg-amber-950 px-5 py-3 font-semibold text-white hover:bg-amber-900 focus-visible:outline-2 focus-visible:outline-offset-2">Explore the menu</Link>
    </div> : <div className="mt-10 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
      <section aria-label="Cart items" className="min-w-0 space-y-4">
        {items.map(item => <article key={item.menuItemId + ':' + item.size} className="rounded-xl border border-border bg-surface p-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="min-w-0"><h2 className="font-editorial text-2xl text-primary break-words">{item.name}</h2><p className="mt-1 capitalize text-stone-600">{item.size}</p><p className="mt-2 text-sm text-stone-600">{formatPeso(item.unitPrice)} each</p></div>
            <p className="font-semibold">{formatPeso(item.unitPrice * item.quantity)}</p>
          </div>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button className={buttonStyle} disabled={item.quantity === 1} aria-label={'Decrease ' + item.name + ' ' + item.size + ' quantity'} onClick={() => updateQuantity(item.menuItemId, item.size, item.quantity - 1)}>-</button>
              <span aria-label={'Quantity ' + item.quantity} className="min-w-6 text-center font-medium">{item.quantity}</span>
              <button className={buttonStyle} disabled={!Number.isSafeInteger(item.quantity + 1)} aria-label={'Increase ' + item.name + ' ' + item.size + ' quantity'} onClick={() => updateQuantity(item.menuItemId, item.size, item.quantity + 1)}>+</button>
            </div>
            <button className="ui-button ui-button-danger min-h-11" aria-label={'Remove ' + item.name + ' ' + item.size + ' from cart'} onClick={() => removeItem(item.menuItemId, item.size)}>Remove</button>
          </div>
        </article>)}
        <button onClick={confirmClear} className="ui-button ui-button-danger min-h-11">Clear cart</button>
      </section>
      <aside aria-label="Cart summary" className="h-fit rounded-xl border border-border bg-surface-warm p-6 lg:sticky lg:top-8">
        <h2 className="font-editorial text-2xl text-primary">Cart summary</h2>
        <dl className="mt-5 space-y-3"><div className="flex justify-between gap-3"><dt>Total items</dt><dd>{totalQuantity}</dd></div><div className="flex flex-wrap justify-between gap-3 border-t border-border pt-4 text-xl font-semibold text-primary"><dt>Subtotal</dt><dd>{formatPeso(subtotal)}</dd></div></dl>
        <p className="mt-5 text-sm leading-6 text-stone-600">Final pricing and any applicable discount are calculated at checkout.</p>
        <Link to="/checkout" className="ui-button ui-button-primary mt-6 min-h-12 w-full">Proceed to checkout</Link>
        <Link to="/menu" className="mt-4 block text-center text-sm font-medium underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2">Continue browsing</Link>
      </aside>
    </div>}
  </div>
}
