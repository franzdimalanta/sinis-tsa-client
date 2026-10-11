import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { formatPeso } from '../../utils/formatPeso'

export default function CartSummary({ totalQuantity, subtotal }: { totalQuantity: number; subtotal: number }) {
  const summaryRef = useRef<HTMLElement>(null)
  const [canStick, setCanStick] = useState(false)
  useEffect(() => {
    const summary = summaryRef.current
    if (!summary) return
    const header = summary.closest('.sinis-customer')?.querySelector('.sinis-header')
    function measure() {
      if (!summary) return
      const headerHeight = header?.getBoundingClientRect().height ?? 80
      setCanStick(window.matchMedia('(min-width: 1024px)').matches && summary.getBoundingClientRect().height + headerHeight + 48 <= window.innerHeight)
    }
    const observer = new ResizeObserver(measure)
    observer.observe(summary)
    if (header) observer.observe(header)
    window.addEventListener('resize', measure)
    measure()
    return () => { observer.disconnect(); window.removeEventListener('resize', measure) }
  }, [])
  return <aside ref={summaryRef} aria-labelledby="cart-summary-heading" className={'cart-summary' + (canStick ? ' can-stick' : '')}>
    <h2 id="cart-summary-heading">Cart Summary</h2>
    <dl>
      <div><dt>Total items</dt><dd>{totalQuantity}</dd></div>
      <div className="cart-summary-subtotal"><dt>Subtotal</dt><dd>{formatPeso(subtotal)}</dd></div>
    </dl>
    <p>Final pricing and any applicable discount are calculated at checkout.</p>
    <Link to="/checkout" className="cart-primary-action">Proceed to Checkout</Link>
    <Link to="/menu" className="cart-continue">Continue Browsing</Link>
  </aside>
}
