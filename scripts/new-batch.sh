#!/usr/bin/env bash
# Startet einen neuen Batch-Branch von einem frischen main.
#
#   ./scripts/new-batch.sh <thema>            -> batch/<thema>
#   ./scripts/new-batch.sh feature mood       -> batch/feature-mood

set -euo pipefail

slug=$(printf '%s' "${*:?Thema fehlt}" | tr '[:upper:] ' '[:lower:]-' | tr -cd 'a-z0-9-')
branch="batch/${slug}"

git fetch origin main
git checkout -B "$branch" origin/main

echo "Branch $branch steht auf origin/main."
echo "Regeln: nur Dateien des eigenen Moduls anfassen (docs/BATCH-WORKFLOW.md)."
