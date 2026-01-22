import{a as t}from"./index.BB7RSjL2.js";var H={exports:{}},D={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Y;function ks(){if(Y)return D;Y=1;var N=Symbol.for("react.transitional.element"),h=Symbol.for("react.fragment");function p(b,i,c){var d=null;if(c!==void 0&&(d=""+c),i.key!==void 0&&(d=""+i.key),"key"in i){c={};for(var o in i)o!=="key"&&(c[o]=i[o])}else c=i;return i=c.ref,{$$typeof:N,type:b,key:d,ref:i!==void 0?i:null,props:c}}return D.Fragment=h,D.jsx=p,D.jsxs=p,D}var V;function us(){return V||(V=1,H.exports=ks()),H.exports}var s=us();const gs=`
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
`;function Ns({compact:N=!0}){const h=t.useRef(null),[p,b]=t.useState(null),[i,c]=t.useState(null),d=o=>L=>{L.preventDefault();const x=document.getElementById(o);x&&x.scrollIntoView({behavior:"smooth",block:"center",inline:"nearest"})};return t.useEffect(()=>{const o=h.current;if(!o)return;const L=o.querySelectorAll("td.task-name");let x=0;L.forEach(M=>{const z=M.scrollWidth;z>x&&(x=z)});const W=Math.ceil(x+28),f=Math.max(220,Math.min(W,560));b(f);const S=()=>c(o.offsetWidth);S();const C=new ResizeObserver(S);return C.observe(o),window.addEventListener("resize",S),()=>{C.disconnect(),window.removeEventListener("resize",S)}},[]),s.jsx("div",{className:"hoshitori-outer",style:i?{width:i+"px"}:void 0,children:s.jsxs("div",{className:`hoshitori ${N?"compact":""}`,children:[s.jsx("h1",{children:"業務担当一覧表（星取表）2026 ─ 営業企画部"}),s.jsxs("table",{ref:h,children:[s.jsxs("colgroup",{children:[s.jsx("col",{className:"col-task-dyn",style:p?{width:`${p}px`}:void 0}),s.jsx("col",{className:"col-person",span:"4"})]}),s.jsx("thead",{children:s.jsxs("tr",{children:[s.jsx("th",{className:"col-task",children:"業務内容"}),s.jsx("th",{className:"col-person",children:"目黒"}),s.jsx("th",{className:"col-person",children:"梅本"}),s.jsx("th",{className:"col-person",children:"新留"}),s.jsx("th",{className:"col-person",children:"塩崎"})]})}),s.jsxs("tbody",{children:[s.jsx("tr",{className:"category-row",children:s.jsx("td",{colSpan:5,children:"1. 公開サイト"})}),s.jsxs("tr",{children:[s.jsx("td",{className:"task-name",children:"newcom07.jp"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark",children:"○"}),s.jsx("td",{className:"mark",children:"○"}),s.jsx("td",{className:"mark",children:s.jsx("a",{href:"#gyomu-newcom",onClick:d("gyomu-newcom"),children:"○"})})]}),s.jsxs("tr",{children:[s.jsx("td",{className:"task-name",children:"ニューコム（英語）"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark",children:"○"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark"})]}),s.jsxs("tr",{children:[s.jsx("td",{className:"task-name",children:"dbsheet.jp"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark",children:"○"}),s.jsx("td",{className:"mark",children:s.jsx("a",{href:"#gyomu-dbsheet",onClick:d("gyomu-dbsheet"),children:"○"})})]}),s.jsxs("tr",{children:[s.jsx("td",{className:"task-name",children:"dbSheetClient（英語）"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark",children:"○"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark"})]}),s.jsxs("tr",{children:[s.jsx("td",{className:"task-name",children:"pegamore.com"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark",children:s.jsx("a",{href:"#gyomu-pegamore",onClick:d("gyomu-pegamore"),children:"○"})})]}),s.jsxs("tr",{children:[s.jsx("td",{className:"task-name",children:"電気制御設計支援"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark",children:"○"}),s.jsx("td",{className:"mark"})]}),s.jsxs("tr",{children:[s.jsx("td",{className:"task-name",children:"SIソリューション"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark",children:"○"}),s.jsx("td",{className:"mark",children:"○"}),s.jsx("td",{className:"mark"})]}),s.jsxs("tr",{children:[s.jsx("td",{className:"task-name",children:"ドメイン管理"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark",children:s.jsx("a",{href:"#gyomu-domain",onClick:d("gyomu-domain"),children:"○"})})]}),s.jsxs("tr",{children:[s.jsx("td",{className:"task-name",children:"SSL管理"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark",children:s.jsx("a",{href:"#gyomu-ssl",onClick:d("gyomu-ssl"),children:"○"})})]}),s.jsxs("tr",{children:[s.jsx("td",{className:"task-name",children:"契約サーバー管理"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark",children:s.jsx("a",{href:"#gyomu-servers",onClick:d("gyomu-servers"),children:"○"})})]}),s.jsx("tr",{className:"category-row",children:s.jsx("td",{colSpan:5,children:"2. ブログサイト"})}),s.jsxs("tr",{children:[s.jsx("td",{className:"task-name",children:"dbSheetClient千夜一夜"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark",children:"○"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark"})]}),s.jsxs("tr",{children:[s.jsx("td",{className:"task-name",children:"Excel（エクセル）コーヒー ブレイク"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark",children:"○"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark"})]}),s.jsxs("tr",{children:[s.jsx("td",{className:"task-name",children:"DB＆SQL技術ブログ"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark",children:"○"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark"})]}),s.jsxs("tr",{children:[s.jsx("td",{className:"task-name",children:"dbSheetClient情報ブログ"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark",children:"○"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark"})]}),s.jsx("tr",{className:"category-row",children:s.jsx("td",{colSpan:5,children:"3. 個別サイト"})}),s.jsxs("tr",{children:[s.jsx("td",{className:"task-name",children:"dbSheetClientテクニカルフォーラム"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark",children:"○"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark"})]}),s.jsxs("tr",{children:[s.jsx("td",{className:"task-name",children:"dbSheetClientテクニカルフォーラム アカウント管理"}),s.jsx("td",{className:"mark",children:"○"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark"})]}),s.jsxs("tr",{children:[s.jsx("td",{className:"task-name",children:"dbSheet e-ラーニング"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark",children:"○"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark"})]}),s.jsxs("tr",{children:[s.jsx("td",{className:"task-name",children:"dbSheet e-ラーニング アカウント管理"}),s.jsx("td",{className:"mark",children:"○"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark"})]}),s.jsxs("tr",{children:[s.jsx("td",{className:"task-name",children:"Facebook"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark",children:"○"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark"})]}),s.jsxs("tr",{children:[s.jsx("td",{className:"task-name",children:"twitter（X）"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark",children:"○"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark"})]}),s.jsxs("tr",{children:[s.jsx("td",{className:"task-name",children:"dbSheetClient社内フォーラム"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark",children:"○"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark"})]}),s.jsx("tr",{className:"category-row",children:s.jsx("td",{colSpan:5,children:"4. 外部サイト（無料）"})}),s.jsxs("tr",{children:[s.jsx("td",{className:"task-name",children:"イプロス"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark",children:"○"}),s.jsx("td",{className:"mark"})]}),s.jsxs("tr",{children:[s.jsx("td",{className:"task-name",children:"アぺルザ"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark",children:"○"}),s.jsx("td",{className:"mark"})]}),s.jsxs("tr",{children:[s.jsx("td",{className:"task-name",children:"シーラベル"}),s.jsx("td",{className:"mark",children:"○"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark"})]}),s.jsx("tr",{className:"category-row",children:s.jsx("td",{colSpan:5,children:"5. 外部契約サイト（有料）"})}),s.jsxs("tr",{children:[s.jsx("td",{className:"task-name",children:"帝国データバンク"}),s.jsx("td",{className:"mark",children:"○"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark"})]}),s.jsx("tr",{className:"category-row",children:s.jsx("td",{colSpan:5,children:"6. Google Ads"})}),s.jsxs("tr",{children:[s.jsx("td",{className:"task-name",children:"dbSheetClient"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark",children:s.jsx("a",{href:"#gyomu-ads",onClick:d("gyomu-ads"),children:"○"})})]}),s.jsx("tr",{className:"category-row",children:s.jsx("td",{colSpan:5,children:"7. 個別業務"})}),s.jsxs("tr",{children:[s.jsx("td",{className:"task-name",children:"ユーザー事例取材・原稿作成"}),s.jsx("td",{className:"mark",children:"○"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark"})]}),s.jsxs("tr",{children:[s.jsx("td",{className:"task-name",children:"展示会出展（全般）"}),s.jsx("td",{className:"mark",children:"○"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark"})]}),s.jsxs("tr",{children:[s.jsx("td",{className:"task-name",children:"配布物作成"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark",children:"○"}),s.jsx("td",{className:"mark",children:s.jsx("a",{href:"#gyomu-catalog",onClick:d("gyomu-catalog"),children:"○"})})]}),s.jsxs("tr",{children:[s.jsx("td",{className:"task-name",children:"カタログ・パンフレット入稿"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark"})]}),s.jsxs("tr",{children:[s.jsx("td",{className:"task-name",children:"セミナー開催・内容日程調整"}),s.jsx("td",{className:"mark",children:"○"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark"})]}),s.jsxs("tr",{children:[s.jsx("td",{className:"task-name",children:"セミナー録画・編集・開催"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark"})]}),s.jsxs("tr",{children:[s.jsx("td",{className:"task-name",children:"製品リリース"}),s.jsx("td",{className:"mark",children:"○"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark"})]}),s.jsxs("tr",{children:[s.jsx("td",{className:"task-name",children:"ISMSセキュリティ委員"}),s.jsx("td",{className:"mark",children:"○"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark"})]}),s.jsxs("tr",{children:[s.jsx("td",{className:"task-name",children:"データ管理"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark",children:"○"}),s.jsx("td",{className:"mark"})]}),s.jsxs("tr",{children:[s.jsx("td",{className:"task-name",children:"Zohoシステム（メール配信）"}),s.jsx("td",{className:"mark",children:"○"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark"})]}),s.jsxs("tr",{children:[s.jsx("td",{className:"task-name",children:"外部セミナー、ユーザ会開催（全般）"}),s.jsx("td",{className:"mark",children:"○"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark"})]}),s.jsxs("tr",{children:[s.jsx("td",{className:"task-name",children:"動画製作"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark",children:s.jsx("a",{href:"#gyomu-movie",onClick:d("gyomu-movie"),children:"○"})})]}),s.jsxs("tr",{children:[s.jsx("td",{className:"task-name",children:"Webページ（成果につながる取組み・数値管理）"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark"})]}),s.jsx("tr",{className:"category-row",children:s.jsx("td",{colSpan:5,children:"8. 有料サイト・ツール（年契約）"})}),s.jsxs("tr",{children:[s.jsx("td",{className:"task-name",children:"Adobeツール"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark",children:s.jsx("a",{href:"#gyomu-adobe",onClick:d("gyomu-adobe"),children:"○"})})]}),s.jsxs("tr",{children:[s.jsx("td",{className:"task-name",children:"Vimeo"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark",children:"○"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark"})]}),s.jsxs("tr",{children:[s.jsx("td",{className:"task-name",children:"フォーラム｜メールシステム"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark",children:"○"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark"})]}),s.jsxs("tr",{children:[s.jsx("td",{className:"task-name",children:"Zohoシステム"}),s.jsx("td",{className:"mark",children:"○"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark"})]}),s.jsxs("tr",{children:[s.jsx("td",{className:"task-name",children:"Zoom"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark"})]}),s.jsx("tr",{className:"category-row",children:s.jsx("td",{colSpan:5,children:"9. 必要スキル"})}),s.jsxs("tr",{children:[s.jsx("td",{className:"task-name",children:"Webコーディング（HTML）"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark",children:"○"}),s.jsx("td",{className:"mark",children:"○"}),s.jsx("td",{className:"mark",children:"○"})]}),s.jsxs("tr",{children:[s.jsx("td",{className:"task-name",children:"Webコーディング（CSS）"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark",children:"○"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark",children:"○"})]}),s.jsxs("tr",{children:[s.jsx("td",{className:"task-name",children:"Webコーディング（WordPress）"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark",children:"○"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark",children:"○"})]}),s.jsxs("tr",{children:[s.jsx("td",{className:"task-name",children:"Webプログラミング（JavaScript）"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark",children:"○"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark"})]}),s.jsxs("tr",{children:[s.jsx("td",{className:"task-name",children:"Webプログラミング（PHP）"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark",children:"○"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark"})]}),s.jsxs("tr",{children:[s.jsx("td",{className:"task-name",children:".htaccessファイルの設定"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark",children:"○"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark",children:"○"})]}),s.jsxs("tr",{children:[s.jsx("td",{className:"task-name",children:"データベース（mysql）の基礎知識"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark",children:"○"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark",children:"○"})]}),s.jsxs("tr",{children:[s.jsx("td",{className:"task-name",children:"Adobe各種ツール"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark",children:"○"}),s.jsx("td",{className:"mark",children:"○"}),s.jsx("td",{className:"mark",children:"○"})]}),s.jsxs("tr",{children:[s.jsx("td",{className:"task-name",children:"Zoho CRM操作・運用"}),s.jsx("td",{className:"mark",children:"○"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark"})]}),s.jsxs("tr",{children:[s.jsx("td",{className:"task-name",children:"Zoho Campaigns操作・運用"}),s.jsx("td",{className:"mark",children:"○"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark"})]}),s.jsxs("tr",{children:[s.jsx("td",{className:"task-name",children:"Zoho SalesIQ操作・運用"}),s.jsx("td",{className:"mark",children:"○"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark"})]}),s.jsxs("tr",{children:[s.jsx("td",{className:"task-name",children:"進捗管理/納期管理"}),s.jsx("td",{className:"mark",children:"○"}),s.jsx("td",{className:"mark"}),s.jsx("td",{className:"mark",children:"○"}),s.jsx("td",{className:"mark"})]})]})]}),s.jsx("style",{children:gs})]})})}const bs={apiKey:"AIzaSyC1cVgoBleKcvXU3Z1G0FNY8JlL72pNP-c",authDomain:"kikakugyoumu-907d6.firebaseapp.com",projectId:"kikakugyoumu-907d6",storageBucket:"kikakugyoumu-907d6.firebasestorage.app",messagingSenderId:"259870871782",appId:"1:259870871782:web:6cad7ff451d8cb5fdd6b27"};let I=null,g=null,E=null;const P=[{id:"newcom07",title:"newcom07.jp",category:"公開サイト",children:[{id:"newcom-sfa",title:"SFA",progress:80,status:"進行中",deadline:"2026/02/14"},{id:"newcom-mes",title:"MES",progress:80,status:"進行中",deadline:"2026/02/14"},{id:"newcom-qms",title:"QMS",progress:80,status:"進行中",deadline:"2026/02/14"}]},{id:"domain-update",title:"ドメイン更新作業",category:"インフラ管理",children:[{id:"domain-newcom",title:"newcom07.jp",progress:100,status:"完了",deadline:"2026/01/15"}]},{id:"ssl-update",title:"SSL更新作業",category:"インフラ管理",children:[{id:"ssl-newcom",title:"newcom07.jp",progress:100,status:"完了",deadline:"2026/01/15"},{id:"ssl-dbsheet",title:"dbsheetclient.jp",progress:100,status:"完了",deadline:"2026/01/15"}]}],_=["公開サイト","ブログサイト","個別サイト","外部サイト","広告","個別業務","有料ツール","インフラ管理","その他"],X=["進行中","完了","保留","未着手","承認待ち"],K=`
:root {
  --bg-primary: #ffffff;
  --bg-secondary: #f5f5f7;
  --text-primary: #1d1d1f;
  --text-secondary: #6e6e73;
  --border-color: #d2d2d7;
  --accent-blue: #0071e3;
  --accent-blue-hover: #0077ed;
  --shadow-sm: 0 2px 8px rgba(0,0,0,0.04);
  --shadow-md: 0 4px 16px rgba(0,0,0,0.08);
  --shadow-lg: 0 8px 32px rgba(0,0,0,0.12);
  --status-progress: #0071e3;
  --status-done: #34c759;
  --status-hold: #8e8e93;
  --status-pending: #ff9500;
  --risk-high: #ff3b30;
  --risk-medium: #ff9500;
  --risk-low: #34c759;
  --risk-none: #8e8e93;
}

[data-theme="dark"] {
  --bg-primary: #1c1c1e;
  --bg-secondary: #000000;
  --text-primary: #f5f5f7;
  --text-secondary: #98989d;
  --border-color: #38383a;
  --shadow-sm: 0 2px 8px rgba(0,0,0,0.3);
  --shadow-md: 0 4px 16px rgba(0,0,0,0.4);
  --shadow-lg: 0 8px 32px rgba(0,0,0,0.5);
}

* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display",
               "Helvetica Neue", "Hiragino Kaku Gothic ProN", "Hiragino Sans",
               "Meiryo", sans-serif;
  background: var(--bg-secondary);
  color: var(--text-primary);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  transition: background 0.3s ease, color 0.3s ease;
}

.dashboard {
  min-height: 100vh;
  padding: 24px;
  max-width: 1400px;
  margin: 0 auto;
}

/* ============================================================================
 * HEADER
 * ========================================================================== */
.header {
  background: var(--bg-primary);
  border-radius: 18px;
  padding: 32px 40px;
  margin-bottom: 24px;
  box-shadow: var(--shadow-sm);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid var(--border-color);
}

.header-info h1 {
  font-size: 28px;
  font-weight: 700;
  letter-spacing: -0.5px;
  margin-bottom: 4px;
  color: var(--text-primary);
}

.header-info .subtitle {
  color: var(--text-secondary);
  font-size: 14px;
  font-weight: 500;
}

.header-actions {
  display: flex;
  gap: 12px;
  align-items: center;
}

.btn {
  padding: 10px 20px;
  border-radius: 980px;
  border: none;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
}

.btn-primary {
  background: var(--accent-blue);
  color: white;
}

.btn-primary:hover {
  background: var(--accent-blue-hover);
  transform: scale(1.02);
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.btn-secondary {
  background: var(--bg-secondary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
}

.btn-secondary:hover {
  background: var(--border-color);
}

.btn-danger {
  background: var(--risk-high);
  color: white;
}

.btn-danger:hover {
  background: #ff1f14;
}

.btn-small {
  padding: 6px 14px;
  font-size: 12px;
}

.theme-toggle {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  font-size: 20px;
}

.theme-toggle:hover {
  transform: scale(1.1);
  background: var(--border-color);
}

.kpi-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.kpi-card {
  background: var(--bg-primary);
  border-radius: 16px;
  padding: 24px;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
}

.kpi-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}

.kpi-label {
  font-size: 13px;
  color: var(--text-secondary);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
}

.kpi-value {
  font-size: 48px;
  font-weight: 700;
  letter-spacing: -1px;
  color: var(--accent-blue);
}

.kpi-sublabel {
  font-size: 12px;
  color: var(--text-secondary);
  margin-top: 4px;
}

.section {
  background: var(--bg-primary);
  border-radius: 18px;
  padding: 32px;
  margin-bottom: 24px;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border-color);
}

.section-title {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 20px;
  letter-spacing: -0.3px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--text-primary);
}

.priority-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.priority-card {
  background: var(--bg-secondary);
  border-radius: 12px;
  padding: 16px 20px;
  border-left: 4px solid transparent;
  transition: all 0.2s ease;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.priority-card:hover {
  transform: translateX(4px);
  box-shadow: var(--shadow-sm);
}

.priority-card.risk-high { border-left-color: var(--risk-high); }
.priority-card.risk-medium { border-left-color: var(--risk-medium); }
.priority-card.risk-low { border-left-color: var(--risk-low); }

.priority-info h3 {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 4px;
  color: var(--text-primary);
}

.priority-meta {
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: var(--text-secondary);
}

.priority-stats {
  display: flex;
  gap: 12px;
  align-items: center;
}

.progress-ring {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: conic-gradient(
    var(--accent-blue) calc(var(--progress) * 1%),
    var(--border-color) 0
  );
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  position: relative;
}

.progress-ring::before {
  content: '';
  position: absolute;
  width: 32px;
  height: 32px;
  background: var(--bg-primary);
  border-radius: 50%;
}

.progress-ring span {
  position: relative;
  z-index: 1;
  color: var(--text-primary);
}

.badge {
  padding: 4px 12px;
  border-radius: 980px;
  font-size: 12px;
  font-weight: 600;
  display: inline-block;
}

.badge-progress { background: rgba(0,113,227,0.1); color: var(--status-progress); }
.badge-done { background: rgba(52,199,89,0.1); color: var(--status-done); }
.badge-hold { background: rgba(142,142,147,0.1); color: var(--status-hold); }
.badge-pending { background: rgba(255,149,0,0.1); color: var(--status-pending); }

.filters {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.filter-btn, .search-box {
  padding: 8px 16px;
  border-radius: 980px;
  border: 1px solid var(--border-color);
  background: var(--bg-secondary);
  color: var(--text-primary);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
}

.filter-btn:hover {
  background: var(--border-color);
}

.filter-btn.active {
  background: var(--accent-blue);
  color: white;
  border-color: var(--accent-blue);
}

.search-box {
  flex: 1;
  min-width: 200px;
}

.search-box:focus {
  outline: none;
  border-color: var(--accent-blue);
}

.task-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 8px;
}

.task-row {
  background: var(--bg-secondary);
  transition: all 0.2s ease;
  cursor: pointer;
}

.task-row:hover {
  transform: scale(1.01);
  box-shadow: var(--shadow-sm);
}

.task-row td {
  padding: 16px;
  font-size: 14px;
  color: var(--text-primary);
}

.task-row td:first-child {
  border-radius: 12px 0 0 12px;
}

.task-row td:last-child {
  border-radius: 0 12px 12px 0;
}

.task-name {
  font-weight: 600;
}

.task-actions {
  display: flex;
  gap: 8px;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.task-row:hover .task-actions {
  opacity: 1;
}

.progress-bar-container {
  width: 100%;
  height: 8px;
  background: var(--border-color);
  border-radius: 980px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, var(--accent-blue), #00a8e8);
  border-radius: 980px;
  transition: width 0.3s ease;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.6);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modal {
  background: var(--bg-primary);
  border-radius: 20px;
  padding: 32px;
  max-width: 90vw;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: var(--shadow-lg);
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.hoshitori-modal-content {
  width: fit-content;
  margin: 0 auto;
}

.hoshitori-modal-content table {
  width: auto !important;
  margin: 0 auto;
}

.modal h2 {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 24px;
  color: var(--text-primary);
}

.modal-close {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: var(--bg-secondary);
  color: var(--text-primary);
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.modal-close:hover {
  background: var(--border-color);
  transform: scale(1.1);
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--text-secondary);
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  background: var(--bg-secondary);
  color: var(--text-primary);
  font-size: 14px;
  font-family: inherit;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--accent-blue);
}

.form-group textarea {
  resize: vertical;
  min-height: 80px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.modal-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
}

.subtask-list {
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 16px;
  background: var(--bg-secondary);
}

.subtask-item {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr auto;
  gap: 12px;
  margin-bottom: 12px;
  align-items: center;
}

.subtask-item:last-child {
  margin-bottom: 0;
}

.subtask-item input,
.subtask-item select {
  padding: 8px 12px;
  font-size: 13px;
}

/* 星取表モーダル専用スタイル */
.hoshitori-modal-content {
  max-height: 70vh;
  overflow: auto;
}

@media (max-width: 768px) {
  .dashboard {
    padding: 16px;
  }

  .header {
    flex-direction: column;
    gap: 16px;
    padding: 24px;
  }

  .kpi-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .kpi-value {
    font-size: 36px;
  }

  .section {
    padding: 20px;
  }

  .filters {
    flex-direction: column;
  }

  .search-box {
    width: 100%;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .subtask-item {
    grid-template-columns: 1fr;
  }

  .modal {
    width: 95%;
    padding: 24px;
  }
}
`;function ys(){const[N,h]=t.useState([]),[p,b]=t.useState("light"),[i,c]=t.useState(!1),[d,o]=t.useState(null),[L,x]=t.useState(!1),[W,f]=t.useState(!1),[S,C]=t.useState(!1),[M,z]=t.useState(null),[ss,B]=t.useState(!0),[$,q]=t.useState(""),[J,O]=t.useState(""),[A,es]=t.useState("全て"),[y,as]=t.useState("全て"),[F,rs]=t.useState(""),[T,ts]=t.useState("deadline-asc"),[m,v]=t.useState({title:"",category:_[0],children:[]});t.useEffect(()=>{(async()=>{let a=0;for(;typeof window.firebase>"u"&&a<50;)await new Promise(r=>setTimeout(r,100)),a++;if(typeof window.firebase>"u"){console.warn("Firebase SDK not loaded. Using local mode."),h(P),B(!1);return}try{I=window.firebase,I.apps.length||I.initializeApp(bs),g=I.firestore(),E=I.auth(),E.onAuthStateChanged(l=>{o(l)});const r=g.collection("tasks").onSnapshot(l=>{if(l.empty)P.forEach(u=>{g.collection("tasks").doc(u.id).set(u)}),h(P);else{const u=l.docs.map(n=>({id:n.id,...n.data()}));h(u)}B(!1)});return()=>r()}catch(r){console.error("Firebase initialization error:",r),h(P),B(!1)}})()},[]),t.useEffect(()=>{const e=window.matchMedia("(prefers-color-scheme: dark)");b(e.matches?"dark":"light");const a=r=>b(r.matches?"dark":"light");return e.addEventListener("change",a),()=>e.removeEventListener("change",a)},[]),t.useEffect(()=>{document.documentElement.setAttribute("data-theme",p)},[p]);const ls=()=>{b(e=>e==="light"?"dark":"light")},ds=async()=>{if(!E){alert("Firebase が読み込まれていません。ページをリロードしてください。");return}try{await E.signInWithEmailAndPassword($,J),x(!1),q(""),O("")}catch(e){alert("ログインに失敗しました: "+e.message)}},ns=async()=>{E&&(await E.signOut(),c(!1))},j=e=>{if(!e)return null;const a=new Date,r=new Date(e.replace(/\//g,"-"));return Math.ceil((r-a)/(1e3*60*60*24))},is=(e,a,r)=>{if(r==="完了")return"none";const l=j(e);return l===null?"none":l<=5&&a<80||l<=10&&a<50||r==="保留"&&l<=14?"high":l<=15&&a<30?"medium":"low"},Z=e=>e===null?"var(--text-secondary)":e<=5?"var(--risk-high)":e<=10?"var(--risk-medium)":e<=15?"var(--risk-low)":"var(--risk-none)",k=t.useMemo(()=>{const e=[];return N.forEach(a=>{a.children?.forEach(r=>{e.push({...r,parentTitle:a.title,category:a.category,parentId:a.id})})}),e},[N]),w=t.useMemo(()=>{const e=k.filter(n=>n.status==="進行中").length,a=k.filter(n=>n.status==="完了").length,r=k.filter(n=>n.status==="保留").length,u=k.filter(n=>n.deadline&&n.status!=="完了").map(n=>({...n,daysLeft:j(n.deadline)})).filter(n=>n.daysLeft!==null).sort((n,js)=>n.daysLeft-js.daysLeft)[0];return{inProgress:e,done:a,hold:r,nextDeadline:u}},[k]),G=t.useMemo(()=>k.filter(e=>e.status!=="完了").map(e=>({...e,daysLeft:j(e.deadline),risk:is(e.deadline,e.progress,e.status)})).filter(e=>e.daysLeft!==null).sort((e,a)=>{const r={high:0,medium:1,low:2,none:3};return r[e.risk]!==r[a.risk]?r[e.risk]-r[a.risk]:e.daysLeft-a.daysLeft}).slice(0,5),[k]),Q=t.useMemo(()=>{let e=[...k];if(A!=="全て"&&(e=e.filter(a=>a.status===A)),y!=="全て"&&(e=e.filter(a=>{const r=j(a.deadline);return y==="7日以内"?r!==null&&r<=7:y==="14日以内"?r!==null&&r<=14:y==="30日以内"?r!==null&&r<=30:y==="期限なし"?r===null:!0})),F){const a=F.toLowerCase();e=e.filter(r=>r.title.toLowerCase().includes(a)||r.parentTitle.toLowerCase().includes(a))}return e.sort((a,r)=>{if(T==="deadline-asc"){const l=j(a.deadline)??9999,u=j(r.deadline)??9999;return l-u}if(T==="deadline-desc"){const l=j(a.deadline)??-9999;return(j(r.deadline)??-9999)-l}return T==="progress-asc"?a.progress-r.progress:T==="progress-desc"?r.progress-a.progress:0}),e},[k,A,y,F,T]),U=e=>`badge ${{進行中:"badge-progress",完了:"badge-done",保留:"badge-hold",未着手:"badge-pending",承認待ち:"badge-pending"}[e]||"badge-progress"}`,cs=()=>{z(null),v({title:"",category:_[0],children:[{title:"",progress:0,status:"未着手",deadline:""}]}),f(!0)},os=e=>{const a=N.find(r=>r.id===e.parentId);z(a),v({...a}),f(!0)},ms=async()=>{if(!g||!d){alert("Firestore が利用できないか、ログインが必要です。");return}try{const e={...m,updatedAt:new Date().toISOString()};if(M)await g.collection("tasks").doc(M.id).update(e);else{const a=await g.collection("tasks").add({...e,createdAt:new Date().toISOString()});e.id=a.id}f(!1),z(null)}catch(e){alert("保存に失敗しました: "+e.message)}},xs=async e=>{if(!(!g||!d)&&confirm(`「${e.parentTitle}」を削除しますか？`))try{await g.collection("tasks").doc(e.parentId).delete()}catch(a){alert("削除に失敗しました: "+a.message)}},hs=()=>{v({...m,children:[...m.children,{title:"",progress:0,status:"未着手",deadline:""}]})},ps=e=>{v({...m,children:m.children.filter((a,r)=>r!==e)})},R=(e,a,r)=>{const l=[...m.children];l[e]={...l[e],[a]:r},v({...m,children:l})};return ss?s.jsxs(s.Fragment,{children:[s.jsx("style",{children:K}),s.jsx("div",{className:"dashboard",style:{display:"flex",alignItems:"center",justifyContent:"center",minHeight:"100vh"},children:s.jsxs("div",{style:{textAlign:"center"},children:[s.jsx("div",{style:{fontSize:"48px",marginBottom:"16px"},children:"⏳"}),s.jsx("div",{style:{color:"var(--text-secondary)"},children:"読み込み中..."})]})})]}):s.jsxs(s.Fragment,{children:[s.jsx("style",{children:K}),s.jsxs("div",{className:"dashboard",children:[s.jsxs("header",{className:"header",children:[s.jsxs("div",{className:"header-info",children:[s.jsx("h1",{children:"担当業務ダッシュボード"}),s.jsxs("div",{className:"subtitle",children:["塩崎｜営業企画部｜最終更新: ",new Date().toLocaleString("ja-JP")]})]}),s.jsxs("div",{className:"header-actions",children:[s.jsx("button",{className:"btn btn-secondary",onClick:()=>C(!0),children:"📊 星取表を見る"}),d?s.jsxs(s.Fragment,{children:[s.jsx("button",{className:"btn btn-primary",onClick:()=>c(!i),children:i?"✓ 編集モード":"編集モード"}),s.jsx("button",{className:"btn btn-secondary",onClick:ns,children:"ログアウト"})]}):s.jsx("button",{className:"btn btn-primary",onClick:()=>x(!0),children:"ログイン"}),s.jsx("button",{className:"theme-toggle",onClick:ls,"aria-label":"テーマ切替",children:p==="light"?"🌙":"☀️"})]})]}),s.jsxs("div",{className:"kpi-grid",children:[s.jsxs("div",{className:"kpi-card",children:[s.jsx("div",{className:"kpi-label",children:"進行中"}),s.jsx("div",{className:"kpi-value",children:w.inProgress}),s.jsx("div",{className:"kpi-sublabel",children:"タスク"})]}),s.jsxs("div",{className:"kpi-card",children:[s.jsx("div",{className:"kpi-label",children:"完了"}),s.jsx("div",{className:"kpi-value",children:w.done}),s.jsx("div",{className:"kpi-sublabel",children:"タスク"})]}),s.jsxs("div",{className:"kpi-card",children:[s.jsx("div",{className:"kpi-label",children:"保留"}),s.jsx("div",{className:"kpi-value",children:w.hold}),s.jsx("div",{className:"kpi-sublabel",children:"タスク"})]}),s.jsxs("div",{className:"kpi-card",children:[s.jsx("div",{className:"kpi-label",children:"直近期限"}),s.jsx("div",{className:"kpi-value",style:{fontSize:"24px"},children:w.nextDeadline?w.nextDeadline.deadline:"-"}),s.jsx("div",{className:"kpi-sublabel",children:w.nextDeadline?`残り${w.nextDeadline.daysLeft}日`:"期限なし"})]})]}),s.jsxs("section",{className:"section",children:[s.jsx("div",{className:"section-title",children:s.jsx("span",{children:"優先タスク（期限が近い順 Top 5）"})}),s.jsx("div",{className:"priority-list",children:G.length===0?s.jsx("div",{style:{textAlign:"center",color:"var(--text-secondary)",padding:"40px"},children:"優先タスクはありません"}):G.map(e=>s.jsxs("div",{className:`priority-card risk-${e.risk}`,children:[s.jsxs("div",{className:"priority-info",children:[s.jsxs("h3",{children:[e.parentTitle," - ",e.title]}),s.jsxs("div",{className:"priority-meta",children:[s.jsxs("span",{style:{color:Z(e.daysLeft)},children:["残り",e.daysLeft,"日"]}),s.jsxs("span",{children:["期限: ",e.deadline]})]})]}),s.jsxs("div",{className:"priority-stats",children:[s.jsx("div",{className:"progress-ring",style:{"--progress":e.progress},children:s.jsxs("span",{children:[e.progress,"%"]})}),s.jsx("span",{className:U(e.status),children:e.status})]})]},e.id))})]}),s.jsxs("section",{className:"section",children:[s.jsxs("div",{className:"section-title",children:[s.jsx("span",{children:"進捗一覧"}),i&&s.jsx("button",{className:"btn btn-primary btn-small",onClick:cs,children:"+ 新規タスク"})]}),s.jsxs("div",{className:"filters",children:[s.jsxs("select",{className:"filter-btn",value:A,onChange:e=>es(e.target.value),children:[s.jsx("option",{children:"全て"}),X.map(e=>s.jsx("option",{children:e},e))]}),s.jsxs("select",{className:"filter-btn",value:y,onChange:e=>as(e.target.value),children:[s.jsx("option",{children:"全て"}),s.jsx("option",{children:"7日以内"}),s.jsx("option",{children:"14日以内"}),s.jsx("option",{children:"30日以内"})]}),s.jsxs("select",{className:"filter-btn",value:T,onChange:e=>ts(e.target.value),children:[s.jsx("option",{value:"deadline-asc",children:"期限 昇順"}),s.jsx("option",{value:"deadline-desc",children:"期限 降順"}),s.jsx("option",{value:"progress-asc",children:"進捗 昇順"}),s.jsx("option",{value:"progress-desc",children:"進捗 降順"})]}),s.jsx("input",{type:"text",className:"search-box",placeholder:"業務名で検索...",value:F,onChange:e=>rs(e.target.value)})]}),Q.length===0?s.jsx("div",{style:{textAlign:"center",color:"var(--text-secondary)",padding:"40px"},children:"該当するタスクがありません"}):s.jsx("table",{className:"task-table",children:s.jsx("tbody",{children:Q.map(e=>{const a=j(e.deadline);return s.jsxs("tr",{className:"task-row",children:[s.jsxs("td",{className:"task-name",children:[e.parentTitle," - ",e.title,i&&s.jsxs("div",{className:"task-actions",children:[s.jsx("button",{className:"btn btn-small btn-secondary",onClick:()=>os(e),children:"編集"}),s.jsx("button",{className:"btn btn-small btn-danger",onClick:()=>xs(e),children:"削除"})]})]}),s.jsxs("td",{style:{width:"200px"},children:[s.jsx("div",{className:"progress-bar-container",children:s.jsx("div",{className:"progress-bar",style:{width:`${e.progress}%`}})}),s.jsxs("div",{style:{fontSize:"12px",marginTop:"4px",color:"var(--text-secondary)"},children:[e.progress,"%"]})]}),s.jsx("td",{style:{width:"120px"},children:s.jsx("span",{className:U(e.status),children:e.status})}),s.jsxs("td",{style:{width:"150px",color:Z(a)},children:[e.deadline||"-",a!==null&&s.jsxs("div",{style:{fontSize:"12px",marginTop:"2px"},children:["残り",a,"日"]})]})]},e.id)})})})]})]}),S&&s.jsx("div",{className:"modal-overlay",onClick:()=>C(!1),children:s.jsxs("div",{className:"modal",onClick:e=>e.stopPropagation(),style:{position:"relative"},children:[s.jsx("button",{className:"modal-close",onClick:()=>C(!1),children:"×"}),s.jsx("h2",{children:"業務担当一覧表（星取表）"}),s.jsx("div",{className:"hoshitori-modal-content",children:s.jsx(Ns,{compact:!1})})]})}),L&&s.jsx("div",{className:"modal-overlay",onClick:()=>x(!1),children:s.jsxs("div",{className:"modal",onClick:e=>e.stopPropagation(),children:[s.jsx("h2",{children:"ログイン"}),s.jsxs("p",{style:{color:"var(--text-secondary)",marginBottom:"24px"},children:["編集権限が必要な場合のみログインしてください。",s.jsx("br",{}),"閲覧のみの場合はログイン不要です。"]}),s.jsxs("div",{className:"form-group",children:[s.jsx("label",{children:"メールアドレス"}),s.jsx("input",{type:"email",placeholder:"your@email.com",value:$,onChange:e=>q(e.target.value)})]}),s.jsxs("div",{className:"form-group",children:[s.jsx("label",{children:"パスワード"}),s.jsx("input",{type:"password",placeholder:"••••••••",value:J,onChange:e=>O(e.target.value)})]}),s.jsxs("div",{className:"modal-actions",children:[s.jsx("button",{className:"btn btn-secondary",onClick:()=>x(!1),children:"キャンセル"}),s.jsx("button",{className:"btn btn-primary",onClick:ds,children:"ログイン"})]})]})}),W&&s.jsx("div",{className:"modal-overlay",onClick:()=>f(!1),children:s.jsxs("div",{className:"modal",onClick:e=>e.stopPropagation(),children:[s.jsx("h2",{children:M?"タスク編集":"新規タスク"}),s.jsxs("div",{className:"form-group",children:[s.jsx("label",{children:"親タスク名"}),s.jsx("input",{type:"text",value:m.title,onChange:e=>v({...m,title:e.target.value}),placeholder:"例: newcom07.jp"})]}),s.jsxs("div",{className:"form-group",children:[s.jsx("label",{children:"カテゴリ"}),s.jsx("select",{value:m.category,onChange:e=>v({...m,category:e.target.value}),children:_.map(e=>s.jsx("option",{children:e},e))})]}),s.jsxs("div",{className:"form-group",children:[s.jsx("label",{children:"サブタスク"}),s.jsxs("div",{className:"subtask-list",children:[m.children.map((e,a)=>s.jsxs("div",{className:"subtask-item",children:[s.jsx("input",{type:"text",placeholder:"タスク名",value:e.title,onChange:r=>R(a,"title",r.target.value)}),s.jsx("input",{type:"number",placeholder:"進捗%",min:"0",max:"100",value:e.progress,onChange:r=>R(a,"progress",parseInt(r.target.value)||0)}),s.jsx("select",{value:e.status,onChange:r=>R(a,"status",r.target.value),children:X.map(r=>s.jsx("option",{children:r},r))}),s.jsx("input",{type:"date",value:e.deadline?.replace(/\//g,"-"),onChange:r=>R(a,"deadline",r.target.value.replace(/-/g,"/"))}),s.jsx("button",{className:"btn btn-danger btn-small",onClick:()=>ps(a),children:"×"})]},a)),s.jsx("button",{className:"btn btn-secondary btn-small",onClick:hs,style:{marginTop:"12px"},children:"+ サブタスクを追加"})]})]}),s.jsxs("div",{className:"modal-actions",children:[s.jsx("button",{className:"btn btn-secondary",onClick:()=>f(!1),children:"キャンセル"}),s.jsx("button",{className:"btn btn-primary",onClick:ms,children:"保存"})]})]})})]})}export{ys as D,s as j};
