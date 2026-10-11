import type { SignatureSlide } from './signatureSlides'
import './menuTile.css'

export default function SignaturePresentationCard({ slide }: { slide: SignatureSlide }) {
  return <article className="menu-tile">
    <div className="menu-tile-visual">
      {slide.image ? <img src={slide.image} alt="" className="menu-tile-image" /> :
        <svg className="menu-tile-image menu-tile-placeholder" viewBox="0 0 280 280" role="img" aria-label={`Illustration for ${slide.name}`} fill="none">
          <path d="M189 105h15c43 0 43 65 0 65h-17" stroke="#526B3F" strokeWidth="11" />
          <path d="M61 86h137l-9 99c-2 27-23 39-60 39s-58-12-60-39z" fill={slide.tone} fillOpacity=".35" stroke="#526B3F" strokeWidth="3" />
          <ellipse cx="129" cy="86" rx="68" ry="17" fill="#F7F3E8" stroke="#526B3F" strokeWidth="3" />
          <ellipse cx="129" cy="86" rx="55" ry="10" fill={slide.tone} />
        </svg>}
    </div>
    <div className="menu-tile-details">
      <h3 className="menu-tile-name">{slide.name}</h3>
      <p className="menu-tile-description">{slide.description}</p>
      <p className="menu-tile-presentation">Presentation preview</p>
    </div>
  </article>
}
