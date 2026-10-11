import cloud from '../../assets/products/Cloud Nine Iced Latte-1.png'
import spanish from '../../assets/products/Iced Spanish Latte With Leaf Eyes-2.png'
import chocolate from '../../assets/products/Dark Pulse Iced Chocolate Cup-3.png'
import tea from '../../assets/products/Leaf Guard iced tea cup-4.png'
import croissant from '../../assets/products/Golden chocolate croissant with leaf-eye logo-5.png'
import aqua from '../../assets/products/Golden blueberry waffles with violet sauce-6.png'
import magma from '../../assets/products/Magma Waffles with Strawberry Sauce-7.png'

// Measured alpha bounds; images remain untouched. Foods stay broad, cups tall.
export const productAssets = {
  cloud: { src: cloud, alt: 'Cloud Nine Latte in a clear SINIS TSA cup with iced coffee and milk.', scale: 1.11, bottomPadding: .048 },
  spanish: { src: spanish, alt: 'Sweet Veil Spanish Latte in a clear SINIS TSA cup with iced coffee and creamy milk.', scale: 1.11, bottomPadding: .048 },
  chocolate: { src: chocolate, alt: 'Dark Pulse Chocolate in a clear SINIS TSA cup filled with iced chocolate.', scale: 1.12, bottomPadding: .048 },
  tea: { src: tea, alt: 'Iced tea in a clear lidded SINIS TSA cup with amber tea and ice.', scale: 1.15, bottomPadding: .043 },
  croissant: { src: croissant, alt: 'Night Slash Croissant with visible chocolate filling on SINIS TSA branded paper.', scale: 1.08, bottomPadding: .163 },
  aqua: { src: aqua, alt: 'Aqua Waffles with blueberries and violet blueberry sauce on SINIS TSA branded paper.', scale: 1.08, bottomPadding: .153 },
  magma: { src: magma, alt: 'Magma Waffles topped with strawberries and red strawberry sauce on SINIS TSA branded paper.', scale: 1.08, bottomPadding: .148 },
}
