import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCart } from '../../hooks/useCart'
import { previewOrder, createOrder } from '../../api/orders'
import type { OrderPreviewResponse, OrderRequest } from '../../types/order'
import { getOrderError } from '../../utils/orderError'
import { formatPeso } from '../../utils/formatPeso'
import OrderSummary from '../../components/orders/OrderSummary'
import EmptyState from '../../components/common/EmptyState'

const checkoutSchema = z.object({
  customerName: z.string().trim().min(2, 'Enter at least 2 characters.').max(100, 'Use at most 100 characters.'),
  orderType: z.enum(['dine-in', 'takeout'], { error: 'Choose dine-in or takeout.' }),
  notes: z.string().trim().max(500, 'Use at most 500 characters.').optional(),
})
type CheckoutForm = z.infer<typeof checkoutSchema>
const inputStyle = 'mt-2 w-full rounded-lg border border-stone-300 bg-white p-3 focus-visible:outline-2 focus-visible:outline-amber-800'
const buttonStyle = 'ui-button ui-button-primary min-h-12 disabled:cursor-not-allowed disabled:opacity-50'

export default function CheckoutPage() {
  const { items, totalQuantity, subtotal, clearCart } = useCart()
  const navigate = useNavigate()
  const { register, control, handleSubmit, getValues, formState: { errors } } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { customerName: '', orderType: 'takeout', notes: '' },
  })
  const values = useWatch({ control })
  const signature = JSON.stringify({ values, items })
  const [review, setReview] = useState<{ signature: string; payload: OrderRequest; preview: OrderPreviewResponse } | null>(null)
  const [busy, setBusy] = useState<'preview' | 'create' | null>(null)
  const [error, setError] = useState<string | null>(null)
  // A synchronous lock also blocks clicks before React has updated the disabled button.
  const requestInProgress = useRef(false)
  const validReview = review?.signature === signature ? review : null

  async function reviewOrder(form: CheckoutForm) {
    if (requestInProgress.current || !items.length) return
    requestInProgress.current = true
    setBusy('preview'); setError(null); setReview(null)
    // Only identifiers and quantities are sent; the backend recalculates all prices.
    const payload: OrderRequest = { ...form, items: items.map(item => ({
      menuItem: item.menuItemId, size: item.size, quantity: item.quantity,
    })) }
    try {
      const preview = await previewOrder(payload)
      setReview({ signature, payload, preview })
    } catch (error: unknown) { setError(getOrderError(error)) }
    finally { requestInProgress.current = false; setBusy(null) }
  }

  async function placeOrder() {
    const currentSignature = JSON.stringify({ values: getValues(), items })
    if (requestInProgress.current || !validReview || currentSignature !== validReview.signature || !items.length) return
    requestInProgress.current = true
    setBusy('create'); setError(null)
    try {
      const order = await createOrder(validReview.payload)
      clearCart()
      navigate('/order-confirmation/' + order._id)
    } catch (error: unknown) {
      setError(getOrderError(error)); setReview(null)
    } finally { requestInProgress.current = false; setBusy(null) }
  }

  return <div className="customer-page">
    <Link to="/cart" className="text-sm font-medium underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2">Back to cart</Link>
    <h1 className="mt-5 text-4xl tracking-tight text-primary sm:text-5xl">Checkout</h1>
    {!items.length ? <div className="mt-6 space-y-4"><EmptyState message="Your cart is empty. Add something from the menu before checking out." /><Link to="/menu" className="inline-block font-medium underline underline-offset-4">Explore the menu</Link></div> :
    <div className="mt-10 grid items-start gap-8 lg:grid-cols-[1fr_0.9fr]">
      <form onSubmit={event => { void handleSubmit(reviewOrder)(event) }} onChange={() => setReview(null)} noValidate className="rounded-xl border border-border bg-surface p-6 sm:p-8">
        <p className="text-xs uppercase tracking-[0.18em] text-muted">01 / Your details</p><h2 className="mt-3 font-editorial text-2xl text-primary">Make it yours</h2>
        <fieldset disabled={busy !== null} className="mt-6 space-y-6">
          <div><label htmlFor="customerName" className="font-medium">Customer name</label><input id="customerName" autoComplete="name" {...register('customerName')} aria-invalid={!!errors.customerName} aria-describedby={errors.customerName ? 'customerName-error' : undefined} className={inputStyle} />{errors.customerName && <p id="customerName-error" role="alert" className="mt-2 text-sm text-red-800">{errors.customerName.message}</p>}</div>
          <div><label htmlFor="orderType" className="font-medium">Order type</label><select id="orderType" {...register('orderType')} aria-invalid={!!errors.orderType} aria-describedby={errors.orderType ? 'orderType-error' : undefined} className={inputStyle}><option value="takeout">Takeout</option><option value="dine-in">Dine-in</option></select>{errors.orderType && <p id="orderType-error" role="alert" className="mt-2 text-sm text-red-800">{errors.orderType.message}</p>}</div>
          <div><label htmlFor="notes" className="font-medium">Notes (optional)</label><textarea id="notes" rows={3} {...register('notes')} aria-invalid={!!errors.notes} aria-describedby={errors.notes ? 'notes-error' : undefined} className={inputStyle} />{errors.notes && <p id="notes-error" role="alert" className="mt-2 text-sm text-red-800">{errors.notes.message}</p>}</div>
          <button type="submit" className={buttonStyle}>{busy === 'preview' ? 'Reviewing order...' : 'Review order'}</button>
        </fieldset>
      </form>
      <section aria-label="Order review" className="min-w-0 rounded-xl border border-border bg-surface-warm p-6 sm:p-8 lg:sticky lg:top-8">
        <p className="text-xs uppercase tracking-[0.18em] text-muted">02 / Review & confirm</p><h2 className="mt-3 font-editorial text-2xl text-primary">Order review</h2>
        {validReview ? <div className="mt-5"><OrderSummary order={validReview.preview} /><p role="status" className={'mt-5 rounded-lg border p-3 text-sm ' + (validReview.preview.stockAvailable ? 'border-green-200 bg-green-50 text-green-900' : 'border-amber-200 bg-amber-50 text-amber-950')}>{validReview.preview.stockAvailable ? 'Inventory confirmed for this order.' : 'Inventory could not be confirmed.'}</p><button onClick={placeOrder} disabled={busy !== null || !validReview.preview.stockAvailable} className={buttonStyle + ' mt-5'}>{busy === 'create' ? 'Placing order...' : 'Place order'}</button></div> : <div className="mt-5 space-y-3"><p>{totalQuantity} items / Cart estimate: {formatPeso(subtotal)}</p><p className="text-sm leading-6 text-stone-600">{review ? 'Your details or cart changed. Review your order again before placing it.' : 'Review your order to confirm current prices and availability.'}</p><p className="text-sm leading-6 text-stone-600">A 10% discount applies to subtotals of at least PHP 1,000. The server calculates final pricing.</p></div>}
        {error && <p role="alert" className="mt-5 rounded-lg bg-red-50 p-4 text-sm text-red-900">{error}</p>}
        <p role="status" aria-live="polite" className="mt-3 text-sm text-stone-600">{busy === 'create' ? 'Placing order...' : busy === 'preview' ? 'Checking prices and availability...' : ''}</p>
      </section>
    </div>}
  </div>
}
