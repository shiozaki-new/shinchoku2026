このディレクトリは、08_DbSheetForSfa セクション用のアイコン画像を配置するための保存場所です。

配置ファイル（PNG）：
- dbsfa-doc.png   （資料アイコン）
- dbsfa-mail.png  （メールアイコン）

表示サイズ指定：高さ 59px（CSS 例：`className="h-[59px] w-auto"`）
- レティナ対応する場合は実体を 118px 四方程度で用意し、CSSで 59px 表示に縮小してください。

配置後、`src/components/08_DbSheetForSfa.jsx` から `withBase('/images/dbsfa/dbsfa-doc.png')` / `withBase('/images/dbsfa/dbsfa-mail.png')` で参照します。
