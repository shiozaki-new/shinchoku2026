# 大阪展示会 思鳴会議室 システム説明書

## 構成

- `index.html`：GitHub Pagesで配信する会議室
- `Docs/思鳴の継.md`：オーナーとAIの現在の合意
- `Docs/会議項目.json`：画面と機械検査が共通で読む現在地
- `Docs/認書.md` → `思書.md` → `鳴書.md` → `示書.md`：上位から下位への正本
- `Docs/継の記録.md`：同じ不成立を繰り返さない主題別記録
- `Scripts/session_start.sh`：セッション開始時の現在地取得
- `Scripts/handover_guard.py`：必須項目と層の矛盾を検査
- `.githooks/`：コミット前のローカル検査
- `.github/workflows/`：GitHub上の検査とIssue分類

## データの流れ

1. オーナーの言葉を思へ置く
2. 成立判定と上限を定める
3. 成立・思戻り・打切りの経路を記録する
4. 確定した値だけを鳴書へ置く
5. 実装単位をIssueの「なぜ／示／応／判定」へ固定する
6. HTMLは `Docs/会議項目.json` を表示する
7. 次のAIは `Scripts/session_start.sh` から再開する

## 旧進捗ダッシュボード

`reports/` と `JMOTTO_SYNC_SETUP.md` は旧システムの記録として残している。
現在の大阪展示会 思鳴会議室はFirebase、J-MOTTO、旧レポート生成処理を使用しない。

更新日：2026-08-26
