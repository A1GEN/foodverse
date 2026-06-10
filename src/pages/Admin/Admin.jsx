import AdminSidebar
  from "../../components/AdminSidebar/AdminSidebar"

import AdminStats
  from "../../components/AdminStats/AdminStats"

import styles from "./Admin.module.css"
import AnalyticsCharts from "../../components/AnalyticsCharts/AnalyticsCharts"
import { useEffect, useState } from "react"
import { getAdminRecipes, deleteAdminRecipe, updateAdminRecipe, createAdminRecipe } from "../../services/saveRecipe"
import { toast } from "react-toastify"
import AdminEditModal from "../../components/AdminEditModal/AdminEditModal"
import { useTranslation } from "react-i18next"

function Admin() {

  const [recipes, setRecipes] = useState([])
  const [users, setUsers] = useState([
    { id: 'u1', name: 'Olga Petrova', email: 'olga@example.com', role: 'user' },
    { id: 'u2', name: 'Argen Admin', email: 'argen@gmail.com', role: 'admin' }
  ])

  const [editModal, setEditModal] = useState(false)
  const [editData, setEditData] = useState(null)
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
      }catch(e){ console.error('admin recipes fetch', e); toast.error('Failed loading admin recipes') }
    })()
    return ()=> mounted = false
  },[])

  const statuses = Array.from(new Set(recipes.map(r=> r.status).filter(Boolean)))
  const filtered = recipes.filter(r => filterStatus === 'all' ? true : (r.status || '').toLowerCase() === filterStatus)
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const paginated = filtered.slice(page * pageSize, page * pageSize + pageSize)

  useEffect(()=>{ if(page >= totalPages) setPage(0) },[totalPages])

  return (

    <div className={styles.admin}>

      <AdminSidebar />

      <main className={styles.content}>

        <h1>{t('admin.title','Dashboard 👑')}</h1>

        <AdminStats />

        <AnalyticsCharts />

        <section className={styles.section} aria-label="Recipes admin">
          <h2>{t('admin.recipesTitle','Recipes')}</h2>

          <div className={styles.controls}>
            <label>Filter:
              <select value={filterStatus} onChange={e=>{ setFilterStatus(e.target.value); setPage(0) }}>
                <option value="all">All</option>
                {statuses.map(s=> <option key={s} value={s.toLowerCase()}>{s}</option>)}
              </select>
            </label>
            <label>Per page:
              <select value={pageSize} onChange={e=>{ setPageSize(Number(e.target.value)); setPage(0) }}>
                <option value={6}>6</option>
                <option value={8}>8</option>
                <option value={12}>12</option>
              </select>
            </label>
            <div style={{marginLeft:'auto'}}>
              <button className="btn" onClick={async()=>{
                const sample = { title: 'Sample Pancakes', status: 'published', category: 'Breakfast', description: 'Tasty test pancakes' }
                try{
                  const created = await createAdminRecipe(sample)
                  setRecipes(rs=> [created, ...rs])
                  toast.success(t('admin.sampleCreated','Sample recipe created'))
                }catch(e){
                  // fallback to local insert so UI can be tested without Firestore
                  console.error('create sample failed', e)
                  const local = { id: `local-${Date.now()}`, ...sample }
                  setRecipes(rs=> [local, ...rs])
                  toast.warn(t('admin.sampleLocalWarn','Could not write to Firestore; sample added locally'))
                }
              }}>{t('admin.createSample','Create sample')}</button>
            </div>
          </div>

          <div className={styles.list}>
            {recipes.length === 0 && <div className={styles.muted}>{t('admin.noRecipes','No recipes found in Firestore.')}</div>}
            {paginated.map(r=> (
              <div key={r.id} className={styles.row}>
                <div>
                  <strong>{r.title || r.name || 'Untitled'}</strong>
                  <div className={styles.muted}>{r.status || r.category || '—'}</div>
                </div>
                <div className={styles.actions}>
                  <button className="btn btn-ghost" onClick={()=>{ setEditData(r); setEditModal(true) }}>{t('admin.edit','Edit')}</button>
                  <button className="btn" onClick={async()=>{
                    if(!confirm(t('admin.deleteConfirm','Delete recipe?'))) return
                    try{
                      await deleteAdminRecipe(r.id)
                      setRecipes(rs=> rs.filter(x=> x.id !== r.id))
                      toast.success(t('admin.deleted','Recipe deleted'))
                    }catch(e){ console.error(e); toast.error(t('admin.deleteFailed','Delete failed')) }
                  }}>{t('admin.delete','Delete')}</button>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.pager}>
            <button onClick={()=>setPage(p=> Math.max(0,p-1))} disabled={page===0}>{t('admin.prev','Prev')}</button>
            <span>{t('admin.page','Page')} {page+1} / {totalPages}</span>
            <button onClick={()=>setPage(p=> Math.min(totalPages-1,p+1))} disabled={page >= totalPages-1}>{t('admin.next','Next')}</button>
          </div>

          <AdminEditModal
            open={editModal}
            data={editData}
            onClose={()=>{ setEditModal(false); setEditData(null) }}
            onSave={async(updated)=>{
              try{
                await updateAdminRecipe(updated.id, { title: updated.title, status: updated.status })
                setRecipes(rs=> rs.map(x=> x.id===updated.id? {...x, title: updated.title, status: updated.status }: x))
                toast.success('Recipe updated')
                setEditModal(false)
                setEditData(null)
              }catch(e){ console.error(e); toast.error('Update failed') }
            }}
          />
        </section>

        <section className={styles.section} aria-label="Users admin">
          <h2>Users</h2>
          <div className={styles.list}>
            {users.map(u=> (
              <div key={u.id} className={styles.row}>
                <div>
                  <strong>{u.name}</strong>
                  <div className={styles.muted}>{u.email} • {u.role}</div>
                </div>
                <div className={styles.actions}>
                  <button className="btn btn-ghost">Profile</button>
                  <button className="btn">Disable</button>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

    </div>

  )

}

export default Admin