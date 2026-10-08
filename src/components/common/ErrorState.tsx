export default function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-6 py-7"><p className="text-sm leading-6 text-red-900">{message}</p><button onClick={onRetry} className="ui-button ui-button-secondary mt-4">Try again</button></div>
}
