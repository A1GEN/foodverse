import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts"

import styles from "./AnalyticsCharts.module.css"
import { useTranslation } from "react-i18next"

function AnalyticsCharts() {
  const { t } = useTranslation()

  // 📊 Fake analytics data
  const data = [

    { name: t('analytics.recipes','Recipes'), total: 120 },
    { name: t('analytics.users','Users'), total: 45 },
    { name: t('analytics.favorites','Favorites'), total: 320 },
    { name: t('analytics.comments','Comments'), total: 90 }

  ]

  return (

    <div className={styles.chartContainer}>

      <h2>
        Analytics Overview 📊
      </h2>

      <ResponsiveContainer
        width="100%"
        height={400}
      >

        <BarChart data={data}>

          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Bar dataKey="total" />

        </BarChart>

      </ResponsiveContainer>

    </div>

  )

}

export default AnalyticsCharts