import { defineFeature } from '@/core/feature'
import { fromPhaseTable, type PhaseTable } from '@/core/recommend'

const TABLE: PhaseTable = {
  menstruation: {
    headline: 'Etwas mehr Schlaf, Schmerzen stören',
    detail:
      'Krämpfe und niedriger Eisenspiegel können den Schlaf zerstückeln. Etwas früher ins Bett gleicht das aus.',
    level: 4,
    levelLabel: 'leicht erhöhter Schlafbedarf',
    todos: ['15-30 Minuten früher ins Bett', 'Wärmflasche, Magnesium am Abend'],
  },
  follicular: {
    headline: 'Bester Schlaf im Zyklus',
    detail:
      'Niedrige Körpertemperatur und steigendes Östrogen verbessern Einschlafen und Tiefschlaf. Der Bedarf liegt auf Normalniveau.',
    level: 2,
    levelLabel: 'normaler Schlafbedarf',
    todos: ['Normale Schlafzeiten halten - hier fällt Konstanz leicht'],
  },
  ovulation: {
    headline: 'Kurz, aber erholsam',
    detail:
      'Viele schlafen um den Eisprung etwas kürzer und fühlen sich trotzdem wach. Kein Grund, künstlich länger im Bett zu bleiben.',
    level: 2,
    levelLabel: 'normaler Schlafbedarf',
  },
  luteal: {
    headline: 'Mehr Schlaf, kühler schlafen',
    detail:
      'Progesteron hebt die Körperkerntemperatur um 0,3-0,5 Grad. Einschlafen dauert länger, Aufwachphasen nehmen zu - besonders in der Woche vor der Periode.',
    level: 5,
    levelLabel: 'hoher Schlafbedarf',
    todos: [
      'Schlafzimmer kühl (16-18 Grad), leichte Decke',
      '30-60 Minuten früher ins Bett',
      'Koffein ab Mittag reduzieren, Alkohol meiden',
    ],
    avoid: ['Späte intensive Einheiten', 'Bildschirm bis kurz vor dem Einschlafen'],
  },
}

export const feature = defineFeature({
  id: 'sleep',
  title: 'Schlaf',
  icon: '😴',
  order: 50,
  question: 'Wann brauche ich mehr Schlaf?',
  recommend: ({ day }) => fromPhaseTable('sleep', TABLE, day),
})
