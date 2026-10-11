import type { CSSProperties } from 'react'
import './signatureImage.css'

export default function SignatureImage({ src, alt, scale = 1, bottomPadding = 0, className = '' }: {
  src: string; alt: string; scale?: number; bottomPadding?: number; className?: string
}) {
  return <div className={'signature-photo-frame' + (bottomPadding ? ' is-bottom-aligned' : '')} style={{ '--signature-photo-scale': scale, '--product-image-bottom-padding': bottomPadding } as CSSProperties}>
    <img src={src} alt={alt} className={className} />
  </div>
}
