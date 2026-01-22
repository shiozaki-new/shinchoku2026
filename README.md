# 担当業務ダッシュボード

Apple社内ツール級のUI/UXを実現した業務進捗管理ダッシュボード

![Dashboard Preview](https://img.shields.io/badge/Status-Active-success)
![Firebase](https://img.shields.io/badge/Firebase-Firestore-orange)
![Astro](https://img.shields.io/badge/Astro-5.x-blueviolet)
![React](https://img.shields.io/badge/React-18.x-blue)

## ✨ 特徴

- 🎨 **Apple級のUI/UX** - ミニマルで洗練されたデザイン
- 🔄 **リアルタイム同期** - Firebase Firestoreによるデータ同期
- 🌙 **ダークモード** - 自動検出 + 手動切替
- 🔐 **認証システム** - 閲覧は誰でも、編集は認証ユーザーのみ
- 📊 **進捗管理** - タスクの進捗率・期限・リスクレベルを可視化
- 🔍 **フィルタ・検索** - カテゴリ、状態、期限でフィルタリング
- 📱 **レスポンシブ** - PC/タブレット/スマホ対応

## 🚀 クイックスタート

### 1. リポジトリをクローン

```bash
git clone https://github.com/YOUR_USERNAME/hositori01.git
cd hositori01
```

### 2. 依存関係をインストール

```bash
npm install
```

### 3. Firebase設定

[FIREBASE_SETUP.md](./FIREBASE_SETUP.md) を参照してFirebaseプロジェクトをセットアップ後、
`src/components/DashboardComplete.jsx` の `firebaseConfig` を更新してください。

```javascript
// src/components/DashboardComplete.jsx (7-13行目)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### 4. 開発サーバーを起動

```bash
npm run dev
```

ブラウザで http://localhost:4321/ にアクセス

## 📚 ドキュメント

- [QUICKSTART.md](./QUICKSTART.md) - 3ステップで始める
- [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) - Firebase詳細セットアップ
- [DASHBOARD_README.md](./DASHBOARD_README.md) - 全機能・カスタマイズ方法
- [UPDATED_FILES.md](./UPDATED_FILES.md) - 更新履歴

## 🛠️ 技術スタック

- **フレームワーク**: [Astro](https://astro.build/) 5.x
- **UI**: [React](https://react.dev/) 18.x
- **スタイリング**: CSS (CSS Variables)
- **データベース**: [Firebase Firestore](https://firebase.google.com/docs/firestore)
- **認証**: [Firebase Authentication](https://firebase.google.com/docs/auth)

## 📁 プロジェクト構成

```
hositori01/
├── src/
│   ├── components/
│   │   ├── App.jsx                 # メインエントリー
│   │   ├── DashboardComplete.jsx   # ダッシュボード本体
│   │   └── 02_hoshitori.jsx        # 星取表コンポーネント
│   ├── pages/
│   │   └── index.astro             # トップページ
│   └── styles/
│       └── global.css              # グローバルスタイル
├── public/                          # 静的ファイル
├── docs/                           # ドキュメント
├── package.json
└── README.md
```

## 🎯 主な機能

### KPI可視化
- 総タスク数
- 完了率
- 進行中タスク数
- リスクレベル別タスク数

### タスク管理
- 2階層構造（親タスク + サブタスク）
- 進捗率管理（0-100%）
- 期限管理（YYYY/MM/DD）
- ステータス管理（進行中/完了/保留/未着手/承認待ち）
- リスクレベル自動判定

### 編集機能
- ログイン認証
- タスクの追加・編集・削除
- サブタスクの追加・削除

### フィルタ・検索
- カテゴリフィルタ
- ステータスフィルタ
- 期限フィルタ
- キーワード検索

## 🔐 セキュリティ

- Firebaseセキュリティルール設定済み
- 閲覧: 認証不要（read: true）
- 編集: 認証必須（write: if request.auth != null）
- **重要**: Firebase設定は公開リポジトリにプッシュしないでください

## 🌐 デプロイ

### Vercelにデプロイ（推奨）

```bash
npm install -g vercel
vercel
```

### Netlifyにデプロイ

```bash
npm run build
# distフォルダをNetlifyにアップロード
```

### Firebase Hostingにデプロイ

```bash
npm install -g firebase-tools
firebase init hosting
npm run build
firebase deploy
```

## 📝 ライセンス

MIT License

## 👤 作成者

塩崎｜営業企画部

## 🙏 謝辞

- [Astro](https://astro.build/)
- [React](https://react.dev/)
- [Firebase](https://firebase.google.com/)
- [Claude](https://claude.ai/)
