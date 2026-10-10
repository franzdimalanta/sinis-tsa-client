import hero4 from '../../assets/hero/HERO4.png'
import hero3 from '../../assets/hero/HERO3.png'
import hero2 from '../../assets/hero/HERO2.png'
import hero1 from '../../assets/hero/HERO1.png'

export type PromoSlide = { id: string; src?: string; alt: string; background: string; objectPosition?: string }
// Attachment order, with focal positions preserving the cups in taller desktop crops.
export const promoSlides: PromoSlide[] = [
  { id: 'hero4', src: hero4, alt: 'Iced green matcha drink in a TSA-branded cup on a cork coaster.', background: '#526B3F', objectPosition: 'left center' },
  { id: 'hero3', src: hero3, alt: 'A person in a red scarf pointing to a SINIS TSA takeaway cup against a red background.', background: '#806B5B', objectPosition: 'left center' },
  { id: 'hero2', src: hero2, alt: 'A smiling person in a tan cap holding a white SINIS TSA takeaway cup.', background: '#E8DCC4', objectPosition: 'left center' },
  { id: 'hero1', src: hero1, alt: 'Three hands bringing together two coffees with latte art and an iced black drink.', background: '#806B5B', objectPosition: 'center' },
]
