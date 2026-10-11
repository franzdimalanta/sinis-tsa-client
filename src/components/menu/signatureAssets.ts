import aura from '../../assets/signatures/Aura Americano Iced.png'
import hyper from '../../assets/signatures/Hyper Macchiato.png'
import sinister from '../../assets/signatures/Sinister Chocolate Drizzle Iced Coffee.png'
import matcha from '../../assets/signatures/Tsa Matcha Latte.png'

// Scale compensates for transparent padding; source PNGs remain untouched.
export const signatureAssets = {
  'sinister-coffee': { src: sinister, alt: 'Sinister Chocolate Drizzle Iced Coffee in a clear SINIS TSA cup with chocolate drizzle and a creamy topping.', scale: 1.06, bottomPadding: .036 },
  'hyper-macchiato': { src: hyper, alt: 'Hyper Macchiato in a clear SINIS TSA cup with milk, iced coffee, and a caramel topping.', scale: .987, bottomPadding: .037 },
  'aura-americano': { src: aura, alt: 'Aura Americano Iced in a clear lidded SINIS TSA cup filled with coffee and ice.', scale: 1.14, bottomPadding: .055 },
  'sini-tsa-matcha': { src: matcha, alt: 'Tsa Matcha Latte in a clear lidded SINIS TSA cup with green matcha, milk, and ice.', scale: 1.17, bottomPadding: .049 },
} satisfies Record<string, { src: string; alt: string; scale: number; bottomPadding: number }>
