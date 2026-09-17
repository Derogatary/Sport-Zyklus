import { navFeatures } from '@/core/registry'
import { today } from '@/core/date'
import { useAppState } from './state'
import { useRoute } from './router'
import { Today } from './screens/Today'
import { Calendar } from './screens/Calendar'
import { Settings } from './screens/Settings'
import { Onboarding } from './screens/Onboarding'

interface Tab {
  id: string
  label: string
  icon: string
  render: () => React.ReactNode
}

const CORE_TABS: Tab[] = [
  { id: 'heute', label: 'Heute', icon: '☀️', render: () => <Today /> },
  { id: 'kalender', label: 'Kalender', icon: '🗓️', render: () => <Calendar /> },
]

const SETTINGS_TAB: Tab = {
  id: 'einstellungen',
  label: 'Profil',
  icon: '⚙️',
  render: () => <Settings />,
}

export function App() {
  const { settings, selectedDate, setSelectedDate } = useAppState()
  const [route, navigate] = useRoute('heute')

  const tabs: Tab[] = [
    ...CORE_TABS,
    ...navFeatures.map((feature) => ({
      id: feature.id,
      label: feature.navLabel ?? feature.title,
      icon: feature.icon,
      render: () => (feature.Screen ? <feature.Screen /> : null),
    })),
    SETTINGS_TAB,
  ]

  if (!settings.ready) return <Onboarding />

  const active = tabs.find((tab) => tab.id === route) ?? tabs[0]
  const viewingOtherDay = selectedDate !== today()

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">Sport-Zyklus</h1>
        {viewingOtherDay && (
          <button type="button" className="button button--ghost" onClick={() => setSelectedDate(today())}>
            Zurück zu heute
          </button>
        )}
      </header>

      <main className="app__main">{active.render()}</main>

      <nav className="nav" aria-label="Hauptnavigation">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`nav__item ${tab.id === active.id ? 'is-active' : ''}`}
            onClick={() => navigate(tab.id)}
            aria-current={tab.id === active.id ? 'page' : undefined}
          >
            <span className="nav__icon" aria-hidden="true">
              {tab.icon}
            </span>
            <span className="nav__label">{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}
