import type { OrderItem, OrderTotals } from '../../types/order'
import { formatPeso } from '../../utils/formatPeso'

function getOrderItemKey(item: OrderItem) {
  const menuItemId = typeof item.menuItem === 'string'
    ? item.menuItem
    : item.menuItem?._id ?? item.name
  return `${menuItemId}:${item.size}`
}

export default function OrderSummary({ order }: { order: OrderTotals }) {
  return <div className="order-summary space-y-5">
    <ul className="space-y-4">
      {order.items.map(item => <li key={getOrderItemKey(item)} className="order-summary-item rounded-xl border border-stone-200 bg-white p-4">
        <h3 className="font-semibold break-words">{item.name}</h3>
        <p className="mt-1 text-sm capitalize text-stone-600">{item.size} / Quantity: {item.quantity}</p>
        <div className="mt-3 flex flex-wrap justify-between gap-2 text-sm">
          <span>{formatPeso(item.unitPrice)} each</span><span className="font-semibold">{formatPeso(item.lineTotal)}</span>
        </div>
      </li>)}
    </ul>
    <dl className="space-y-3">
      <div className="flex flex-wrap justify-between gap-2"><dt>Subtotal</dt><dd>{formatPeso(order.subtotal)}</dd></div>
      <div className="order-summary-discount flex flex-wrap justify-between gap-2"><dt>Discount</dt><dd>{order.discountAmount > 0 ? '-' : ''}{formatPeso(order.discountAmount)}</dd></div>
      <div className="order-summary-total flex flex-wrap justify-between gap-2 border-t border-stone-300 pt-3 text-lg font-semibold"><dt>Total</dt><dd>{formatPeso(order.total)}</dd></div>
    </dl>
  </div>
}
