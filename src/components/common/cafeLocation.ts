import cafeInterior from '../../assets/cafe-interior.jpg'

type CafeLocation = {
  imageSrc?: string
  imageAlt: string
  address?: string
  openingHours?: string
  mapUrl?: string
}

// Hypothetical project café details and schedule, independent of map data.
// These opening hours are not National University Clark's actual hours.
export const cafeLocation: CafeLocation = {
  imageSrc: cafeInterior,
  imageAlt: 'Pokémon-themed café interior with orange counters, white chairs, character displays, and wood finishes.',
  address: 'Clark Tech Hub 8, SM City Clark Expansion,\nClark-Mabalacat-Angeles Road, Barangay Dau,\nMabalacat City, Pampanga 2010, Philippines.',
  openingHours: 'Monday–Sunday\n10:00 AM–10:00 PM',
}
