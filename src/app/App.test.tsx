import { describe, expect, it } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { App } from './App'
import { AppStateProvider } from './state'

function renderApp() {
  return render(
    <AppStateProvider>
      <App />
    </AppStateProvider>,
  )
}

describe('App', () => {
  it('zeigt zuerst das Onboarding', () => {
    renderApp()
    expect(screen.getByText('Willkommen')).toBeTruthy()
  })

  it('wechselt nach dem Onboarding auf den Heute-Screen', () => {
    renderApp()
    fireEvent.click(screen.getByRole('button', { name: /Los geht/ }))
    expect(screen.getByText(/Zyklustag/)).toBeTruthy()
    expect(screen.getByRole('navigation', { name: 'Hauptnavigation' })).toBeTruthy()
  })

  it('zeigt die Karten aller Features mit Empfehlung', () => {
    renderApp()
    fireEvent.click(screen.getByRole('button', { name: /Los geht/ }))
    expect(screen.getByText('Sport')).toBeTruthy()
    expect(screen.getByText('Fasten')).toBeTruthy()
    expect(screen.getByText('Schlaf')).toBeTruthy()
  })
})
