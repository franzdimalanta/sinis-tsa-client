import type { SignatureSlide } from './signatureSlides'
import SignatureImage from './SignatureImage'
import normalEye from '../../assets/sinis-tsa-hero-logo.svg'
import './productDetails.css'

export default function PresentationProductDetails({ product, modal }: { product: SignatureSlide; modal: boolean }) {
  const Heading = modal ? 'h2' : 'h1'
  return <section className="product-details">
    <div className="product-details-visual"><div className="menu-tile-visual">
      {product.image ? <SignatureImage src={product.image} alt={product.imageAlt ?? product.name} scale={product.imageScale} bottomPadding={product.imageBottomPadding} className="menu-tile-image" /> : <img src={normalEye} alt="" className="menu-tile-image" />}
    </div></div>
    <div className="product-details-copy"><p className="product-details-category">Coming Soon</p><Heading className="product-details-name customer-heading">{product.name}</Heading><p className="product-details-description">{product.description}</p><p className="product-details-note">This product is not available to order yet.</p></div>
  </section>
}
