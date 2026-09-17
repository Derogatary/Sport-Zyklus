import type { ReactNode } from 'react'

interface CardProps {
  title?: ReactNode
  icon?: ReactNode
  subtitle?: ReactNode
  actions?: ReactNode
  children: ReactNode
  accent?: string
}

export function Card({ title, icon, subtitle, actions, children, accent }: CardProps) {
  return (
    <section className="card" style={accent ? { borderInlineStartColor: accent } : undefined}>
      {(title || actions) && (
        <header className="card__header">
          <div>
            <h2 className="card__title">
              {icon && <span aria-hidden="true">{icon}</span>} {title}
            </h2>
            {subtitle && <p className="card__subtitle">{subtitle}</p>}
          </div>
          {actions}
        </header>
      )}
      <div className="card__body">{children}</div>
    </section>
  )
}
