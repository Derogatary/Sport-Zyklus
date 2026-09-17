import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { DEFAULT_PROFILE, cycleDayFor, normalizeProfile } from '@/core/cycle'
import { today } from '@/core/date'
import { clearAll, loadJson, saveJson } from '@/core/storage'
import type { CycleDay, CycleProfile, IsoDate } from '@/core/types'

export interface AppSettings {
  /** Onboarding abgeschlossen? */
  ready: boolean
  /** Hinweis auf medizinischen Disclaimer bereits bestaetigt. */
  disclaimerSeen: boolean
}

const DEFAULT_SETTINGS: AppSettings = { ready: false, disclaimerSeen: false }

interface AppState {
  profile: CycleProfile
  settings: AppSettings
  selectedDate: IsoDate
  day: CycleDay
  setProfile: (profile: CycleProfile) => void
  setSettings: (settings: Partial<AppSettings>) => void
  setSelectedDate: (date: IsoDate) => void
  resetAll: () => void
}

const AppStateContext = createContext<AppState | null>(null)

function initialProfile(): CycleProfile {
  return loadJson<CycleProfile>('profile', {
    lastPeriodStart: today(),
    ...DEFAULT_PROFILE,
  })
}

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [profile, setProfileState] = useState<CycleProfile>(initialProfile)
  const [settings, setSettingsState] = useState<AppSettings>(() =>
    loadJson<AppSettings>('settings', DEFAULT_SETTINGS),
  )
  const [selectedDate, setSelectedDate] = useState<IsoDate>(() => today())

  useEffect(() => saveJson('profile', profile), [profile])
  useEffect(() => saveJson('settings', settings), [settings])

  const setProfile = useCallback((next: CycleProfile) => {
    setProfileState(normalizeProfile(next))
  }, [])

  const setSettings = useCallback((patch: Partial<AppSettings>) => {
    setSettingsState((current) => ({ ...current, ...patch }))
  }, [])

  const resetAll = useCallback(() => {
    clearAll()
    setProfileState({ lastPeriodStart: today(), ...DEFAULT_PROFILE })
    setSettingsState(DEFAULT_SETTINGS)
    setSelectedDate(today())
  }, [])

  const value = useMemo<AppState>(
    () => ({
      profile,
      settings,
      selectedDate,
      day: cycleDayFor(profile, selectedDate),
      setProfile,
      setSettings,
      setSelectedDate,
      resetAll,
    }),
    [profile, settings, selectedDate, setProfile, setSettings, resetAll],
  )

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>
}

export function useAppState(): AppState {
  const context = useContext(AppStateContext)
  if (!context) throw new Error('useAppState muss innerhalb von <AppStateProvider> stehen.')
  return context
}
