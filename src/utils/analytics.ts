import axios from 'axios'
import { z } from 'zod'
const dateField = z.string().refine(value => {
 if (!value) return true
 if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false
 const date = new Date(value + 'T00:00:00Z')
 return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value
}, 'Enter a valid date in YYYY-MM-DD format.')
export const salesRangeSchema = z.object({ start: dateField, end: dateField }).refine(values => !values.start || !values.end || values.start <= values.end, { path: ['end'], message: 'End date must not be before start date.' })
export type SalesRangeValues = z.infer<typeof salesRangeSchema>
const calendarFormatter = new Intl.DateTimeFormat('en-PH', { dateStyle: 'medium', timeZone: 'UTC' })
// Format a calendar label only; the backend owns Manila query boundaries.
export function formatSalesDate(value: string) { return calendarFormatter.format(new Date(value + 'T00:00:00Z')) }
export function getAnalyticsError(error: unknown) {
 if (axios.isAxiosError<{ message?: unknown }>(error) && error.response?.status === 400) {
  const message = error.response.data.message
  const safe = ['Limit must be a positive integer between 1 and 100', 'start must be a valid date in YYYY-MM-DD format', 'end must be a valid date in YYYY-MM-DD format', 'Start date must not be after end date']
  if (typeof message === 'string' && safe.includes(message)) return message
 }
 return 'We could not load this report. Please try again.'
}
