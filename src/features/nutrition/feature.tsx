import { defineFeature } from '@/core/feature'
import { fromPhaseTable, type PhaseTable } from '@/core/recommend'

const TABLE: PhaseTable = {
  menstruation: {
    headline: 'Normal essen, Eisen auffüllen',
    detail:
      'Der Grundumsatz fällt wieder auf Normalniveau. Durch den Blutverlust steigt der Eisenbedarf - eisenreiche Lebensmittel mit Vitamin C kombinieren.',
    level: 3,
    levelLabel: 'normaler Kalorienbedarf',
    todos: [
      'Eisenquellen: rotes Fleisch, Hülsenfrüchte, Haferflocken, dunkles Blattgemüse',
      'Vitamin C dazu (Paprika, Zitrus, Beeren) verbessert die Aufnahme',
      'Magnesium kann Krämpfe lindern',
    ],
  },
  follicular: {
    headline: 'Eiweiß hoch, Kohlenhydrate rund ums Training',
    detail:
      'Östrogen verbessert die Kohlenhydratverwertung - der Körper baut jetzt besonders gut Muskeln auf. Kalorienbedarf liegt auf Normalniveau.',
    level: 3,
    levelLabel: 'normaler Kalorienbedarf',
    todos: [
      '1,6-2,0 g Eiweiß pro kg Körpergewicht',
      'Kohlenhydrate vor und nach harten Einheiten',
      'Gute Phase für ein moderates Kaloriendefizit, wenn das dein Ziel ist',
    ],
  },
  ovulation: {
    headline: 'Volle Energie bereitstellen',
    detail:
      'Hohe Trainingsbelastung braucht Treibstoff. Der Appetit ist oft niedriger als der tatsächliche Bedarf - bewusst ausreichend essen.',
    level: 3,
    levelLabel: 'normaler bis leicht erhöhter Bedarf',
    todos: ['Kohlenhydrate passend zur Trainingsbelastung', 'Ausreichend trinken'],
  },
  luteal: {
    headline: 'Mehr Kalorien, mehr Kohlenhydrate',
    detail:
      'Progesteron hebt den Grundumsatz um etwa 5-10 % (rund 100-300 kcal pro Tag) und erhöht den Eiweißabbau. Heißhunger ist häufig ein Zeichen von echtem Mehrbedarf, nicht von fehlender Disziplin.',
    level: 4,
    levelLabel: 'erhöhter Kalorienbedarf',
    todos: [
      'Bewusst 100-300 kcal mehr einplanen, vor allem komplexe Kohlenhydrate',
      'Eiweiß leicht erhöhen, Mahlzeiten regelmäßiger',
      'Magnesium, Salz und Flüssigkeit gegen Wassereinlagerungen und Heißhunger',
    ],
    avoid: ['Starke Kaloriendefizite kurz vor der Periode'],
  },
}

export const feature = defineFeature({
  id: 'nutrition',
  title: 'Kalorien & Ernährung',
  icon: '🍽️',
  order: 20,
  question: 'Wann brauche ich mehr Kalorien?',
  recommend: ({ day }) => fromPhaseTable('nutrition', TABLE, day),
})
