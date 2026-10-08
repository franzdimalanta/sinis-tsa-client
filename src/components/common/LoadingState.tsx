export default function LoadingState({ message = 'Loading...' }: { message?: string }) {
  return <p role="status" className="ui-panel flex items-center gap-3 px-6 py-7 text-sm text-muted"><span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full bg-accent" />{message}</p>
}
