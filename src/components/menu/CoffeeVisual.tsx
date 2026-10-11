export default function CoffeeVisual({ compact = false }: { compact?: boolean }) {
  return <div aria-hidden="true" className={'relative isolate flex items-center justify-center overflow-hidden bg-surface-warm ' + (compact ? 'h-40' : 'min-h-64 py-12 sm:min-h-80 lg:min-h-[28rem]')}>
    <div className="absolute inset-5 border border-border/80" />
    <div className={'absolute rounded-full border border-accent/30 ' + (compact ? 'h-52 w-52' : 'h-72 w-72 sm:h-96 sm:w-96')} />
    <div className={'relative -rotate-12 rounded-full border border-border bg-background shadow-sm ' + (compact ? 'h-24 w-24' : 'h-48 w-48 sm:h-56 sm:w-56')}>
      <div className="absolute top-[38%] -right-[15%] -z-10 h-[30%] w-[28%] rounded-full border-[7px] border-background" />
      <div className="absolute inset-[12%] rounded-full border-[6px] border-surface bg-primary">
        <div className="absolute inset-[16%] rounded-full border border-accent/60" />
        <div className="absolute inset-[30%] rounded-full border border-accent/40" />
      </div>
    </div>
    {!compact && <span className="absolute bottom-7 left-7 text-[0.65rem] uppercase tracking-[0.22em] text-muted">SINIS TSA / A moment for you</span>}
  </div>
}
