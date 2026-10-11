import type { Order } from '../../types/order'
import { formatPeso } from '../../utils/formatPeso'
import { statusStyles } from '../../utils/orderWorkflow'
import { menuProductImages } from '../menu/menuProductImages'
import brandLogo from '../../assets/sinis-tsa-logo.svg'
import './orderReceipt.css'

const dateFormat = new Intl.DateTimeFormat('en-PH', {
  timeZone: 'Asia/Manila', year: 'numeric', month: 'long', day: 'numeric',
  hour: 'numeric', minute: '2-digit', hour12: true,
})

export default function OrderReceipt({ order }: { order: Order }) {
  const date = order.createdAt ? new Date(order.createdAt) : null
  const validDate = date && !Number.isNaN(date.getTime()) ? date : null
  return <section className="order-receipt" aria-labelledby="receipt-heading">
    <div className="order-receipt-heading">
      <svg aria-hidden="true" className="order-receipt-check" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2" /><path d="m9 16 5 5 9-10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      <p className="order-receipt-brand">SINIS TSA / ORDER SUMMARY</p>
      <h1 id="receipt-heading">{order.status === 'pending' ? 'ORDER RECEIVED' : 'ORDER SUMMARY'}</h1>
      <p className="order-receipt-thanks">Thank you, {order.customerName}.</p>
      <p className="order-receipt-status">Status: <span className={statusStyles[order.status]}>{order.status}</span></p>
    </div>
    <dl className="order-receipt-info">
      <div><dt>Order reference</dt><dd className="order-receipt-id">{order._id}</dd></div>
      <div><dt>Customer</dt><dd>{order.customerName}</dd></div>
      <div><dt>Order type</dt><dd className="capitalize">{order.orderType}</dd></div>
      {validDate && <div><dt>Order date · Asia/Manila</dt><dd><time dateTime={validDate.toISOString()}>{dateFormat.format(validDate)}</time></dd></div>}
    </dl>
    <h2 className="order-receipt-items-title">Your Order</h2>
    <ul className="order-receipt-items">{order.items.map((item, index) => {
      const id = typeof item.menuItem === 'string' ? item.menuItem : item.menuItem?._id ?? ''
      const image = menuProductImages[id]
      return <li key={`${id || item.name}:${item.size}:${index}`}>
        <div className={'order-receipt-thumbnail' + (!image ? ' is-placeholder' : '')}><img src={image?.src ?? brandLogo} alt={image?.alt ?? ''} /></div>
        <div className="order-receipt-item-copy"><h3>{item.name}</h3><p className="capitalize">{item.size} · Quantity: {item.quantity}</p><p>{formatPeso(item.unitPrice)} each</p></div>
        <p className="order-receipt-line-total"><span>Line total</span>{formatPeso(item.lineTotal)}</p>
      </li>
    })}</ul>
    <dl className="order-receipt-totals">
      <div><dt>Subtotal</dt><dd>{formatPeso(order.subtotal)}</dd></div>
      <div><dt>Discount</dt><dd>{order.discountAmount > 0 ? '−' : ''}{formatPeso(order.discountAmount)}</dd></div>
      <div className="order-receipt-total"><dt>Total</dt><dd>{formatPeso(order.total)}</dd></div>
    </dl>
    {order.notes?.trim() && <div className="order-receipt-notes"><h2>Notes</h2><p>{order.notes}</p></div>}
  </section>
}
