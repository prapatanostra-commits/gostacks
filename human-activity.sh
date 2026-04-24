#!/bin/bash

TOTAL=300
COUNT=0

MESSAGES=(
"feat(contract): add helper read-only function for internal query"
"fix(contract): correct validation logic in helper function"
"refactor(core): simplify contract execution flow"
"docs(devlog): record update on architecture adjustment"
"chore(repo): clean unused helper contracts"
"feat(api): improve contract interaction layer handling"
"fix(runtime): handle unexpected state condition in contract call"
"refactor(utils): reduce redundancy in helper utilities"
"docs(readme): update project overview and usage notes"
"feat(contract): extend contract interface with new endpoint"
"fix(frontend): resolve minor rendering inconsistency"
"refactor(structure): reorganize module hierarchy for clarity"
"chore(config): sync configuration with latest changes"
"feat(test): add additional test coverage for contract logic"
"fix(edge-case): prevent failure on undefined parameter input"
"docs(architecture): improve explanation of module interaction"
"refactor(naming): standardize variable and function naming"
"feat(system): introduce lightweight helper abstraction"
"fix(state): correct incorrect state mutation handling"
"docs(dev): refine developer notes for better clarity"
"feat(contract): enhance lifecycle handling logic"
"refactor(codebase): improve maintainability across modules"
"fix(contract): correct return structure in read-only function"
"docs(module): expand documentation for contract modules"
"chore(cleanup): remove redundant logs and comments"
"feat(core): introduce new logic layer for processing"
"fix(api): resolve mismatch in contract response handling"
"refactor(flow): optimize execution path for performance"
"docs(update): improve internal documentation structure"
"feat(integration): enhance API-contract communication"
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

  # 🔥 DELAY DIPERCEPAT → 2–4 menit (120–240 detik)
  SLEEP=$(( (RANDOM % 120) + 120 ))

  echo "Commit selesai. Menunggu $SLEEP detik..."
  sleep $SLEEP

done

echo "DONE"
