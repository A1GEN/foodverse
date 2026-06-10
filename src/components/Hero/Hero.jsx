import styles from "./Hero.module.css"
import { useTranslation } from "react-i18next"
import { motion as Motion } from "framer-motion"

function Hero() {
  const { t } = useTranslation()

  return (
    <section className={styles.hero}>
      <div className={styles.overlay}></div>

      <Motion.div
  className={styles.content}

  initial={{
    opacity:0,
    y:50
  }}

  animate={{
    opacity:1,
    y:0
  }}

  transition={{
    duration:1
  }}
>
        <h1>
          {t("heroTitle")}
        </h1>

        <Motion.p className={styles.subtitle} initial={{ opacity:0, y:6 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2, duration:0.6 }}>
          {t("heroText")}
        </Motion.p>

        <Motion.button
          className={styles.cta}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => document.getElementById("recipes")?.scrollIntoView({ behavior: "smooth" })}
        >
          {t("heroCTA", "Explore Recipes")}
        </Motion.button>
      </Motion.div>    
    </section>
  )
}

export default Hero