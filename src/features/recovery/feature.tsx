import { defineFeature } from '@/core/feature'
import { fromPhaseTable, type PhaseTable } from '@/core/recommend'

const TABLE: PhaseTable = {
  menstruation: {
    headline: 'Erholung hat Vorrang',
    detail:
      'Tag 1-2 sind oft die anstrengendsten Tage im Zyklus. Termine entzerren, Pausen einplanen, Wärme und leichte Bewegung helfen gegen Krämpfe.',
    level: 5,
    levelLabel: 'hoher Erholungsbedarf',
    todos: ['Termine reduzieren', 'Wärme, Dehnen, Spaziergang', 'Nichts beweisen müssen'],
  },
  follicular: {
    headline: 'Belastbar - Erholung läuft nebenbei',
    detail:
      'Die Regeneration nach Belastung ist jetzt am besten. Du verträgst mehr Trainingsreize und mehr Termine als sonst.',
    level: 2,
    levelLabel: 'niedriger Erholungsbedarf',
    todos: ['Anspruchsvolle Projekte und Trainingsblöcke hierhin legen'],
  },
  ovulation: {
    headline: 'Hoch aktiv, aber nicht unerschöpflich',
    detail:
      'Energie und Stimmung sind auf dem Höchststand. Genau deshalb wird jetzt gern zu viel geplant - eine echte Pause pro Tag einbauen.',
    level: 2,
    levelLabel: 'niedriger Erholungsbedarf',
    todos: ['Eine bewusste Pause trotz Hochgefühl'],
  },
  luteal: {
    headline: 'Puffer einbauen, Reize senken',
    detail:
      'In der zweiten Zyklushälfte steigen Ruhepuls und Cortisolreaktion, PMS-Symptome nehmen zu. Weniger Reize und mehr Pufferzeit machen die Phase deutlich angenehmer.',
    level: 4,
    levelLabel: 'erhöhter Erholungsbedarf',
    todos: ['Pufferzeiten im Kalender', 'Ruhige Abendroutine', 'Spaziergänge statt Zusatztermine'],
    avoid: ['Kalender randvoll planen', 'Schwierige Gespräche kurz vor der Periode'],
  },
}

export const feature = defineFeature({
  id: 'recovery',
  title: 'Ausruhen',
  icon: '🧘',
  order: 40,
  question: 'Wann mehr ausruhen?',
  recommend: ({ day }) => fromPhaseTable('recovery', TABLE, day),
})
