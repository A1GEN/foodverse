import AdminSidebar
  from "../../components/AdminSidebar/AdminSidebar"

import AdminStats
  from "../../components/AdminStats/AdminStats"

import styles from "./Admin.module.css"
import AnalyticsCharts from "../../components/AnalyticsCharts/AnalyticsCharts"

function Admin() {

  const sampleRecipes = [
    { id: 'r1', title: 'Паста с морепродуктами', status: 'published' },
    { id: 'r2', title: 'Тёплый салат с булгуром', status: 'draft' },
    { id: 'r3', title: 'Шоколадный фондан', status: 'published' }
  ]

  const sampleUsers = [
    { id: 'u1', name: 'Olga Petrova', email: 'olga@example.com', role: 'user' },
    { id: 'u2', name: 'Argen Admin', email: 'argen@gmail.com', role: 'admin' }
  ]

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
            {sampleRecipes.map(r=> (
              <div key={r.id} className={styles.row}>
                <div>
                  <strong>{r.title}</strong>
                  <div className={styles.muted}>{r.status}</div>
                </div>
                <div className={styles.actions}>
                  <button className="btn btn-ghost">Edit</button>
                  <button className="btn">Delete</button>
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