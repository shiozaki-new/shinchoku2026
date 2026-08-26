#!/bin/sh
# セッション開始時に、揮発する現在地をGitとGitHubから取得する。
set -u

project_dir=${CLAUDE_PROJECT_DIR:-$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)}
cd "$project_dir" 2>/dev/null || exit 0
[ -d .git ] || exit 0

printf '=== 大阪展示会 思鳴会議室 / 現在地 ===\n'
hooks_path=$(git config --local core.hooksPath 2>/dev/null || true)
if [ -z "$hooks_path" ] && [ -d .githooks ]; then
  git config --local core.hooksPath .githooks 2>/dev/null || true
  printf '機械検査: gitフックを有効化\n'
fi

branch=$(git rev-parse --abbrev-ref HEAD 2>/dev/null || printf '?')
git fetch --quiet origin 2>/dev/null || true
base_ref="origin/${branch}"
git show-ref --verify --quiet "refs/remotes/${base_ref}" || base_ref="origin/main"
counts=$(git rev-list --left-right --count "${base_ref}...${branch}" 2>/dev/null || printf '0\t0')
behind=$(printf '%s' "$counts" | cut -f1)
ahead=$(printf '%s' "$counts" | cut -f2)
dirty=$(git status --porcelain 2>/dev/null | wc -l | tr -d ' ')
printf 'ブランチ: %s / %sより %s遅れ・%s先行 / 未コミット %s件\n' "$branch" "$base_ref" "${behind:-?}" "${ahead:-?}" "${dirty:-?}"
printf '最新コミット: %s\n' "$(git log -1 --format='%h %s' 2>/dev/null || printf '?')"

if command -v gh >/dev/null 2>&1; then
  open_count=$(gh issue list --state open --limit 200 --json number --jq 'length' 2>/dev/null || true)
  undecided=$(gh issue list --state open --label 思鳴未確定 --limit 50 --json number,title --jq '.[] | "  #\(.number) \(.title)"' 2>/dev/null || true)
  [ -n "$open_count" ] && printf 'Open Issue: %s件\n' "$open_count"
  if [ -n "$undecided" ]; then
    printf '\n--- オーナーが定める項目（推測で実装しない） ---\n%s\n' "$undecided"
  fi
fi

python3 Scripts/handover_guard.py --brief 2>/dev/null || python3 Scripts/handover_guard.py --brief
if [ -f Docs/会議項目.json ]; then
  python3 - <<'PY'
import json
from pathlib import Path

data = json.loads(Path("Docs/会議項目.json").read_text(encoding="utf-8"))
pending = [item for item in data["items"] if item["status"] == "未確定"]
if pending:
    print("\n--- 次の一問 ---")
    print(pending[0]["next_action"])
PY
fi

cat <<'EOF'

--- 最初にやること ---
1. Docs/思鳴の継.md を読む
2. 未コミット・遅れ・機械検査の不成立があれば先に報告する
3. 未確定の最上位項目を推測で埋めない
4. 成立判定と上限が書けるまで展示会固有の実装へ降りない
EOF
