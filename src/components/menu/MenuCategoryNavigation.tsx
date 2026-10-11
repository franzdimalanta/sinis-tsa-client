import { useEffect, useRef, useState } from 'react'
import type { Category } from '../../types/menu'
import './completeMenu.css'
import { signaturesFilterId } from './signatureMembership'

export default function MenuCategoryNavigation({ categories, selectedId, onSelect }: {
  categories: Category[]; selectedId: string; onSelect: (id: string) => void
}) {
  const navRef = useRef<HTMLElement>(null)
  const sentinelRef = useRef<HTMLDivElement>(null)
  const rowRef = useRef<HTMLDivElement>(null)
  const [stuck, setStuck] = useState(false)

  useEffect(() => {
    const nav = navRef.current
    const sentinel = sentinelRef.current
    if (!nav || !sentinel) return
    let frame = 0
    function measure() {
      frame = 0
      if (!nav || !sentinel) return
      const offset = Number.parseFloat(getComputedStyle(nav).top) || 0
      setStuck(sentinel.getBoundingClientRect().top < offset && nav.getBoundingClientRect().top >= offset - .5)
      nav.closest('section')?.style.setProperty('--complete-menu-nav-height', `${nav.getBoundingClientRect().height}px`)
    }
    function schedule() {
      if (!frame) frame = window.requestAnimationFrame(measure)
    }
    const observer = new ResizeObserver(schedule)
    observer.observe(nav)
    const header = nav.closest('.sinis-customer')?.querySelector('.sinis-header')
    if (header) observer.observe(header)
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    measure()
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      window.cancelAnimationFrame(frame)
    }
  }, [])

  function reveal(button: HTMLElement) {
    const row = rowRef.current
    if (!row) return
    const bounds = row.getBoundingClientRect()
    const item = button.getBoundingClientRect()
    if (item.left < bounds.left + 6) row.scrollLeft -= bounds.left + 6 - item.left
    else if (item.right > bounds.right - 6) row.scrollLeft += item.right - bounds.right + 6
  }
  useEffect(() => {
    const row = rowRef.current
    if (!row) return
    function revealSelected() {
      const selected = row?.querySelector<HTMLElement>('[aria-pressed="true"]')
      if (selected) reveal(selected)
    }
    revealSelected()
    const observer = new ResizeObserver(revealSelected)
    observer.observe(row)
    return () => observer.disconnect()
  }, [selectedId, categories])

  return <>
    <div ref={sentinelRef} className="complete-menu-sentinel" aria-hidden="true" />
    <nav ref={navRef} id="full-menu-products" tabIndex={-1} aria-label="Menu categories" className={'complete-menu-navigation' + (stuck ? ' is-stuck' : '')}>
      <div className="complete-menu-navigation-inner">
        <p className="complete-menu-navigation-title">OUR MENU</p>
        <div ref={rowRef} className="complete-menu-category-row" role="group" aria-label="Filter by category">
          {[{ _id: '', name: 'All' }, { _id: signaturesFilterId, name: 'Signatures' }, ...categories].map(category => <button
            key={category._id} type="button" aria-pressed={selectedId === category._id}
            onClick={() => onSelect(category._id)} onFocus={event => reveal(event.currentTarget)}
            className="complete-menu-category"
          >{category.name}</button>)}
        </div>
      </div>
    </nav>
  </>
}
