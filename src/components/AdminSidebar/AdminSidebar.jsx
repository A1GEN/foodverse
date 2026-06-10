import {
  LayoutDashboard,
  Utensils,
  Users
} from "lucide-react"

import styles from "./AdminSidebar.module.css"

function AdminSidebar() {

  return (

    <aside className={styles.sidebar}>

      <h1>Admin 👑</h1>

      <nav>

        <a href="#">
          <LayoutDashboard size={20} />
          Dashboard
        </a>

        <a href="#">
          <Utensils size={20} />
          Recipes
        </a>

        <a href="#">
          <Users size={20} />
          Users
        </a>

      </nav>

    </aside>

  )

}

export default AdminSidebar