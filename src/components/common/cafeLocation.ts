import cafeInterior from '../../assets/cafe-interior.jpg'

type CafeLocation = {
  imageSrc?: string
  imageAlt: string
  address?: string
  openingHours?: string
  mapUrl?: string
}

// Supplied presentation image; actual café address and hours remain unconfirmed.
export const cafeLocation: CafeLocation = {
  imageSrc: cafeInterior,
  imageAlt: 'Pokémon-themed café interior with orange counters, white chairs, character displays, and wood finishes.',
}
