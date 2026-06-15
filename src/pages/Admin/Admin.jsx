import { useEffect, useState } from "react"
import { getAdminRecipes, deleteAdminRecipe, updateAdminRecipe, createAdminRecipe } from "../../services/saveRecipe"
import { getAllUsers, deleteUser as deleteUserFromDb, updateUser as updateUserFromDb } from "../../services/userService"
import { toast } from "react-toastify"
import AdminEditModal from "../../components/AdminEditModal/AdminEditModal"
import { useTranslation } from "react-i18next"
import { Users, TrendingUp, Activity, Settings, Search, Filter, Plus, Edit2, Trash2, Eye, Calendar, Clock, Star, UserCheck, UserX, Mail, Shield, Globe, Bell, Database, Palette } from "lucide-react"
import styles from "./Admin.module.css"
import AdminSidebar from "../../components/AdminSidebar/AdminSidebar"
import AdminStats from "../../components/AdminStats/AdminStats"
import AnalyticsCharts from "../../components/AnalyticsCharts/AnalyticsCharts"

function Admin() {

  const [recipes, setRecipes] = useState([])
  const [users, setUsers] = useState([])
  const [loadingUsers, setLoadingUsers] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const [searchQuery, setSearchQuery] = useState('')

  const [editModal, setEditModal] = useState(false)
  const [editData, setEditData] = useState(null)
  const [userEditModal, setUserEditModal] = useState(false)
  const [userEditData, setUserEditData] = useState(null)
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(8)
  const [filterStatus, setFilterStatus] = useState('all')
  const { t } = useTranslation()

  useEffect(()=>{
    let mounted = true
    ;(async()=>{
      try{
        const data = await getAdminRecipes()
        if(!mounted) return
        setRecipes(data)
      }catch(e){ console.error('admin recipes fetch', e); toast.error('Ошибка загрузки рецептов') }
    })()
    return ()=> mounted = false
  },[])

  useEffect(()=>{
    let mounted = true
    ;(async()=>{
      try{
        setLoadingUsers(true)
        const data = await getAllUsers()
        if(!mounted) return
        setUsers(data)
      }catch(e){ console.error('admin users fetch', e); toast.error('Ошибка загрузки пользователей') }
      finally{
        if(mounted) setLoadingUsers(false)
      }
    })()
    return ()=> mounted = false
  },[])

  const statuses = Array.from(new Set(recipes.map(r=> r.status).filter(Boolean)))
  const filtered = recipes.filter(r => {
    const matchesStatus = filterStatus === 'all' ? true : (r.status || '').toLowerCase() === filterStatus
    const matchesSearch = searchQuery === '' || (r.title || r.name || '').toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesSearch
  })
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const paginated = filtered.slice(page * pageSize, page * pageSize + pageSize)

  useEffect(()=>{ if(page >= totalPages) setPage(0) },[totalPages])

  const stats = {
    totalRecipes: recipes.length,
    publishedRecipes: recipes.filter(r => r.status === 'published').length,
    draftRecipes: recipes.filter(r => r.status === 'draft').length,
    totalUsers: users.length,
    activeUsers: users.filter(u => u.role !== 'admin').length
  }

  const handleDeleteUser = async (userId) => {
    if (!confirm('Вы уверены, что хотите удалить этого пользователя?')) return
    try {
      await deleteUserFromDb(userId)
      setUsers(users.filter(u => u.id !== userId))
      toast.success('Пользователь удален')
    } catch (error) {
      console.error('Error deleting user:', error)
      toast.error('Ошибка удаления пользователя')
    }
  }

  const handleEditUser = (user) => {
    setUserEditData(user)
    setUserEditModal(true)
  }

  const handleSaveUser = async (updatedUser) => {
    try {
      await updateUserFromDb(updatedUser.id, {
        displayName: updatedUser.displayName,
        email: updatedUser.email,
        role: updatedUser.role
      })
      setUsers(users.map(u => u.id === updatedUser.id ? { ...u, ...updatedUser } : u))
      toast.success('Пользователь обновлен')
      setUserEditModal(false)
      setUserEditData(null)
    } catch (error) {
      console.error('Error updating user:', error)
      toast.error('Ошибка обновления пользователя')
    }
  }

  const handleViewProfile = (userId) => {
    window.open(`/profile/${userId}`, '_blank')
  }

  return (

    <div className={styles.admin}>

      <AdminSidebar />

      <main className={styles.content}>

        <div className={styles.header}>
          <h1>Панель администратора</h1>
          <div className={styles.headerStats}>
            <div className={styles.statCard}>
              <Users size={24} className={styles.statIcon} />
              <div>
                <div className={styles.statValue}>{stats.totalUsers}</div>
                <div className={styles.statLabel}>Пользователей</div>
              </div>
            </div>
            <div className={styles.statCard}>
              <TrendingUp size={24} className={styles.statIcon} />
              <div>
                <div className={styles.statValue}>{stats.totalRecipes}</div>
                <div className={styles.statLabel}>Рецептов</div>
              </div>
            </div>
            <div className={styles.statCard}>
              <Activity size={24} className={styles.statIcon} />
              <div>
                <div className={styles.statValue}>{stats.publishedRecipes}</div>
                <div className={styles.statLabel}>Опубликовано</div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.tabs}>
          <button 
            className={`${styles.tab} ${activeTab === 'overview' ? styles.active : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <Activity size={18} /> Обзор
          </button>
          <button 
            className={`${styles.tab} ${activeTab === 'recipes' ? styles.active : ''}`}
            onClick={() => setActiveTab('recipes')}
          >
            <Star size={18} /> Рецепты
          </button>
          <button 
            className={`${styles.tab} ${activeTab === 'users' ? styles.active : ''}`}
            onClick={() => setActiveTab('users')}
          >
            <Users size={18} /> Пользователи
          </button>
          <button 
            className={`${styles.tab} ${activeTab === 'settings' ? styles.active : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <Settings size={18} /> Настройки
          </button>
        </div>

        {activeTab === 'overview' && (
          <>
            <AdminStats stats={stats} />
            <AnalyticsCharts recipes={recipes} users={users} />
          </>
        )}

        {activeTab === 'recipes' && (
          <section className={styles.section} aria-label="Recipes admin">
            <div className={styles.sectionHeader}>
              <h2>Управление рецептами</h2>
              <button className={styles.createBtn} onClick={async()=>{
                const sample = { title: 'Пример рецепта', status: 'published', category: 'Завтрак', description: 'Вкусный тестовый рецепт' }
                try{
                  const created = await createAdminRecipe(sample)
                  setRecipes(rs=> [created, ...rs])
                  toast.success('Пример рецепта создан')
                }catch(e){
                  console.error('create sample failed', e)
                  const local = { id: `local-${Date.now()}`, ...sample }
                  setRecipes(rs=> [local, ...rs])
                  toast.warn('Не удалось записать в Firestore; пример добавлен локально')
                }
              }}>
                <Plus size={18} /> Создать рецепт
              </button>
            </div>

            <div className={styles.controls}>
              <div className={styles.searchBox}>
                <Search size={18} className={styles.searchIcon} />
                <input
                  type="text"
                  placeholder="Поиск рецептов..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={styles.searchInput}
                />
              </div>
              <div className={styles.filterBox}>
                <Filter size={18} className={styles.filterIcon} />
                <select value={filterStatus} onChange={e=>{ setFilterStatus(e.target.value); setPage(0) }} className={styles.filterSelect}>
                  <option value="all">Все статусы</option>
                  {statuses.map(s=> <option key={s} value={s.toLowerCase()}>{s}</option>)}
                </select>
              </div>
              <div className={styles.pageSizeBox}>
                <select value={pageSize} onChange={e=>{ setPageSize(Number(e.target.value)); setPage(0) }} className={styles.pageSizeSelect}>
                  <option value={6}>6 на странице</option>
                  <option value={8}>8 на странице</option>
                  <option value={12}>12 на странице</option>
                </select>
              </div>
            </div>

            <div className={styles.list}>
              {recipes.length === 0 && <div className={styles.empty}>Рецепты не найдены</div>}
              {paginated.map(r=> (
                <div key={r.id} className={styles.row}>
                  <div className={styles.rowInfo}>
                    <div className={styles.rowTitle}>{r.title || r.name || 'Без названия'}</div>
                    <div className={styles.rowMeta}>
                      <span className={styles.rowStatus}>{r.status || r.category || '—'}</span>
                      {r.category && <span className={styles.rowCategory}>{r.category}</span>}
                    </div>
                  </div>
                  <div className={styles.actions}>
                    <button className={styles.actionBtn} onClick={()=>{ setEditData(r); setEditModal(true) }} title="Редактировать">
                      <Edit2 size={16} />
                    </button>
                    <button className={styles.actionBtn} onClick={()=> window.open(`/recipe/${r.id}`, '_blank')} title="Просмотр">
                      <Eye size={16} />
                    </button>
                    <button className={`${styles.actionBtn} ${styles.deleteBtn}`} onClick={async()=>{
                      if(!confirm('Удалить рецепт?')) return
                      try{
                        await deleteAdminRecipe(r.id)
                        setRecipes(rs=> rs.filter(x=> x.id !== r.id))
                        toast.success('Рецепт удален')
                      }catch(e){ console.error(e); toast.error('Ошибка удаления') }
                    }} title="Удалить">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.pager}>
              <button onClick={()=>setPage(p=> Math.max(0,p-1))} disabled={page===0} className={styles.pageBtn}>
                ← Назад
              </button>
              <span className={styles.pageInfo}>Страница {page+1} из {totalPages}</span>
              <button onClick={()=>setPage(p=> Math.min(totalPages-1,p+1))} disabled={page >= totalPages-1} className={styles.pageBtn}>
                Вперед →
              </button>
            </div>

            <AdminEditModal
              open={editModal}
              data={editData}
              onClose={()=>{ setEditModal(false); setEditData(null) }}
              onSave={async(updated)=>{
                try{
                  await updateAdminRecipe(updated.id, { title: updated.title, status: updated.status })
                  setRecipes(rs=> rs.map(x=> x.id===updated.id? {...x, title: updated.title, status: updated.status }: x))
                  toast.success('Рецепт обновлен')
                  setEditModal(false)
                  setEditData(null)
                }catch(e){ console.error(e); toast.error('Ошибка обновления') }
              }}
            />
          </section>
        )}

        {activeTab === 'users' && (
          <section className={styles.section} aria-label="Users admin">
            <div className={styles.sectionHeader}>
              <h2>Управление пользователями</h2>
              <div className={styles.userStats}>
                <span>Всего: {users.length}</span>
                <span>Активных: {stats.activeUsers}</span>
              </div>
            </div>
            
            <div className={styles.controls}>
              <div className={styles.searchBox}>
                <Search size={18} className={styles.searchIcon} />
                <input
                  type="text"
                  placeholder="Поиск пользователей..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={styles.searchInput}
                />
              </div>
            </div>

            <div className={styles.list}>
              {loadingUsers && <div className={styles.empty}>Загрузка пользователей...</div>}
              {!loadingUsers && users.length === 0 && <div className={styles.empty}>Пользователи не найдены</div>}
              {!loadingUsers && users
                .filter(u => 
                  searchQuery === '' || 
                  (u.displayName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                  (u.email || '').toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map(u=> (
                <div key={u.id} className={styles.row}>
                  <div className={styles.rowInfo}>
                    <div className={styles.rowTitle}>{u.displayName || 'Без имени'}</div>
                    <div className={styles.rowMeta}>
                      <span className={styles.rowEmail}><Mail size={14} /> {u.email}</span>
                      <span className={styles.rowRole}>
                        <Shield size={14} /> {u.role === 'admin' ? 'Админ' : 'Пользователь'}
                      </span>
                      {u.createdAt && <span className={styles.rowDate}><Calendar size={14} /> {new Date(u.createdAt.seconds * 1000).toLocaleDateString('ru-RU')}</span>}
                    </div>
                  </div>
                  <div className={styles.actions}>
                    <button className={styles.actionBtn} onClick={()=> handleViewProfile(u.id)} title="Профиль">
                      <Eye size={16} />
                    </button>
                    <button className={styles.actionBtn} onClick={()=> handleEditUser(u)} title="Редактировать">
                      <Edit2 size={16} />
                    </button>
                    <button className={`${styles.actionBtn} ${styles.deleteBtn}`} onClick={()=> handleDeleteUser(u.id)} title="Удалить">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {userEditModal && (
              <div className={styles.modalOverlay} onClick={() => setUserEditModal(false)}>
                <div className={styles.modal} onClick={e => e.stopPropagation()}>
                  <h3>Редактировать пользователя</h3>
                  <div className={styles.formGroup}>
                    <label>Имя</label>
                    <input
                      type="text"
                      value={userEditData?.displayName || ''}
                      onChange={e => setUserEditData({ ...userEditData, displayName: e.target.value })}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Email</label>
                    <input
                      type="email"
                      value={userEditData?.email || ''}
                      onChange={e => setUserEditData({ ...userEditData, email: e.target.value })}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Роль</label>
                    <select
                      value={userEditData?.role || 'user'}
                      onChange={e => setUserEditData({ ...userEditData, role: e.target.value })}
                    >
                      <option value="user">Пользователь</option>
                      <option value="admin">Админ</option>
                    </select>
                  </div>
                  <div className={styles.modalActions}>
                    <button onClick={() => setUserEditModal(false)} className={styles.cancelBtn}>Отмена</button>
                    <button onClick={() => handleSaveUser(userEditData)} className={styles.saveBtn}>Сохранить</button>
                  </div>
                </div>
              </div>
            )}
          </section>
        )}

        {activeTab === 'settings' && (
          <section className={styles.section} aria-label="Settings">
            <div className={styles.sectionHeader}>
              <h2>Настройки</h2>
            </div>
            <div className={styles.settingsGrid}>
              <div className={styles.settingCard}>
                <div className={styles.settingIcon}>
                  <Globe size={24} />
                </div>
                <h3>Язык сайта</h3>
                <p>Выберите основной язык сайта</p>
                <select className={styles.settingSelect} defaultValue="ru">
                  <option value="ru">Русский</option>
                  <option value="en">English</option>
                  <option value="ky">Кыргызча</option>
                </select>
              </div>
              <div className={styles.settingCard}>
                <div className={styles.settingIcon}>
                  <Bell size={24} />
                </div>
                <h3>Уведомления</h3>
                <p>Управляйте email уведомлениями</p>
                <div className={styles.settingToggle}>
                  <span>Email уведомления</span>
                  <input type="checkbox" defaultChecked />
                </div>
                <div className={styles.settingToggle}>
                  <span>Push уведомления</span>
                  <input type="checkbox" defaultChecked />
                </div>
              </div>
              <div className={styles.settingCard}>
                <div className={styles.settingIcon}>
                  <Shield size={24} />
                </div>
                <h3>Безопасность</h3>
                <p>Настройки безопасности и доступа</p>
                <div className={styles.settingToggle}>
                  <span>Двухфакторная аутентификация</span>
                  <input type="checkbox" />
                </div>
                <div className={styles.settingToggle}>
                  <span>Логирование действий</span>
                  <input type="checkbox" defaultChecked />
                </div>
              </div>
              <div className={styles.settingCard}>
                <div className={styles.settingIcon}>
                  <Database size={24} />
                </div>
                <h3>Резервное копирование</h3>
                <p>Автоматическое резервирование данных</p>
                <div className={styles.settingToggle}>
                  <span>Автобэкап ежедневно</span>
                  <input type="checkbox" defaultChecked />
                </div>
                <button className={styles.settingBtn} onClick={()=> toast.success('Резервная копия создана')}>
                  Создать бэкап сейчас
                </button>
              </div>
              <div className={styles.settingCard}>
                <div className={styles.settingIcon}>
                  <Palette size={24} />
                </div>
                <h3>Тема по умолчанию</h3>
                <p>Выберите тему для новых пользователей</p>
                <select className={styles.settingSelect} defaultValue="dark">
                  <option value="dark">Темная</option>
                  <option value="light">Светлая</option>
                  <option value="auto">Автоматически</option>
                </select>
              </div>
              <div className={styles.settingCard}>
                <div className={styles.settingIcon}>
                  <Users size={24} />
                </div>
                <h3>Модерация</h3>
                <p>Настройки модерации контента</p>
                <div className={styles.settingToggle}>
                  <span>Автомодерация комментариев</span>
                  <input type="checkbox" />
                </div>
                <div className={styles.settingToggle}>
                  <span>Премодерация рецептов</span>
                  <input type="checkbox" />
                </div>
              </div>
            </div>
            <div className={styles.settingsActions}>
              <button className={styles.saveSettingsBtn} onClick={()=> toast.success('Настройки сохранены')}>
                Сохранить все настройки
              </button>
              <button className={styles.resetSettingsBtn} onClick={()=> toast.info('Настройки сброшены')}>
                Сбросить по умолчанию
              </button>
            </div>
          </section>
        )}

      </main>

    </div>

  )

}

export default Admin