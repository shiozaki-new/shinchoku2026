# 大阪展示会 思鳴会議室

大阪展示会の認・思・鳴を確定し、会話履歴に依存せず次のAIへ引き継ぐためのHTML会議室です。

## 最初に実行

```sh
sh Scripts/session_start.sh
```

## ローカル表示

```sh
python3 -m http.server 4173
```

ブラウザで `http://localhost:4173/` を開きます。

## 機械検査

```sh
python3 Scripts/handover_guard.py
```

## 正本

読む順序は [認の書](Docs/認書.md) → [思の書](Docs/思書.md) →
[鳴の書](Docs/鳴書.md) → [示の書](Docs/示書.md) → コードです。
現在の合意は [`Docs/思鳴の継.md`](Docs/思鳴の継.md)、機械可読な会議項目は
[`Docs/会議項目.json`](Docs/会議項目.json) にあります。

`reports/` と `JMOTTO_SYNC_SETUP.md` は旧進捗ダッシュボードの記録であり、
大阪展示会の設計根拠には使用しません。
