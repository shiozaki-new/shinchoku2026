#!/usr/bin/env python3
"""大阪展示会 思鳴会議室の引き継ぎ条件を機械判定する。"""

from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parent.parent
ITEMS_PATH = ROOT / "Docs" / "会議項目.json"

REQUIRED_FILES = (
    "AGENTS.md",
    "CLAUDE.md",
    "index.html",
    "Docs/思鳴の継.md",
    "Docs/認書.md",
    "Docs/思書.md",
    "Docs/鳴書.md",
    "Docs/示書.md",
    "Docs/継の記録.md",
    "Docs/会議項目.json",
    "Scripts/session_start.sh",
    ".github/workflows/handover-guard.yml",
)

REQUIRED_ITEM_FIELDS = (
    "id", "stage", "status", "title", "why", "criterion", "limit",
    "owner", "next_action", "branch", "updated_at",
)
ALLOWED_STAGES = {"認", "思", "鳴", "示", "応", "継"}
ALLOWED_STATUSES = {"未確定", "確定", "進行", "停止", "完了"}
ALLOWED_BRANCHES = {"成立", "思戻り", "打切り"}
LATER_STAGES = {"鳴", "示", "応", "継"}


def load_items(errors: list[str]) -> list[dict[str, object]]:
    try:
        data = json.loads(ITEMS_PATH.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        errors.append(f"Docs/会議項目.json を読めない: {exc}")
        return []
    if data.get("schema_version") != 1:
        errors.append("Docs/会議項目.json の schema_version は 1 とする")
    items = data.get("items")
    if not isinstance(items, list) or not items:
        errors.append("Docs/会議項目.json の items は1件以上必要")
        return []
    return items


def validate_item(item: object, index: int, ids: set[str], errors: list[str]) -> None:
    location = f"会議項目[{index}]"
    if not isinstance(item, dict):
        errors.append(f"{location} はオブジェクトであること")
        return
    for field in REQUIRED_ITEM_FIELDS:
        value = item.get(field)
        if not isinstance(value, str) or not value.strip():
            errors.append(f"{location}.{field} は空にできない")

    item_id = item.get("id")
    if isinstance(item_id, str):
        if not re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", item_id):
            errors.append(f"{location}.id は小文字英数字と単一ハイフンだけを使う: {item_id}")
        if item_id in ids:
            errors.append(f"会議項目 id が重複している: {item_id}")
        ids.add(item_id)

    stage = item.get("stage")
    status = item.get("status")
    branch = item.get("branch")
    if stage not in ALLOWED_STAGES:
        errors.append(f"{location}.stage が不正: {stage}")
    if status not in ALLOWED_STATUSES:
        errors.append(f"{location}.status が不正: {status}")
    if branch not in ALLOWED_BRANCHES:
        errors.append(f"{location}.branch が不正: {branch}")
    if status == "未確定" and stage in LATER_STAGES:
        errors.append(f"{location}: 未確定の値を {stage} へ置けない")
    if status in {"確定", "進行", "完了"} and stage in {"認", "思"}:
        errors.append(f"{location}: {status}の値を {stage} へ置けない")
    updated_at = item.get("updated_at")
    if isinstance(updated_at, str) and not re.fullmatch(r"20\d{2}-\d{2}-\d{2}", updated_at):
        errors.append(f"{location}.updated_at は YYYY-MM-DD: {updated_at}")


def validate_documents(errors: list[str]) -> None:
    agreement = (ROOT / "Docs" / "思鳴の継.md").read_text(encoding="utf-8")
    for heading in ("## 1 目的", "## 2 幅", "## 3 許", "## 4 現在の合意", "## 5 引き継ぎ", "更新日："):
        if heading not in agreement:
            errors.append(f"Docs/思鳴の継.md に必須項目が無い: {heading}")

    html = (ROOT / "index.html").read_text(encoding="utf-8")
    for marker in ("大阪展示会 思鳴会議室", "agenda-list", "handover-text", "会議項目.json"):
        if marker not in html:
            errors.append(f"index.html に必須表示または読込口が無い: {marker}")
    for name in ("認書.md", "思書.md", "鳴書.md", "示書.md", "継の記録.md"):
        if f"./Docs/{name}" not in html:
            errors.append(f"index.html の正本棚にリンクが無い: {name}")


def run(brief: bool) -> int:
    errors: list[str] = []
    for relative in REQUIRED_FILES:
        if not (ROOT / relative).is_file():
            errors.append(f"必須ファイルが無い: {relative}")

    items: list[dict[str, object]] = []
    if ITEMS_PATH.is_file():
        items = load_items(errors)
        ids: set[str] = set()
        for index, item in enumerate(items):
            validate_item(item, index, ids, errors)
    if (ROOT / "Docs" / "思鳴の継.md").is_file() and (ROOT / "index.html").is_file():
        validate_documents(errors)

    undecided = [item for item in items if isinstance(item, dict) and item.get("status") == "未確定"]
    if errors:
        if brief:
            print(f"引き継ぎ検査: 不成立 {len(errors)}件")
        else:
            print("引き継ぎ検査: 不成立", file=sys.stderr)
            for error in errors:
                print(f"- {error}", file=sys.stderr)
        return 1

    print(f"引き継ぎ検査: 成立 / 会議項目 {len(items)}件 / 未確定 {len(undecided)}件")
    if not brief and undecided:
        for item in undecided:
            print(f"- 次の操作: {item['next_action']}")
    return 0


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--brief", action="store_true")
    args = parser.parse_args()
    return run(args.brief)


if __name__ == "__main__":
    raise SystemExit(main())
