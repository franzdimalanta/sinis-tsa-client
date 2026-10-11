import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCart } from '../../hooks/useCart'
import { previewOrder, createOrder } from '../../api/orders'
import type { OrderPreviewResponse, OrderRequest } from '../../types/order'
import { getOrderError } from '../../utils/orderError'
import '../../components/orders/checkout.css'
import CheckoutSummary from '../../components/orders/CheckoutSummary'
import EmptyState from '../../components/common/EmptyState'

const checkoutSchema = z.object({
  customerName: z.string().trim().min(2, 'Enter at least 2 characters.').max(100, 'Use at most 100 characters.'),
  orderType: z.enum(['dine-in', 'takeout'], { error: 'Choose dine-in or takeout.' }),
  notes: z.string().trim().max(500, 'Use at most 500 characters.').optional(),
})
type CheckoutForm = z.infer<typeof checkoutSchema>

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

  return <div className="customer-page checkout-page">
    <Link to="/cart" className="checkout-back">Back to Cart</Link>
    <h1>CHECKOUT</h1>
    {!items.length ? <div className="mt-6 space-y-4"><EmptyState message="Your cart is empty. Add something from the menu before checking out." /><Link to="/menu" className="checkout-back">Explore Menu</Link></div> :
    <div className="checkout-layout">
      <form onSubmit={event => { void handleSubmit(reviewOrder)(event) }} onChange={() => setReview(null)} noValidate className="checkout-panel">
        <p className="checkout-step">01 / Your details</p><h2>Your Details</h2>
        <fieldset disabled={busy !== null} className="checkout-fields">
          <div><label htmlFor="customerName">Customer name</label><input id="customerName" autoComplete="name" {...register('customerName')} aria-invalid={!!errors.customerName} aria-describedby={errors.customerName ? 'customerName-error' : undefined} />{errors.customerName && <p id="customerName-error" role="alert" className="checkout-field-error">{errors.customerName.message}</p>}</div>
          <fieldset className="checkout-order-type"><legend>Order type</legend><div className="checkout-type-options">{[{ value: 'takeout', label: 'Takeout' }, { value: 'dine-in', label: 'Dine-in' }].map(option => <label key={option.value}><input type="radio" value={option.value} {...register('orderType')} aria-invalid={!!errors.orderType} aria-describedby={errors.orderType ? 'orderType-error' : undefined} /><span>{option.label}</span></label>)}</div>{errors.orderType && <p id="orderType-error" role="alert" className="checkout-field-error">{errors.orderType.message}</p>}</fieldset>
          <div><label htmlFor="notes">Notes (optional)</label><textarea id="notes" rows={3} {...register('notes')} aria-invalid={!!errors.notes} aria-describedby={errors.notes ? 'notes-error' : undefined} />{errors.notes && <p id="notes-error" role="alert" className="checkout-field-error">{errors.notes.message}</p>}</div>
          <button type="submit" className="checkout-primary">{busy === 'preview' ? 'Reviewing Order...' : 'Review Order'}</button>
        </fieldset>
      </form>
      <CheckoutSummary items={items} totalQuantity={totalQuantity} subtotal={subtotal} preview={validReview?.preview}>
        {validReview ? <>
          <p role="status" className={'checkout-stock-status' + (!validReview.preview.stockAvailable ? ' is-unavailable' : '')}>{validReview.preview.stockAvailable ? 'Prices and availability confirmed. Your order is ready to place.' : 'Inventory could not be confirmed.'}</p>
          <button type="button" onClick={placeOrder} disabled={busy !== null || !validReview.preview.stockAvailable} className="checkout-primary">{busy === 'create' ? 'Placing Order...' : 'Place Order'}</button>
        </> : <>
          <p className="checkout-review-note">{review ? 'Your details or cart changed. Review your order again before placing it.' : 'Review your order to confirm current prices and availability.'}</p>
          <p className="checkout-review-note">A 10% discount applies to subtotals of at least PHP 1,000. The server calculates final pricing.</p>
        </>}
        {error && <p role="alert" className="checkout-request-error">{error}</p>}
        <p role="status" aria-live="polite" className="checkout-status">{busy === 'create' ? 'Placing order...' : busy === 'preview' ? 'Checking prices and availability...' : ''}</p>
      </CheckoutSummary>
    </div>}
  </div>
}