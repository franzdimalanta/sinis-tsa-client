import { Link } from 'react-router-dom'
import CoffeeVisual from '../../components/menu/CoffeeVisual'
const features = [['Your everyday favorites', 'Explore coffee, matcha, chocolate, tea, and a pastry to go with your drink.'], ['A size for your moment', 'Choose the size that suits you, with current availability shown before you add to cart.'], ['One simple coffee break', 'Browse, choose, and review your order. A little less effort, a little more time for you.']]
export default function LandingPage() {
  return <div className="customer-page space-y-14 sm:space-y-20">
    <section className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
      <div className="py-4 sm:py-8"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">BrewLogic / Coffee, simplified.</p><h1 className="mt-6 text-5xl leading-[1.08] tracking-tight text-primary sm:text-6xl lg:text-7xl">A little pause.<br />A good cup.</h1><p className="mt-6 max-w-lg text-base leading-8 text-muted sm:text-lg">From your everyday latte to something a little sweeter, make room for a coffee break that feels like yours.</p><Link to="/menu" className="ui-button ui-button-primary mt-8 min-h-12 px-6">Explore the menu</Link></div>
      <CoffeeVisual />
    </section>
    <section className="border-y border-border py-9 sm:py-12"><div className="grid gap-8 sm:grid-cols-3">{features.map(([title, description], index) => <article key={title}><p aria-hidden="true" className="text-xs tracking-widest text-muted">0{index + 1}</p><h2 className="mt-3 font-editorial text-2xl text-primary">{title}</h2><p className="mt-3 text-sm leading-7 text-muted">{description}</p></article>)}</div></section>
    <section className="flex flex-wrap items-end justify-between gap-6"><div><p className="text-xs uppercase tracking-[0.2em] text-muted">Find your next favorite</p><h2 className="mt-3 max-w-xl font-editorial text-3xl leading-tight text-primary sm:text-4xl">Made for your everyday coffee.</h2><p className="mt-4 max-w-lg leading-7 text-muted">Coffee, tea, something sweet. Take a look around and see what suits your mood.</p></div><Link to="/menu" className="ui-button ui-button-secondary min-h-12 px-6">Discover the menu</Link></section>
  </div>
}
