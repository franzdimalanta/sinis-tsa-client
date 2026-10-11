import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useMenuItem } from '../../hooks/useMenuItem'
import { useCart } from '../../hooks/useCart'
import type { MenuSize } from '../../types/menu'
import { formatPeso } from '../../utils/formatPeso'
import { availableProductSizes } from '../../utils/availableProductSizes'
import LoadingState from '../common/LoadingState'
import ErrorState from '../common/ErrorState'
import MenuProductVisual from './MenuProductVisual'
import './productDetails.css'
import { presentMenuItem, plannedWaffles } from './productPresentation'
import { signatureSlides } from './signatureSlides'
import PresentationProductDetails from './PresentationProductDetails'

export default function ProductDetails({ id, modal = false }: { id: string; modal?: boolean }) {
  const presentation = [...signatureSlides, ...plannedWaffles].find(product => id === `presentation:${product.id}`)
  return presentation ? <PresentationProductDetails product={presentation} modal={modal} /> : <OrderableProductDetails id={id} modal={modal} />
}

function OrderableProductDetails({ id, modal }: { id: string; modal: boolean }) {
  const { data, loading, error, refresh } = useMenuItem(id)
  const [choice, setChoice] = useState<MenuSize | null>(null)
  const { addItem } = useCart()
  const [feedback, setFeedback] = useState('')
  const [feedbackSucceeded, setFeedbackSucceeded] = useState(false)
  if (loading) return <LoadingState message="Loading product details and availability..." />
  if (error || !data) return <ErrorState message={error ?? 'This menu item could not be found.'} onRetry={refresh} />
  const { availability } = data
  const item = presentMenuItem(data.item)
  const availableSizes = availableProductSizes(item, availability)
  const selectedSize = availableSizes.find(size => size.size === choice) ?? availableSizes[0]
  function handleAdd() {
    if (!selectedSize) return
    const added = addItem({ menuItemId: item._id, name: item.name, size: selectedSize.size, quantity: 1, unitPrice: selectedSize.price })
    setFeedback(added ? `${selectedSize.size} ${item.name} added to cart.` : 'This item could not be added to cart.')
    setFeedbackSucceeded(added)
  }
  const Heading = modal ? 'h2' : 'h1'
  return <section className="product-details">
    <div className="product-details-visual"><MenuProductVisual item={item} /></div>
    <div className="product-details-copy">
      <p className="product-details-category">{item.category?.name ?? 'Uncategorized'}</p>
      <Heading className="product-details-name customer-heading">{item.name}</Heading>
      <p className="product-details-description">{item.description}</p>
      <fieldset className="product-details-size-options">
        <legend>Choose your size</legend>
        <div className="product-details-sizes">{item.sizes.map(size => {
          const available = availableSizes.some(entry => entry.size === size.size)
          return <label key={size.size} className={'product-details-size' + (selectedSize?.size === size.size ? ' is-selected' : '') + (!available ? ' is-sold-out' : '')}>
            <span><input type="radio" name={`product-size-${id}`} value={size.size} checked={selectedSize?.size === size.size} disabled={!available} onChange={() => setChoice(size.size)} /> <span className="capitalize">{size.size}</span></span>
            <span className="product-details-price">{formatPeso(size.price)}</span>
            <span className={'product-details-stock' + (!available ? ' is-sold-out' : '')}>{available ? 'Available' : 'Sold Out'}</span>
          </label>
        })}</div>
      </fieldset>
      {!availableSizes.length && <p role="status" className="product-details-unavailable">This item cannot currently be ordered. Please choose another item.</p>}
      <div className="product-details-actions">
        <button type="button" onClick={handleAdd} disabled={!selectedSize} className="product-details-add">Add to Cart</button>
        <p role="status" aria-live="polite" className={'product-details-feedback' + (feedbackSucceeded ? ' is-success' : '')}>{feedback}</p>
        {feedback && <Link to="/cart" className="product-details-cart">View Cart</Link>}
      </div>
      <p className="product-details-note">Availability reflects current stock and may change.</p>
    </div>
  </section>
}
