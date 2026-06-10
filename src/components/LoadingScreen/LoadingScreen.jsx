import { useEffect } from "react"
import styles from "./LoadingScreen.module.css"
import { motion as Motion } from "framer-motion"

function LoadingScreen({ onFinish }) {
  useEffect(()=>{
    const t = setTimeout(()=> onFinish && onFinish(), 1400)
    return ()=>clearTimeout(t)
  },[onFinish])

  return (
    <div className={styles.wrap}>
      <Motion.div initial={{ scale:0.8, opacity:0 }} animate={{ scale:1, opacity:1 }} transition={{ duration:0.8 }} className={styles.card}>
        <div className={styles.logo}>FoodVerse</div>
        <div className={styles.tag}>Discover & Share Recipes</div>
      </Motion.div>
    </div>
  )
}

export default LoadingScreen
