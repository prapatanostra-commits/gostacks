#!/bin/bash

# Konfigurasi Target: 5000 commit / 6 jam
TOTAL_COMMITS=5000
DURATION_HOURS=6
TOTAL_SECONDS=$((DURATION_HOURS * 3600))
AVG_SLEEP=$(echo "scale=2; $TOTAL_SECONDS / $TOTAL_COMMITS" | bc)

COUNT=0

# Pesan commit yang sudah diperbaiki agar lebih variatif
MESSAGES=(
"feat(contract): introduce read-only helper for internal queries"
"fix(contract): correct validation logic in helper function"
"refactor(core): streamline contract execution flow"
"docs(devlog): document architecture update"
"chore(repo): remove unused helper contracts"
"feat(api): enhance contract interaction handling"
"fix(runtime): handle unexpected state conditions in contract calls"
"refactor(utils): eliminate redundancy in helper utilities"
"docs(readme): revise project overview and usage guidelines"
"feat(contract): extend contract interface with additional endpoint"
"fix(frontend): resolve rendering inconsistency"
"refactor(structure): reorganize module hierarchy for clarity"
"chore(config): align configuration with recent updates"
"feat(test): expand test coverage for contract logic"
"fix(edge-case): handle undefined parameter input safely"
"docs(architecture): clarify module interaction design"
"refactor(naming): standardize naming conventions"
"feat(system): introduce lightweight abstraction layer"
"fix(state): correct state mutation handling"
"docs(dev): improve developer documentation clarity"
"feat(contract): enhance contract lifecycle management"
"refactor(codebase): improve maintainability across modules"
"fix(contract): correct return structure in read-only function"
"docs(module): expand module documentation"
"chore(cleanup): remove redundant logs and comments"
"feat(core): implement new processing logic layer"
"fix(api): resolve response handling mismatch"
"refactor(flow): optimize execution path"
"docs(update): restructure internal documentation"
"feat(integration): improve API and contract communication"
)

# Fungsi untuk simulasi jeda manusia (jitter)
get_sleep_time() {
  echo "scale=2; $AVG_SLEEP * (0.6 + ($RANDOM % 80 / 100.0))" | bc
}

echo "Memulai sprint 5000 commit untuk repo ini..."

while [ $COUNT -lt $TOTAL_COMMITS ]
do
  COUNT=$((COUNT+1))
  
  # Pilih aksi secara acak
  ACTION=$((RANDOM % 6))

  case $ACTION in
    0) 
      FILE="contracts/helper-$((RANDOM % 5)).clar"
      mkdir -p "$(dirname "$FILE")"
      echo "(define-read-only (get-helper-$COUNT) (ok u$COUNT))" >> "$FILE"
      ;;
    1) 
      mkdir -p contracts
      FILE=$(ls contracts/*.clar 2>/dev/null | shuf -n 1)
      [ -z "$FILE" ] && FILE="contracts/temp-$COUNT.clar"
      echo "(define-read-only (ping-$COUNT) (ok true))" >> "$FILE"
      ;;
    2) 
      mkdir -p docs
      echo "[$(date '+%Y-%m-%d %H:%M:%S')] update: architecture/devlog iteration $COUNT" >> docs/devlog.md
      ;;
    3) 
      mkdir -p frontend/app
      FILE=$(find frontend/app -type f \( -name "*.tsx" -o -name "*.ts" \) 2>/dev/null | shuf -n 1)
      [ -z "$FILE" ] && FILE="frontend/app/helper.ts"
      echo "// sync update iteration $COUNT at $(date '+%H:%M:%S')" >> "$FILE"
      ;;
    4) 
      mkdir -p tests
      FILE="tests/racestacks.test.ts"
      echo "// test case iteration $COUNT" >> "$FILE"
      ;;
    *) 
      mkdir -p frontend
      echo "<!-- update $COUNT -->" >> frontend/README.md
      ;;
  esac

  # Git proses
  git add .
  
  # Hanya commit jika ada perubahan file
  if ! git diff-index --quiet HEAD --; then
    MSG=${MESSAGES[$RANDOM % ${#MESSAGES[@]}]}
    git commit -m "$MSG" --quiet
    
    # Push setiap 20 commit agar tidak terlihat spammy di log remote
    if (( $COUNT % 20 == 0 )); then
      echo "[$COUNT/$TOTAL_COMMITS] Pushing batch..."
      git push --quiet
    fi
  fi

  # Jeda dinamis
  SLEEP=$(get_sleep_time)
  sleep $SLEEP

  # Log progres tiap 100 unit
  if (( $COUNT % 100 == 0 )); then
    echo ">> Progress: $COUNT/5000 commit selesai."
  fi
done

git push --quiet
echo "DONE"
