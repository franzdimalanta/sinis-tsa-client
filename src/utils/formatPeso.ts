const formatter = new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' })
export function formatPeso(value: number) { return formatter.format(value) }
