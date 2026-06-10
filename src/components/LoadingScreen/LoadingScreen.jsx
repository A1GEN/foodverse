import { useEffect } from "react"
import styles from "./LoadingScreen.module.css"
import { motion as Motion } from "framer-motion"
import { useTranslation } from "react-i18next"

function LoadingScreen({ onFinish }) {
  const { t } = useTranslation()
  useEffect(()=>{
    const timer = setTimeout(()=> onFinish && onFinish(), 1400)
    return ()=>clearTimeout(timer)
  },[onFinish])

  return (
    <div className={styles.wrap}>
      <Motion.div initial={{ scale:0.8, opacity:0 }} animate={{ scale:1, opacity:1 }} transition={{ duration:0.8 }} className={styles.card}>
        <div className={styles.logo}>{t('app.name','FoodVerse')}</div>
        <div className={styles.tag}>{t('loading.tag','Discover & Share Recipes')}</div>
      </Motion.div>
    </div>
  )
}

export default LoadingScreen
