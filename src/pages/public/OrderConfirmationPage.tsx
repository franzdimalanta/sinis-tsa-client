import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getOrder } from '../../api/orders'
import type { Order } from '../../types/order'
import { getOrderError } from '../../utils/orderError'
import OrderSummary from '../../components/orders/OrderSummary'
import LoadingState from '../../components/common/LoadingState'
import ErrorState from '../../components/common/ErrorState'

function ConfirmationDetails({ id }: { id: string }) {
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [attempt, setAttempt] = useState(0)
  useEffect(() => {
    const controller = new AbortController()
    getOrder(id, controller.signal).then(order => {
      if (!controller.signal.aborted) { setOrder(order); setError(null) }
    }).catch((error: unknown) => { if (!controller.signal.aborted) setError(getOrderError(error, true)) })
      .finally(() => { if (!controller.signal.aborted) setLoading(false) })
    return () => controller.abort()
  }, [id, attempt])
  function retry() { setLoading(true); setError(null); setAttempt(value => value + 1) }
  if (loading) return <LoadingState message="Loading your order..." />
  if (error || !order) return <ErrorState message={error ?? 'This order could not be found.'} onRetry={retry} />
  return <section className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-10">
    <p className="text-sm font-semibold uppercase tracking-widest text-amber-800">BrewLogic order confirmation</p>
    <h1 className="mt-3 text-3xl font-semibold">Your order is confirmed</h1>
    <p className="mt-3 text-stone-600">Thank you, {order.customerName}.</p>
    <dl className="mt-6 grid gap-4 sm:grid-cols-2">
      <div><dt className="text-sm text-stone-500">Order ID</dt><dd className="mt-1 break-all text-sm" title={order._id}>{order._id}</dd></div>
      <div><dt className="text-sm text-stone-500">Customer</dt><dd className="mt-1 break-words">{order.customerName}</dd></div>
      <div><dt className="text-sm text-stone-500">Order type</dt><dd className="mt-1 capitalize">{order.orderType}</dd></div>
      <div><dt className="text-sm text-stone-500">Status</dt><dd className="mt-1 inline-block rounded-full bg-amber-100 px-3 py-1 text-sm font-medium capitalize">{order.status}</dd></div>
    </dl>
    <div className="mt-8"><h2 className="mb-4 text-xl font-semibold">Your order</h2><OrderSummary order={order} /></div>
    {order.notes && <div className="mt-6"><h2 className="font-semibold">Notes</h2><p className="mt-2 break-words whitespace-pre-wrap text-stone-600">{order.notes}</p></div>}
  </section>
}

export default function OrderConfirmationPage() {
  const { id = '' } = useParams()
  return <div className="space-y-6"><ConfirmationDetails key={id} id={id} /><Link to="/menu" className="inline-block font-medium underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2">Back to menu</Link></div>
}
