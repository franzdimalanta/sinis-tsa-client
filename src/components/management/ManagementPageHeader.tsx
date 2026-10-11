import type { ReactNode } from 'react'
export default function ManagementPageHeader({ title, description, action }: { title: string; description: string; action?: ReactNode }) {
  return <header className="management-page-header"><div className="min-w-0"><p className="mb-3 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-muted">SINIS TSA / Operations</p><h1 className="text-3xl leading-tight tracking-tight text-primary sm:text-4xl">{title}</h1><p className="mt-3 max-w-2xl text-sm leading-7 text-muted">{description}</p></div>{action && <div className="shrink-0">{action}</div>}</header>
}
