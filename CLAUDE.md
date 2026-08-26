# 大阪展示会 思鳴会議室 開発ガイド（Claude Code用）

開始時は、ユーザーの最初の発言より先に次を行う。

1. [`Docs/思鳴の継.md`](Docs/思鳴の継.md) を読む
2. `sh Scripts/session_start.sh` を実行する
3. 未コミット、遅れ、未確定項目、機械検査の結果を数行で報告する
4. 着手対象が無ければ「何に着手しますか」と聞く

手順と禁止は [`AGENTS.md`](AGENTS.md) を正本とする。同じ説明をこの文書へ複製しない。

Claude Codeでは [`.claude/settings.json`](.claude/settings.json) の SessionStart フックが
現在地を自動取得する。既に出力されている場合は二重実行しない。

引き継ぎは会話履歴でなく、`Docs/思鳴の継.md`、`Docs/会議項目.json`、GitHub Issues、
コミットを使う。未確定の展示会成立条件はオーナーの判断であり、AIが補完しない。

更新日：2026-08-26
