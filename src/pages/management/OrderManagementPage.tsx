import ManagementPageHeader from '../../components/management/ManagementPageHeader'
import { useCallback, useRef, useState } from 'react'
import { getOrders, updateOrderStatus } from '../../api/orders'
import type { Order, OrderStatus } from '../../types/order'
import { useManagementData } from '../../hooks/useManagementData'
import { getManagementError } from '../../utils/managementError'
import { orderStatuses, orderActions, statusStyles, statusMessages } from '../../utils/orderWorkflow'
import { formatDate } from '../../utils/formatDate'
import OrderSummary from '../../components/orders/OrderSummary'
import LoadingState from '../../components/common/LoadingState'
import ErrorState from '../../components/common/ErrorState'
import EmptyState from '../../components/common/EmptyState'

export default function OrderManagementPage() {
  const [filter, setFilter] = useState<OrderStatus | ''>('')
  const [search, setSearch] = useState('')
  const load = useCallback(async (signal: AbortSignal) => ({ filter, orders: await getOrders(filter || undefined, signal) }), [filter])
  const { data, loading, error, refresh } = useManagementData(load)
  const [updated, setUpdated] = useState<Record<string, Order>>({})
  const [busyId, setBusyId] = useState<string | null>(null)
  const [feedback, setFeedback] = useState('')
  const [actionError, setActionError] = useState<string | null>(null)
  const locked = useRef(false)

  function selectFilter(value: OrderStatus | '') {
    if (value === filter) return
    setFilter(value); setUpdated({}); setActionError(null); setFeedback(''); refresh()
  }
  function reload() { setUpdated({}); setActionError(null); refresh() }

  async function changeStatus(order: Order, status: OrderStatus) {
    if (locked.current || !orderActions[order.status].some(action => action.status === status)) return
    if (status === 'cancelled' && !window.confirm('Cancel this order? Its deducted inventory will be restored.')) return
    locked.current = true; setBusyId(order._id); setActionError(null); setFeedback('')
    try {
      const result = await updateOrderStatus(order._id, status)
      setUpdated(current => ({ ...current, [result._id]: result }))
      setFeedback(statusMessages[result.status] ?? 'Order updated.')
    } catch (error: unknown) { setActionError(getManagementError(error, 'order')) }
    finally { locked.current = false; setBusyId(null) }
  }

  const orders = (data?.orders ?? []).map(order => updated[order._id] ?? order)
    .filter(order => !filter || order.status === filter)
  const query = search.trim().toLowerCase()
  const visible = orders.filter(order => order.customerName.toLowerCase().includes(query) || order._id.toLowerCase().includes(query))
  const waiting = loading || (!error && data?.filter !== filter)

  return <div className="space-y-6">
    <ManagementPageHeader title="Order management" description="Follow each order from preparation to completion, with inventory-safe cancellation." action={<button onClick={reload} disabled={busyId !== null} className="ui-button ui-button-secondary">Refresh orders</button>} />
    <div aria-label="Filter orders by status" className="management-filter-tabs flex flex-wrap gap-2">
      <button onClick={() => selectFilter('')} disabled={busyId !== null} aria-pressed={filter === ''} className={'rounded-full border px-4 py-2 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 ' + (!filter ? 'bg-amber-950 text-white' : 'bg-white')}>All</button>
      {orderStatuses.map(status => <button key={status} onClick={() => selectFilter(status)} disabled={busyId !== null} aria-pressed={filter === status} className={'rounded-full border px-4 py-2 text-sm font-medium capitalize focus-visible:outline-2 focus-visible:outline-offset-2 ' + (filter === status ? 'bg-amber-950 text-white' : 'bg-white')}>{status}</button>)}
    </div>
    <label className="block max-w-xl">Search customer name or order ID<input value={search} onChange={event => setSearch(event.target.value)} className="mt-2 w-full rounded-lg border border-stone-300 bg-white p-3 focus-visible:outline-2 focus-visible:outline-amber-800" /></label>
    <p role="status" aria-live="polite" className="text-sm text-amber-900">{busyId ? 'Updating order...' : feedback}</p>
    {actionError && <div role="alert" className="rounded-xl bg-red-50 p-4 text-red-900"><p>{actionError}</p><button onClick={reload} disabled={busyId !== null} className="mt-3 underline underline-offset-4 focus-visible:outline-2">Refresh orders</button></div>}
    {waiting ? <LoadingState message="Loading orders..." /> : error ? <ErrorState message={error} onRetry={reload} /> : !visible.length ? <EmptyState message={orders.length ? 'No orders match this search.' : filter ? 'No ' + filter + ' orders right now.' : 'No orders right now.'} /> :
      <div className="space-y-6">{visible.map(order => <article key={order._id} className="management-order-card rounded-2xl border border-stone-200 bg-white p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3"><div className="min-w-0"><h2 className="text-xl font-semibold break-words">{order.customerName}</h2><p className="mt-2 break-all text-sm text-stone-600">Order {order._id}</p><p className="mt-2 text-sm text-stone-600"><span className="capitalize">{order.orderType}</span> / <time dateTime={order.createdAt}>{formatDate(order.createdAt)}</time></p></div><span className={'management-badge capitalize ' + statusStyles[order.status]}>{order.status}</span></div>
        <div className="mt-6"><OrderSummary order={order} /></div>
        {order.notes && <div className="mt-5"><h3 className="font-semibold">Notes</h3><p className="mt-2 break-words whitespace-pre-wrap text-sm text-stone-600">{order.notes}</p></div>}
        {orderActions[order.status].length ? <div className="mt-6 flex flex-wrap gap-3">{orderActions[order.status].map(action => <button key={action.status} onClick={() => { void changeStatus(order, action.status) }} disabled={busyId !== null} aria-label={action.label + ' for order ' + order._id} className={'rounded-lg border px-4 py-3 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 ' + (action.status === 'cancelled' ? 'border-red-200 text-red-800' : 'border-amber-950 bg-amber-950 text-white')}>{busyId === order._id ? 'Updating...' : action.label}</button>)}</div> : <p className="mt-5 text-sm text-stone-500">This order is closed. No further status changes are available.</p>}
      </article>)}</div>}
  </div>
}
