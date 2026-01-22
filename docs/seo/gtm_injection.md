# 構造化データ（JSON-LD）のGTM注入手順

更新日: 2026-01-14

## 手順
- GTM で「カスタムHTML」タグを新規作成
- 以下のスニペットを貼り付け、全ページ配信（もしくは該当LPのみに配信）
- トリガーは All Pages（DOM Ready 推奨）

```html
<script type="application/ld+json">
<!-- public/structured-data.json の内容をそのまま貼り付け（配信先ページのテキスト範囲に限定） -->
</script>
```

## 注意
- HTML/CSS/JS には手を入れない方針のため、GTM 注入で対応
- 価格の有効期限（priceValidUntil）は、ページ内記載が無い場合は含めない
- Rating（aggregateRating）は、ページ内に根拠データが無い場合は含めない
- 反映後は Search Console の「リッチリザルトテスト」で検証
