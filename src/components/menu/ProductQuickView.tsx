import { useLayoutEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate, useParams } from 'react-router-dom'
import ProductDetails from './ProductDetails'

export default function ProductQuickView() {
  const { id = '' } = useParams()
  const navigate = useNavigate()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useLayoutEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const background = document.querySelector<HTMLElement>('.sinis-customer')
    const previousInert = background?.inert ?? false
    const x = window.scrollX
    const y = window.scrollY
    const bodyStyles = document.body.style.cssText
    const scrollbar = window.innerWidth - document.documentElement.clientWidth
    const padding = Number.parseFloat(getComputedStyle(document.body).paddingRight) || 0
    Object.assign(document.body.style, { position: 'fixed', top: `${-y}px`, left: `${-x}px`, width: '100%', overflow: 'hidden', paddingRight: `${padding + scrollbar}px` })
    if (background) background.inert = true
    dialog.showModal()
    closeRef.current?.focus({ preventScroll: true })
    return () => {
      if (background) background.inert = previousInert
      dialog.close()
      document.body.style.cssText = bodyStyles
      if (trigger?.isConnected) trigger.focus({ preventScroll: true })
      window.scrollTo({ left: x, top: y, behavior: 'instant' })
    }
  }, [])

  return createPortal(<dialog ref={dialogRef} className="product-quick-view" aria-labelledby="quick-view-title" onCancel={event => {
    event.preventDefault()
    navigate(-1)
  }}>
    <div className="product-quick-view-header">
      <p id="quick-view-title">Product details</p>
      <button ref={closeRef} type="button" aria-label="Close product details" onClick={() => navigate(-1)} className="product-quick-view-close">
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 6 12 12M6 18 18 6" /></svg>
      </button>
    </div>
    <div className="product-quick-view-content"><ProductDetails key={id} id={id} modal /></div>
  </dialog>, document.body)
}
