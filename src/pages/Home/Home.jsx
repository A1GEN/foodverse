import { useEffect, useState } from "react"
import { motion as Motion } from "framer-motion"
import styles from "./Home.module.css"

import Hero from "../../components/Hero/Hero"
import RecipeCard from "../../components/RecipeCard/RecipeCard"
import SkeletonCard from "../../components/SkeletonCard/SkeletonCard"
import TopChefs from "../../components/TopChefs/TopChefs"
import ConsultantChat from "../../components/ConsultantChat/ConsultantChat"
import SeasonalRecipes from "../../components/SeasonalRecipes/SeasonalRecipes"
import HolidayRecipes from "../../components/HolidayRecipes/HolidayRecipes"
import IngredientSearch from "../../components/IngredientSearch/IngredientSearch"
import NationalCuisines from "../../components/NationalCuisines/NationalCuisines"
import { collection, getDocs } from "firebase/firestore"
import { getDb } from "../../lib/firebaseClient"
import { useTranslation } from "react-i18next"

function Home() {
  const { t } = useTranslation()
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [showConsultant, setShowConsultant] = useState(false)

  const fetchRecipes = async (query = "chicken", mode = "title") => {
    try {
      setLoading(true)

      let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      if (mode === "category") url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${query}`
      if (mode === "ingredient") url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${query}`

      const response = await fetch(url)
      const data = await response.json()

      let results = data.meals || []

      // include user-uploaded recipes from Firestore
      try {
        const _db = await getDb()
        const snap = await getDocs(collection(_db, "recipes"))
        const local = snap.docs.map((d) => ({ ...d.data(), idMeal: d.id }))
        const qLower = query.toLowerCase()
        const filtered = local.filter((r) => {
          if (mode === "title") return (r.title || "").toLowerCase().includes(qLower)
          if (mode === "category") return (r.category || "").toLowerCase().includes(qLower)
          if (mode === "ingredient") return (r.ingredients || []).some((i) => (i || "").toLowerCase().includes(qLower))
          return false
        })
        results = results.concat(filtered)
      } catch (e) {
        console.error("local recipes fetch", e)
      }

      setRecipes(results)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let mounted = true
    ;(async () => {
      if (!mounted) return
      await fetchRecipes()
    })()
    return () => {
      mounted = false
    }
  }, [])

  return (
    <Motion.div className={styles.home} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>

      <div className={styles.heroWrap}>
        <Hero />
      </div>

      {/* Seasonal Recipes */}
      <section className={styles.section}>
        <SeasonalRecipes />
      </section>

      {/* Holiday Recipes */}
      <section className={styles.section}>
        <HolidayRecipes />
      </section>

      {/* National Cuisines */}
      <section className={styles.section}>
        <NationalCuisines />
      </section>

      {/* Ingredient Search */}
      <section className={styles.section}>
        <IngredientSearch />
      </section>

      {/* Recipes Grid */}
      <section id="recipes" className={styles.section}>
        <div className={styles.discoverBanner}>
          <div className={styles.discoverImageWrap}>
            <img src="https://images.unsplash.com/photo-1543352634-2c2f6f2d3f0b?q=80&w=1600&auto=format&fit=crop" alt="Featured dish" />
            <div className={styles.discoverOverlay} />
            <div className={styles.discoverTextBlock}>
              <h2>{t('discover.chefTitle')}</h2>
              <p>{t('discover.chefText')}</p>
              <a href="#recipes" className={styles.cta}>{t('discover.cta')}</a>
            </div>
          </div>
        </div>

        <div className={styles.grid}>
          {loading ? (
            [...Array(6)].map((_, index) => <SkeletonCard key={index} />)
          ) : (
            recipes.map((recipe) => <RecipeCard key={recipe.idMeal} recipe={recipe} />)
          )}
        </div>
      </section>

      {/* Top Chefs */}
      <section className={styles.section}>
        <TopChefs />
      </section>

      {/* Consultant Chat Modal */}
      <ConsultantChat isOpen={showConsultant} onClose={() => setShowConsultant(false)} />

      {/* Floating Consultant Button */}
      <button 
        onClick={() => setShowConsultant(true)}
        className={styles.consultantButton}
        title="Консультант"
      >
        💬
      </button>

    </Motion.div>
  )
}

export default Home
