import { Link } from 'react-router-dom'
import { CheckCircle, Home, ShoppingBag } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import styles from './Success.module.css'

function Success() {
  const { t } = useTranslation()

  return (
    <div className={styles.success}>
      <div className={styles.container}>
        <div className={styles.iconWrapper}>
          <CheckCircle size={80} className={styles.icon} />
        </div>
        
        <h1 className={styles.title}>{t('success.title')}</h1>
        
        <p className={styles.message}>
          {t('success.message')}
        </p>

        <div className={styles.actions}>
          <Link to="/" className={styles.primaryBtn}>
            <Home size={20} />
            {t('success.home')}
          </Link>
          <Link to="/catalog" className={styles.secondaryBtn}>
            <ShoppingBag size={20} />
            {t('success.catalog')}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Success
