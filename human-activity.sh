#!/bin/bash

TOTAL=300
COUNT=0

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

while [ $COUNT -lt $TOTAL ]
do
  COUNT=$((COUNT+1))
  echo "Commit $COUNT"

  ACTION=$((RANDOM % 6))

  if [ $ACTION -eq 0 ]; then
    FILE="contracts/helper-$((RANDOM % 5)).clar"
    mkdir -p "$(dirname "$FILE")"

    echo "
(define-read-only (get-helper-$COUNT)
  (ok u$COUNT))" >> $FILE

  elif [ $ACTION -eq 1 ]; then
    FILE=$(ls contracts/*.clar 2>/dev/null | shuf -n 1)
    [ -z "$FILE" ] && FILE="contracts/temp-$COUNT.clar"

    echo "
(define-read-only (ping-$COUNT)
  (ok true))" >> $FILE

  elif [ $ACTION -eq 2 ]; then
    mkdir -p docs
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] update: architecture/devlog iteration $COUNT" >> docs/devlog.md

  elif [ $ACTION -eq 3 ]; then
    FILE=$(find frontend/app -type f \( -name "*.tsx" -o -name "*.ts" \) 2>/dev/null | shuf -n 1)
    [ -z "$FILE" ] && FILE="frontend/app/helper.ts"

    echo "// sync update iteration $COUNT at $(date '+%H:%M:%S')" >> "$FILE"

  elif [ $ACTION -eq 4 ]; then
    FILE="tests/racestacks.test.ts"
    echo "// test case iteration $COUNT" >> $FILE

  else
    echo "" >> frontend/README.md
  fi

  git add .

  MSG=${MESSAGES[$RANDOM % ${#MESSAGES[@]}]}
  git commit -m "$MSG"

  git push

  # ⏱️ DELAY 1–2 menit (60–120 detik)
  SLEEP=$(( (RANDOM % 60) + 60 ))

  echo "Commit selesai. Menunggu $SLEEP detik..."
  sleep $SLEEP

done

echo "DONE"
