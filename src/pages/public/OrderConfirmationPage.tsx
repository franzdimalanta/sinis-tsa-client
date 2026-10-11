import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getOrder } from '../../api/orders'
import type { Order } from '../../types/order'
import { getOrderError } from '../../utils/orderError'
import OrderReceipt from '../../components/orders/OrderReceipt'
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
  return <OrderReceipt order={order} />
}

export default function OrderConfirmationPage() {
  const { id = '' } = useParams()
  return <div className="customer-page confirmation-page"><ConfirmationDetails key={id} id={id} /><div className="confirmation-actions"><Link to="/menu" className="confirmation-menu">Back to Menu</Link><button type="button" onClick={() => window.print()} className="confirmation-print">Print Order Summary</button></div></div>
}
