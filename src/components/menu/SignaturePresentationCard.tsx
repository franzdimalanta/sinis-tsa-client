import type { SignatureSlide } from './signatureSlides'
import SignatureImage from './SignatureImage'
import './menuTile.css'
import ProductDetailsLink from './ProductDetailsLink'
import { presentationRoute } from './productPresentation'
import normalEye from '../../assets/sinis-tsa-hero-logo.svg'
import type { MenuItem } from '../../types/menu'
import { formatPeso } from '../../utils/formatPeso'

export default function SignaturePresentationCard({ slide, item }: { slide: SignatureSlide; item?: MenuItem }) {
  return <article className="menu-tile signature-menu-tile">
    <div className="menu-tile-visual" style={{ '--signature-bottom-padding': slide.imageBottomPadding ?? 0 } as import('react').CSSProperties}>
      {slide.image ? <SignatureImage src={slide.image} alt={slide.imageAlt ?? slide.name} scale={slide.imageScale} className="menu-tile-image" /> :
        <img src={normalEye} alt="" className="menu-tile-image" />}
    </div>
    <div className="menu-tile-details">
      <h3 className="menu-tile-name">{slide.name}</h3>
      <p className="menu-tile-description">{slide.description}</p>
      <div className="menu-tile-presentation">
        {item ? <><p className="menu-tile-price">{item.sizes.length ? 'From ' + formatPeso(Math.min(...item.sizes.map(size => size.price))) : 'Prices unavailable'}</p><p className="menu-tile-sizes">{item.sizes.map(size => size.size).join(' / ')}</p></> : <p>Coming Soon</p>}
        <ProductDetailsLink to={item ? `/menu/${encodeURIComponent(item._id)}` : presentationRoute(slide.id)} className="menu-tile-action" aria-label={`View Product: ${slide.name}`}>View Product</ProductDetailsLink>
      </div>
    </div>
  </article>
}
