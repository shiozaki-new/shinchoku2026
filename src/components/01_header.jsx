import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

const headerStyles = `
.hoshitori-root * { margin: 0; padding: 0; box-sizing: border-box; }
.hoshitori-root {
  --surface: #ffffff;
  --ink: #111827; /* gray-900 */
  --muted: #6b7280; /* gray-500 */
  --line: #e5e7eb; /* gray-200 */
  --accent: #036eb7; /* brand blue */
  --category: #f3f4f6; /* gray-100 */
  --ok: #0ea5e9; /* sky-500 */
}
.hoshitori-shell { background: linear-gradient(180deg, #f9fafb, #eef2f7); min-height: 100vh; color: var(--ink); }
.toolbar { position: sticky; top: 0; z-index: 10; backdrop-filter: saturate(120%) blur(8px); background: rgba(255,255,255,.8); border-bottom: 1px solid var(--line); }
.toolbar .btn { display:inline-flex;align-items:center;gap:.5rem; height:36px; padding:0 .875rem; border-radius:9999px; font-weight:700; font-size:13px; color:#1f2937; border:1px solid #e5e7eb; background:#fff; box-shadow:0 1px 2px rgba(0,0,0,.04);} 
.toolbar .btn:hover { border-color:#d1d5db; }
.toolbar .btn.primary { background:#e6d226; border-color:#e1cb1f; }
.toolbar .btn.ghost { background:transparent; }
.toolbar .slider { accent-color: var(--accent); }
.viewport { 
  height: calc(100vh - 72px); 
  overflow: auto; 
  -webkit-overflow-scrolling: touch; 
  overscroll-behavior: contain; 
  /* 左右ガター（中央配置に調和する対称余白） */
  padding-left: clamp(16px, 3vw, 32px);
  padding-right: clamp(16px, 3vw, 32px);
}
.viewport-inner {
  display: flex;
  justify-content: center; /* 横方向センター */
  align-items: center;      /* 縦方向センター */
  min-width: 100%;
  min-height: 100%;
}
.scale-wrap { transform-origin: top left; }
.legend { color: var(--muted); font-size: 12px; }
.scaled-box { position: relative; }
`;

export default function Header({ children }) {
  const viewportRef = useRef(null);
  const contentRef = useRef(null);
  const scaledBoxRef = useRef(null);
  // baseScale: 画面に収めるための縮小率（<=1）
  const [baseScale, setBaseScale] = useState(1);
  // displayScale: 実際に適用する縮尺。初期値は「現在より2倍」。
  const [displayScale, setDisplayScale] = useState(2);
  const [autoFit, setAutoFit] = useState(true);
  const [compact, setCompact] = useState(true);
  const [fsEnabled, setFsEnabled] = useState(false);
  const [scaledW, setScaledW] = useState(null);
  const [scaledH, setScaledH] = useState(null);

  const recomputeScale = () => {
    if (!viewportRef.current || !contentRef.current) return;
    const vp = viewportRef.current;
    const el = contentRef.current;
    const freeW = vp.clientWidth - 16;
    const freeH = vp.clientHeight - 16;
    const scaleW = freeW / el.scrollWidth;
    const scaleH = freeH / el.scrollHeight;
    const next = Math.min(1, scaleW, scaleH);
    const clamped = Number(next.toFixed(3)) || 1;
    setBaseScale(clamped);
    if (autoFit) {
      // フィット時は常に現在の2倍で表示（はみ出しはスクロールで閲覧）
      setDisplayScale(Math.min(clamped * 2, 2));
    }
    // 計測用の拡大後サイズを更新（センタリング用）
    setScaledW(el.scrollWidth * (autoFit ? Math.min(clamped * 2, 2) : displayScale));
    setScaledH(el.scrollHeight * (autoFit ? Math.min(clamped * 2, 2) : displayScale));
  };

  useEffect(() => {
    if (!autoFit) return;
    recomputeScale();
    const onResize = () => recomputeScale();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [autoFit]);

  // 表示倍率が変わったら拡大後サイズを再算出
  useEffect(() => {
    if (!contentRef.current) return;
    const el = contentRef.current;
    setScaledW(el.scrollWidth * displayScale);
    setScaledH(el.scrollHeight * displayScale);
  }, [displayScale]);

  // スクロール位置を常に中央へ保つ
  const centerViewport = () => {
    const vp = viewportRef.current;
    const box = scaledBoxRef.current;
    if (!vp || !box) return;
    // パディング分を除いた実可視幅・高
    const cs = getComputedStyle(vp);
    const padL = parseFloat(cs.paddingLeft) || 0;
    const padR = parseFloat(cs.paddingRight) || 0;
    const padT = parseFloat(cs.paddingTop) || 0;
    const padB = parseFloat(cs.paddingBottom) || 0;
    const visibleW = vp.clientWidth - padL - padR;
    const visibleH = vp.clientHeight - padT - padB;
    const contentW = box.offsetWidth;
    const contentH = box.offsetHeight;
    const left = Math.max(0, padL + (contentW - visibleW) / 2);
    const top = Math.max(0, padT + (contentH - visibleH) / 2);
    vp.scrollTo({ left, top, behavior: 'auto' });
  };

  // 拡大後サイズ変化や倍率変更時に中央化
  useEffect(() => {
    // レイアウト反映後に実行
    const id = requestAnimationFrame(centerViewport);
    return () => cancelAnimationFrame(id);
  }, [scaledW, scaledH, displayScale]);

  // 初期マウント時に即同期（useEffectより先に走る）
  useLayoutEffect(() => {
    centerViewport();
  }, []);

  // scaled-box のサイズ変化を監視して常に中央へ
  useEffect(() => {
    const box = scaledBoxRef.current;
    if (!box) return;
    const ro = new ResizeObserver(() => {
      centerViewport();
    });
    ro.observe(box);
    return () => ro.disconnect();
  }, []);

  // フォント読み込み完了後にも再センタリング（幅が変わる可能性に対応）
  useEffect(() => {
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => centerViewport());
    }
    const onFs = () => centerViewport();
    document.addEventListener('fullscreenchange', onFs);
    return () => document.removeEventListener('fullscreenchange', onFs);
  }, []);

  // ウィンドウサイズ変更でも中央化を維持
  useEffect(() => {
    const onResize = () => centerViewport();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const toggleFullscreen = async () => {
    const root = document.documentElement;
    if (!document.fullscreenElement) {
      await root.requestFullscreen();
      setFsEnabled(true);
      setTimeout(() => recomputeScale(), 60);
    } else {
      await document.exitFullscreen();
      setFsEnabled(false);
      setTimeout(() => recomputeScale(), 60);
    }
  };

  // 子要素に compact プロップを注入（対応していれば行間が詰まる）
  const childrenWithProps = React.Children.map(children, (child) =>
    React.isValidElement(child) ? React.cloneElement(child, { compact }) : child
  );

  return (
    <div className="hoshitori-root hoshitori-shell">
      <div className="toolbar px-4 sm:px-6 py-3 flex flex-wrap items-center gap-2">
        <button className="btn primary" onClick={() => { setAutoFit(true); setTimeout(() => { recomputeScale(); requestAnimationFrame(centerViewport); }, 0); }}>画面にフィット(×2)</button>
        <button className="btn" onClick={() => { setAutoFit(false); setDisplayScale(1); requestAnimationFrame(centerViewport); }}>100%</button>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">縮尺</span>
          <input className="slider" type="range" min="0.5" max="2" step="0.01" value={displayScale} onChange={(e) => { setAutoFit(false); setDisplayScale(Number(e.target.value)); requestAnimationFrame(centerViewport); }} />
          <span className="text-sm tabular-nums text-gray-700">{Math.round(displayScale * 100)}%</span>
        </div>
        <button className="btn" onClick={() => setCompact(v => !v)}>{compact ? '標準行間' : 'コンパクト'}</button>
        <button className="btn ghost" onClick={toggleFullscreen}>{fsEnabled ? 'フルスクリーン解除' : 'フルスクリーン'}</button>
        <div className="ml-auto flex items-center gap-3 text-sm text-gray-500">
          <span className="hidden sm:inline">Legend:</span>
          <span className="legend">○ 担当あり</span>
        </div>
      </div>

      <div className="viewport" ref={viewportRef}>
        <div className="viewport-inner">
          <div className="scaled-box" ref={scaledBoxRef} style={{ width: scaledW ? `${scaledW}px` : undefined, height: scaledH ? `${scaledH}px` : undefined }}>
            <div className="scale-wrap" style={{ transform: `scale(${displayScale})` }}>
              <div ref={contentRef}>
                {childrenWithProps}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{headerStyles}</style>
    </div>
  );
}
