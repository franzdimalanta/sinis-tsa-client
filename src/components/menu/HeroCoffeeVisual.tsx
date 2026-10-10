/** Intentional illustrated placeholder until approved coffee photography is available. */
export default function HeroCoffeeVisual({ featured = false }: { featured?: boolean }) {
  return (
    <div role="img" aria-label="Temporary drink illustration: a cup with steam and a leaf" className={featured ? 'relative isolate flex h-[300px] w-full min-w-0 items-center justify-center sm:h-[360px] lg:h-[440px]' : 'relative isolate flex h-[280px] w-full min-w-0 items-center justify-center rounded-3xl bg-matcha/40 p-4 sm:h-[320px] lg:h-[400px]'}>
      <div aria-hidden="true" className="absolute aspect-square w-[min(75%,240px)] rounded-full bg-matcha lg:w-[min(75%,320px)]" />
      <svg aria-hidden="true" viewBox="0 0 320 320" preserveAspectRatio="xMidYMid meet" className={featured ? 'relative h-full w-full max-w-[440px] text-header-green' : 'relative h-[240px] w-full max-w-[340px] text-header-green sm:h-[280px] lg:h-[340px]'}>
        <path d="M124 78c-20-22 22-28 5-51M158 69c-19-19 23-28 8-48M190 80c-13-16 19-22 10-40" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        <ellipse cx="158" cy="261" rx="104" ry="18" fill="currentColor" opacity=".12" />
        <ellipse cx="153" cy="249" rx="99" ry="22" fill="#F7F3E8" stroke="currentColor" strokeWidth="3" />
        <path d="M223 128h13c43 0 43 63 0 63h-14" fill="none" stroke="currentColor" strokeWidth="17" />
        <path d="M223 128h13c43 0 43 63 0 63h-14" fill="none" stroke="#F7F3E8" strokeWidth="10" />
        <path d="M76 113h154l-11 97c-3 29-23 40-66 40s-63-11-66-40Z" fill="#F7F3E8" stroke="currentColor" strokeWidth="3" />
        <ellipse cx="153" cy="113" rx="77" ry="24" fill="#F7F3E8" stroke="currentColor" strokeWidth="3" />
        <ellipse cx="153" cy="113" rx="65" ry="16" fill="#362820" />
        <path d="M120 112c15-13 44-13 62 0" fill="none" stroke="#EBCB75" strokeWidth="3" strokeLinecap="round" />
        <path d="M148 199c-16-6-20-20-17-33 17 0 31 8 32 23-1 10-8 14-15 10Z" fill="#A8B982" />
        <path d="m141 179 17 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="m263 61 3-8 3 8 8 3-8 3-3 8-3-8-8-3Z" fill="currentColor" />
        <circle cx="58" cy="192" r="6" fill="#EBCB75" />
      </svg>
      {!featured && <span aria-hidden="true" className="absolute bottom-4 left-5 text-[0.65rem] font-semibold tracking-[0.12em] text-header-green uppercase sm:text-xs">A cup of possibility</span>}
    </div>
  )
}
