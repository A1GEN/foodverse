import AdminSidebar
  from "../../components/AdminSidebar/AdminSidebar"

import AdminStats
  from "../../components/AdminStats/AdminStats"

import styles from "./Admin.module.css"
import AnalyticsCharts from "../../components/AnalyticsCharts/AnalyticsCharts"
import { useEffect, useState } from "react"
import { getAdminRecipes, deleteAdminRecipe, updateAdminRecipe } from "../../services/saveRecipe"

function Admin() {

  const [recipes, setRecipes] = useState([])
  const [users, setUsers] = useState([
    { id: 'u1', name: 'Olga Petrova', email: 'olga@example.com', role: 'user' },
    { id: 'u2', name: 'Argen Admin', email: 'argen@gmail.com', role: 'admin' }
  ])

  useEffect(()=>{
    let mounted = true
    ;(async()=>{
      try{
        const data = await getAdminRecipes()
        if(!mounted) return
        setRecipes(data)
      }catch(e){ console.error('admin recipes fetch', e) }
    })()
    return ()=> mounted = false
  },[])

  return (

    <div className={styles.admin}>

      <AdminSidebar />

      <main className={styles.content}>

        <h1>Dashboard 👑</h1>

        <AdminStats />

        <AnalyticsCharts />

        <section className={styles.section} aria-label="Recipes admin">
          <h2>Recipes</h2>
          <div className={styles.list}>
            {recipes.length === 0 && <div className={styles.muted}>No recipes found in Firestore.</div>}
            {recipes.map(r=> (
              <div key={r.id} className={styles.row}>
                <div>
                  <strong>{r.title || r.name || 'Untitled'}</strong>
                  <div className={styles.muted}>{r.status || r.category || '—'}</div>
                </div>
                <div className={styles.actions}>
                  <button className="btn btn-ghost" onClick={async()=>{
                    const newTitle = window.prompt('Edit title', r.title || r.name || '')
                    if(newTitle==null) return
                    try{
                      await updateAdminRecipe(r.id, { title: newTitle })
                      setRecipes(rs=> rs.map(x=> x.id===r.id? {...x, title:newTitle}:x))
                    }catch(e){ console.error(e); alert('Update failed') }
                  }}>Edit</button>
                  <button className="btn" onClick={async()=>{
                    if(!confirm('Delete recipe?')) return
                    try{
                      await deleteAdminRecipe(r.id)
                      setRecipes(rs=> rs.filter(x=> x.id !== r.id))
                    }catch(e){ console.error(e); alert('Delete failed') }
                  }}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section} aria-label="Users admin">
          <h2>Users</h2>
          <div className={styles.list}>
            {sampleUsers.map(u=> (
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