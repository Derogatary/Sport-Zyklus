import { Card } from './Card'
import { LevelMeter } from './LevelMeter'
import type { Recommendation } from '@/core/types'

interface Props {
  recommendation: Recommendation
  icon: string
  title: string
  accent?: string
}

export function RecommendationCard({ recommendation, icon, title, accent }: Props) {
  return (
    <Card title={title} icon={icon} accent={accent} subtitle={recommendation.headline}>
      <p className="text">{recommendation.detail}</p>
      <LevelMeter
        level={recommendation.level}
        label={recommendation.levelLabel}
        accent={accent}
      />
      {recommendation.todos && recommendation.todos.length > 0 && (
        <ul className="list list--do">
          {recommendation.todos.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
      {recommendation.avoid && recommendation.avoid.length > 0 && (
        <ul className="list list--avoid">
          {recommendation.avoid.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </Card>
  )
}
