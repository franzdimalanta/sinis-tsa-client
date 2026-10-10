import { createPortal } from 'react-dom'
import type { RefObject } from 'react'
import logo from '../../assets/sinis-tsa-logo.svg'

export default function HomepageIntro({ overlayRef }: { overlayRef: RefObject<HTMLDivElement | null> }) {
  return createPortal(
    <div ref={overlayRef} className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-header-green px-6 text-center text-cream" role="status" aria-label="Welcome to SINIS TSA, Coffee & Tea">
      <img src={logo} alt="" className="h-48 w-48 shrink-0 object-contain sm:h-64 sm:w-64" />
      <div data-intro-text>
        <p className="font-wordmark text-4xl font-normal sm:text-6xl">SINIS TSA</p>
        <p className="mt-3 font-brand text-base sm:text-lg">Coffee &amp; Tea</p>
      </div>
    </div>, document.body,
  )
}
