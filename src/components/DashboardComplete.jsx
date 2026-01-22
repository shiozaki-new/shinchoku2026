import React, { useState, useEffect, useMemo } from 'react';
import Hoshitori from './02_hoshitori.jsx';

/* ============================================================================
 * 🔥 FIREBASE 設定（FIREBASE_SETUP.md の Step 6 で取得した値に置き換えてください）
 * ========================================================================== */
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Firebase initialization (will be loaded from CDN)
let firebase = null;
let db = null;
let auth = null;

/* ============================================================================
 * 初期データ（Firestore に自動投入されます）
 * ========================================================================== */
const INITIAL_TASKS = [
  {
    id: "newcom07",
    title: "newcom07.jp",
    category: "公開サイト",
    children: [
      { id: "newcom-sfa", title: "SFA", progress: 80, status: "進行中", deadline: "2026/02/14" },
      { id: "newcom-mes", title: "MES", progress: 80, status: "進行中", deadline: "2026/02/14" },
      { id: "newcom-qms", title: "QMS", progress: 80, status: "進行中", deadline: "2026/02/14" }
    ]
  },
  {
    id: "domain-update",
    title: "ドメイン更新作業",
    category: "インフラ管理",
    children: [
      { id: "domain-newcom", title: "newcom07.jp", progress: 100, status: "完了", deadline: "2026/01/15" }
    ]
  },
  {
    id: "ssl-update",
    title: "SSL更新作業",
    category: "インフラ管理",
    children: [
      { id: "ssl-newcom", title: "newcom07.jp", progress: 100, status: "完了", deadline: "2026/01/15" },
      { id: "ssl-dbsheet", title: "dbsheetclient.jp", progress: 100, status: "完了", deadline: "2026/01/15" }
    ]
  }
];

const CATEGORIES = [
  "公開サイト",
  "ブログサイト",
  "個別サイト",
  "外部サイト",
  "広告",
  "個別業務",
  "有料ツール",
  "インフラ管理",
  "その他"
];

const STATUS_OPTIONS = ["進行中", "完了", "保留", "未着手", "承認待ち"];

/* ============================================================================
 * 🎨 Apple 風スタイル定義
 * ========================================================================== */
const styles = `
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
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: var(--shadow-lg);
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
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
`;

/* ============================================================================
 * 🎯 Main Dashboard Component
 * ========================================================================== */
function DashboardComplete() {
  const [tasks, setTasks] = useState([]);
  const [theme, setTheme] = useState('light');
  const [isEditMode, setIsEditMode] = useState(false);
  const [user, setUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showHoshitoriModal, setShowHoshitoriModal] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Filters
  const [statusFilter, setStatusFilter] = useState('全て');
  const [deadlineFilter, setDeadlineFilter] = useState('全て');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('deadline-asc');

  // Task form state
  const [taskForm, setTaskForm] = useState({
    title: '',
    category: CATEGORIES[0],
    children: []
  });

  // Initialize Firebase
  useEffect(() => {
    const loadFirebase = async () => {
      // Wait for Firebase to load
      let attempts = 0;
      while (typeof window.firebase === 'undefined' && attempts < 50) {
        await new Promise(resolve => setTimeout(resolve, 100));
        attempts++;
      }

      if (typeof window.firebase === 'undefined') {
        console.warn('Firebase SDK not loaded. Using local mode.');
        setTasks(INITIAL_TASKS);
        setIsLoading(false);
        return;
      }

      try {
        firebase = window.firebase;

        if (!firebase.apps.length) {
          firebase.initializeApp(firebaseConfig);
        }

        db = firebase.firestore();
        auth = firebase.auth();

        // Listen for auth state changes
        auth.onAuthStateChanged((user) => {
          setUser(user);
        });

        // Load tasks from Firestore
        const unsubscribe = db.collection('tasks').onSnapshot((snapshot) => {
          if (snapshot.empty) {
            // Initialize with default data
            INITIAL_TASKS.forEach(task => {
              db.collection('tasks').doc(task.id).set(task);
            });
            setTasks(INITIAL_TASKS);
          } else {
            const loadedTasks = snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            }));
            setTasks(loadedTasks);
          }
          setIsLoading(false);
        });

        return () => unsubscribe();
      } catch (error) {
        console.error('Firebase initialization error:', error);
        setTasks(INITIAL_TASKS);
        setIsLoading(false);
      }
    };

    loadFirebase();
  }, []);

  // Theme detection and toggle
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setTheme(mediaQuery.matches ? 'dark' : 'light');

    const handler = (e) => setTheme(e.matches ? 'dark' : 'light');
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Login/Logout handlers
  const handleLogin = async () => {
    if (!auth) {
      alert('Firebase が読み込まれていません。ページをリロードしてください。');
      return;
    }

    try {
      await auth.signInWithEmailAndPassword(email, password);
      setShowLoginModal(false);
      setEmail('');
      setPassword('');
    } catch (error) {
      alert('ログインに失敗しました: ' + error.message);
    }
  };

  const handleLogout = async () => {
    if (!auth) return;
    await auth.signOut();
    setIsEditMode(false);
  };

  // Calculate days remaining
  const getDaysRemaining = (deadline) => {
    if (!deadline) return null;
    const today = new Date();
    const deadlineDate = new Date(deadline.replace(/\//g, '-'));
    const diff = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));
    return diff;
  };

  // Get risk level
  const getRiskLevel = (deadline, progress, status) => {
    if (status === '完了') return 'none';

    const daysLeft = getDaysRemaining(deadline);
    if (daysLeft === null) return 'none';

    if (daysLeft <= 5 && progress < 80) return 'high';
    if (daysLeft <= 10 && progress < 50) return 'high';
    if (status === '保留' && daysLeft <= 14) return 'high';
    if (daysLeft <= 15 && progress < 30) return 'medium';

    return 'low';
  };

  // Get color for days remaining
  const getDaysColor = (days) => {
    if (days === null) return 'var(--text-secondary)';
    if (days <= 5) return 'var(--risk-high)';
    if (days <= 10) return 'var(--risk-medium)';
    if (days <= 15) return 'var(--risk-low)';
    return 'var(--risk-none)';
  };

  // Flatten tasks
  const flatTasks = useMemo(() => {
    const result = [];
    tasks.forEach(task => {
      task.children?.forEach(child => {
        result.push({
          ...child,
          parentTitle: task.title,
          category: task.category,
          parentId: task.id
        });
      });
    });
    return result;
  }, [tasks]);

  // Calculate KPIs
  const kpis = useMemo(() => {
    const inProgress = flatTasks.filter(t => t.status === '進行中').length;
    const done = flatTasks.filter(t => t.status === '完了').length;
    const hold = flatTasks.filter(t => t.status === '保留').length;

    const upcomingDeadlines = flatTasks
      .filter(t => t.deadline && t.status !== '完了')
      .map(t => ({ ...t, daysLeft: getDaysRemaining(t.deadline) }))
      .filter(t => t.daysLeft !== null)
      .sort((a, b) => a.daysLeft - b.daysLeft);

    const nextDeadline = upcomingDeadlines[0];

    return { inProgress, done, hold, nextDeadline };
  }, [flatTasks]);

  // Get priority tasks
  const priorityTasks = useMemo(() => {
    return flatTasks
      .filter(t => t.status !== '完了')
      .map(t => ({
        ...t,
        daysLeft: getDaysRemaining(t.deadline),
        risk: getRiskLevel(t.deadline, t.progress, t.status)
      }))
      .filter(t => t.daysLeft !== null)
      .sort((a, b) => {
        const riskPriority = { high: 0, medium: 1, low: 2, none: 3 };
        if (riskPriority[a.risk] !== riskPriority[b.risk]) {
          return riskPriority[a.risk] - riskPriority[b.risk];
        }
        return a.daysLeft - b.daysLeft;
      })
      .slice(0, 5);
  }, [flatTasks]);

  // Filter and sort tasks
  const filteredTasks = useMemo(() => {
    let result = [...flatTasks];

    if (statusFilter !== '全て') {
      result = result.filter(t => t.status === statusFilter);
    }

    if (deadlineFilter !== '全て') {
      result = result.filter(t => {
        const days = getDaysRemaining(t.deadline);
        if (deadlineFilter === '7日以内') return days !== null && days <= 7;
        if (deadlineFilter === '14日以内') return days !== null && days <= 14;
        if (deadlineFilter === '30日以内') return days !== null && days <= 30;
        if (deadlineFilter === '期限なし') return days === null;
        return true;
      });
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(t =>
        t.title.toLowerCase().includes(query) ||
        t.parentTitle.toLowerCase().includes(query)
      );
    }

    result.sort((a, b) => {
      if (sortBy === 'deadline-asc') {
        const daysA = getDaysRemaining(a.deadline) ?? 9999;
        const daysB = getDaysRemaining(b.deadline) ?? 9999;
        return daysA - daysB;
      }
      if (sortBy === 'deadline-desc') {
        const daysA = getDaysRemaining(a.deadline) ?? -9999;
        const daysB = getDaysRemaining(b.deadline) ?? -9999;
        return daysB - daysA;
      }
      if (sortBy === 'progress-asc') return a.progress - b.progress;
      if (sortBy === 'progress-desc') return b.progress - a.progress;
      return 0;
    });

    return result;
  }, [flatTasks, statusFilter, deadlineFilter, searchQuery, sortBy]);

  // Get status badge class
  const getStatusBadge = (status) => {
    const classes = {
      '進行中': 'badge-progress',
      '完了': 'badge-done',
      '保留': 'badge-hold',
      '未着手': 'badge-pending',
      '承認待ち': 'badge-pending'
    };
    return `badge ${classes[status] || 'badge-progress'}`;
  };

  // Task CRUD operations
  const openNewTaskModal = () => {
    setCurrentTask(null);
    setTaskForm({
      title: '',
      category: CATEGORIES[0],
      children: [{ title: '', progress: 0, status: '未着手', deadline: '' }]
    });
    setShowTaskModal(true);
  };

  const openEditTaskModal = (task) => {
    const parent = tasks.find(t => t.id === task.parentId);
    setCurrentTask(parent);
    setTaskForm({ ...parent });
    setShowTaskModal(true);
  };

  const handleSaveTask = async () => {
    if (!db || !user) {
      alert('Firestore が利用できないか、ログインが必要です。');
      return;
    }

    try {
      const taskData = {
        ...taskForm,
        updatedAt: new Date().toISOString()
      };

      if (currentTask) {
        // Update existing task
        await db.collection('tasks').doc(currentTask.id).update(taskData);
      } else {
        // Create new task
        const docRef = await db.collection('tasks').add({
          ...taskData,
          createdAt: new Date().toISOString()
        });
        taskData.id = docRef.id;
      }

      setShowTaskModal(false);
      setCurrentTask(null);
    } catch (error) {
      alert('保存に失敗しました: ' + error.message);
    }
  };

  const handleDeleteTask = async (task) => {
    if (!db || !user) return;
    if (!confirm(`「${task.parentTitle}」を削除しますか？`)) return;

    try {
      await db.collection('tasks').doc(task.parentId).delete();
    } catch (error) {
      alert('削除に失敗しました: ' + error.message);
    }
  };

  const addSubtask = () => {
    setTaskForm({
      ...taskForm,
      children: [
        ...taskForm.children,
        { title: '', progress: 0, status: '未着手', deadline: '' }
      ]
    });
  };

  const removeSubtask = (index) => {
    setTaskForm({
      ...taskForm,
      children: taskForm.children.filter((_, i) => i !== index)
    });
  };

  const updateSubtask = (index, field, value) => {
    const newChildren = [...taskForm.children];
    newChildren[index] = { ...newChildren[index], [field]: value };
    setTaskForm({ ...taskForm, children: newChildren });
  };

  if (isLoading) {
    return (
      <>
        <style>{styles}</style>
        <div className="dashboard" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>⏳</div>
            <div style={{ color: 'var(--text-secondary)' }}>読み込み中...</div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{styles}</style>
      <div className="dashboard">
        {/* HEADER */}
        <header className="header">
          <div className="header-info">
            <h1>担当業務ダッシュボード</h1>
            <div className="subtitle">塩崎｜営業企画部｜最終更新: {new Date().toLocaleString('ja-JP')}</div>
          </div>
          <div className="header-actions">
            <button className="btn btn-secondary" onClick={() => setShowHoshitoriModal(true)}>
              📊 星取表を見る
            </button>
            {user ? (
              <>
                <button className="btn btn-primary" onClick={() => setIsEditMode(!isEditMode)}>
                  {isEditMode ? '✓ 編集モード' : '編集モード'}
                </button>
                <button className="btn btn-secondary" onClick={handleLogout}>
                  ログアウト
                </button>
              </>
            ) : (
              <button className="btn btn-primary" onClick={() => setShowLoginModal(true)}>
                ログイン
              </button>
            )}
            <button className="theme-toggle" onClick={toggleTheme} aria-label="テーマ切替">
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </div>
        </header>

        {/* KPI CARDS */}
        <div className="kpi-grid">
          <div className="kpi-card">
            <div className="kpi-label">進行中</div>
            <div className="kpi-value">{kpis.inProgress}</div>
            <div className="kpi-sublabel">タスク</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-label">完了</div>
            <div className="kpi-value">{kpis.done}</div>
            <div className="kpi-sublabel">タスク</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-label">保留</div>
            <div className="kpi-value">{kpis.hold}</div>
            <div className="kpi-sublabel">タスク</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-label">直近期限</div>
            <div className="kpi-value" style={{ fontSize: '24px' }}>
              {kpis.nextDeadline ? kpis.nextDeadline.deadline : '-'}
            </div>
            <div className="kpi-sublabel">
              {kpis.nextDeadline ? `残り${kpis.nextDeadline.daysLeft}日` : '期限なし'}
            </div>
          </div>
        </div>

        {/* PRIORITY SECTION */}
        <section className="section">
          <div className="section-title">
            <span>優先タスク（期限が近い順 Top 5）</span>
          </div>
          <div className="priority-list">
            {priorityTasks.length === 0 ? (
              <div style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '40px' }}>
                優先タスクはありません
              </div>
            ) : (
              priorityTasks.map(task => (
                <div key={task.id} className={`priority-card risk-${task.risk}`}>
                  <div className="priority-info">
                    <h3>{task.parentTitle} - {task.title}</h3>
                    <div className="priority-meta">
                      <span style={{ color: getDaysColor(task.daysLeft) }}>
                        残り{task.daysLeft}日
                      </span>
                      <span>期限: {task.deadline}</span>
                    </div>
                  </div>
                  <div className="priority-stats">
                    <div className="progress-ring" style={{ '--progress': task.progress }}>
                      <span>{task.progress}%</span>
                    </div>
                    <span className={getStatusBadge(task.status)}>{task.status}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* PROGRESS TABLE */}
        <section className="section">
          <div className="section-title">
            <span>進捗一覧</span>
            {isEditMode && (
              <button className="btn btn-primary btn-small" onClick={openNewTaskModal}>
                + 新規タスク
              </button>
            )}
          </div>

          {/* Filters */}
          <div className="filters">
            <select className="filter-btn" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
              <option>全て</option>
              {STATUS_OPTIONS.map(s => <option key={s}>{s}</option>)}
            </select>
            <select className="filter-btn" value={deadlineFilter} onChange={e => setDeadlineFilter(e.target.value)}>
              <option>全て</option>
              <option>7日以内</option>
              <option>14日以内</option>
              <option>30日以内</option>
            </select>
            <select className="filter-btn" value={sortBy} onChange={e => setSortBy(e.target.value)}>
              <option value="deadline-asc">期限 昇順</option>
              <option value="deadline-desc">期限 降順</option>
              <option value="progress-asc">進捗 昇順</option>
              <option value="progress-desc">進捗 降順</option>
            </select>
            <input
              type="text"
              className="search-box"
              placeholder="業務名で検索..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Table */}
          {filteredTasks.length === 0 ? (
            <div style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '40px' }}>
              該当するタスクがありません
            </div>
          ) : (
            <table className="task-table">
              <tbody>
                {filteredTasks.map(task => {
                  const daysLeft = getDaysRemaining(task.deadline);
                  return (
                    <tr key={task.id} className="task-row">
                      <td className="task-name">
                        {task.parentTitle} - {task.title}
                        {isEditMode && (
                          <div className="task-actions">
                            <button className="btn btn-small btn-secondary" onClick={() => openEditTaskModal(task)}>
                              編集
                            </button>
                            <button className="btn btn-small btn-danger" onClick={() => handleDeleteTask(task)}>
                              削除
                            </button>
                          </div>
                        )}
                      </td>
                      <td style={{ width: '200px' }}>
                        <div className="progress-bar-container">
                          <div className="progress-bar" style={{ width: `${task.progress}%` }} />
                        </div>
                        <div style={{ fontSize: '12px', marginTop: '4px', color: 'var(--text-secondary)' }}>
                          {task.progress}%
                        </div>
                      </td>
                      <td style={{ width: '120px' }}>
                        <span className={getStatusBadge(task.status)}>{task.status}</span>
                      </td>
                      <td style={{ width: '150px', color: getDaysColor(daysLeft) }}>
                        {task.deadline || '-'}
                        {daysLeft !== null && (
                          <div style={{ fontSize: '12px', marginTop: '2px' }}>残り{daysLeft}日</div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </section>
      </div>

      {/* Hoshitori Modal */}
      {showHoshitoriModal && (
        <div className="modal-overlay" onClick={() => setShowHoshitoriModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()} style={{ position: 'relative' }}>
            <button className="modal-close" onClick={() => setShowHoshitoriModal(false)}>
              ×
            </button>
            <h2>業務担当一覧表（星取表）</h2>
            <div className="hoshitori-modal-content">
              <Hoshitori compact={false} />
            </div>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <div className="modal-overlay" onClick={() => setShowLoginModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h2>ログイン</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
              編集権限が必要な場合のみログインしてください。<br/>
              閲覧のみの場合はログイン不要です。
            </p>
            <div className="form-group">
              <label>メールアドレス</label>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>パスワード</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setShowLoginModal(false)}>
                キャンセル
              </button>
              <button className="btn btn-primary" onClick={handleLogin}>
                ログイン
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Task Edit Modal */}
      {showTaskModal && (
        <div className="modal-overlay" onClick={() => setShowTaskModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h2>{currentTask ? 'タスク編集' : '新規タスク'}</h2>
            <div className="form-group">
              <label>親タスク名</label>
              <input
                type="text"
                value={taskForm.title}
                onChange={e => setTaskForm({ ...taskForm, title: e.target.value })}
                placeholder="例: newcom07.jp"
              />
            </div>
            <div className="form-group">
              <label>カテゴリ</label>
              <select
                value={taskForm.category}
                onChange={e => setTaskForm({ ...taskForm, category: e.target.value })}
              >
                {CATEGORIES.map(cat => <option key={cat}>{cat}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>サブタスク</label>
              <div className="subtask-list">
                {taskForm.children.map((child, index) => (
                  <div key={index} className="subtask-item">
                    <input
                      type="text"
                      placeholder="タスク名"
                      value={child.title}
                      onChange={e => updateSubtask(index, 'title', e.target.value)}
                    />
                    <input
                      type="number"
                      placeholder="進捗%"
                      min="0"
                      max="100"
                      value={child.progress}
                      onChange={e => updateSubtask(index, 'progress', parseInt(e.target.value) || 0)}
                    />
                    <select
                      value={child.status}
                      onChange={e => updateSubtask(index, 'status', e.target.value)}
                    >
                      {STATUS_OPTIONS.map(s => <option key={s}>{s}</option>)}
                    </select>
                    <input
                      type="date"
                      value={child.deadline?.replace(/\//g, '-')}
                      onChange={e => updateSubtask(index, 'deadline', e.target.value.replace(/-/g, '/'))}
                    />
                    <button className="btn btn-danger btn-small" onClick={() => removeSubtask(index)}>
                      ×
                    </button>
                  </div>
                ))}
                <button className="btn btn-secondary btn-small" onClick={addSubtask} style={{ marginTop: '12px' }}>
                  + サブタスクを追加
                </button>
              </div>
            </div>
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setShowTaskModal(false)}>
                キャンセル
              </button>
              <button className="btn btn-primary" onClick={handleSaveTask}>
                保存
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DashboardComplete;
