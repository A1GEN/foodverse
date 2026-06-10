import AdminSidebar
  from "../../components/AdminSidebar/AdminSidebar"

import AdminStats
  from "../../components/AdminStats/AdminStats"

import styles from "./Admin.module.css"
import AnalyticsCharts from "../../components/AnalyticsCharts/AnalyticsCharts"

function Admin() {

  return (

    <div className={styles.admin}>

      <AdminSidebar />

      <main className={styles.content}>

        <h1>
          Dashboard 👑
        </h1>

        <AdminStats />

        <AnalyticsCharts />

      </main>

    </div>

  )

}

export default Admin