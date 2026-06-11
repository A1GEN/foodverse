import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import styles from './Recipes.module.css'

function Recipes() {
  return (
    <div className={styles.recipes}>
      <div className={styles.container}>
        <Link to="/catalog" className={styles.backBtn}>
          <ArrowLeft size={20} /> Вернуться в каталог
        </Link>
        <h1>Все рецепты</h1>
        <p>Просмотрите наш каталог, чтобы найти рецепты</p>
      </div>
    </div>
  )
}

export default Recipes
