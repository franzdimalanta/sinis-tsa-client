export type ReviewEntry = {
  id: string
  quote: string
  attribution: string
  initials: string
  rating: 4 | 5
}

// Fictional samples for the project presentation, not collected testimonials.
export const sampleReviews: ReviewEntry[] = [
  { id: '01', quote: 'Aura Americano Iced is my kind of afternoon coffee: bold, cold, and easy to sip. I liked having something simple while catching up with a friend.', attribution: 'Nina R.', initials: 'NR', rating: 5 },
  { id: '02', quote: 'Ang sarap ng Hyper Macchiato! Creamy without losing that coffee taste. Next time, less sweet sana, but I still enjoyed every sip.', attribution: 'Paolo M.', initials: 'PM', rating: 4 },
  { id: '03', quote: 'Ordered the Sinister Chocolate Drizzle Iced Coffee because the name made me laugh. The chocolate and coffee combo felt like a little treat after a long day.', attribution: 'Bea L.', initials: 'BL', rating: 5 },
  { id: '04', quote: 'Tsa Matcha Latte was a lovely change from my usual coffee. Smooth, mellow, and just right for sitting down and taking a proper break.', attribution: 'Eli D.', initials: 'ED', rating: 5 },
  { id: '05', quote: 'Cute ng eye logo, medyo naughty ang vibe! My friend and I stayed for a chat and a couple of drinks. Such a fun little coffee stop.', attribution: 'Mika S.', initials: 'MS', rating: 5 },
  { id: '06', quote: 'Came for a quick coffee, ended up lingering with my book. The playful names gave me a smile, and choosing a drink was half the fun.', attribution: 'Theo C.', initials: 'TC', rating: 4 },
]
