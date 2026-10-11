import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../hooks/useCart'
import { formatPeso } from '../../utils/formatPeso'
import { menuProductImages } from '../../components/menu/menuProductImages'
import CartSummary from '../../components/cart/CartSummary'
import ClearCartDialog from '../../components/cart/ClearCartDialog'
import brandLogo from '../../assets/sinis-tsa-logo.svg'
import ProductThumbnail from '../../components/menu/ProductThumbnail'
import { productPresentation } from '../../components/menu/productPresentation'
import '../../components/cart/cartPage.css'

export default function CartPage() {
  const { items, totalQuantity, subtotal, removeItem, updateQuantity, clearCart } = useCart()
  const [feedback, setFeedback] = useState('')
  const [clearOpen, setClearOpen] = useState(false)
  const headingRef = useRef<HTMLHeadingElement>(null)
  function confirmClear() {
    clearCart()
    setClearOpen(false)
    setFeedback('Your cart has been cleared.')
  }
  return <div className="customer-page cart-page">
    <h1 ref={headingRef} tabIndex={-1} className="customer-heading customer-heading--page">YOUR CART</h1>
    <p className="cart-page-intro">A little mischief, one cup at a time.</p>
    <p role="status" aria-live="polite" className="cart-page-feedback">{feedback}</p>
    {!items.length ? <div className="cart-empty">
      <div className="cart-empty-logo"><img src={brandLogo} alt="" /></div>
      <h2 className="customer-heading">Your next bad idea tastes good.</h2>
      <p>Add a little coffee, tea, or sweet trouble.</p>
      <Link to="/menu" className="cart-primary-action">View Menu</Link>
    </div> : <div className="cart-page-layout">
      <section aria-label="Cart items" className="cart-item-list">
        {items.map(cartItem => {
          const item = { ...cartItem, name: productPresentation[cartItem.menuItemId]?.name ?? cartItem.name }
          const image = menuProductImages[item.menuItemId]
          return <article key={item.menuItemId + ':' + item.size} className="cart-item">
            <div className={'cart-item-thumbnail' + (!image ? ' is-placeholder' : '')}>
              <ProductThumbnail productId={item.menuItemId} />
            </div>
            <div className="cart-item-details">
              <h2>{item.name}</h2>
              <p className="cart-item-size">{item.size}</p>
              <p className="cart-item-unit-price">{formatPeso(item.unitPrice)} each</p>
              <div className="cart-item-controls">
                <div className="cart-quantity" role="group" aria-label={`Quantity for ${item.name}, ${item.size}`}>
                  <button type="button" disabled={item.quantity === 1} aria-label={`Decrease ${item.name} ${item.size} quantity`} onClick={() => updateQuantity(item.menuItemId, item.size, item.quantity - 1)}>−</button>
                  <span aria-label={`Quantity ${item.quantity}`}>{item.quantity}</span>
                  <button type="button" disabled={!Number.isSafeInteger(item.quantity + 1)} aria-label={`Increase ${item.name} ${item.size} quantity`} onClick={() => updateQuantity(item.menuItemId, item.size, item.quantity + 1)}>+</button>
                </div>
                <p className="cart-item-total"><span>Line total</span>{formatPeso(item.unitPrice * item.quantity)}</p>
              </div>
              <button type="button" className="cart-quiet-action" aria-label={`Remove ${item.name} ${item.size} from cart`} onClick={() => {
                removeItem(item.menuItemId, item.size)
                setFeedback(`${item.size} ${item.name} removed from your cart.`)
              }}>Remove</button>
            </div>
          </article>
        })}
        <button type="button" onClick={event => { event.currentTarget.focus({ preventScroll: true }); setClearOpen(true) }} className="cart-quiet-action cart-clear">Clear Cart</button>
      </section>
      <CartSummary totalQuantity={totalQuantity} subtotal={subtotal} />
    </div>}
    {clearOpen && items.length > 0 && <ClearCartDialog onCancel={() => setClearOpen(false)} onConfirm={confirmClear} fallbackFocusRef={headingRef} />}
  </div>
}
