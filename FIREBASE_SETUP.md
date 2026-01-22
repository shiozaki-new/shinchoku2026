# Firebase セットアップ手順書

## 概要
このダッシュボードは Firebase Firestore を使用してデータを管理します。
以下の手順で Firebase プロジェクトをセットアップしてください。

---

## 📋 事前準備

- Google アカウント（既存のものでOK）
- インターネット接続

---

## 🚀 セットアップ手順

### **Step 1: Firebase プロジェクトの作成**

1. [Firebase Console](https://console.firebase.google.com/) にアクセス
2. 「プロジェクトを追加」をクリック
3. プロジェクト名を入力（例: `hoshitori-dashboard`）
4. Google アナリティクスは「今は必要ない」を選択（オプション）
5. 「プロジェクトを作成」をクリック

---

### **Step 2: Firestore Database の作成**

1. 左メニューから「Firestore Database」を選択
2. 「データベースの作成」をクリック
3. **ロケーション**: `asia-northeast1`（東京）を選択
4. **セキュリティルール**: 「本番環境モードで開始」を選択
5. 「有効にする」をクリック

---

### **Step 3: セキュリティルールの設定**

1. Firestore Database 画面で「ルール」タブを選択
2. 以下のルールをコピー＆ペーストして「公開」をクリック

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // tasks コレクション
    match /tasks/{taskId} {
      // 誰でも読み取り可能（閲覧は認証不要）
      allow read: if true;
      // 認証済みユーザーのみ書き込み可能（編集は認証必要）
      allow write: if request.auth != null;
    }
  }
}
```

---

### **Step 4: Authentication の設定**

1. 左メニューから「Authentication」を選択
2. 「始める」をクリック
3. 「Sign-in method」タブを選択
4. 「メール/パスワード」を選択
5. 「有効にする」をONにして「保存」

---

### **Step 5: 編集用アカウントの作成**

1. 「Authentication」→「Users」タブを選択
2. 「ユーザーを追加」をクリック
3. **メール**: 塩崎さんのメールアドレスを入力
4. **パスワード**: 任意のパスワード（8文字以上）を設定
5. 「ユーザーを追加」をクリック

---

### **Step 6: Firebase 設定情報の取得**

1. 左上の歯車アイコン → 「プロジェクトの設定」を選択
2. 「全般」タブの下部「マイアプリ」セクションへスクロール
3. 「ウェブアプリにFirebaseを追加」（`</>`アイコン）をクリック
4. アプリのニックネーム: `dashboard`（任意）
5. 「Firebase Hosting」はチェック不要
6. 「アプリを登録」をクリック
7. 表示される **Firebase設定オブジェクト** をコピー

以下のような形式です：
```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
```

---

### **Step 7: ダッシュボードに設定を反映**

1. `src/components/Dashboard.jsx` ファイルを開く
2. 冒頭の `firebaseConfig` オブジェクトを **Step 6** でコピーした内容に置き換え
3. ファイルを保存

---

## 🎉 セットアップ完了

以上で Firebase のセットアップは完了です。
ダッシュボードをブラウザで開くと、自動的に Firestore に接続されます。

---

## 🔒 セキュリティについて

- **閲覧**: 誰でも可能（認証不要）
- **編集**: Step 5 で作成したアカウントでログインした場合のみ可能
- **推奨**: 編集用メールアドレスは社内メールを使用

---

## 🆘 トラブルシューティング

### 「Permission denied」エラーが出る
→ セキュリティルール（Step 3）が正しく設定されているか確認

### ログインできない
→ Step 5 で作成したメール/パスワードが正しいか確認

### データが表示されない
→ ブラウザのコンソール（F12キー）でエラーメッセージを確認

---

## 📞 サポート

不明点があれば、このファイルと一緒に提供される README.md を参照してください。
