import { useEffect, useState } from "react"
import { motion as Motion } from "framer-motion"
import styles from "./Home.module.css"

import Hero from "../../components/Hero/Hero"
import Search from "../../components/Search/Search"
import PopularCategories from "../../components/PopularCategories/PopularCategories"
import Categories from "../../components/Categories/Categories"
import TrendingRecipes from "../../components/TrendingRecipes/TrendingRecipes"
import RecipeOfDay from "../../components/RecipeOfDay/RecipeOfDay"
import RecipeCard from "../../components/RecipeCard/RecipeCard"
import SkeletonCard from "../../components/SkeletonCard/SkeletonCard"
import Desserts from "../../components/Desserts/Desserts"
import TopChefs from "../../components/TopChefs/TopChefs"
import { Suspense, lazy } from "react"
const AIChatChef = lazy(() => import("../../components/AIChatChef/AIChatChef"))
import { collection, getDocs } from "firebase/firestore"
import { getDb } from "../../lib/firebaseClient"

function Home() {
  const [recipes, setRecipes] = useState([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState("")

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

  const handleSearchMode = (q, mode) => {
    if (!q || q.trim() === "") return
    fetchRecipes(q, mode)
  }

  const handleCategory = (category) => {
    setSelectedCategory(category || "")
    if (!category) {
      fetchRecipes()
    } else {
      fetchRecipes(category, "category")
    }
  }

  return (
    <Motion.div className={styles.home} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>

      <div className={styles.heroWrap}>
        <Hero />
      </div>

      {/* Classic catalog / content block (static) */}
      <section className={styles.classicCatalog}>
        <div className={styles.classicInner}>
          <div className={styles.topLinks}>
            <button type="button" aria-label="Добавить в избранное" className={styles.chip}>Добавить в избранное</button>
            <button type="button" aria-label="Рецепты" className={styles.chip}>Рецепты</button>
            <button type="button" aria-label="Статьи" className={styles.chip}>Статьи</button>
            <button type="button" aria-label="Наша кухня" className={styles.chip}>Наша Кухня</button>
            <button type="button" aria-label="Супер поиск" className={styles.chip}>Супер Поиск</button>
            <button type="button" aria-label="Рассылки" className={styles.chip}>Рассылки</button>
            <button type="button" aria-label="Добавить рецепт" className={styles.chip}>Добавить рецепт</button>
          </div>

          <h2 className={styles.classicTitle}>Рецепты по типам блюд</h2>

          <div className={styles.catalogGrid}>
            <div>
              <h3>Рецепты первых блюд</h3>
              <p>Борщи, Ботвинья, Бульоны, Гаспачо, Капустняк, Кулеш, Лагман, Минестроне, Мисо, Окрошка, Рассольник, Свекольник, Сладкие супы, Солянка, Супы, Уха, Харчо, Хаш, Шурпа, Щи</p>

              <h3>Рецепты вторых блюд</h3>
              <p>Азу, Бефстроганов, Бешбармак, Бигус, Биточки, Бифштекс, Блюда из яиц, Бризоль, Буженина, Гарниры, Голубцы, Гречка по-купечески, Грибные, Гуляш, Долма, Жаркое, Запеканки, Зразы, Из морепродуктов, Каши, Колбаса домашняя, Колдуны, Котлеты, Крокеты, Купаты, Лазанья, Лангет, Лечо, Люля-кебаб, Мамалыга, Мусака, Мясные блюда, Мясо по-французски, Начинка, Овощные, Омлет, Отбивные, Паэлья, Плов, Полента, Пудинг, Рагу, Рататуй, Ризотто, Роллы, Ромштекс, Ростбиф, Рыбные блюда, Соте, Стейк, Суфле, Тефтели, Тортилья, Фалафель, Фрикадельки, Фрикасе, Цыпленок табака, Чанахи, Чахохбили, Шакшука, Шашлык, Шницель, Яичница</p>
            </div>

            <div>
              <h3>Рецепты заготовок</h3>
              <p>Баклажаны на зиму, Грибы на зиму, Кабачки на зиму, Квашение, Консервация, Мочение, Огурцы на зиму, Перец на зиму, Помидоры на зиму, Салаты на зиму, Сушка, Чеснок маринованный</p>

              <h3>Рецепты закусок</h3>
              <p>Аджапсандал, Бабагануш, Бастурма, Бургеры, Бутерброды, Винегрет, Галантин, Горячие закуски, Гуакамоле, Жульен, Закуски из грибов и овощей, Закуски из мяса и птицы, Закуски из рыбы и креветок, Закуски к пиву, Заливное, Икра овощная, Канапе, Кимчи, Лечо, Лобио, Луковые кольца, Паштеты, Салатные заправки, Салаты, Сосиски в тесте, Сырные шарики, Сэндвичи, Террин, Торт печеночный, Фондю, Форшмак, Холодные закуски, Хумус, Чипсы, Шаурма</p>
            </div>

            <div>
              <h3>Рецепты изделий из теста</h3>
              <p>Ачма, Баурсаки, Беляши, Блины и оладьи, Булочки, Вареники, Ватрушки, Вертута, Волованы, Галушки, Гренки, Драники, Клецки, Коржики, Круассаны, Куличи, Курник, Кутабы, Кыстыбый, Лапша, Лепешки, Манник, Манты, Ньокки, Пампушки, Панкейки, Паста, Пельмени, Пироги, Пирожки, Пицца, Плюшки, Пончики, Профитроли, Пряники, Пышки, Равиоли, Расстегаи, Рогалики, Рулет, Самса, Слойки, Сочники, Сухари, Сырники, Такос, Тарт, Тарталетки, Тесто, Хала, Ханум, Хачапури, Хинкали, Хлеб, Чебуреки, Чиабатта, Шаньги, Шарлотка, Штрудель, Энчилада, Эчпочмак</p>
            </div>
          </div>

          <p className={styles.description}>Наш кулинарный сайт — большая книга рецептов: тысячи рецептов с фото, пошаговыми инструкциями и полезными советами. Удобный поиск по типам и темам поможет быстро найти нужное блюдо.</p>
        </div>
      </section>

      {/* Popular Categories */}
      <section className={styles.section}>
        <PopularCategories />
      </section>

      {/* Search */}
      <section className={styles.section}>
        <Search search={search} setSearch={setSearch} handleSearch={handleSearchMode} />
      </section>

      {/* Categories */}
      <section className={styles.section}>
        <Categories handleCategory={handleCategory} selectedCategory={selectedCategory} />
      </section>

      {/* Trending & Recipe of the Day */}
      <section className={styles.section}>
        <TrendingRecipes />
        <RecipeOfDay />
      </section>

      {/* Recipes Grid */}
      <section id="recipes" className={styles.section}>
        <div className={styles.discoverBanner}>
          <div className={styles.discoverImageWrap}>
            <img src="https://images.unsplash.com/photo-1543352634-2c2f6f2d3f0b?q=80&w=1600&auto=format&fit=crop" alt="Featured dish" />
            <div className={styles.discoverOverlay} />
            <div className={styles.discoverTextBlock}>
              <h2>Рекомендация шефа: Тёплая паста с морепродуктами</h2>
              <p>Нежные морепродукты, томатный соус и хрустящие травы — быстрый и эффектный ужин.</p>
              <a href="#recipes" className={styles.cta}>Посмотреть рецепты</a>
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

      {/* Desserts */}
      <section className={styles.section}>
        <Desserts />
      </section>

      {/* Top Chefs */}
      <section className={styles.section}>
        <TopChefs />
      </section>

      {/* AI Chef (lazy) */}
      <section className={styles.section}>
        <Suspense fallback={<div style={{padding:20}}>Loading AI module...</div>}>
          <AIChatChef />
        </Suspense>
      </section>

    </Motion.div>
  )
}

export default Home
