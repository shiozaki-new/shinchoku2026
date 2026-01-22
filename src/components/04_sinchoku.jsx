import React, { useEffect, useState } from 'react';

// 04: 進捗ボード（汎用）
// - props.title: セクション見出し（省略時: "進捗状況"）
// - props.items: [{ id, title, owner, percent, status, due, href? }]
// - props.compact: 01_header.jsx から注入される行間圧縮フラグ

const styles = `
.sinchoku-card {
  background: var(--surface, #fff);
  color: var(--ink, #111);
  border: 1px solid var(--line, #e5e7eb);
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(2,6,23,.06);
  padding: 18px 20px;
  width: min(1100px, 92vw);
}
.sinchoku-title { font-weight: 800; font-size: 20px; text-align: center; margin: 4px 0 12px; }
.sz-head, .sz-row { display: grid; grid-template-columns: 1fr 220px 110px 120px; gap: 8px; align-items: center; }
.sz-head { color: #6b7280; font-size: 12px; padding: 4px 6px; }
.sz-row  { padding: 8px 6px; border-top: 1px solid var(--line, #e5e7eb); }
.sz-row:first-of-type { border-top: none; }
.task a { color: #036eb7; text-decoration: none; }
.task a:hover { text-decoration: underline; }
.due { color: #6b7280; font-feature-settings: "tnum"; }
.badge { display:inline-flex; align-items:center; justify-content:center; height: 24px; padding: 0 10px; border-radius: 9999px; font-size: 12px; font-weight: 700; }
.st-inprogress { background: #e0f2fe; color: #0369a1; }
.st-done       { background: #dcfce7; color: #166534; }
.st-hold       { background: #f3f4f6; color: #374151; }
.st-late       { background: #fee2e2; color: #991b1b; }
.bar { position: relative; background: #f3f4f6; height: 10px; border-radius: 6px; overflow: hidden; }
.bar > i { position:absolute; inset:0; width: var(--w,0%); background: linear-gradient(90deg,#036eb7,#0ea5e9); }
.pct { margin-left: 8px; font-size: 12px; color:#374151; font-feature-settings: "tnum"; }
.compact .sz-row { padding: 6px 4px; }
.compact .sz-head { padding: 2px 4px; }
.compact .badge { height: 22px; font-size: 11px; }

/* 大項目と小項目の視覚差 */
.group-row { background: #f8fafc; font-weight: 800; border-top: 2px solid var(--line, #e5e7eb); }
.sub-row .task { display:flex; align-items:center; gap:8px; }
.sub-row .dot { width:6px; height:6px; border-radius:9999px; background:#9ca3af; display:inline-block; }
.sub-row .task-title { font-weight: 600; }
/* 折りたたみ */
.sz-group { margin: 0; padding: 0; }
.sz-group summary { list-style: none; cursor: pointer; }
.sz-group summary::-webkit-details-marker { display: none; }
.sz-group summary { display: grid; grid-template-columns: 1fr 220px 110px 120px; gap: 8px; align-items: center; }
.chev { width: 12px; height: 12px; transform: rotate(0deg); transition: transform .2s ease; }
.sz-group[open] .chev { transform: rotate(90deg); }
`;

const sample = [
  {
    id: 'newcom', title: 'newcom07.jp', percent: 80, status: '進行中', due: '2026-02-14', href: '#gyomu-newcom',
    children: [
      { id: 'newcom-plan',  title: 'SFA',          percent: 100, status: '完了',   due: '2026-01-10' },
      { id: 'newcom-make',  title: 'MES',          percent: 80,  status: '進行中', due: '2026-02-10' },
      { id: 'newcom-open',  title: 'QMS',          percent: 60,  status: '進行中', due: '2026-02-14' },
      { id: 'newcom-backup',title: 'バックアップ作業', percent: 0,   status: '保留', due: '2026/01/23' },
    ],
  },
  
];

const badgeClass = (st) => {
  switch (st) {
    case '完了': return 'badge st-done';
    case '保留': return 'badge st-hold';
    case '遅延': return 'badge st-late';
    default:     return 'badge st-inprogress';
  }
};

function Sinchoku({ title = '進捗状況', items = sample, compact = false }) {
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
    <section className={`sinchoku-card ${compact ? 'compact' : ''}`} aria-label="進捗状況" style={tableWidth ? { width: tableWidth + 'px' } : undefined}>
      <h2 className="sinchoku-title">{title}</h2>
      <div className="sz-head">
        <div>業務</div>
        <div>進捗</div>
        <div>状態</div>
        <div>期限</div>
      </div>
      {(items || []).map((it) => (
        <details className="sz-group" key={it.id}>
          <summary className="sz-row group-row">
            <div className="task" style={{display:'flex', alignItems:'center', gap:'8px'}}>
              <svg className="chev" viewBox="0 0 24 24" fill="none"><path d="M8 5l8 7-8 7" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <span className="task-title">{it.title}</span>
            </div>
            <div style={{display:'flex', alignItems:'center'}}>
              <div className="bar" style={{'--w': `${Math.max(0, Math.min(100, it.percent ?? 0))}%`}}><i /></div>
              <span className="pct">{Math.max(0, Math.min(100, it.percent ?? 0))}%</span>
            </div>
            <div><span className={badgeClass(it.status)}>{it.status || '進行中'}</span></div>
            <div className="due">{it.due || '-'}</div>
          </summary>
          {(it.children || []).map((ch) => (
            <div key={ch.id} className="sz-row sub-row">
              <div className="task"><i className="dot" /><span className="task-title">{ch.title}</span></div>
              <div style={{display:'flex', alignItems:'center'}}>
                <div className="bar" style={{'--w': `${Math.max(0, Math.min(100, ch.percent ?? 0))}%`}}><i /></div>
                <span className="pct">{Math.max(0, Math.min(100, ch.percent ?? 0))}%</span>
              </div>
              <div><span className={badgeClass(ch.status)}>{ch.status || '進行中'}</span></div>
              <div className="due">{ch.due || '-'}</div>
            </div>
          ))}
        </details>
      ))}
      <style>{styles}</style>
    </section>
  );
}

export default Sinchoku;
