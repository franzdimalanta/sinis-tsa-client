import { useEffect, useRef, useState, type ReactNode } from 'react'
import type { CartItem } from '../../types/cart'
import type { OrderPreviewResponse } from '../../types/order'
import { menuProductImages } from '../menu/menuProductImages'
import { formatPeso } from '../../utils/formatPeso'
import brandLogo from '../../assets/sinis-tsa-logo.svg'

export default function CheckoutSummary({ items, subtotal, totalQuantity, preview, children }: {
  items: CartItem[]; subtotal: number; totalQuantity: number; preview?: OrderPreviewResponse; children: ReactNode
}) {
  const summaryRef = useRef<HTMLElement>(null)
  const [canStick, setCanStick] = useState(false)
  useEffect(() => {
    const summary = summaryRef.current
    if (!summary) return
    const header = summary.closest('.sinis-customer')?.querySelector('.sinis-header')
    function measure() {
      if (summary) setCanStick(window.matchMedia('(min-width: 1024px)').matches && summary.getBoundingClientRect().height + (header?.getBoundingClientRect().height ?? 80) + 48 <= window.innerHeight)
    }
    const observer = new ResizeObserver(measure)
    observer.observe(summary)
    if (header) observer.observe(header)
    window.addEventListener('resize', measure)
    measure()
    return () => { observer.disconnect(); window.removeEventListener('resize', measure) }
  }, [])
  const lines = preview ? preview.items.map(item => ({
    ...item, id: typeof item.menuItem === 'string' ? item.menuItem : item.menuItem?._id ?? '',
  })) : items.map(item => ({ ...item, id: item.menuItemId, lineTotal: item.unitPrice * item.quantity }))
  return <aside ref={summaryRef} aria-labelledby="checkout-summary-title" className={'checkout-summary checkout-panel' + (canStick ? ' can-stick' : '')}>
    <p className="checkout-step">02 / Review & confirm</p>
    <h2 id="checkout-summary-title">Order Summary</h2>
    <p className="checkout-item-count">{totalQuantity} {totalQuantity === 1 ? 'item' : 'items'} · {preview ? 'Reviewed pricing' : 'Estimated pricing'}</p>
    <ul className="checkout-summary-items">{lines.map(item => {
      const image = menuProductImages[item.id]
      return <li key={`${item.id || item.name}:${item.size}`}>
        <div className={'checkout-thumbnail' + (!image ? ' is-placeholder' : '')}><img src={image?.src ?? brandLogo} alt={image?.alt ?? ''} /></div>
        <div className="checkout-line-details"><h3>{item.name}</h3><p className="capitalize">{item.size} · Qty {item.quantity}</p><p>{formatPeso(item.unitPrice)} each</p><strong>{formatPeso(item.lineTotal)}</strong></div>
      </li>
    })}</ul>
    <dl className="checkout-totals">
      <div><dt>{preview ? 'Subtotal' : 'Estimated subtotal'}</dt><dd>{formatPeso(preview?.subtotal ?? subtotal)}</dd></div>
      {preview && <>
        <div><dt>Discount</dt><dd>{preview.discountAmount > 0 ? '−' : ''}{formatPeso(preview.discountAmount)}</dd></div>
        <div className="checkout-final-total"><dt>Total</dt><dd>{formatPeso(preview.total)}</dd></div>
      </>}
    </dl>
    {children}
  </aside>
}
