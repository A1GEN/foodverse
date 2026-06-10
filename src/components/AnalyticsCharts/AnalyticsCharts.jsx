import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts"

import styles from "./AnalyticsCharts.module.css"

function AnalyticsCharts() {

  // 📊 Fake analytics data
  const data = [

    {
      name:"Recipes",
      total:120
    },

    {
      name:"Users",
      total:45
    },

    {
      name:"Favorites",
      total:320
    },

    {
      name:"Comments",
      total:90
    }

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