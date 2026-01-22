import React, { useEffect, useRef, useState } from 'react';

// Hoshitori 本体: テーブルと見た目のみ。縮尺・操作はヘッダー側で実装。
const scopedStyles = `
.hoshitori { font-family: "Hiragino Kaku Gothic ProN", "Meiryo", sans-serif; background: var(--surface, #fff); color: var(--ink, #111); padding: 24px 24px 32px 24px; line-height: 1.4; border-radius: 16px; border: 1px solid var(--line, #e5e7eb); box-shadow: 0 8px 30px rgba(2,6,23,.06); display: inline-block; width: fit-content; max-width: none; margin: 0; }
.hoshitori h1 { font-size:20px; font-weight:bold; letter-spacing:.01em; margin-bottom:14px; text-align:center; margin-top:10px; }
/* 表の横幅を中身に合わせる（列幅は colgroup で制御） */
.hoshitori table { border-collapse: collapse; width: max-content; font-size: 13.5px; margin-left:auto; margin-right:auto; }
.hoshitori th, .hoshitori td { border: 1px solid #d1d5db; padding: 6px 10px; text-align: center; }
.hoshitori th { background:#f8fafc; font-weight:bold; }
.hoshitori th.col-task { text-align:left; }
.hoshitori .col-person { width: 62px; } /* 77px の 20% 減 ≒ 62px */
.hoshitori td.task-name { text-align:left; padding-left:18px; }
.hoshitori tr.category-row td { background: var(--category, #f3f4f6); font-weight:bold; text-align:left; padding-left:12px; border-top:2px solid var(--accent, #036eb7); }
.hoshitori td.mark { font-size:15px; color: var(--ok, #0ea5e9); }
.hoshitori.compact table { font-size: 12px; }
.hoshitori.compact th, .hoshitori.compact td { padding: 4px 8px; }
.hoshitori.compact h1 { font-size: 16px; margin-bottom: 10px; }
`;

function Hoshitori({ compact = true }) {
  const tableRef = useRef(null);
  const [taskColWidth, setTaskColWidth] = useState(null);
  const [containerWidth, setContainerWidth] = useState(null);
  const go = (hashId) => (e) => {
    e.preventDefault();
    const el = document.getElementById(hashId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
    }
  };

  // 最長の業務内容に合わせて列幅を自動計測
  useEffect(() => {
    const t = tableRef.current;
    if (!t) return;
    const cells = t.querySelectorAll('td.task-name');
    let max = 0;
    cells.forEach((td) => {
      // scrollWidth は内容の自然幅（折返し前）を返す
      const w = td.scrollWidth;
      if (w > max) max = w;
    });
    // パディング・余裕を加味しつつ、実用的な範囲でクリップ
    const padded = Math.ceil(max + 28); // 左右パディング相当
    const clamped = Math.max(220, Math.min(padded, 560));
    setTaskColWidth(clamped);
    // 表の実寸に合わせて外側コンテナ幅を同期
    const updateWidth = () => setContainerWidth(t.offsetWidth);
    updateWidth();
    const ro = new ResizeObserver(updateWidth);
    ro.observe(t);
    window.addEventListener('resize', updateWidth);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', updateWidth);
    };
  }, []);

  return (
    <div className="hoshitori-outer" style={containerWidth ? { width: containerWidth + 'px' } : undefined}>
      <div className={`hoshitori ${compact ? 'compact' : ''}`}>
        <h1>業務担当一覧表（星取表）2026 ─ 営業企画部</h1>
            <table ref={tableRef}>
              <colgroup>
                <col className="col-task-dyn" style={taskColWidth ? { width: `${taskColWidth}px` } : undefined} />
                <col className="col-person" span="4" />
              </colgroup>
              <thead>
                <tr>
                  <th className="col-task">業務内容</th>
                  <th className="col-person">目黒</th>
                  <th className="col-person">梅本</th>
                  <th className="col-person">新留</th>
                  <th className="col-person">塩崎</th>
                </tr>
              </thead>
              <tbody>
                {/* 1. 公開サイト */}
                <tr className="category-row">
                  <td colSpan={5}>1. 公開サイト</td>
                </tr>
                <tr>
                  <td className="task-name">newcom07.jp</td>
                  <td className="mark"></td>
                  <td className="mark">○</td>
                  <td className="mark">○</td>
                  <td className="mark"><a href="#gyomu-newcom" onClick={go('gyomu-newcom')}>○</a></td>
                </tr>
                <tr>
                  <td className="task-name">ニューコム（英語）</td>
                  <td className="mark"></td>
                  <td className="mark">○</td>
                  <td className="mark"></td>
                  <td className="mark"></td>
                </tr>
                <tr>
                  <td className="task-name">dbsheet.jp</td>
                  <td className="mark"></td>
                  <td className="mark"></td>
                  <td className="mark">○</td>
                  <td className="mark"><a href="#gyomu-dbsheet" onClick={go('gyomu-dbsheet')}>○</a></td>
                </tr>
                <tr>
                  <td className="task-name">dbSheetClient（英語）</td>
                  <td className="mark"></td>
                  <td className="mark">○</td>
                  <td className="mark"></td>
                  <td className="mark"></td>
                </tr>
                <tr>
                  <td className="task-name">pegamore.com</td>
                  <td className="mark"></td>
                  <td className="mark"></td>
                  <td className="mark"></td>
                  <td className="mark"><a href="#gyomu-pegamore" onClick={go('gyomu-pegamore')}>○</a></td>
                </tr>
                <tr>
                  <td className="task-name">電気制御設計支援</td>
                  <td className="mark"></td>
                  <td className="mark"></td>
                  <td className="mark">○</td>
                  <td className="mark"></td>
                </tr>
                <tr>
                  <td className="task-name">SIソリューション</td>
                  <td className="mark"></td>
                  <td className="mark">○</td>
                  <td className="mark">○</td>
                  <td className="mark"></td>
                </tr>
                <tr>
                  <td className="task-name">ドメイン管理</td>
                  <td className="mark"></td>
                  <td className="mark"></td>
                  <td className="mark"></td>
                  <td className="mark"><a href="#gyomu-domain" onClick={go('gyomu-domain')}>○</a></td>
                </tr>
                <tr>
                  <td className="task-name">SSL管理</td>
                  <td className="mark"></td>
                  <td className="mark"></td>
                  <td className="mark"></td>
                  <td className="mark"><a href="#gyomu-ssl" onClick={go('gyomu-ssl')}>○</a></td>
                </tr>
                <tr>
                  <td className="task-name">契約サーバー管理</td>
                  <td className="mark"></td>
                  <td className="mark"></td>
                  <td className="mark"></td>
                  <td className="mark"><a href="#gyomu-servers" onClick={go('gyomu-servers')}>○</a></td>
                </tr>

                {/* 2. ブログサイト */}
                <tr className="category-row">
                  <td colSpan={5}>2. ブログサイト</td>
                </tr>
                <tr>
                  <td className="task-name">dbSheetClient千夜一夜</td>
                  <td className="mark"></td>
                  <td className="mark">○</td>
                  <td className="mark"></td>
                  <td className="mark"></td>
                </tr>
                <tr>
                  <td className="task-name">Excel（エクセル）コーヒー ブレイク</td>
                  <td className="mark"></td>
                  <td className="mark">○</td>
                  <td className="mark"></td>
                  <td className="mark"></td>
                </tr>
                <tr>
                  <td className="task-name">DB＆SQL技術ブログ</td>
                  <td className="mark"></td>
                  <td className="mark">○</td>
                  <td className="mark"></td>
                  <td className="mark"></td>
                </tr>
                <tr>
                  <td className="task-name">dbSheetClient情報ブログ</td>
                  <td className="mark"></td>
                  <td className="mark">○</td>
                  <td className="mark"></td>
                  <td className="mark"></td>
                </tr>

                {/* 3. 個別サイト */}
                <tr className="category-row">
                  <td colSpan={5}>3. 個別サイト</td>
                </tr>
                <tr>
                  <td className="task-name">dbSheetClientテクニカルフォーラム</td>
                  <td className="mark"></td>
                  <td className="mark">○</td>
                  <td className="mark"></td>
                  <td className="mark"></td>
                </tr>
                <tr>
                  <td className="task-name">dbSheetClientテクニカルフォーラム アカウント管理</td>
                  <td className="mark">○</td>
                  <td className="mark"></td>
                  <td className="mark"></td>
                  <td className="mark"></td>
                </tr>
                <tr>
                  <td className="task-name">dbSheet e-ラーニング</td>
                  <td className="mark"></td>
                  <td className="mark">○</td>
                  <td className="mark"></td>
                  <td className="mark"></td>
                </tr>
                <tr>
                  <td className="task-name">dbSheet e-ラーニング アカウント管理</td>
                  <td className="mark">○</td>
                  <td className="mark"></td>
                  <td className="mark"></td>
                  <td className="mark"></td>
                </tr>
                <tr>
                  <td className="task-name">Facebook</td>
                  <td className="mark"></td>
                  <td className="mark">○</td>
                  <td className="mark"></td>
                  <td className="mark"></td>
                </tr>
                <tr>
                  <td className="task-name">twitter（X）</td>
                  <td className="mark"></td>
                  <td className="mark">○</td>
                  <td className="mark"></td>
                  <td className="mark"></td>
                </tr>
                <tr>
                  <td className="task-name">dbSheetClient社内フォーラム</td>
                  <td className="mark"></td>
                  <td className="mark">○</td>
                  <td className="mark"></td>
                  <td className="mark"></td>
                </tr>

                {/* 4. 外部サイト（無料） */}
                <tr className="category-row">
                  <td colSpan={5}>4. 外部サイト（無料）</td>
                </tr>
                <tr>
                  <td className="task-name">イプロス</td>
                  <td className="mark"></td>
                  <td className="mark"></td>
                  <td className="mark">○</td>
                  <td className="mark"></td>
                </tr>
                <tr>
                  <td className="task-name">アぺルザ</td>
                  <td className="mark"></td>
                  <td className="mark"></td>
                  <td className="mark">○</td>
                  <td className="mark"></td>
                </tr>
                <tr>
                  <td className="task-name">シーラベル</td>
                  <td className="mark">○</td>
                  <td className="mark"></td>
                  <td className="mark"></td>
                  <td className="mark"></td>
                </tr>

                {/* 5. 外部契約サイト（有料） */}
                <tr className="category-row">
                  <td colSpan={5}>5. 外部契約サイト（有料）</td>
                </tr>
                <tr>
                  <td className="task-name">帝国データバンク</td>
                  <td className="mark">○</td>
                  <td className="mark"></td>
                  <td className="mark"></td>
                  <td className="mark"></td>
                </tr>

                {/* 6. Google Ads */}
                <tr className="category-row">
                  <td colSpan={5}>6. Google Ads</td>
                </tr>
                <tr>
                  <td className="task-name">dbSheetClient</td>
                  <td className="mark"></td>
                  <td className="mark"></td>
                  <td className="mark"></td>
                  <td className="mark"><a href="#gyomu-ads" onClick={go('gyomu-ads')}>○</a></td>
                </tr>

                {/* 7. 個別業務 */}
                <tr className="category-row">
                  <td colSpan={5}>7. 個別業務</td>
                </tr>
                <tr>
                  <td className="task-name">ユーザー事例取材・原稿作成</td>
                  <td className="mark">○</td>
                  <td className="mark"></td>
                  <td className="mark"></td>
                  <td className="mark"></td>
                </tr>
                <tr>
                  <td className="task-name">展示会出展（全般）</td>
                  <td className="mark">○</td>
                  <td className="mark"></td>
                  <td className="mark"></td>
                  <td className="mark"></td>
                </tr>
                <tr>
                  <td className="task-name">配布物作成</td>
                  <td className="mark"></td>
                  <td className="mark"></td>
                  <td className="mark">○</td>
                  <td className="mark"><a href="#gyomu-catalog" onClick={go('gyomu-catalog')}>○</a></td>
                </tr>
                <tr>
                  <td className="task-name">カタログ・パンフレット入稿</td>
                  <td className="mark"></td>
                  <td className="mark"></td>
                  <td className="mark"></td>
                  <td className="mark"></td>
                </tr>
                <tr>
                  <td className="task-name">セミナー開催・内容日程調整</td>
                  <td className="mark">○</td>
                  <td className="mark"></td>
                  <td className="mark"></td>
                  <td className="mark"></td>
                </tr>
                <tr>
                  <td className="task-name">セミナー録画・編集・開催</td>
                  <td className="mark"></td>
                  <td className="mark"></td>
                  <td className="mark"></td>
                  <td className="mark"></td>
                </tr>
                <tr>
                  <td className="task-name">製品リリース</td>
                  <td className="mark">○</td>
                  <td className="mark"></td>
                  <td className="mark"></td>
                  <td className="mark"></td>
                </tr>
                <tr>
                  <td className="task-name">ISMSセキュリティ委員</td>
                  <td className="mark">○</td>
                  <td className="mark"></td>
                  <td className="mark"></td>
                  <td className="mark"></td>
                </tr>
                <tr>
                  <td className="task-name">データ管理</td>
                  <td className="mark"></td>
                  <td className="mark"></td>
                  <td className="mark">○</td>
                  <td className="mark"></td>
                </tr>
                <tr>
                  <td className="task-name">Zohoシステム（メール配信）</td>
                  <td className="mark">○</td>
                  <td className="mark"></td>
                  <td className="mark"></td>
                  <td className="mark"></td>
                </tr>
                <tr>
                  <td className="task-name">外部セミナー、ユーザ会開催（全般）</td>
                  <td className="mark">○</td>
                  <td className="mark"></td>
                  <td className="mark"></td>
                  <td className="mark"></td>
                </tr>
                <tr>
                  <td className="task-name">動画製作</td>
                  <td className="mark"></td>
                  <td className="mark"></td>
                  <td className="mark"></td>
                  <td className="mark"><a href="#gyomu-movie" onClick={go('gyomu-movie')}>○</a></td>
                </tr>
                <tr>
                  <td className="task-name">Webページ（成果につながる取組み・数値管理）</td>
                  <td className="mark"></td>
                  <td className="mark"></td>
                  <td className="mark"></td>
                  <td className="mark"></td>
                </tr>

                {/* 8. 有料サイト・ツール（年契約） */}
                <tr className="category-row">
                  <td colSpan={5}>8. 有料サイト・ツール（年契約）</td>
                </tr>
                <tr>
                  <td className="task-name">Adobeツール</td>
                  <td className="mark"></td>
                  <td className="mark"></td>
                  <td className="mark"></td>
                  <td className="mark"><a href="#gyomu-adobe" onClick={go('gyomu-adobe')}>○</a></td>
                </tr>
                <tr>
                  <td className="task-name">Vimeo</td>
                  <td className="mark"></td>
                  <td className="mark">○</td>
                  <td className="mark"></td>
                  <td className="mark"></td>
                </tr>
                <tr>
                  <td className="task-name">フォーラム｜メールシステム</td>
                  <td className="mark"></td>
                  <td className="mark">○</td>
                  <td className="mark"></td>
                  <td className="mark"></td>
                </tr>
                <tr>
                  <td className="task-name">Zohoシステム</td>
                  <td className="mark">○</td>
                  <td className="mark"></td>
                  <td className="mark"></td>
                  <td className="mark"></td>
                </tr>
                <tr>
                  <td className="task-name">Zoom</td>
                  <td className="mark"></td>
                  <td className="mark"></td>
                  <td className="mark"></td>
                  <td className="mark"></td>
                </tr>

                {/* 9. 必要スキル */}
                <tr className="category-row">
                  <td colSpan={5}>9. 必要スキル</td>
                </tr>
                <tr>
                  <td className="task-name">Webコーディング（HTML）</td>
                  <td className="mark"></td>
                  <td className="mark">○</td>
                  <td className="mark">○</td>
                  <td className="mark">○</td>
                </tr>
                <tr>
                  <td className="task-name">Webコーディング（CSS）</td>
                  <td className="mark"></td>
                  <td className="mark">○</td>
                  <td className="mark"></td>
                  <td className="mark">○</td>
                </tr>
                <tr>
                  <td className="task-name">Webコーディング（WordPress）</td>
                  <td className="mark"></td>
                  <td className="mark">○</td>
                  <td className="mark"></td>
                  <td className="mark">○</td>
                </tr>
                <tr>
                  <td className="task-name">Webプログラミング（JavaScript）</td>
                  <td className="mark"></td>
                  <td className="mark">○</td>
                  <td className="mark"></td>
                  <td className="mark"></td>
                </tr>
                <tr>
                  <td className="task-name">Webプログラミング（PHP）</td>
                  <td className="mark"></td>
                  <td className="mark">○</td>
                  <td className="mark"></td>
                  <td className="mark"></td>
                </tr>
                <tr>
                  <td className="task-name">.htaccessファイルの設定</td>
                  <td className="mark"></td>
                  <td className="mark">○</td>
                  <td className="mark"></td>
                  <td className="mark">○</td>
                </tr>
                <tr>
                  <td className="task-name">データベース（mysql）の基礎知識</td>
                  <td className="mark"></td>
                  <td className="mark">○</td>
                  <td className="mark"></td>
                  <td className="mark">○</td>
                </tr>
                <tr>
                  <td className="task-name">Adobe各種ツール</td>
                  <td className="mark"></td>
                  <td className="mark">○</td>
                  <td className="mark">○</td>
                  <td className="mark">○</td>
                </tr>
                <tr>
                  <td className="task-name">Zoho CRM操作・運用</td>
                  <td className="mark">○</td>
                  <td className="mark"></td>
                  <td className="mark"></td>
                  <td className="mark"></td>
                </tr>
                <tr>
                  <td className="task-name">Zoho Campaigns操作・運用</td>
                  <td className="mark">○</td>
                  <td className="mark"></td>
                  <td className="mark"></td>
                  <td className="mark"></td>
                </tr>
                <tr>
                  <td className="task-name">Zoho SalesIQ操作・運用</td>
                  <td className="mark">○</td>
                  <td className="mark"></td>
                  <td className="mark"></td>
                  <td className="mark"></td>
                </tr>
                <tr>
                  <td className="task-name">進捗管理/納期管理</td>
                  <td className="mark">○</td>
                  <td className="mark"></td>
                  <td className="mark">○</td>
                  <td className="mark"></td>
                </tr>
              </tbody>
            </table>
        <style>{scopedStyles}</style>
      </div>
    </div>
  );
}

export default Hoshitori;
