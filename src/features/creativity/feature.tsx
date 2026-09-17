import { defineFeature } from '@/core/feature'
import { fromPhaseTable, type PhaseTable } from '@/core/recommend'

const TABLE: PhaseTable = {
  menstruation: {
    headline: 'Reflektieren und aussortieren',
    detail:
      'Niedrige Hormone gehen bei vielen mit einem klaren, nüchternen Blick einher. Gut für Rückblick, Aufräumen und ehrliche Entscheidungen - weniger gut für Bühne und Dauerpräsenz.',
    level: 3,
    levelLabel: 'nach innen gerichtet',
    todos: ['Rückblick und Planung', 'Ideensammlung ohne Umsetzungsdruck', 'Aussortieren'],
  },
  follicular: {
    headline: 'Ideen und Neues starten',
    detail:
      'Steigendes Östrogen bringt Offenheit, Lernfreude und Risikobereitschaft. Die beste Zeit für Brainstorming, neue Projekte und Konzeptarbeit.',
    level: 5,
    levelLabel: 'hohe kreative Energie',
    todos: ['Neue Projekte starten', 'Brainstorming und Konzepte', 'Neues lernen'],
  },
  ovulation: {
    headline: 'Sichtbar werden und kommunizieren',
    detail:
      'Sprachfluss, Selbstvertrauen und soziale Energie sind auf dem Höchststand. Ideal für Präsentationen, Verhandlungen, Aufnahmen, Netzwerken.',
    level: 5,
    levelLabel: 'hohe kommunikative Energie',
    todos: ['Präsentationen und Pitches', 'Videos, Podcasts, Aufnahmen', 'Wichtige Gespräche'],
  },
  luteal: {
    headline: 'Fertigstellen und Details prüfen',
    detail:
      'Progesteron beruhigt und richtet den Fokus nach innen. Die Aufmerksamkeit für Details steigt - ideal für Überarbeiten, Korrigieren und Abschließen statt Neustarts.',
    level: 4,
    levelLabel: 'fokussiert und detailstark',
    todos: ['Angefangenes fertig machen', 'Korrektur, Feinschliff, Buchhaltung', 'Tiefe Einzelarbeit'],
    avoid: ['Große neue Projekte in den letzten Tagen vor der Periode'],
  },
}

export const feature = defineFeature({
  id: 'creativity',
  title: 'Kreativität & Fokus',
  icon: '💡',
  order: 70,
  question: 'Wann bin ich kreativer?',
  recommend: ({ day }) => fromPhaseTable('creativity', TABLE, day),
})
