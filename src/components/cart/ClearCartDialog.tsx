import { useLayoutEffect, useRef, type RefObject } from 'react'
import { createPortal } from 'react-dom'

export default function ClearCartDialog({ onCancel, onConfirm, fallbackFocusRef }: {
  onCancel: () => void; onConfirm: () => void; fallbackFocusRef: RefObject<HTMLElement | null>
}) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const keepRef = useRef<HTMLButtonElement>(null)
  const confirmed = useRef(false)
  useLayoutEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const fallback = fallbackFocusRef.current
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    // Native showModal supplies focus containment and background inertness.
    dialog.showModal()
    keepRef.current?.focus({ preventScroll: true })
    return () => {
      dialog.close()
      document.body.style.overflow = overflow
      queueMicrotask(() => {
        const target = trigger?.isConnected ? trigger : fallback
        target?.focus({ preventScroll: true })
      })
    }
  }, [fallbackFocusRef])
  return createPortal(<dialog ref={dialogRef} className="cart-confirm-dialog" aria-labelledby="clear-cart-title" aria-describedby="clear-cart-message" onCancel={event => {
    event.preventDefault()
    onCancel()
  }}>
    <button type="button" className="cart-confirm-close" aria-label="Close clear cart confirmation" onClick={onCancel}>×</button>
    <h2 id="clear-cart-title">Clear your cart?</h2>
    <p id="clear-cart-message">This will remove all items from your cart.</p>
    <div className="cart-confirm-actions">
      <button ref={keepRef} type="button" className="cart-confirm-keep" onClick={onCancel}>Keep Items</button>
      <button type="button" className="cart-confirm-clear" onClick={() => {
        if (confirmed.current) return
        confirmed.current = true
        onConfirm()
      }}>Clear Cart</button>
    </div>
  </dialog>, document.body)
}
