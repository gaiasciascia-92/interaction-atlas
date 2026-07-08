#!/usr/bin/env bash
# Guardia TASK_002 / DESIGN_TOKENS.md §8:
# nessun valore esadecimale o durata in ms fuori da src/styles/tokens.css.
set -euo pipefail
cd "$(dirname "$0")/.."

fail=0

# Colori esadecimali in qualunque sorgente di stile (css + astro), tranne tokens.css
if grep -rInE '#[0-9a-fA-F]{3,8}\b' src --include='*.css' --include='*.astro' \
  | grep -v 'src/styles/tokens.css' \
  | grep -vE '(href|id)="#' ; then
  echo '✗ Valori esadecimali fuori da tokens.css (vedi sopra).'
  fail=1
fi

# Durate in ms nei soli file .css (tranne tokens.css)
if grep -rInE '[0-9]+ms' src --include='*.css' | grep -v 'src/styles/tokens.css' | grep -v 'token-guard: allow'; then
  echo '✗ Durate in ms fuori da tokens.css (vedi sopra).'
  fail=1
fi

if [ "$fail" -eq 0 ]; then
  echo '✓ guard-tokens: nessun valore magico fuori da tokens.css'
fi
exit "$fail"
