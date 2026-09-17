import { defineFeature } from '@/core/feature'
import { fromPhaseTable, type PhaseTable } from '@/core/recommend'

const TABLE: PhaseTable = {
  menstruation: {
    headline: 'Kurze Fastenfenster möglich',
    detail:
      'Die Hormonlage ist niedrig und stabil. Moderates Intervallfasten wird meist gut vertragen, sollte aber nicht mit starker Erschöpfung zusammenfallen.',
    level: 3,
    levelLabel: 'moderat geeignet',
    todos: ['12:12 bis 14:10, wenn es sich gut anfühlt', 'Bei starker Blutung lieber normal essen'],
  },
  follicular: {
    headline: 'Beste Phase zum Fasten',
    detail:
      'Insulinsensitivität und Stresstoleranz sind in der ersten Zyklushälfte am höchsten. Längere Fastenfenster fallen jetzt am leichtesten.',
    level: 5,
    levelLabel: 'gut geeignet',
    todos: ['14:10 oder 16:8 möglich', 'Fasten und harte Einheiten nicht auf denselben Tag legen'],
  },
  ovulation: {
    headline: 'Fasten ja, aber Training füttern',
    detail:
      'Fasten ist weiterhin gut verträglich. Weil jetzt die härtesten Einheiten anstehen, sollte das Essensfenster die Trainingszeit abdecken.',
    level: 4,
    levelLabel: 'bedingt geeignet',
    todos: ['Essensfenster um das Training legen', 'Nicht nüchtern intensiv trainieren'],
  },
  luteal: {
    headline: 'Fastenfenster verkürzen',
    detail:
      'Höherer Energiebedarf, stärkere Cortisolreaktion und Heißhunger machen langes Fasten in der zweiten Zyklushälfte anstrengend. Kurz vor der Periode besser ganz pausieren.',
    level: 2,
    levelLabel: 'wenig geeignet',
    todos: ['Höchstens 12:12', 'Regelmäßige Mahlzeiten mit Eiweiß und komplexen Kohlenhydraten'],
    avoid: ['16:8 oder länger in den letzten Tagen vor der Periode'],
  },
}

export const feature = defineFeature({
  id: 'fasting',
  title: 'Fasten',
  icon: '⏳',
  order: 30,
  question: 'Wann fasten?',
  recommend: ({ day }) => fromPhaseTable('fasting', TABLE, day),
})
