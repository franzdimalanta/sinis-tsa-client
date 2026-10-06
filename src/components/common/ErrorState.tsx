export default function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
 return <div role="alert" className="rounded-2xl border border-red-200 bg-red-50 p-6"><p className="text-red-900">{message}</p><button onClick={onRetry} className="mt-4 rounded-lg bg-stone-800 px-4 py-2 font-medium text-white hover:bg-stone-700 focus-visible:outline-2 focus-visible:outline-offset-2">Try again</button></div>
}
