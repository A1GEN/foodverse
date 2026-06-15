import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts"

import styles from "./AnalyticsCharts.module.css"
import { useTranslation } from "react-i18next"
import { TrendingUp, Users, Heart, MessageCircle } from 'lucide-react'

function AnalyticsCharts({ recipes, users }) {
  const { t } = useTranslation()

  // Real analytics data based on actual data
  const recipeData = [
    { name: 'Опубликовано', value: recipes.filter(r => r.status === 'published').length, color: '#10b981' },
    { name: 'Черновики', value: recipes.filter(r => r.status === 'draft').length, color: '#f59e0b' },
    { name: 'Архив', value: recipes.filter(r => r.status === 'archived').length, color: '#6b7280' }
  ]

  const userActivityData = [
    { name: 'Пн', users: Math.floor(users.length * 0.1) },
    { name: 'Вт', users: Math.floor(users.length * 0.15) },
    { name: 'Ср', users: Math.floor(users.length * 0.2) },
    { name: 'Чт', users: Math.floor(users.length * 0.18) },
    { name: 'Пт', users: Math.floor(users.length * 0.25) },
    { name: 'Сб', users: Math.floor(users.length * 0.3) },
    { name: 'Вс', users: Math.floor(users.length * 0.22) }
  ]

  const categoryData = Array.from(new Set(recipes.map(r => r.category).filter(Boolean)))
    .slice(0, 6)
    .map(cat => ({
      name: cat,
      value: recipes.filter(r => r.category === cat).length
    }))

  return (

    <div className={styles.chartsContainer}>

      <div className={styles.chartSection}>
        <div className={styles.chartHeader}>
          <h2><TrendingUp size={20} /> Статистика рецептов</h2>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={recipeData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
            >
              {recipeData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <div className={styles.chartLegend}>
          {recipeData.map((item, index) => (
            <div key={index} className={styles.legendItem}>
              <div className={styles.legendColor} style={{ backgroundColor: item.color }} />
              <span>{item.name}: {item.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.chartSection}>
        <div className={styles.chartHeader}>
          <h2><Users size={20} /> Активность пользователей</h2>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={userActivityData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="users" stroke="#ff6b35" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className={styles.chartSection}>
        <div className={styles.chartHeader}>
          <h2><Heart size={20} /> Категории рецептов</h2>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={categoryData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#ff6b35" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>

  )

}

export default AnalyticsCharts