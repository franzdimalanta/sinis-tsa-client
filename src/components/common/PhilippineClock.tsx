import { useEffect, useState } from 'react'

const timeZone = 'Asia/Manila'
const dateFormat = new Intl.DateTimeFormat('en-PH', {
  timeZone, weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
})
const timeFormat = new Intl.DateTimeFormat('en-PH', {
  timeZone, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true,
})

export default function PhilippineClock() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const interval = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(interval)
  }, [])

  return <div className="mt-5 border-l-2 border-header-green/40 pl-4 font-brand" aria-live="off">
    <p className="text-sm font-extrabold text-header-green">Philippine Time <span className="font-medium">(Asia/Manila)</span></p>
    <time dateTime={now.toISOString()} className="mt-1 block text-sm leading-6 text-espresso tabular-nums">
      <span className="block">{dateFormat.format(now)}</span>
      <span className="block whitespace-nowrap text-lg font-bold">{timeFormat.format(now)}</span>
    </time>
  </div>
}
