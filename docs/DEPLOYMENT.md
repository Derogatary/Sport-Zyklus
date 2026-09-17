# Deployment

## GitHub Pages (aktuell)

Einmalige Einrichtung im Repository:

1. *Settings → Pages → Build and deployment → Source:* **GitHub Actions**.
2. Fertig. Jeder Push auf `main` löst `.github/workflows/deploy-pages.yml` aus.

Die Seite erscheint unter `https://<user>.github.io/<repo>/`.

Wichtige Details:

- Der Build bekommt `BASE_PATH=/<repo>/`; `vite.config.ts` setzt darauf `base`.
  Lokal bleibt die Basis `/`, deshalb funktioniert `npm run dev` unverändert.
- Der Workflow kopiert `index.html` nach `404.html`, damit Deep-Links nicht ins
  Leere laufen. Zusätzlich verwendet die App Hash-Routing.
- `public/.nojekyll` verhindert, dass GitHub Pages Dateien mit `_`-Präfix schluckt.
- Nach einem Release die Konstante `CACHE` in `public/sw.js` hochzählen, sonst
  liefert der Service Worker alte Dateien aus.

## Pull-Request-Vorschau

Jeder PR baut in der CI und lädt das Ergebnis als Artefakt `preview-pr-<n>` hoch.
Herunterladen, entpacken und lokal ansehen:

```bash
npx serve dist   # oder: python3 -m http.server -d dist
```

Echte Vorschau-URLs pro PR wären möglich (Deploy in einen Unterordner eines
`gh-pages`-Branches), bringen aber Race-Bedingungen bei parallelen Batches mit
sich. Siehe `docs/ROADMAP.md`.

## Android / Play Store (später)

Zwei Wege, beide bauen auf derselben Web-App auf:

**A) Trusted Web Activity (empfohlen für den Start)**

```bash
npx @bubblewrap/cli init --manifest https://<user>.github.io/<repo>/manifest.webmanifest
npx @bubblewrap/cli build
```

- Die App im Store ist eine dünne Hülle um die veröffentlichte PWA.
- Voraussetzung: HTTPS (erfüllt), gültiges Manifest (vorhanden), Icons
  (192/512 px plus maskable, vorhanden), Service Worker (vorhanden).
- Für die Verifizierung ohne Browser-Adressleiste wird
  `.well-known/assetlinks.json` auf der Pages-Seite hinterlegt.

**B) Capacitor** — wenn native Funktionen dazukommen (Benachrichtigungen,
Health Connect, Widgets):

```bash
npm install @capacitor/core @capacitor/cli
npx cap init "Sport-Zyklus" com.example.sportzyklus --web-dir=dist
npx cap add android
```

`android/` ist bereits in `.gitignore` eingetragen, damit generierte
Plattformordner das Repo nicht aufblähen.

Für den Play Store zusätzlich nötig: Datenschutzerklärung (die App speichert
nur lokal — das lässt sich kurz halten), Deklaration zu Gesundheitsdaten,
Store-Grafiken, Signaturschlüssel.
