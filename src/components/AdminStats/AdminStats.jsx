import styles from "./AdminStats.module.css"
import { Users, TrendingUp, Activity, Heart, Clock, Star } from 'lucide-react'

function AdminStats({ stats }) {

  return (

    <div className={styles.stats}>

      <div className={styles.card}>
        <div className={styles.cardIcon}>
          <Users size={32} />
        </div>
        <div className={styles.cardContent}>
          <h2>{stats?.totalUsers || 0}</h2>
          <p>Пользователей</p>
          <span className={styles.cardTrend}>+12% за месяц</span>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.cardIcon}>
          <TrendingUp size={32} />
        </div>
        <div className={styles.cardContent}>
          <h2>{stats?.totalRecipes || 0}</h2>
          <p>Рецептов</p>
          <span className={styles.cardTrend}>+8% за месяц</span>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.cardIcon}>
          <Activity size={32} />
        </div>
        <div className={styles.cardContent}>
          <h2>{stats?.publishedRecipes || 0}</h2>
          <p>Опубликовано</p>
          <span className={styles.cardTrend}>+15% за месяц</span>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.cardIcon}>
          <Heart size={32} />
        </div>
        <div className={styles.cardContent}>
          <h2>{stats?.draftRecipes || 0}</h2>
          <p>Черновиков</p>
          <span className={styles.cardTrend}>-3% за месяц</span>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.cardIcon}>
          <Clock size={32} />
        </div>
        <div className={styles.cardContent}>
          <h2>24/7</h2>
          <p>Время работы</p>
          <span className={styles.cardTrend}>Стабильно</span>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.cardIcon}>
          <Star size={32} />
        </div>
        <div className={styles.cardContent}>
          <h2>4.8</h2>
          <p>Средний рейтинг</p>
          <span className={styles.cardTrend}>+0.2 за месяц</span>
        </div>
      </div>

    </div>

  )

}

export default AdminStats