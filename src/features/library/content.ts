export type SourceKind = 'studie' | 'buch' | 'creator'

/** Wie belastbar ist die Quelle für konkrete Empfehlungen? */
export type Evidence = 'stark' | 'gemischt' | 'schwach'

export interface Source {
  id: string
  kind: SourceKind
  title: string
  author: string
  year?: string
  /** Worum es geht, in einem Satz. */
  summary: string
  /** Was man daraus für die App mitnimmt. */
  takeaway: string
  evidence: Evidence
  topics: string[]
  url?: string
}

/**
 * Quellenverzeichnis. Neue Einträge bitte unten anhängen und die
 * Einordnung (`evidence`) ehrlich setzen - die App soll den Unterschied
 * zwischen belegter Physiologie und populären Empfehlungen zeigen.
 */
export const SOURCES: Source[] = [
  {
    id: 'mcnulty-2020',
    kind: 'studie',
    title:
      'The Effects of Menstrual Cycle Phase on Exercise Performance in Eumenorrheic Women: A Systematic Review and Meta-Analysis',
    author: 'McNulty et al., Sports Medicine',
    year: '2020',
    summary:
      'Metaanalyse über 78 Studien zur sportlichen Leistung in den verschiedenen Zyklusphasen.',
    takeaway:
      'Im Mittel nur ein sehr kleiner Leistungsabfall in der frühen Follikelphase. Die individuelle Streuung ist größer als der Phaseneffekt - eigene Daten schlagen Pauschalregeln.',
    evidence: 'stark',
    topics: ['training'],
    url: 'https://doi.org/10.1007/s40279-020-01319-3',
  },
  {
    id: 'colenso-semple-2023',
    kind: 'studie',
    title:
      'Current Evidence Shows No Influence of Women’s Menstrual Cycle Phase on Acute Strength Performance or Chronic Strength Adaptations',
    author: 'Colenso-Semple et al., Frontiers in Sports and Active Living',
    year: '2023',
    summary: 'Kritische Übersicht zur Qualität der Studien hinter dem Thema "Cycle Syncing".',
    takeaway:
      'Für Krafttraining gibt es keinen belastbaren Beleg, dass man nach Phasen periodisieren muss. Empfehlungen in dieser App sind deshalb Angebote nach Gefühl, keine Vorschriften.',
    evidence: 'stark',
    topics: ['training'],
    url: 'https://doi.org/10.3389/fspor.2023.1054542',
  },
  {
    id: 'elliott-sale-2021',
    kind: 'studie',
    title:
      'Methodological Considerations for Studies in Sport and Exercise Science with Women as Participants',
    author: 'Elliott-Sale et al., Sports Medicine',
    year: '2021',
    summary: 'Standards, wie Zyklusphasen in Studien überhaupt sauber bestimmt werden müssen.',
    takeaway:
      'Viele populäre Aussagen beruhen auf Studien ohne Hormonbestimmung. Gute Quellen erkennt man an gemessenen Hormonwerten statt reiner Kalenderrechnung.',
    evidence: 'stark',
    topics: ['methodik'],
    url: 'https://doi.org/10.1007/s40279-021-01435-8',
  },
  {
    id: 'baker-driver-2007',
    kind: 'studie',
    title: 'Circadian rhythms, sleep, and the menstrual cycle',
    author: 'Baker & Driver, Sleep Medicine',
    year: '2007',
    summary:
      'Übersicht zu Körpertemperatur, Melatonin und Schlafqualität über den Zyklus.',
    takeaway:
      'Die höhere Kerntemperatur in der Lutealphase erklärt schlechteren Schlaf vor der Periode - kühl schlafen und früher ins Bett hilft.',
    evidence: 'stark',
    topics: ['sleep'],
    url: 'https://doi.org/10.1016/j.sleep.2007.03.011',
  },
  {
    id: 'benton-2020',
    kind: 'studie',
    title: 'Effect of menstrual cycle on resting metabolism: A systematic review and meta-analysis',
    author: 'Benton et al., PLOS ONE',
    year: '2020',
    summary: 'Metaanalyse zum Ruheumsatz in Follikel- und Lutealphase.',
    takeaway:
      'Der Mehrbedarf in der Lutealphase existiert, fällt im Mittel aber kleiner aus als oft behauptet. Die App nennt deshalb eine Spanne (100-300 kcal) statt einer festen Zahl.',
    evidence: 'gemischt',
    topics: ['nutrition'],
    url: 'https://doi.org/10.1371/journal.pone.0236025',
  },
  {
    id: 'wohlgemuth-2021',
    kind: 'studie',
    title: 'Sex Differences and Considerations for Female Specific Nutritional Strategies',
    author: 'Wohlgemuth et al., Journal of the International Society of Sports Nutrition',
    year: '2021',
    summary: 'Übersicht zu Energie-, Eiweiß- und Eisenbedarf bei sportlich aktiven Frauen.',
    takeaway:
      'Low Energy Availability ist das größere Risiko als eine falsch getimte Mahlzeit. Ausreichend essen kommt vor Phasen-Feintuning.',
    evidence: 'gemischt',
    topics: ['nutrition', 'fasting'],
    url: 'https://doi.org/10.1186/s12970-021-00422-8',
  },
  {
    id: 'herzberg-2017',
    kind: 'studie',
    title:
      'The Effect of Menstrual Cycle and Contraceptives on ACL Injuries and Laxity: A Systematic Review and Meta-Analysis',
    author: 'Herzberg et al., Orthopaedic Journal of Sports Medicine',
    year: '2017',
    summary: 'Zusammenhang zwischen Zyklusphase, Bandlaxizität und Kreuzbandverletzungen.',
    takeaway:
      'In der ovulatorischen Phase ist das Verletzungsrisiko erhöht. Deshalb der Hinweis auf längeres Aufwärmen rund um den Eisprung.',
    evidence: 'gemischt',
    topics: ['training'],
    url: 'https://doi.org/10.1177/2325967117718781',
  },
  {
    id: 'barth-2015',
    kind: 'studie',
    title:
      'Sex hormones affect neurotransmitters and shape the adult female brain during hormonal transition periods',
    author: 'Barth, Villringer & Sacher, Frontiers in Neuroscience',
    year: '2015',
    summary: 'Übersicht, wie Östrogen und Progesteron Stimmung und Kognition beeinflussen.',
    takeaway:
      'Grundlage für die Aussagen zu Stimmung, Fokus und Kreativität - die Effekte sind real, aber individuell unterschiedlich stark.',
    evidence: 'gemischt',
    topics: ['creativity', 'hormones'],
    url: 'https://doi.org/10.3389/fnins.2015.00037',
  },
  {
    id: 'roar',
    kind: 'buch',
    title: 'ROAR',
    author: 'Stacy T. Sims & Selene Yeager',
    year: '2016',
    summary: 'Standardwerk zu Training und Ernährung für Frauen statt "kleinerer Männer".',
    takeaway: 'Quelle für Hitze, Flüssigkeit und Kohlenhydratbedarf in der Lutealphase.',
    evidence: 'gemischt',
    topics: ['training', 'nutrition'],
  },
  {
    id: 'next-level',
    kind: 'buch',
    title: 'Next Level',
    author: 'Stacy T. Sims & Selene Yeager',
    year: '2022',
    summary: 'Fortsetzung mit Fokus auf Perimenopause und Menopause.',
    takeaway: 'Relevant für eine spätere Ausbaustufe der App (Zyklus endet nicht mit 45).',
    evidence: 'gemischt',
    topics: ['training', 'nutrition'],
  },
  {
    id: 'period-power',
    kind: 'buch',
    title: 'Period Power',
    author: 'Maisie Hill',
    year: '2019',
    summary: 'Praxisnaher Zyklusleitfaden für Alltag, Arbeit und Beziehungen.',
    takeaway: 'Vorbild für die Sprache der App: konkret, alltagstauglich, ohne Schuldgefühle.',
    evidence: 'schwach',
    topics: ['creativity', 'recovery'],
  },
  {
    id: 'unverschämt',
    kind: 'buch',
    title: 'Unverschämt - Alles über den fabelhaften weiblichen Körper',
    author: 'Dr. Sheila de Liz',
    year: '2019',
    summary: 'Deutschsprachige Gynäkologin erklärt Zyklus, Hormone und Verhütung.',
    takeaway: 'Gute deutschsprachige Basis für die Erklärtexte in der App.',
    evidence: 'gemischt',
    topics: ['hormones'],
  },
  {
    id: 'in-the-flo',
    kind: 'buch',
    title: 'In the FLO',
    author: 'Alisa Vitti',
    year: '2020',
    summary: 'Popularisierte das Konzept "Cycle Syncing" für Alltag, Arbeit und Sport.',
    takeaway:
      'Konzeptgeber für viele Zyklus-Apps, wissenschaftlich aber umstritten. In dieser App als Idee, nicht als Beleg behandelt.',
    evidence: 'schwach',
    topics: ['training', 'nutrition', 'creativity'],
  },
  {
    id: 'fast-like-a-girl',
    kind: 'buch',
    title: 'Fast Like a Girl',
    author: 'Dr. Mindy Pelz',
    year: '2022',
    summary: 'Bekanntestes Buch zu Intervallfasten entlang des Zyklus.',
    takeaway:
      'Populärer Ausgangspunkt für das Fasten-Feature, die konkreten Fastenprotokolle sind wissenschaftlich nicht gut belegt.',
    evidence: 'schwach',
    topics: ['fasting'],
  },
  {
    id: 'creator-sims',
    kind: 'creator',
    title: 'Dr. Stacy Sims',
    author: 'Sportwissenschaftlerin, @drstacysims',
    summary: 'Forschung und Praxis zu weiblicher Physiologie im Sport.',
    takeaway: 'Guter Einstieg für Training und Ernährung im Zyklusverlauf.',
    evidence: 'gemischt',
    topics: ['training', 'nutrition'],
  },
  {
    id: 'creator-colenso-semple',
    kind: 'creator',
    title: 'Dr. Lauren Colenso-Semple',
    author: 'Physiologin, @drlaurencs1',
    summary: 'Ordnet Zyklus-Mythen im Kraftsport wissenschaftlich ein.',
    takeaway: 'Wichtiges Korrektiv, wenn Empfehlungen zu absolut klingen.',
    evidence: 'stark',
    topics: ['training', 'methodik'],
  },
  {
    id: 'creator-brighten',
    kind: 'creator',
    title: 'Dr. Jolene Brighten',
    author: 'Naturopathic Endocrinology, @drjolenebrighten',
    summary: 'Inhalte zu Hormonen, Pille und Zyklusbeschwerden.',
    takeaway: 'Gut für Symptome und Verhütung, Supplement-Empfehlungen kritisch prüfen.',
    evidence: 'schwach',
    topics: ['hormones'],
  },
  {
    id: 'creator-de-liz',
    kind: 'creator',
    title: 'Dr. Sheila de Liz',
    author: 'Gynäkologin, deutschsprachig',
    summary: 'Erklärt Zyklus und Hormone auf Deutsch, verständlich und medizinisch fundiert.',
    takeaway: 'Referenz für deutschsprachige Formulierungen und Aufklärung.',
    evidence: 'gemischt',
    topics: ['hormones'],
  },
  {
    id: 'creator-hill',
    kind: 'creator',
    title: 'Maisie Hill',
    author: 'Autorin und Coach, @maisiehill_',
    summary: 'Zyklusarbeit für Alltag, Beruf und mentale Gesundheit.',
    takeaway: 'Ideen für die Kreativitäts- und Erholungsempfehlungen.',
    evidence: 'schwach',
    topics: ['creativity', 'recovery'],
  },
]

export const KIND_LABELS: Record<SourceKind, string> = {
  studie: 'Studien',
  buch: 'Bücher',
  creator: 'Creator',
}

export const EVIDENCE_LABELS: Record<Evidence, string> = {
  stark: 'gut belegt',
  gemischt: 'gemischte Evidenz',
  schwach: 'populär, schwach belegt',
}
