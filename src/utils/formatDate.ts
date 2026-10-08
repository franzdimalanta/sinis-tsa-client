const dateFormatter = new Intl.DateTimeFormat('en-PH', {
  dateStyle: 'medium', timeStyle: 'short', timeZone: 'Asia/Manila',
})
export function formatDate(value: string) {
  const date = new Date(value)
  return Number.isFinite(date.getTime()) ? dateFormatter.format(date) : 'Date unavailable'
}
