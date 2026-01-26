/* ===================================================
   星取管理表（業務担当一覧表）JavaScript
   =================================================== */

// メンバー定義
const MEMBERS = {
  meguro: '目黒',
  umemoto: '梅本',
  niidome: '新留',
  shiozaki: '塩崎'
};

const MEMBER_KEYS = ['meguro', 'umemoto', 'niidome', 'shiozaki'];

// 星取管理表クラス
class HoshitoriManager {
  constructor(db, auth, adminEmail) {
    this.db = db;
    this.auth = auth;
    this.adminEmail = adminEmail;
    this.categories = [];
    this.isAdmin = false;
    this.currentUser = null;
    this.unsubscribe = null;
  }

  // 管理者かどうかを確認
  checkIsAdmin() {
    this.currentUser = this.auth.currentUser;
    this.isAdmin = this.currentUser && this.currentUser.email === this.adminEmail;
    return this.isAdmin;
  }

  // データ取得（リアルタイム購読）
  async subscribeToData(onUpdate) {
    const { collection, query, orderBy, onSnapshot } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');

    const q = query(collection(this.db, 'hoshitori'), orderBy('order'));

    this.unsubscribe = onSnapshot(q, (snapshot) => {
      this.categories = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      onUpdate(this.categories);
    }, (error) => {
      console.error('Hoshitori subscription error:', error);
    });
  }

  // 購読解除
  unsubscribeFromData() {
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
    }
  }

  // 大項目追加
  async addCategory(title) {
    if (!this.isAdmin) return false;

    const { collection, addDoc } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');

    try {
      const maxOrder = this.categories.reduce((max, c) => Math.max(max, c.order || 0), 0);
      await addDoc(collection(this.db, 'hoshitori'), {
        title: title,
        order: maxOrder + 1,
        tasks: [],
        createdAt: new Date().toISOString(),
        createdBy: this.currentUser.email
      });
      await this.logOperation('ADD_CATEGORY', { title });
      return true;
    } catch (error) {
      console.error('Error adding category:', error);
      throw error;
    }
  }

  // 大項目タイトル更新
  async updateCategoryTitle(categoryId, newTitle) {
    if (!this.isAdmin) return false;

    const { doc, updateDoc } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');

    try {
      await updateDoc(doc(this.db, 'hoshitori', categoryId), {
        title: newTitle,
        updatedAt: new Date().toISOString()
      });
      await this.logOperation('UPDATE_CATEGORY', { categoryId, newTitle });
      return true;
    } catch (error) {
      console.error('Error updating category:', error);
      throw error;
    }
  }

  // 大項目削除
  async deleteCategory(categoryId) {
    if (!this.isAdmin) return false;

    const { doc, deleteDoc } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');

    try {
      const category = this.categories.find(c => c.id === categoryId);
      await deleteDoc(doc(this.db, 'hoshitori', categoryId));
      await this.logOperation('DELETE_CATEGORY', { categoryId, title: category?.title });
      return true;
    } catch (error) {
      console.error('Error deleting category:', error);
      throw error;
    }
  }

  // タスク追加
  async addTask(categoryId, taskName) {
    if (!this.isAdmin) return false;

    const { doc, updateDoc, arrayUnion } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');

    try {
      const newTask = {
        id: Date.now().toString(),
        name: taskName,
        owners: {
          meguro: false,
          umemoto: false,
          niidome: false,
          shiozaki: false
        },
        createdAt: new Date().toISOString()
      };

      await updateDoc(doc(this.db, 'hoshitori', categoryId), {
        tasks: arrayUnion(newTask)
      });
      await this.logOperation('ADD_TASK', { categoryId, taskName });
      return true;
    } catch (error) {
      console.error('Error adding task:', error);
      throw error;
    }
  }

  // タスク名更新
  async updateTaskName(categoryId, taskId, newName) {
    if (!this.isAdmin) return false;

    const { doc, updateDoc } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');

    try {
      const category = this.categories.find(c => c.id === categoryId);
      if (!category) return false;

      const tasks = category.tasks.map(t =>
        t.id === taskId ? { ...t, name: newName } : t
      );

      await updateDoc(doc(this.db, 'hoshitori', categoryId), { tasks });
      await this.logOperation('UPDATE_TASK', { categoryId, taskId, newName });
      return true;
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  }

  // タスク削除
  async deleteTask(categoryId, taskId) {
    if (!this.isAdmin) return false;

    const { doc, updateDoc } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');

    try {
      const category = this.categories.find(c => c.id === categoryId);
      if (!category) return false;

      const task = category.tasks.find(t => t.id === taskId);
      const tasks = category.tasks.filter(t => t.id !== taskId);

      await updateDoc(doc(this.db, 'hoshitori', categoryId), { tasks });
      await this.logOperation('DELETE_TASK', { categoryId, taskId, taskName: task?.name });
      return true;
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  }

  // 担当トグル
  async toggleOwner(categoryId, taskId, memberKey) {
    if (!this.isAdmin) return false;

    const { doc, updateDoc } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');

    try {
      const category = this.categories.find(c => c.id === categoryId);
      if (!category) return false;

      const tasks = category.tasks.map(t => {
        if (t.id === taskId) {
          const newValue = !t.owners[memberKey];
          return {
            ...t,
            owners: {
              ...t.owners,
              [memberKey]: newValue
            }
          };
        }
        return t;
      });

      await updateDoc(doc(this.db, 'hoshitori', categoryId), { tasks });

      const task = category.tasks.find(t => t.id === taskId);
      const newValue = !task.owners[memberKey];
      await this.logOperation('TOGGLE_OWNER', {
        categoryId,
        taskId,
        taskName: task?.name,
        member: MEMBERS[memberKey],
        value: newValue ? '○' : '空'
      });
      return true;
    } catch (error) {
      console.error('Error toggling owner:', error);
      throw error;
    }
  }

  // 操作ログ記録
  async logOperation(action, details) {
    const { collection, addDoc } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');

    try {
      await addDoc(collection(this.db, 'hoshitori_logs'), {
        action,
        details,
        user: this.currentUser?.email || 'unknown',
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error logging operation:', error);
    }
  }

  // 最新ログ取得
  async getRecentLogs(limit = 10) {
    const { collection, query, orderBy, limit: limitFn, getDocs } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');

    try {
      const q = query(
        collection(this.db, 'hoshitori_logs'),
        orderBy('timestamp', 'desc'),
        limitFn(limit)
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting logs:', error);
      return [];
    }
  }

  // 初期データ投入
  async seedInitialData() {
    if (!this.isAdmin) return false;

    const { collection, getDocs, addDoc } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');

    try {
      const snapshot = await getDocs(collection(this.db, 'hoshitori'));
      if (!snapshot.empty) {
        console.log('Hoshitori data already exists');
        return false;
      }

      const initialData = [
        {
          title: '1.公開サイト',
          order: 1,
          tasks: [
            { id: '1', name: 'ニューコム', owners: { meguro: false, umemoto: true, niidome: true, shiozaki: true } },
            { id: '2', name: 'dbSheet', owners: { meguro: false, umemoto: true, niidome: false, shiozaki: true } }
          ]
        },
        {
          title: '2.ブログサイト',
          order: 2,
          tasks: [
            { id: '3', name: 'テックブログ', owners: { meguro: true, umemoto: false, niidome: true, shiozaki: false } },
            { id: '4', name: '社内報', owners: { meguro: false, umemoto: true, niidome: false, shiozaki: true } }
          ]
        },
        {
          title: '3.社内システム',
          order: 3,
          tasks: [
            { id: '5', name: '勤怠管理', owners: { meguro: true, umemoto: true, niidome: false, shiozaki: false } },
            { id: '6', name: '経費精算', owners: { meguro: false, umemoto: false, niidome: true, shiozaki: true } }
          ]
        }
      ];

      for (const category of initialData) {
        await addDoc(collection(this.db, 'hoshitori'), {
          ...category,
          createdAt: new Date().toISOString(),
          createdBy: this.currentUser.email
        });
      }

      console.log('Hoshitori initial data seeded');
      return true;
    } catch (error) {
      console.error('Error seeding hoshitori data:', error);
      throw error;
    }
  }
}

// UI管理クラス
class HoshitoriUI {
  constructor(manager, elements) {
    this.manager = manager;
    this.elements = elements;
    this.editingCell = null;
  }

  // テーブルレンダリング（操作列を削除したシンプル版）
  render(categories) {
    const isAdmin = this.manager.isAdmin;

    if (categories.length === 0) {
      this.elements.tableWrapper.innerHTML = `
        <div class="hoshitori-empty">
          <p>データがありません</p>
          ${isAdmin ? '<p style="margin-top: 8px; font-size: 13px;">下部の管理者操作パネルから追加してください</p>' : ''}
        </div>
      `;
      return;
    }

    // 操作列を削除：業務内容 + 担当者4名のみ
    let html = `
      <table class="hoshitori-table">
        <thead>
          <tr>
            <th class="task-name-col">業務内容</th>
            ${MEMBER_KEYS.map(key => `<th class="member-col">${MEMBERS[key]}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
    `;

    categories.forEach(category => {
      // 大項目行（担当者列を結合）
      html += `
        <tr class="category-row" data-category-id="${category.id}">
          <td colspan="${MEMBER_KEYS.length + 1}" class="category-cell">
            <span class="category-title">${this.escapeHtml(category.title)}</span>
          </td>
        </tr>
      `;

      // タスク行
      (category.tasks || []).forEach(task => {
        html += `
          <tr class="task-row" data-category-id="${category.id}" data-task-id="${task.id}">
            <td class="task-name-cell">
              <span class="task-name">${this.escapeHtml(task.name)}</span>
            </td>
            ${MEMBER_KEYS.map(key => `
              <td class="owner-cell ${isAdmin ? 'editable' : ''}"
                  data-category-id="${category.id}"
                  data-task-id="${task.id}"
                  data-member="${key}">
                <span class="owner-mark ${task.owners && task.owners[key] ? 'active' : ''}">${task.owners && task.owners[key] ? '○' : ''}</span>
              </td>
            `).join('')}
          </tr>
        `;
      });
    });

    html += `
        </tbody>
      </table>
    `;

    this.elements.tableWrapper.innerHTML = html;
    this.setupTableEventListeners();
  }

  // テーブルイベントリスナー設定
  setupTableEventListeners() {
    const table = this.elements.tableWrapper.querySelector('.hoshitori-table');
    if (!table) return;

    // 担当セルクリック（トグル）
    table.querySelectorAll('.owner-cell.editable').forEach(cell => {
      cell.addEventListener('click', async () => {
        const categoryId = cell.dataset.categoryId;
        const taskId = cell.dataset.taskId;
        const memberKey = cell.dataset.member;

        // 即時UIフィードバック
        const mark = cell.querySelector('.owner-mark');
        const currentState = mark.classList.contains('active');
        mark.classList.toggle('active', !currentState);
        mark.textContent = currentState ? '' : '○';

        try {
          await this.manager.toggleOwner(categoryId, taskId, memberKey);
        } catch (error) {
          // エラー時は元に戻す
          mark.classList.toggle('active', currentState);
          mark.textContent = currentState ? '○' : '';
          this.showError('担当の変更に失敗しました: ' + (error.code || error.message));
        }
      });
    });
  }

  // 管理パネル表示
  renderAdminPanel() {
    if (!this.manager.isAdmin) {
      this.elements.adminPanel.style.display = 'none';
      return;
    }

    this.elements.adminPanel.style.display = 'block';
    this.elements.adminPanel.innerHTML = `
      <div class="admin-panel-title">管理者操作</div>
      <div class="admin-buttons">
        <button class="btn-admin" id="btnAddCategory">＋ 大項目追加</button>
        <button class="btn-admin" id="btnAddTaskGlobal">＋ タスク追加</button>
        <button class="btn-admin danger" id="btnManageData">データ管理</button>
        <button class="btn-admin" id="btnSeedData">初期データ投入</button>
      </div>
    `;

    // 大項目追加
    document.getElementById('btnAddCategory')?.addEventListener('click', async () => {
      const title = prompt('大項目名を入力してください:');
      if (title && title.trim()) {
        try {
          await this.manager.addCategory(title.trim());
        } catch (error) {
          this.showError('大項目の追加に失敗しました: ' + (error.code || error.message));
        }
      }
    });

    // タスク追加
    document.getElementById('btnAddTaskGlobal')?.addEventListener('click', async () => {
      const categories = this.manager.categories;
      if (categories.length === 0) {
        alert('先に大項目を追加してください');
        return;
      }

      // 大項目選択
      const categoryOptions = categories.map((c, i) => `${i + 1}: ${c.title}`).join('\n');
      const selectedIndex = prompt(`タスクを追加する大項目を選択してください（番号入力）:\n\n${categoryOptions}`);

      if (!selectedIndex) return;
      const index = parseInt(selectedIndex) - 1;
      if (isNaN(index) || index < 0 || index >= categories.length) {
        alert('無効な選択です');
        return;
      }

      const taskName = prompt('タスク名を入力してください:');
      if (taskName && taskName.trim()) {
        try {
          await this.manager.addTask(categories[index].id, taskName.trim());
        } catch (error) {
          this.showError('タスクの追加に失敗しました: ' + (error.code || error.message));
        }
      }
    });

    // データ管理（編集/削除）
    document.getElementById('btnManageData')?.addEventListener('click', () => {
      this.showDataManagementModal();
    });

    // 初期データ投入
    document.getElementById('btnSeedData')?.addEventListener('click', async () => {
      if (confirm('サンプルの初期データを投入しますか？\n（既にデータがある場合は投入されません）')) {
        try {
          const result = await this.manager.seedInitialData();
          if (result) {
            alert('初期データを投入しました');
          } else {
            alert('既にデータが存在するため、投入しませんでした');
          }
        } catch (error) {
          this.showError('初期データの投入に失敗しました: ' + (error.code || error.message));
        }
      }
    });
  }

  // データ管理モーダル表示
  showDataManagementModal() {
    const categories = this.manager.categories;

    let listHtml = '<div style="max-height: 300px; overflow-y: auto;">';

    categories.forEach(category => {
      listHtml += `
        <div style="margin-bottom: 16px; padding: 12px; background: #f5f5f7; border-radius: 8px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <strong>${this.escapeHtml(category.title)}</strong>
            <div>
              <button class="btn-admin" data-action="edit-category" data-id="${category.id}">編集</button>
              <button class="btn-admin danger" data-action="delete-category" data-id="${category.id}">削除</button>
            </div>
          </div>
          <ul style="margin: 0; padding-left: 20px;">
      `;

      (category.tasks || []).forEach(task => {
        listHtml += `
          <li style="display: flex; justify-content: space-between; align-items: center; padding: 4px 0;">
            <span>${this.escapeHtml(task.name)}</span>
            <div>
              <button class="btn-admin" data-action="edit-task" data-category-id="${category.id}" data-task-id="${task.id}" style="font-size: 11px; padding: 2px 8px;">編集</button>
              <button class="btn-admin danger" data-action="delete-task" data-category-id="${category.id}" data-task-id="${task.id}" style="font-size: 11px; padding: 2px 8px;">削除</button>
            </div>
          </li>
        `;
      });

      listHtml += `
          </ul>
        </div>
      `;
    });

    listHtml += '</div>';

    // シンプルなモーダル表示
    const overlay = document.createElement('div');
    overlay.id = 'dataManagementOverlay';
    overlay.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center; z-index: 2000;';

    overlay.innerHTML = `
      <div style="background: white; border-radius: 16px; padding: 24px; max-width: 500px; width: 90%; max-height: 80vh; overflow: hidden;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <h3 style="margin: 0;">データ管理</h3>
          <button id="closeDataManagement" style="border: none; background: #e5e5ea; border-radius: 50%; width: 32px; height: 32px; cursor: pointer; font-size: 18px;">×</button>
        </div>
        ${listHtml}
      </div>
    `;

    document.body.appendChild(overlay);

    // 閉じるボタン
    document.getElementById('closeDataManagement').addEventListener('click', () => {
      overlay.remove();
    });

    // オーバーレイクリックで閉じる
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.remove();
    });

    // 各操作ボタン
    overlay.querySelectorAll('[data-action]').forEach(btn => {
      btn.addEventListener('click', async () => {
        const action = btn.dataset.action;
        const categoryId = btn.dataset.id || btn.dataset.categoryId;
        const taskId = btn.dataset.taskId;

        try {
          switch (action) {
            case 'edit-category':
              const cat = this.manager.categories.find(c => c.id === categoryId);
              const newTitle = prompt('大項目名を入力:', cat?.title || '');
              if (newTitle && newTitle.trim()) {
                await this.manager.updateCategoryTitle(categoryId, newTitle.trim());
                overlay.remove();
              }
              break;
            case 'delete-category':
              if (confirm('この大項目と配下のタスクをすべて削除しますか？')) {
                await this.manager.deleteCategory(categoryId);
                overlay.remove();
              }
              break;
            case 'edit-task':
              const category = this.manager.categories.find(c => c.id === categoryId);
              const task = category?.tasks?.find(t => t.id === taskId);
              const newName = prompt('タスク名を入力:', task?.name || '');
              if (newName && newName.trim()) {
                await this.manager.updateTaskName(categoryId, taskId, newName.trim());
                overlay.remove();
              }
              break;
            case 'delete-task':
              if (confirm('このタスクを削除しますか？')) {
                await this.manager.deleteTask(categoryId, taskId);
                overlay.remove();
              }
              break;
          }
        } catch (error) {
          this.showError('操作に失敗しました: ' + (error.code || error.message));
        }
      });
    });
  }

  // ログ表示
  async renderLogs() {
    const logs = await this.manager.getRecentLogs(10);

    if (logs.length === 0) {
      this.elements.logContainer.innerHTML = '';
      return;
    }

    let html = `
      <div class="operation-log-title">操作ログ（最新10件）</div>
    `;

    logs.forEach(log => {
      const date = new Date(log.timestamp);
      const timeStr = date.toLocaleString('ja-JP');
      let actionStr = '';

      switch (log.action) {
        case 'TOGGLE_OWNER':
          actionStr = `${log.details.taskName} の ${log.details.member} を ${log.details.value} に変更`;
          break;
        case 'ADD_CATEGORY':
          actionStr = `大項目「${log.details.title}」を追加`;
          break;
        case 'UPDATE_CATEGORY':
          actionStr = `大項目を「${log.details.newTitle}」に変更`;
          break;
        case 'DELETE_CATEGORY':
          actionStr = `大項目「${log.details.title}」を削除`;
          break;
        case 'ADD_TASK':
          actionStr = `タスク「${log.details.taskName}」を追加`;
          break;
        case 'UPDATE_TASK':
          actionStr = `タスクを「${log.details.newName}」に変更`;
          break;
        case 'DELETE_TASK':
          actionStr = `タスク「${log.details.taskName}」を削除`;
          break;
        default:
          actionStr = log.action;
      }

      html += `
        <div class="log-entry">
          <span>${timeStr}</span> -
          <span>${log.user}</span>:
          <span>${actionStr}</span>
        </div>
      `;
    });

    this.elements.logContainer.innerHTML = html;
  }

  // エラー表示
  showError(message) {
    alert(message);
  }

  // HTMLエスケープ
  escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}

// エクスポート
export { HoshitoriManager, HoshitoriUI, MEMBERS, MEMBER_KEYS };
