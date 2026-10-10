import beansImage from '../../assets/highlights/HL1.png'
import cafeImage from '../../assets/highlights/HL2.png'
import equipmentImage from '../../assets/highlights/HL3.png'

export type CafeHighlight = {
  id: string
  title: string
  description?: string
  image: { src?: string; alt: string; label: string; background: string; objectPosition?: string }
}

// Supplied images in attachment order. Headline business claims remain drafts.
export const cafeHighlights: CafeHighlight[] = [
  { id: 'drinks', title: 'Made with High-Quality Beans', description: 'Good coffee starts with good beans. Find your next favorite sip.', image: { src: beansImage, alt: 'Roasted coffee beans filling open burlap sacks.', label: 'Drinks image placeholder', background: '#A8B982', objectPosition: '40% center' } },
  { id: 'food', title: 'Cozy Spaces & Café Events', description: 'A cozy spot to unwind, connect, and share a little adventure.', image: { src: cafeImage, alt: 'Café interior with tables, chairs, pendant lights, and people behind an espresso counter.', label: 'Food image placeholder', background: '#E8DCC4', objectPosition: '50% center' } },
  { id: 'atmosphere', title: 'Quality Brewing Equipment', description: 'The tools behind every brew, from the first pour to the final sip.', image: { src: equipmentImage, alt: 'Hands operating a stainless-steel espresso machine with a portafilter and pressure gauge.', label: 'Café image placeholder', background: '#EBCB75', objectPosition: '55% center' } },
]
