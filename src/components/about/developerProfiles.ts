export type DeveloperProfile = {
  name: string; initials: string; role: string; bio: string; footer: string
  imageSrc?: string; imagePosition?: string; imageAlt?: string; imageAspectRatio?: string
}
import johnMierPortrait from '../../assets/developers/john-mier-estorco.png'
// Import local portraits here and set imageSrc; imagePosition controls the crop.
export const developerProfiles: DeveloperProfile[] = [
  { name: 'John Mier Estorco', initials: 'JM', role: 'Aspiring Developer & Network Engineer', bio: 'An IT student who enjoys turning ideas into interfaces and learning how the systems behind them connect. Mier helped shape SINIS TSA’s visual personality—and will happily make room for a conversation about Pokémon TCG.', footer: 'Currently leveling up: code, networks, and the card collection.', imageSrc: johnMierPortrait, imagePosition: 'center top', imageAspectRatio: '4 / 5', imageAlt: 'John Mier Estorco posing with his shirt collar raised.' },
  { name: 'Franz Dominic Dimalanta', initials: 'FD', role: 'Teammate & Pokémon Enthusiast', bio: 'Franz helped bring the shared Pokémon inspiration into the project. Together with Mier, he is building a café website that combines their interests with the challenge of making an idea work on screen.', footer: 'Shared weakness: Pokémon and one more good idea.', imagePosition: 'center' },
]
