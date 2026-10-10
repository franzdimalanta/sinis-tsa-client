export type ReviewEntry = {
  id: string
  quote: string
  attribution: string
  imageSrc?: string
  imageAlt?: string
}

export const sampleReviews: ReviewEntry[] = [
  { id: '01', quote: 'A cozy little stop for a coffee break.', attribution: 'Sample customer 01' },
  { id: '02', quote: 'The matcha vibe and playful design are my favorites.', attribution: 'Sample customer 02' },
  { id: '03', quote: 'A lovely place to catch up and enjoy a sip.', attribution: 'Sample customer 03' },
  { id: '04', quote: 'Already looking forward to my next coffee adventure.', attribution: 'Sample customer 04' },
]
