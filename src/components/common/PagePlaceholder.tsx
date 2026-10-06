type PagePlaceholderProps = {
  title: string
  description: string
}

export default function PagePlaceholder({ title, description }: PagePlaceholderProps) {
  return (
    <section className="rounded-xl border border-stone-200 bg-white p-6 sm:p-8">
      <h1 className="text-2xl font-semibold tracking-tight text-stone-900 sm:text-3xl">{title}</h1>
      <p className="mt-3 max-w-2xl leading-7 text-stone-600">{description}</p>
    </section>
  )
}
