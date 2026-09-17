import { useMemo, useState } from 'react'
import { defineFeature } from '@/core/feature'
import { Card } from '@/ui/Card'
import { EVIDENCE_LABELS, KIND_LABELS, SOURCES, type SourceKind } from './content'

const KINDS: SourceKind[] = ['studie', 'buch', 'creator']

function Screen() {
  const [kind, setKind] = useState<SourceKind>('studie')
  const entries = useMemo(() => SOURCES.filter((source) => source.kind === kind), [kind])

  return (
    <div className="stack">
      <Card title="Wissen" icon="📚" subtitle="Studien, Bücher und Creator zum Thema Zyklus">
        <div className="tabs" role="tablist">
          {KINDS.map((option) => (
            <button
              key={option}
              type="button"
              role="tab"
              aria-selected={option === kind}
              className={`tab ${option === kind ? 'is-active' : ''}`}
              onClick={() => setKind(option)}
            >
              {KIND_LABELS[option]}
            </button>
          ))}
        </div>
        <p className="note">
          Die Einordnung zeigt, wie belastbar eine Quelle ist. Vieles rund um "Cycle Syncing" ist
          populär, aber schwach belegt - die App macht Vorschläge, keine Vorschriften.
        </p>
      </Card>

      {entries.map((source) => (
        <Card key={source.id} title={source.title} subtitle={`${source.author}${source.year ? ` · ${source.year}` : ''}`}>
          <p className="text">{source.summary}</p>
          <p className="text text--muted">
            <strong>Für die App:</strong> {source.takeaway}
          </p>
          <div className="chips">
            <span className={`chip chip--${source.evidence}`}>{EVIDENCE_LABELS[source.evidence]}</span>
            {source.topics.map((topic) => (
              <span key={topic} className="chip">
                {topic}
              </span>
            ))}
          </div>
          {source.url && (
            <a className="link" href={source.url} target="_blank" rel="noreferrer noopener">
              Quelle öffnen ↗
            </a>
          )}
        </Card>
      ))}
    </div>
  )
}

export const feature = defineFeature({
  id: 'library',
  title: 'Wissen',
  icon: '📚',
  order: 80,
  question: 'Welche Studien, Bücher und Creator stecken dahinter?',
  navLabel: 'Wissen',
  Screen,
})
