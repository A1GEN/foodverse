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

        <a href="#dashboard" aria-label="Перейти в панель" title="Dashboard">
          <LayoutDashboard size={20} />
          Dashboard
        </a>

        <a href="#recipes" aria-label="Перейти к рецептам" title="Recipes">
          <Utensils size={20} />
          Recipes
        </a>

        <a href="#users" aria-label="Перейти к пользователям" title="Users">
          <Users size={20} />
          Users
        </a>

      </nav>

    </aside>

  )

}

export default AdminSidebar