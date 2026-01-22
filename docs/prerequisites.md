# ローカルプレビュー前の前提条件

このドキュメントは、`/Users/macminim4pro/Documents/dbsheet_for_sfa02/astro02` プロジェクトでローカルプレビューを行う前に満たすべき前提条件をまとめたものです。

## 対象
- フレームワーク: Astro
- UI: React + Tailwind CSS
- 主要スクリプト: `npm run dev` / `npm run build` / `npm run preview`

## 必須ソフトウェア
- Node.js: 18.17 以上（推奨: 20 LTS 以上）
- npm: 9 以上（Node 同梱版で可）
- Git: 任意（取得・履歴管理用）

確認コマンド例:
```bash
node -v
npm -v
```

## 環境前提
- 実行ユーザーがプロジェクトに読み書きできること
- `3000`（既定）や任意のポート（例: `4000`）が空いていること
- ネットワーク接続: 初回インストール時に npm レジストリへ接続できること（プレビュー自体はオフライン可）
- 環境変数: 本プロジェクトでは必須の `.env` は想定していません（必要になった場合は別途記載）

## 初回セットアップ
```bash
npm ci
```
- 依存関係は `package-lock.json` に固定されています。`npm install` ではなく `npm ci` を使用してください。

## ローカルプレビュー方法
- 開発サーバー（最速）
  ```bash
  npm run dev
  # 任意: ポート/ホスト指定
  # npm run dev -- --port 4000
  # npm run dev -- --host
  ```
- 本番ビルド後のプレビュー（本番相当の表示確認）
  ```bash
  npm run build
  npm run preview
  # 任意: ポート指定
  # npm run preview -- --port 4000
  ```

## 事前チェックリスト
- [ ] `node -v` が要件（>=18.17、推奨 20+）を満たす
- [ ] `npm -v` が 9+
- [ ] `npm ci` が成功し `node_modules` が作成済み
- [ ] 使用予定ポートが空いている

## よくあるトラブルと対処
- ポート競合（EADDRINUSE）
  - 別ポートで起動: `npm run dev -- --port 4000`
- Node のバージョン不一致
  - `nvm` 等で 18.17+（推奨 20 LTS）に切替
- 依存関係エラー
  - まず `npm ci` を再実行
  - それでも解決しない場合はキャッシュの影響を疑い、必要に応じて `node_modules` の再作成を検討

## セキュリティ・運用注意
- 機密情報はリポジトリへコミットしない（`.env.local` 等を使用し、VCS 除外）
- 追加パッケージは用途と信頼性を確認の上で導入

## デザイン指針
- 迷った場合は `DESIGN.md` の原則に従ってください

---
最短ルート: まず `npm ci` → `npm run dev` を実行し、ブラウザで `http://localhost:3000` を開いてください。
