import { useEffect, useState } from "react"
import { motion as Motion } from "framer-motion"
import styles from "./Home.module.css"
import { MessageCircle } from "lucide-react"

import Hero from "../../components/Hero/Hero"
import ProductCard from "../../components/ProductCard/ProductCard"
import SkeletonCard from "../../components/SkeletonCard/SkeletonCard"
import TopChefs from "../../components/TopChefs/TopChefs"
import ConsultantChat from "../../components/ConsultantChat/ConsultantChat"
import SeasonalRecipes from "../../components/SeasonalRecipes/SeasonalRecipes"
import HolidayRecipes from "../../components/HolidayRecipes/HolidayRecipes"
import NationalCuisines from "../../components/NationalCuisines/NationalCuisines"
import { getProducts } from "../../services/productService"
import { useTranslation } from "react-i18next"

function Home() {
  const { t } = useTranslation()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showConsultant, setShowConsultant] = useState(false)

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const data = await getProducts()
      setProducts(data || [])
    } catch (error) {
      console.error("Error fetching products:", error)
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let mounted = true
    ;(async () => {
      if (!mounted) return
      await fetchProducts()
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

      {/* Products Grid */}
      <section id="products" className={styles.section}>
        <div className={styles.discoverBanner}>
          <div className={styles.discoverImageWrap}>
            <img src="https://images.unsplash.com/photo-1543352634-2c2f6f2d3f0b?q=80&w=1600&auto=format&fit=crop" alt="Featured dish" />
            <div className={styles.discoverOverlay} />
            <div className={styles.discoverTextBlock}>
              <h2>{t('discover.chefTitle')}</h2>
              <p>{t('discover.chefText')}</p>
              <a href="#products" className={styles.cta}>{t('discover.cta')}</a>
            </div>
          </div>
        </div>

        <div className={styles.grid}>
          {loading ? (
            [...Array(6)].map((_, index) => <SkeletonCard key={index} />)
          ) : (
            products.map((product) => <ProductCard key={product.id} product={product} />)
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
        <MessageCircle size={24} />
      </button>

    </Motion.div>
  )
}

export default Home
