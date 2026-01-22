import React, { useEffect, useState } from 'react';

// 03: 業務内容説明セクション
// - props.title: セクション見出し
// - props.items: [{ id, title, description }] を渡すと差し替え可能
// - props.compact: 01_header.jsx から注入される行間圧縮フラグ

const styles = `
.gyomu-detail { 
  background: var(--surface, #fff);
  color: var(--ink, #111);
  border: 1px solid var(--line, #e5e7eb);
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(2,6,23,.06);
  padding: 20px 22px;
  width: min(1100px, 92vw);
}
.gyomu-detail h2 { font-size: 20px; font-weight: 800; text-align: center; margin: 2px 0 12px; }
.gyomu-detail p.lead { text-align:center; color:#6b7280; font-size: 13px; margin-bottom: 8px; }
.gd-list { list-style: none; padding: 0; margin: 0; }
.gd-item { border-top: 1px solid var(--line, #e5e7eb); scroll-margin-top: 90px; }
.gd-item:first-child { border-top: none; }
.gd-item summary { 
  cursor: pointer; list-style: none; outline: none; 
  padding: 10px 4px; font-weight: 700; display:flex; align-items:center; gap:8px;
}
.gd-item[open] summary { color: #036eb7; }
.gd-item summary::marker { display:none; }
.gd-item .chev { transition: transform .2s ease; }
.gd-item[open] .chev { transform: rotate(90deg); }
.gd-item .body { padding: 0 4px 12px 28px; color:#374151; font-size: 14px; line-height: 1.7; }
.gyomu-compact .gd-item summary { padding: 8px 4px; }
.gyomu-compact .gd-item .body { padding-bottom: 8px; font-size: 13px; }
`;

const defaultItems = [
  {
    id: 'newcom',
    title: 'newcom07.jp',
    description:
      'コーポレートサイトの運用・更新。ニュース公開、製品/事例ページの改訂、アクセス解析（GA4）と改善、品質管理（リンク/表示チェック）までを一気通貫で担当します。',
  },
  {
    id: 'dbsheet',
    title: 'dbsheet.jp',
    description:
      'プロダクトサイトの運営。LP制作、資料DL導線、計測タグ整備、フォーム最適化、Search Console/SEOの基盤整備など、集客〜CVの改善を継続的に実施します。',
  },
  {
    id: 'pegamore',
    title: 'pegamore.com',
    description:
      'サービス/ブランドサイトの更新およびビジュアル制作。訴求軸の整理、画像最適化、ページスピード配慮の実装を含みます。',
  },
  {
    id: 'domain',
    title: 'ドメイン管理',
    description:
      'レジストラ更新管理、DNS（A/CNAME/TXT/MX/CAA）設定、メールドメイン（SPF/DKIM/DMARC）整備、ネームサーバ切替や監視を安全第一で運用します。',
  },
  {
    id: 'ssl',
    title: 'SSL管理',
    description:
      '証明書の発行/更新（オートリニュー含む）、中間証明書の配備、TLS設定のベストプラクティス対応、期限監視と事前更新を徹底します。',
  },
  {
    id: 'servers',
    title: '契約サーバー管理',
    description:
      'サーバ契約/更新、リソース監視、セキュリティパッチ適用、バックアップ/復旧テスト、障害時の一次対応手順までを整備・運用します。',
  },
  {
    id: 'ads',
    title: 'dbSheetClient（Google Ads）',
    description:
      '検索/ディスプレイの運用。キーワード/広告グルーピング、入札/予算管理、CV計測（GA4/タグマネージャ）連携、LP改善PDCA、週次レポーティング。',
  },
  {
    id: 'catalog',
    title: '配布物作成',
    description:
      '構成企画、コピー/原稿作成、デザイン、写真/図版制作、入稿データ作成、印刷手配。Webとの訴求整合やQR/トラッカブル導線も設計します。',
  },
  {
    id: 'movie',
    title: '動画製作',
    description:
      '企画/台本、撮影、編集、テロップ/ナレーション、BGM/SE、字幕、YouTube/Vimeo公開、アナリティクスでの効果測定まで実施します。',
  },
  {
    id: 'adobe',
    title: 'Adobeツール',
    description:
      'Creative Cloudの運用とライセンス管理。テンプレート/プリセット整備、カラー/タイポのブランドルール適用、制作ワークフローの標準化を推進します。',
  },
];

function GyomuDetail({ title = '業務内容の説明', items = defaultItems, compact = false }) {
  const [tableWidth, setTableWidth] = useState(null);

  useEffect(() => {
    const tbl = document.querySelector('.hoshitori table');
    if (!tbl) return;
    const update = () => setTableWidth(tbl.offsetWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(tbl);
    window.addEventListener('resize', update);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <section className={`gyomu-detail ${compact ? 'gyomu-compact' : ''}`} aria-label="業務内容の説明" style={tableWidth ? { width: tableWidth + 'px' } : undefined}>
      <h2>{title}</h2>
      <p className="lead">塩崎の担当に○が付いている業務の説明です。</p>
      <ul className="gd-list">
        {items.map((it) => (
          <li key={it.id} id={`gyomu-${it.id}`} className="gd-item">
            <details>
              <summary>
                <svg className="chev" width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M8 5l8 7-8 7" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                {it.title}
              </summary>
              <div className="body">{it.description}</div>
            </details>
          </li>
        ))}
      </ul>
      <style>{styles}</style>
    </section>
  );
}

export default GyomuDetail;
