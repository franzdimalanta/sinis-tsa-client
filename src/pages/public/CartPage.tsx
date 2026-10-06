import { Link } from 'react-router-dom'
import { useCart } from '../../hooks/useCart'
import { formatPeso } from '../../utils/formatPeso'
import EmptyState from '../../components/common/EmptyState'

const buttonStyle = 'rounded-lg border border-stone-300 px-3 py-2 text-sm font-medium hover:bg-amber-50 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-40'

export default function CartPage() {
  const { items, totalQuantity, subtotal, removeItem, updateQuantity, clearCart } = useCart()

  function confirmClear() {
    if (window.confirm('Clear all items from your cart?')) clearCart()
  }

  return <div>
    <h1 className="text-3xl font-semibold sm:text-4xl">Your cart</h1>
    <p className="mt-3 text-stone-600">Your next coffee break, one cup at a time.</p>
    {!items.length ? <div className="mt-6 space-y-5">
      <EmptyState message="Your cart is empty. Explore the menu to find something you like." />
      <Link to="/menu" className="inline-block rounded-xl bg-amber-950 px-5 py-3 font-semibold text-white hover:bg-amber-900 focus-visible:outline-2 focus-visible:outline-offset-2">Explore the menu</Link>
    </div> : <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
      <section aria-label="Cart items" className="min-w-0 space-y-4">
        {items.map(item => <article key={item.menuItemId + ':' + item.size} className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="min-w-0"><h2 className="text-xl font-semibold break-words">{item.name}</h2><p className="mt-1 capitalize text-stone-600">{item.size}</p><p className="mt-2 text-sm text-stone-600">{formatPeso(item.unitPrice)} each</p></div>
            <p className="font-semibold">{formatPeso(item.unitPrice * item.quantity)}</p>
          </div>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button className={buttonStyle} disabled={item.quantity === 1} aria-label={'Decrease ' + item.name + ' ' + item.size + ' quantity'} onClick={() => updateQuantity(item.menuItemId, item.size, item.quantity - 1)}>-</button>
              <span aria-label={'Quantity ' + item.quantity} className="min-w-6 text-center font-medium">{item.quantity}</span>
              <button className={buttonStyle} disabled={!Number.isSafeInteger(item.quantity + 1)} aria-label={'Increase ' + item.name + ' ' + item.size + ' quantity'} onClick={() => updateQuantity(item.menuItemId, item.size, item.quantity + 1)}>+</button>
            </div>
            <button className={buttonStyle} aria-label={'Remove ' + item.name + ' ' + item.size + ' from cart'} onClick={() => removeItem(item.menuItemId, item.size)}>Remove</button>
          </div>
        </article>)}
        <button onClick={confirmClear} className={buttonStyle}>Clear cart</button>
      </section>
      <aside aria-label="Cart summary" className="h-fit rounded-2xl border border-stone-200 bg-amber-50 p-6">
        <h2 className="text-xl font-semibold">Cart summary</h2>
        <dl className="mt-5 space-y-3"><div className="flex justify-between gap-3"><dt>Total items</dt><dd>{totalQuantity}</dd></div><div className="flex justify-between gap-3 font-semibold"><dt>Subtotal</dt><dd>{formatPeso(subtotal)}</dd></div></dl>
        <p className="mt-5 text-sm leading-6 text-stone-600">Final pricing and any applicable discount are calculated at checkout.</p>
        <Link to="/checkout" className="mt-6 block rounded-xl bg-amber-950 px-4 py-3 text-center font-semibold text-white hover:bg-amber-900 focus-visible:outline-2 focus-visible:outline-offset-2">Proceed to checkout</Link>
        <Link to="/menu" className="mt-4 block text-center text-sm font-medium underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2">Continue browsing</Link>
      </aside>
    </div>}
  </div>
}
