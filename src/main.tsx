import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './app/App'
import { AppStateProvider } from './app/state'
import './ui/styles.css'

const container = document.getElementById('root')
if (!container) throw new Error('Kein #root-Element gefunden.')

createRoot(container).render(
  <StrictMode>
    <AppStateProvider>
      <App />
    </AppStateProvider>
  </StrictMode>,
)

if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`).catch(() => {
      // Offline-Betrieb ist optional - Fehler hier sind unkritisch.
    })
  })
}
