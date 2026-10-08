export default function EmptyState({ message }: { message: string }) {
  return <p className="rounded-xl border border-border bg-surface-warm px-6 py-7 text-sm leading-7 text-muted">{message}</p>
}
