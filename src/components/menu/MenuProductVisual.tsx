import type { MenuItem } from '../../types/menu'
import { menuProductImages } from './menuProductImages'
import SignatureImage from './SignatureImage'
import normalEye from '../../assets/sinis-tsa-hero-logo.svg'

export default function MenuProductVisual({ item }: { item: MenuItem }) {
  const image = menuProductImages[item._id]
  return <div className="menu-tile-visual">
    {image ? <SignatureImage src={image.src} alt={image.alt} scale={image.scale} bottomPadding={image.bottomPadding} className="menu-tile-image" /> :
      <img src={normalEye} alt={`Photo unavailable for ${item.name}; SINIS TSA emblem`} className="menu-tile-image menu-tile-placeholder" />}
  </div>
}
