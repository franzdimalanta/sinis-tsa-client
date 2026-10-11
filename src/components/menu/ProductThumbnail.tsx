import SignatureImage from './SignatureImage'
import { menuProductImages } from './menuProductImages'
import reversedEye from '../../assets/sinis-tsa-logo.svg'

export default function ProductThumbnail({ productId }: { productId: string }) {
  const image = menuProductImages[productId]
  return image ? <SignatureImage src={image.src} alt={image.alt} scale={image.scale} bottomPadding={image.bottomPadding} /> : <img src={reversedEye} alt="" />
}
