import axios from 'axios'

export function getOrderError(error: unknown, reading = false) {
  if (axios.isAxiosError<{ message?: unknown }>(error)) {
    const status = error.response?.status
    if (reading && status === 404) return 'This order could not be found.'
    if (reading && status === 400) return 'This order link is invalid.'
    if (status === 400) {
      const message = error.response?.data.message
      if (typeof message === 'string') {
        if (message.startsWith('Insufficient stock for ')) return message
        if (message.endsWith(' is not active')) return message
        if (message.startsWith('Requested size is not available for ')) return message
        if (message.startsWith('No recipe exists')) return 'One of your selected sizes cannot currently be prepared. Please choose another item or size.'
        if (message.includes('does not exist')) return 'One of your selected items is no longer available. Please review your cart.'
      }
      return 'Please check your customer details and cart, then review your order again.'
    }
  }
  return reading ? 'We could not load your order. Please try again.'
    : 'We could not confirm your order. Please try again. If you already clicked Place order, check with the shop before retrying.'
}
