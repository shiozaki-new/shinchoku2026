# 🚀 クイックスタートガイド

## すぐに始める3ステップ

### ⚡ Step 1: Firebaseプロジェクトの作成（5分）

1. [Firebase Console](https://console.firebase.google.com/) を開く
2. 「プロジェクトを追加」をクリック
3. プロジェクト名: `hoshitori-dashboard` （任意）
4. Firestore Database を作成:
   - ロケーション: `asia-northeast1`（東京）
   - セキュリティルール: 「本番環境モードで開始」

5. セキュリティルールを設定（「ルール」タブで以下をコピペ）:

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

6. Authentication を有効化:
   - 「Authentication」→「Sign-in method」→「メール/パスワード」を有効化
   - 「Users」タブで塩崎さんのアカウントを作成（メール＋パスワード）

7. Firebase設定を取得:
   - 「プロジェクトの設定」→「全般」→「マイアプリ」→ ウェブアプリを追加（`</>`アイコン）
   - 表示される `firebaseConfig` をコピー

---

### ⚙️ Step 2: ダッシュボードに設定を反映（1分）

1. `src/components/DashboardComplete.jsx` を開く
2. 冒頭の `firebaseConfig` を **Step 1** でコピーした内容に置き換え:

```javascript
// ❌ 変更前
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  // ...
};

// ✅ 変更後（あなたの実際の設定）
const firebaseConfig = {
  apiKey: "AIzaSyABcDeFgHiJkLmNoPqRsTuVwXyZ123456",
  authDomain: "hoshitori-dashboard.firebaseapp.com",
  projectId: "hoshitori-dashboard",
  storageBucket: "hoshitori-dashboard.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};
```

3. ファイルを保存

---

### 🎉 Step 3: 起動して確認（1分）

```bash
# 開発サーバー起動
npm run dev
```

ブラウザで以下にアクセス:
```
http://localhost:4321/dashboard
```

**初回は自動的にサンプルデータが投入されます！**

---

## ✅ 動作確認チェックリスト

- [ ] ダッシュボードが表示される
- [ ] KPIカード（4枚）が表示される
- [ ] Priority セクションにタスクが表示される
- [ ] 進捗一覧テーブルが表示される
- [ ] ダークモード切替（🌙 / ☀️）が動作する
- [ ] フィルタ・ソート・検索が動作する
- [ ] ログインボタンをクリック → メール/パスワード入力 → ログイン成功
- [ ] ログイン後、「編集モード」ボタンが表示される
- [ ] 編集モードON → 「+ 新規タスク」ボタンが表示される
- [ ] タスクにホバー → 「編集」「削除」ボタンが表示される

---

## 🎨 初期データ

以下の3つのタスクが自動的に作成されます：

### 1. newcom07.jp
- SFA: 進捗80% / 進行中 / 2026/02/14
- MES: 進捗80% / 進行中 / 2026/02/14
- QMS: 進捗80% / 進行中 / 2026/02/14

### 2. ドメイン更新作業
- newcom07.jp: 進捗100% / 完了 / 2026/01/15

### 3. SSL更新作業
- newcom07.jp: 進捗100% / 完了 / 2026/01/15
- dbsheetclient.jp: 進捗100% / 完了 / 2026/01/15

---

## 🔧 次にやること

### タスクを編集する

1. 右上「ログイン」ボタンをクリック
2. Firebase で作成したメール/パスワードを入力
3. 「編集モード」ボタンをクリック
4. タスクにホバー → 「編集」をクリック
5. モーダルでタスク情報を編集 → 「保存」

### 新規タスクを追加する

1. 編集モードON
2. 「+ 新規タスク」ボタンをクリック
3. 親タスク名、カテゴリを入力
4. サブタスクを追加（「+ サブタスクを追加」ボタン）
5. 各サブタスクの情報を入力（タスク名、進捗%、状態、期限）
6. 「保存」をクリック

### チームメンバーにURLを共有する

```
https://your-site.com/dashboard
```

チームメンバーは **ログインなしで閲覧可能** です！
編集は塩崎さんのアカウントでログインした場合のみ可能です。

---

## 🆘 トラブルシューティング

### データが表示されない
→ ブラウザのコンソール（F12キー）でエラーを確認
→ `firebaseConfig` が正しいか再確認

### ログインできない
→ Firebase Console の Authentication で、メール/パスワードが有効化されているか確認
→ Users タブでアカウントが作成されているか確認

### リアルタイム同期されない
→ ページをリロード
→ `dashboard.astro` に Firebase SDKのスクリプトタグがあるか確認

---

## 📚 詳細ドキュメント

- **FIREBASE_SETUP.md**: Firebase の詳細セットアップ手順
- **DASHBOARD_README.md**: ダッシュボードの全機能・カスタマイズ方法
- **src/components/DashboardComplete.jsx**: ソースコード（コメント付き）

---

**🎊 以上で完了です！カッコいいダッシュボードを楽しんでください！**
