import { defineFeature } from '@/core/feature'
import { fromPhaseTable, type PhaseTable } from '@/core/recommend'

const TABLE: PhaseTable = {
  menstruation: {
    headline: 'Locker bewegen, Kraft nur nach Gefühl',
    detail:
      'Alle Hormone sind niedrig. Viele fühlen sich an Tag 1-2 schlapp, ab Tag 3 kehrt die Kraft oft schnell zurück. Bewegung lindert Krämpfe, harte Wettkampfbelastung muss aber nicht sein.',
    level: 2,
    levelLabel: 'niedrige bis mittlere Intensität',
    todos: [
      'Spaziergang, lockeres Radfahren, Schwimmen, Mobility',
      'Leichtes Ganzkörper-Krafttraining, wenn es sich gut anfühlt',
      'Ab Tag 3 ruhig wieder normal trainieren',
    ],
    avoid: ['Maximalversuche und lange Intervall-Einheiten an Tag 1-2'],
  },
  follicular: {
    headline: 'Beste Zeit für harte Einheiten',
    detail:
      'Steigendes Östrogen verbessert Kohlenhydratverwertung, Muskelaufbau und Regeneration. Jetzt lohnt sich Progression: schwere Sätze, Intervalle, neue Technik.',
    level: 5,
    levelLabel: 'hohe Intensität',
    todos: [
      'Schweres Krafttraining mit Progression (3-5 Wiederholungen)',
      'HIIT und Intervalle, hoher Trainingsumfang',
      'Neue Bewegungsmuster lernen - Koordination ist jetzt gut',
    ],
  },
  ovulation: {
    headline: 'Kraftpeak nutzen, Gelenke schützen',
    detail:
      'Rund um den Eisprung sind Kraft und Antrieb am höchsten. Gleichzeitig macht hohes Östrogen Bänder lockerer - das Risiko für Knie- und Bandverletzungen steigt.',
    level: 5,
    levelLabel: 'sehr hohe Intensität',
    todos: [
      'Personal Bests, Wettkampf, schwere Grundübungen',
      'Länger aufwärmen, Landungen und Richtungswechsel sauber ausführen',
    ],
    avoid: ['Unkontrollierte Sprung- und Stopp-Belastungen ohne Aufwärmen'],
  },
  luteal: {
    headline: 'Umfang statt Spitze, Hitze beachten',
    detail:
      'Progesteron erhöht Körpertemperatur und Ruhepuls, die Belastungstoleranz sinkt in der zweiten Zyklushälfte. Grundlagenausdauer und Technik funktionieren weiter gut, Spitzenbelastungen fühlen sich schwerer an.',
    level: 3,
    levelLabel: 'mittlere Intensität',
    todos: [
      'Grundlagenausdauer im lockeren Bereich',
      'Krafttraining mit moderatem Gewicht und mehr Wiederholungen',
      'Mehr trinken und Elektrolyte, kühler trainieren',
    ],
    avoid: ['Lange Einheiten bei Hitze', 'Zu dichte Belastungsspitzen kurz vor der Periode'],
  },
}

export const feature = defineFeature({
  id: 'training',
  title: 'Sport',
  icon: '🏋️',
  order: 10,
  question: 'Wann welches Training?',
  recommend: ({ day }) => fromPhaseTable('training', TABLE, day),
})
