# shinchoku2026 システム説明書

## 1. 概要

`shinchoku2026` は、部門横断のタスク進捗を 1 画面で可視化するための静的 Web アプリです。  
フロントエンドは **単一ファイル構成の `index.html`** で、HTML/CSS/JavaScript をすべてインラインで持ちます。  
データ永続化と認証は Firebase を使い、GitHub Pages から配信される前提の構成です。

このシステムには大きく 4 つの機能があります。

1. 進捗タスクの一覧・分類表示
2. タスク期限をカレンダー表示
3. 星取管理表（業務担当一覧）
4. 管理者用のログイン・編集・操作ログ

---

## 2. リポジトリ構成

このリポジトリは最小構成です。

```text
/
├── index.html
├── site.webmanifest
├── favicon.ico
├── apple-touch-icon.png
├── icon-32.png
├── icon-192.png
└── icon-512.png
```

ポイント:

- 実質的なアプリ本体は `index.html` のみ
- ビルドツール、npm、Bundler、TypeScript は未使用
- PWA 用の manifest とアイコンだけ別ファイル
- GitHub Pages でそのまま配信できる静的構成

---

## 3. 画面構成

### 3.1 ヘッダー

- 左上タイトル: 現在は `塩崎`
- 右上ボタン:
  - `星取`
  - `追加`
  - `ログ`
  - `ログイン`
- `追加` ボタンは **ログイン時のみ表示**

### 3.2 メイン画面

- 左カラム:
  - `緊急`
  - `注意`
  - `順調`
  - `期限なし`
- 右カラム:
  - FullCalendar によるインラインカレンダー
  - タスク期限
  - 日本の祝日

### 3.3 モーダル

- 管理者ログイン
- 新しいタスク追加
- 作業完了ログ
- 月次カレンダー
- 星取管理表
- 汎用 confirm / input / select ダイアログ

---

## 4. 技術アーキテクチャ

## 4.1 フロントエンド

- 単一 HTML アプリ
- Vanilla JavaScript
- インライン CSS
- インライン ES Modules
- レスポンシブ 2 カラム UI

## 4.2 バックエンド / BaaS

- Firebase Authentication
- Cloud Firestore

## 4.3 配信

- GitHub Pages 向け静的ホスティング
- ルート配信前提

---

## 5. 利用 OSS / 外部サービス

このシステムが依存している主要な OSS / 外部サービスは以下です。

| 名称 | バージョン / 参照先 | 種類 | 用途 |
|---|---|---|---|
| FullCalendar | `6.1.15` | OSS カレンダー UI | 期限タスクと祝日のカレンダー表示 |
| Firebase JavaScript SDK | `10.7.1` | 公式 SDK | 認証 / Firestore 通信 |
| Holidays JP API | `https://holidays-jp.github.io/api/v1` | OSS ベース祝日 API | 日本の祝日表示 |

### 5.1 FullCalendar

- 読み込み元:
  - `https://cdn.jsdelivr.net/npm/fullcalendar@6.1.15/index.global.min.js`
  - `https://cdn.jsdelivr.net/npm/fullcalendar@6.1.15/locales/ja.global.min.js`
- 用途:
  - 月表示
  - 一覧表示
  - 管理者によるドラッグ移動で期限変更
- 備考:
  - Standard 機能のみ利用
  - `ja` ロケールを使用

### 5.2 Firebase JavaScript SDK

- 読み込み元:
  - `firebase-app.js`
  - `firebase-auth.js`
  - `firebase-firestore.js`
- 用途:
  - メールアドレス / パスワードログイン
  - タスクデータ取得 / 保存
  - 星取データ取得 / 保存

### 5.3 Holidays JP API

- 読み込み元:
  - `https://holidays-jp.github.io/api/v1/{year}/date.json`
- 用途:
  - 日本の祝日を FullCalendar 上へ追加表示
- 現在の実装方針:
  - 表示中の年月から必要な年だけ取得
  - 年単位でキャッシュ
  - API 失敗時もタスクイベントは継続表示

---

## 6. Firebase 設定

Firebase 設定は `index.html` の `FIREBASE_CONFIG` に直書きされています。

現在のコード上の設定:

- `projectId`: `kikakugyoumu-907d6`
- `authDomain`: `kikakugyoumu-907d6.firebaseapp.com`
- `storageBucket`: `kikakugyoumu-907d6.firebasestorage.app`

### 6.1 認証方式

- Firebase Authentication
- Email / Password ログイン
- 管理者メールアドレス:
  - `shiozaki@newcom07.jp`

### 6.2 権限モデル

- 未ログイン:
  - 閲覧中心
  - `追加` ボタン非表示
- ログイン済みかつ管理者:
  - タスク追加
  - タスク編集
  - タスク削除
  - 期限ドラッグ変更
  - 優先度変更
  - 星取管理表の編集

補足:

- 実際の書き込み可否は **Firestore Security Rules** に依存します
- このリポジトリには Firestore ルール定義は含まれていません
- 新規再現時は Firebase Console 側で別途ルールを設定する必要があります

---

## 7. Firestore データモデル

このシステムでは主に 4 つのコレクション / サブコレクションを使います。

## 7.1 `tasks`

進捗ダッシュボード本体のタスクデータです。

代表フィールド:

```json
{
  "title": "【ドメイン管理01】 newcom07.jp",
  "progress": 0,
  "deadline": "2026-07-03",
  "createdAt": "2026-04-16T08:00:00.000Z",
  "completed": false,
  "completedAt": null,
  "manualOrder": 1000,
  "priority": 0,
  "updatedAt": "2026-04-16T08:00:00.000Z"
}
```

用途:

- 左カラムの進捗一覧
- カレンダーイベント
- 並び替え
- 完了管理

## 7.2 `work_logs`

タスク完了時の監査ログです。

代表フィールド:

```json
{
  "taskId": "abc123",
  "taskName": "【動画】 AI dbsheet",
  "completedAt": "2026-04-16T08:01:02.000Z",
  "completedAtDisplay": "2026/04/16 17:01:02",
  "completedAtEpoch": 1776326462000,
  "user": "shiozaki@newcom07.jp"
}
```

用途:

- 作業完了ログモーダル
- 完了操作の追跡

## 7.3 `hoshitori_projects/project_2026/hoshitori`

星取管理表の大項目データです。  
1 ドキュメント = 1 大項目です。

代表フィールド:

```json
{
  "title": "ドメイン管理01",
  "order": 5,
  "tasks": [
    {
      "id": "1713250000000",
      "name": "newcom07.jp",
      "owners": {
        "meguro": false,
        "umemoto": false,
        "niidome": false,
        "shiozaki": true
      },
      "createdAt": "2026-04-16T08:00:00.000Z"
    }
  ],
  "createdAt": "2026-04-16T08:00:00.000Z",
  "createdBy": "shiozaki@newcom07.jp",
  "updatedAt": "2026-04-16T08:05:00.000Z"
}
```

用途:

- 星取管理表の大項目と業務内容
- 新規タスク追加モーダルの大項目プルダウン元データ

## 7.4 `hoshitori_logs`

星取管理表に対する操作ログです。

代表フィールド:

```json
{
  "action": "ADD_CATEGORY",
  "details": {
    "title": "ブログサイト"
  },
  "user": "shiozaki@newcom07.jp",
  "timestamp": "2026-04-16T08:10:00.000Z"
}
```

用途:

- 星取モーダル内の操作ログ表示
- 変更履歴の追跡

---

## 8. 業務ロジック

## 8.1 タスク分類ルール

`classifyTask()` で分類します。

- `緊急`
  - 期限超過
  - 本日期限
  - 残り 5 日以内かつ進捗 70% 以下
- `注意`
  - 残り 1 日
  - 残り 5 日以内かつ進捗 85% 以下
  - 残り 15 日以内かつ進捗 30% 以下
- `順調`
  - 上記以外
- `期限なし`
  - `deadline` が空

## 8.2 並び順ルール

`compareTasks()` で並び替えます。

優先順位:

1. `priority` 降順
2. `manualOrder` 昇順
3. `deadline` 昇順
4. `title` 昇順

## 8.3 優先度

`priority` は次の 4 段階です。

- `0`: 普通
- `1`: 優先
- `2`: 重要
- `3`: 最重要

## 8.4 完了処理

完了時は以下を同時に実行します。

1. `tasks` の `completed=true`
2. `completedAt`, `updatedAt` 更新
3. `work_logs` に完了ログ追加

---

## 9. 新規タスク追加モーダル

現在の仕様:

- 大項目プルダウンあり
- 自由記入欄あり
- 期限は任意
- 保存名プレビューあり

保存時のタイトル生成ルール:

```text
【選択した大項目】 自由記入
```

例:

- 大項目: `ドメイン管理01`
- 自由記入: `newcom07.jp`

保存結果:

```text
【ドメイン管理01】 newcom07.jp
```

大項目一覧の取得元:

- `hoshitori_projects/project_2026/hoshitori`

フォールバック:

- 大項目が取得できない場合でも、自由記入だけでタスク追加可能

---

## 10. カレンダー仕様

## 10.1 タスクイベント

- `tasks.deadline` を終日イベント化
- 色はタスク分類に応じて変化
  - `緊急`: 赤
  - `注意`: 黄
  - `順調`: 青

## 10.2 祝日イベント

- Holidays JP API から年別 JSON を取得
- 表示中の年月に必要な年だけ読み込み
- 終日イベントとして追加
- 淡い赤系で表示
- ドラッグ不可

## 10.3 更新挙動

- モーダルカレンダー / インラインカレンダー共通でイベント関数を利用
- `refetchEvents()` によりタスク・祝日をまとめて再読み込み

---

## 11. 星取管理表仕様

星取管理表は別モジュールとして `index.html` 内にインライン実装されています。

機能:

- 大項目追加 / 編集 / 削除
- 業務内容追加 / 編集 / 削除
- 担当者○付け切替
- 大項目並び替え
- 業務内容並び替え
- 操作ログ表示

担当者キー:

- `meguro`
- `umemoto`
- `niidome`
- `shiozaki`

表示名:

- 目黒
- 梅本
- 新留
- 塩崎

---

## 12. PWA / 配信設定

`site.webmanifest` により PWA 情報を持ちます。

主要設定:

- `name`: 星取進捗ダッシュボード
- `short_name`: 星取進捗
- `display`: `standalone`
- `start_url`: `/`
- `scope`: `/`

注意:

- Service Worker は実装されていません
- PWA 風の manifest / アイコン対応のみです

---

## 13. ローカル実行手順

このアプリは静的配信で動きます。  
ただし Firebase Auth を使うため、**`file://` で直接開かず HTTP サーバで配信**してください。

### 最小手順

```bash
cd /Users/macminim4pro/shinchoku2026
python3 -m http.server 4173
```

ブラウザで開く:

```text
http://127.0.0.1:4173/
```

---

## 14. 新規環境での再現手順

このプロジェクトを別環境で AI が再現する場合は、以下の順に作るのが安全です。

### Step 1. 静的 1 ページアプリを作る

- `index.html`
- `site.webmanifest`
- アイコン類

### Step 2. Firebase を準備する

- Firebase Project を作成
- Web App を登録
- Authentication の Email/Password を有効化
- Firestore を有効化
- 許可ドメインへ GitHub Pages / localhost を追加

### Step 3. Firestore コレクションを作る

- `tasks`
- `work_logs`
- `hoshitori_projects/project_2026/hoshitori`
- `hoshitori_logs`

### Step 4. 認証と管理者判定を入れる

- `onAuthStateChanged`
- 管理者メール比較
- ログイン時のみ追加ボタン表示

### Step 5. 進捗一覧を実装する

- タスク取得
- 分類ロジック
- 緊急 / 注意 / 順調 / 期限なし表示
- 並び替え

### Step 6. タスク編集機能を入れる

- タイトル編集
- 期限編集
- 優先度切り替え
- 完了 / 削除

### Step 7. 新規タスク追加モーダルを入れる

- 大項目プルダウン
- 自由記入
- 期限入力
- `【大項目】 自由記入` 合成

### Step 8. カレンダーを入れる

- FullCalendar 読み込み
- deadline をイベント化
- 管理者のみドラッグで期限更新
- Holidays JP API で祝日追加

### Step 9. 星取管理表を入れる

- 大項目 / 業務内容 / 担当者マトリクス
- 操作ログ
- 並び替え

---

## 15. AI が再現時に守るべき必須要件

AI が別実装を作る場合も、以下は必須で維持してください。

### UI / UX 要件

- 1 画面で進捗一覧とカレンダーを同時表示
- ヘッダー右上に操作ボタン群
- Apple 風の軽いカード UI
- スマホでは崩れず、PC では 2 カラム

### データ要件

- `tasks` コレクション中心で運用
- `deadline` は `YYYY-MM-DD`
- `priority` と `manualOrder` を保持
- 完了時は `work_logs` に記録

### 認証要件

- Email/Password ログイン
- 管理者だけ編集可能
- 未ログイン時は追加ボタンを隠す

### 星取要件

- 大項目ごとに業務内容を配列で保持
- `owners` は担当者キーごとの真偽値
- 新規タスク追加時の大項目候補として再利用

### カレンダー要件

- タスク期限を終日イベント表示
- 日本の祝日を別イベントソースで追加
- 祝日取得失敗時もタスク表示は落とさない

---

## 16. 既知の制約

- 実装が `index.html` に集中しており、保守性は高くない
- Firebase 設定がインラインで埋め込まれている
- Firestore ルール定義はリポジトリに含まれていない
- テストコード、CI、型定義、Lint 設定は未整備
- Holidays JP API に依存するため、祝日表示は外部可用性の影響を受ける

---

## 17. 改善候補

今後の改善候補は以下です。

1. `index.html` を `HTML / CSS / JS` に分割する
2. Firebase 設定を環境変数化する
3. Firestore Rules をリポジトリ管理する
4. タスクと星取の型定義を導入する
5. E2E テストを追加する
6. 祝日データをローカルキャッシュまたは自前ホスト化する
7. GitHub Actions で静的検証を追加する

---

## 18. 参考 URL

- 本番 URL:
  - `https://shiozaki-new.github.io/shinchoku2026/`
- GitHub リポジトリ:
  - `https://github.com/shiozaki-new/shinchoku2026`
- FullCalendar:
  - `https://fullcalendar.io/`
- Firebase Web:
  - `https://firebase.google.com/docs/web/setup`
- Holidays JP API:
  - `https://holidays-jp.github.io/`

---

## 19. 要約

このシステムは、**Firebase をバックエンドにした単一 HTML 構成の進捗ダッシュボード**です。  
タスク管理、カレンダー表示、祝日表示、星取管理表、操作ログを 1 ページで扱います。  
AI が再現する場合は、まず **`tasks` / `work_logs` / `hoshitori_projects` / `hoshitori_logs` のデータ構造** と、**管理者認証 + deadline ベース分類 + FullCalendar 連携** を再現すると、同等機能に最短で到達できます。
