import { useRef, useState, type CSSProperties } from 'react'
import ProductDetailsLink from './ProductDetailsLink'
import type { MenuItem } from '../../types/menu'
import { resolveSignatureItem, signatureSlides, type SignatureSlide } from './signatureSlides'
import './signatureShowcase.css'
import { useLocation } from 'react-router-dom'
import { useMenuShowcaseEntrance } from '../../hooks/useMenuShowcaseEntrance'

function DrinkVisual({ slide }: { slide: SignatureSlide }) {
  if (slide.image) return <img src={slide.image} alt="" className="signature-drink-image" />
  return <svg aria-hidden="true" className="signature-drink-image" viewBox="0 0 300 390" fill="none">
    <ellipse cx="150" cy="363" rx="85" ry="12" fill="#25371F" opacity=".18" />
    <path d="M159 30h12l-8 86h-12z" fill="#F7F3E8" />
    <path d="M57 104h186l-23 229c-2 17-138 17-140 0z" fill="#F7F3E8" fillOpacity=".22" stroke="#F7F3E8" strokeWidth="3" />
    <path d="M64 143h172l-19 184c-2 12-132 12-134 0z" fill={slide.tone} />
    <ellipse cx="150" cy="143" rx="86" ry="13" fill={slide.tone} />
    <g fill="#F7F3E8" fillOpacity=".3">
      <rect x="89" y="156" width="38" height="32" rx="8" transform="rotate(-12 89 156)" />
      <rect x="156" y="155" width="42" height="34" rx="8" transform="rotate(15 156 155)" />
      <rect x="125" y="190" width="36" height="29" rx="7" transform="rotate(-8 125 190)" />
    </g>
    <path d="m75 121 19 201" stroke="#F7F3E8" strokeOpacity=".6" strokeWidth="5" strokeLinecap="round" />
    <ellipse cx="150" cy="103" rx="96" ry="15" fill="#F7F3E8" />
    <ellipse cx="150" cy="101" rx="82" ry="8" fill={slide.tone} />
    <path d="M86 237h128l-6 58H92z" fill="#F7F3E8" />
    <text x="150" y="272" textAnchor="middle" fill="#526B3F" fontFamily="Manrope, sans-serif" fontWeight="800" fontSize="21">SINIS TSA</text>
  </svg>
}

export default function SignatureShowcase({ items, loading, error }: {
  items: MenuItem[]; loading: boolean; error: string | null
}) {
  const [selection, setSelection] = useState({ index: 0, direction: 1, moved: false })
  const touchStart = useRef<{ x: number; y: number } | null>(null)
  const showcaseRef = useRef<HTMLElement>(null)
  const location = useLocation()
  useMenuShowcaseEntrance(showcaseRef, location.key)
  const slide = signatureSlides[selection.index]
  const item = !loading && !error ? resolveSignatureItem(slide, items) : undefined
  function move(direction: number) {
    setSelection(current => ({ index: (current.index + direction + signatureSlides.length) % signatureSlides.length, direction, moved: true }))
  }

  return <section ref={showcaseRef} className="signature-showcase" aria-labelledby="menu-title">
    <h1 id="menu-title"><span className="signature-heading-entrance" data-menu-entrance="heading">OUR MENU</span></h1>
    <div className="signature-carousel" role="region" aria-roledescription="carousel" aria-labelledby="signatures-title">
      <h2 id="signatures-title"><span className="signature-heading-entrance" data-menu-entrance="heading">OUR BEST SELLERS</span></h2>
      <div className="signature-stage" onTouchStart={event => {
        const touch = event.touches[0]
        touchStart.current = event.touches.length === 1 ? { x: touch.clientX, y: touch.clientY } : null
      }} onTouchCancel={() => { touchStart.current = null }} onTouchEnd={event => {
        const start = touchStart.current
        touchStart.current = null
        const end = event.changedTouches[0]
        if (!start || !end) return
        const dx = end.clientX - start.x
        if (Math.abs(dx) >= 45 && Math.abs(dx) > Math.abs(end.clientY - start.y)) move(dx < 0 ? 1 : -1)
      }}>
        <button type="button" className="signature-arrow signature-arrow-prev" aria-label="Previous signature drink" onClick={() => move(-1)}>
          <svg aria-hidden="true" viewBox="0 0 24 24"><path d="m15 3-9 9 9 9" /></svg>
        </button>
        <div className="signature-visuals" style={{ '--signature-offset': `${selection.direction * 36}px` } as CSSProperties}>
          <div className="signature-preview" aria-hidden="true"><div className="signature-visual-entrance" data-menu-entrance="left"><div key={slide.id} className={selection.moved ? 'signature-enter' : ''}><DrinkVisual slide={signatureSlides[(selection.index + signatureSlides.length - 1) % signatureSlides.length]} /></div></div></div>
          <div className="signature-selected"><div className="signature-visual-entrance" data-menu-entrance="center"><div key={slide.id} className={selection.moved ? 'signature-enter' : ''}><DrinkVisual slide={slide} /></div></div></div>
          <div className="signature-preview" aria-hidden="true"><div className="signature-visual-entrance" data-menu-entrance="right"><div key={slide.id} className={selection.moved ? 'signature-enter' : ''}><DrinkVisual slide={signatureSlides[(selection.index + 1) % signatureSlides.length]} /></div></div></div>
        </div>
        <button type="button" className="signature-arrow signature-arrow-next" aria-label="Next signature drink" onClick={() => move(1)}>
          <svg aria-hidden="true" viewBox="0 0 24 24"><path d="m9 3 9 9-9 9" /></svg>
        </button>
      </div>
      <div className="signature-details" data-menu-entrance="details" role="group" aria-roledescription="slide" aria-label={`${selection.index + 1} of ${signatureSlides.length}`} aria-live="polite" aria-atomic="true">
        <h3>{item?.name ?? slide.name}</h3>
        <p className="signature-description">{slide.description}</p>
        {item &&
          <ProductDetailsLink className="signature-view" to={`/menu/${encodeURIComponent(item._id)}`} aria-label={`View Drink: ${item.name}`}>View Drink</ProductDetailsLink>
        }
      </div>
      <div className="signature-dots" data-menu-entrance="details" role="group" aria-label="Choose a featured drink">
        {signatureSlides.map((featured, index) => <button
          key={featured.id}
          type="button"
          className="signature-dot"
          aria-label={`Show slide ${index + 1} of ${signatureSlides.length}: ${featured.name}`}
          aria-current={selection.index === index ? 'true' : undefined}
          onClick={() => setSelection(current => current.index === index ? current : {
            index, direction: index > current.index ? 1 : -1, moved: true,
          })}
        ><span aria-hidden="true" /></button>)}
      </div>
    </div>
      <button type="button" data-menu-entrance="details" className="signature-view signature-browse" onClick={() => {
        const target = document.getElementById('full-menu-products')
        if (!target) return
        target.focus({ preventScroll: true })
        target.scrollIntoView({
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
          block: 'start',
        })
      }}>Browse Full Menu</button>
  </section>
}
