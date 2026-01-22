import React from 'react';

// 業務一覧のプレースホルダーコンポーネント
// - props.items: { id:string|number, title:string, note?:string }[]
// - props.title: 見出しテキスト（省略時は"業務一覧"）
// - props.compact: 行間を詰めるか（01_header.jsx から注入される想定）

const styles = `
.gyomu-card { 
  background: var(--surface, #fff);
  color: var(--ink, #111);
  border: 1px solid var(--line, #e5e7eb);
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(2,6,23,.06);
  padding: 20px 22px;
  min-width: 320px;
}
.gyomu-title {
  font-weight: 800; font-size: 18px; text-align: center; margin: 4px 0 12px;
}
.gyomu-list { list-style: none; margin: 0; padding: 0; }
.gyomu-item { 
  display: flex; align-items: center; justify-content: space-between;
  padding: 10px 8px; border-top: 1px solid var(--line, #e5e7eb);
}
.gyomu-item:first-child { border-top: none; }
.gyomu-item-title { font-weight: 600; }
.gyomu-item-note  { color: #6b7280; font-size: 12px; margin-left: 12px; }
.gyomu-compact .gyomu-item { padding: 6px 6px; }
`;

function Gyomu({ title = '業務一覧', items = [], compact = false }) {
  const sample = [
    { id: 1, title: 'サンプル業務A', note: 'プレースホルダー' },
    { id: 2, title: 'サンプル業務B' },
    { id: 3, title: 'サンプル業務C', note: '任意の補足' },
  ];
  const data = items.length ? items : sample;

  return (
    <section className={`gyomu-card ${compact ? 'gyomu-compact' : ''}`} aria-label="業務一覧セクション">
      <h2 className="gyomu-title">{title}</h2>
      <ul className="gyomu-list">
        {data.map((it) => (
          <li key={it.id} className="gyomu-item">
            <span className="gyomu-item-title">{it.title}</span>
            {it.note ? <span className="gyomu-item-note">{it.note}</span> : null}
          </li>
        ))}
      </ul>
      <style>{styles}</style>
    </section>
  );
}

export default Gyomu;

