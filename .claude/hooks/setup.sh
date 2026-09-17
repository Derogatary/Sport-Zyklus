#!/usr/bin/env bash
# SessionStart-Hook: sorgt dafür, dass Tests und Linter in einer frischen
# Session sofort laufen können.
set -euo pipefail
cd "$(dirname "$0")/../.."
if [ ! -d node_modules ]; then
  npm ci --no-audit --no-fund >/dev/null 2>&1 || npm install --no-audit --no-fund >/dev/null 2>&1
fi
echo "Sport-Zyklus bereit. 'npm run verify' prüft Lint, Tests und Build."
