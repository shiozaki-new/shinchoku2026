# My Responsibility Dashboard

塩崎専用の業務進捗ダッシュボード - Apple社内ツール級のUI/UX

---

## 🎯 概要

このダッシュボードは、塩崎さんの担当業務を「上司が3秒で把握できる」ように設計された進捗管理ツールです。

### 主な特徴

✅ **Apple風デザイン**: ミニマル、余白美、過度な装飾なし
✅ **リアルタイム同期**: Firebase Firestore で複数端末から自動更新
✅ **ダークモード対応**: システム設定自動追従 + 手動切替可能
✅ **編集権限管理**: 閲覧は誰でも、編集は認証ユーザーのみ
✅ **残日数色分け**: 🔴5日 🟡10日 🟢15日 ⚪20日以上
✅ **リスク判定**: 期限と進捗から自動的にリスクレベルを算出

---

## 📂 ファイル構成

```
hositori01/
├── FIREBASE_SETUP.md          # Firebase セットアップ手順書
├── DASHBOARD_README.md         # このファイル
├── src/
│   └── components/
│       ├── Dashboard.jsx              # 基本版（Firebaseなし）
│       └── DashboardComplete.jsx      # 完全版（Firebase統合済み）
```

---

## 🚀 クイックスタート

### **Step 1: Firebase セットアップ**

1. `FIREBASE_SETUP.md` を開いて、手順に従ってFirebaseプロジェクトを作成
2. Firebase設定情報を取得
3. `DashboardComplete.jsx` の冒頭の `firebaseConfig` を自分の設定に置き換え

### **Step 2: プロジェクトに組み込む**

既存のAstroプロジェクトに組み込む場合：

```jsx
// src/pages/dashboard.astro
---
import DashboardComplete from '../components/DashboardComplete.jsx';
---

<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Responsibility Dashboard</title>

  <!-- Firebase SDKs -->
  <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"></script>
  <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore-compat.js"></script>
  <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-auth-compat.js"></script>
</head>
<body>
  <DashboardComplete client:load />
</body>
</html>
```

### **Step 3: 開発サーバー起動**

```bash
npm run dev
```

ブラウザで `http://localhost:4321/dashboard` にアクセス

---

## 🎨 UI 構成

### **1. Header**
- タイトル「My Responsibility Dashboard」
- サブタイトル「塩崎｜営業企画部」
- 最終更新日時
- ログイン/ログアウトボタン
- 編集モード切替ボタン（ログイン時のみ）
- ダークモード切替ボタン

### **2. KPI Cards（4枚）**
- 進行中タスク数
- 完了タスク数
- 保留タスク数
- 直近期限（最短期限日 + 残日数）

### **3. Priority Section**
- 期限が近い順 Top 5
- リスクレベル表示（🔴High / 🟡Medium / 🟢Low）
- 進捗サークル
- ステータスバッジ

### **4. Progress Table**
- フィルタ機能
  - 状態: 全て / 進行中 / 完了 / 保留 / 未着手 / 承認待ち
  - 期限: 全て / 7日以内 / 14日以内 / 30日以内
  - 並び順: 期限昇順/降順 / 進捗昇順/降順
- 検索: 業務名キーワード
- テーブル表示
  - 業務名（親タスク - 子タスク）
  - 進捗バー + %
  - ステータスバッジ
  - 期限 + 残日数（色分け）

### **5. 編集モード（ログイン時のみ）**
- 新規タスク追加ボタン
- 各タスクに「編集」「削除」ボタン表示
- モーダルで親タスク + サブタスクを一括管理

---

## 🔐 権限設定

### **閲覧（認証不要）**
- チーム全員がURLにアクセスするだけで閲覧可能
- リアルタイムでデータが自動更新

### **編集（認証必要）**
1. 右上「ログイン」ボタンをクリック
2. Firebase Authentication で登録したメール/パスワードを入力
3. ログイン成功後、「編集モード」ボタンが表示される
4. 編集モードONで、タスクの追加/編集/削除が可能

---

## 📊 データ構造

### **Firestore コレクション: `tasks`**

```javascript
{
  id: "newcom07",
  title: "newcom07.jp",
  category: "公開サイト",
  children: [
    {
      id: "newcom-sfa",
      title: "SFA",
      progress: 80,
      status: "進行中",
      deadline: "2026/02/14"
    },
    // ...他のサブタスク
  ],
  createdAt: "2026-01-22T10:00:00Z",
  updatedAt: "2026-01-22T10:00:00Z"
}
```

### **カテゴリ一覧**
- 公開サイト
- ブログサイト
- 個別サイト
- 外部サイト
- 広告
- 個別業務
- 有料ツール
- インフラ管理
- その他

### **ステータス一覧**
- 進行中
- 完了
- 保留
- 未着手
- 承認待ち

---

## 🎯 リスク判定ルール

ダッシュボードは以下のルールで自動的にリスクレベルを判定します：

| 条件 | リスクレベル |
|------|------------|
| 期限まで5日以内 かつ 進捗80%未満 | 🔴 High Risk |
| 期限まで10日以内 かつ 進捗50%未満 | 🔴 High Risk |
| 保留 かつ 期限まで14日以内 | 🔴 High Risk |
| 期限まで15日以内 かつ 進捗30%未満 | 🟡 Medium Risk |
| 上記以外 | 🟢 Low Risk |
| 完了済み | ⚪ None |

---

## 🌙 ダークモード

### **自動切替**
- システム設定（macOS/Windows/iOS/Android）に自動追従
- `prefers-color-scheme: dark` を検知

### **手動切替**
- 右上のトグルボタン（🌙 / ☀️）でいつでも切替可能
- 設定はブラウザセッション中保持

---

## 🛠️ カスタマイズ

### **色の変更**

`DashboardComplete.jsx` の CSS変数を編集：

```css
:root {
  --accent-blue: #0071e3;  /* メインカラー */
  --risk-high: #ff3b30;    /* 高リスク色 */
  --risk-medium: #ff9500;  /* 中リスク色 */
  --risk-low: #34c759;     /* 低リスク色 */
}
```

### **残日数の色分け閾値変更**

`getDaysColor()` 関数を編集：

```javascript
const getDaysColor = (days) => {
  if (days === null) return 'var(--text-secondary)';
  if (days <= 5) return 'var(--risk-high)';    // 🔴 5日以内
  if (days <= 10) return 'var(--risk-medium)'; // 🟡 10日
  if (days <= 15) return 'var(--risk-low)';    // 🟢 15日
  return 'var(--risk-none)';                   // ⚪ 20日以上
};
```

### **初期データの変更**

`INITIAL_TASKS` 配列を編集：

```javascript
const INITIAL_TASKS = [
  {
    id: "your-task-id",
    title: "あなたのタスク",
    category: "カテゴリ",
    children: [
      {
        id: "subtask-id",
        title: "サブタスク",
        progress: 50,
        status: "進行中",
        deadline: "2026/03/01"
      }
    ]
  }
];
```

---

## 🆘 トラブルシューティング

### **「Permission denied」エラー**

**原因**: Firestore セキュリティルールが正しく設定されていない

**解決策**:
1. Firebase Console → Firestore Database → ルール
2. 以下のルールを設定:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /tasks/{taskId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### **ログインできない**

**原因**: Authentication が有効化されていない、またはアカウントが未作成

**解決策**:
1. Firebase Console → Authentication → Sign-in method
2. 「メール/パスワード」を有効化
3. Users タブで塩崎さんのアカウントを作成

### **データが表示されない**

**原因**: Firebase設定が間違っている、またはネットワークエラー

**解決策**:
1. ブラウザのコンソール（F12キー）でエラーを確認
2. `firebaseConfig` が正しいか確認
3. Firestore Database が作成されているか確認

### **リアルタイム同期されない**

**原因**: Firebase SDKが読み込まれていない

**解決策**:
1. HTMLに以下のスクリプトタグがあるか確認:
```html
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-auth-compat.js"></script>
```
2. ページをリロード

---

## 📱 レスポンシブ対応

### **PC (1400px~)**
- 4列のKPIカード
- 広々としたレイアウト

### **タブレット (768px~1400px)**
- 2列のKPIカード
- 適度な余白

### **スマホ (~768px)**
- 2列のKPIカード
- フィルタ縦並び
- タスクテーブルは横スクロール可能

---

## 🎓 五式（因・理・縁・循・衡）の実装

- **因（起点）**: KPIカード - 現状を一撃で掴む
- **理（骨格）**: フィルタ/ソート/リスク判定のロジック
- **縁（関係性）**: 親タスク↔子タスクの紐付け、カテゴリ分類
- **循（循環）**: Firestoreリアルタイム同期、定期業務の更新
- **衡（均衡）**: 情報過多を避け、重要度の強弱を視覚化

---

## 📞 サポート

不明点や追加機能のリクエストがあれば、以下を確認してください：

1. `FIREBASE_SETUP.md` - Firebase設定手順
2. このファイル（README）- 全体的な使い方
3. ブラウザコンソール（F12）- エラーメッセージ

---

## 🚀 今後の拡張案

- [ ] CSV/JSON エクスポート機能
- [ ] 週次/月次レポート自動生成
- [ ] Slack/メール通知連携
- [ ] カレンダービュー追加
- [ ] ガントチャート表示
- [ ] チーム別フィルタ（目黒/梅本/新留/塩崎）
- [ ] モバイルアプリ化（PWA）

---

**🎉 以上で My Responsibility Dashboard の完成です！**

カッコいいダッシュボードで、毎日の業務管理を楽しく効率的に！
