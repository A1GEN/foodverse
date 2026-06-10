import { LayoutDashboard, Utensils, Users } from "lucide-react"
import { Link } from "react-router-dom"
import styles from "./AdminSidebar.module.css"
import { useTranslation } from "react-i18next"

function AdminSidebar() {
  const { t } = useTranslation()

  return (
    <aside className={styles.sidebar}>
      <h1>{t('admin', 'Admin')} 👑</h1>

      <nav>
        <Link to="#dashboard" aria-label="Перейти в панель" title={t('admin.dashboard', 'Dashboard')}>
          <LayoutDashboard size={20} />
          {t('admin.dashboard', 'Dashboard')}
        </Link>

        <Link to="#recipes" aria-label="Перейти к рецептам" title={t('admin.recipes', 'Recipes')}>
          <Utensils size={20} />
          {t('admin.recipes', 'Recipes')}
        </Link>

        <Link to="#users" aria-label="Перейти к пользователям" title={t('admin.users', 'Users')}>
          <Users size={20} />
          {t('admin.users', 'Users')}
        </Link>
      </nav>
    </aside>
  )
}

export default AdminSidebar