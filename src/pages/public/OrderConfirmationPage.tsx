import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getOrder } from '../../api/orders'
import type { Order } from '../../types/order'
import { getOrderError } from '../../utils/orderError'
import OrderSummary from '../../components/orders/OrderSummary'
import LoadingState from '../../components/common/LoadingState'
import ErrorState from '../../components/common/ErrorState'
import { statusStyles } from '../../utils/orderWorkflow'

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
  return <section className="rounded-xl border border-border bg-surface p-6 sm:p-10">
    <p className="inline-flex rounded-full border border-green-200 bg-green-50 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-green-900">BrewLogic order confirmation</p>
    <h1 className="mt-5 text-4xl tracking-tight text-primary sm:text-5xl">Your order is confirmed</h1>
    <p className="mt-3 text-stone-600">Thank you, {order.customerName}.</p>
    <dl className="mt-8 grid gap-6 border-y border-border py-6 sm:grid-cols-2">
      <div><dt className="text-sm text-stone-500">Order ID</dt><dd className="mt-1 break-all text-sm" title={order._id}>{order._id}</dd></div>
      <div><dt className="text-sm text-stone-500">Customer</dt><dd className="mt-1 break-words">{order.customerName}</dd></div>
      <div><dt className="text-sm text-stone-500">Order type</dt><dd className="mt-1 capitalize">{order.orderType}</dd></div>
      <div><dt className="text-sm text-stone-500">Status</dt><dd className={'mt-1 inline-block rounded-full px-3 py-1 text-sm font-medium capitalize ' + statusStyles[order.status]}>{order.status}</dd></div>
    </dl>
    <div className="mt-8"><h2 className="mb-5 font-editorial text-2xl text-primary">Your order</h2><OrderSummary order={order} /></div>
    {order.notes && <div className="mt-6"><h2 className="font-semibold">Notes</h2><p className="mt-2 break-words whitespace-pre-wrap text-stone-600">{order.notes}</p></div>}
  </section>
}

export default function OrderConfirmationPage() {
  const { id = '' } = useParams()
  return <div className="customer-page mx-auto max-w-3xl space-y-6"><ConfirmationDetails key={id} id={id} /><Link to="/menu" className="ui-button ui-button-secondary min-h-12">Back to menu</Link></div>
}
