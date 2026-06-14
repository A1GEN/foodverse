import {

  useContext,
  useEffect,
  useState,
  useRef

} from "react"

import {

  Moon,
  Sun,
  Search,
  User,
  ShoppingCart,
  Heart,
  Menu,
  X

} from "lucide-react"

import {
  Link,
  useLocation,
  useNavigate
} from "react-router-dom"

import {

  ThemeContext

} from "../../context/ThemeContext"

import {

  useTranslation

} from "react-i18next"

import {

  motion as Motion

} from "framer-motion"

import styles from "./Navbar.module.css"
import { AuthContext } from "../../context/AuthContext/AuthContext"
import { FavoritesContext } from "../../context/FavoritesContext/FavoritesContext"
import { useSelector } from 'react-redux'

function Navbar() {

  const { t, i18n } = useTranslation()

  const { darkMode, toggleTheme } = useContext(ThemeContext)

  const { user, logout } = useContext(AuthContext)
  const { favorites } = useContext(FavoritesContext)
  const { items: cart } = useSelector(state => state.cart)

  const [menuOpen, setMenuOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const langRef = useRef()
  const searchRef = useRef()
  const navigate = useNavigate()

  const [scrolled,setScrolled] =
    useState(false)

  const location = useLocation()

  // close language menu on outside click
  useEffect(()=>{
    const onDoc = (e)=>{
      if(langRef.current && !langRef.current.contains(e.target)){
        setLangOpen(false)
      }
      if(searchRef.current && !searchRef.current.contains(e.target)){
        setSearchOpen(false)
      }
    }
    document.addEventListener('click', onDoc)
    return ()=> document.removeEventListener('click', onDoc)
  },[])

  useEffect(()=>{

    const handleScroll = ()=>{

      setScrolled(
        window.scrollY > 50
      )

    }

    window.addEventListener(
      "scroll",
      handleScroll
    )

    return ()=>{

      window.removeEventListener(
        "scroll",
        handleScroll
      )

    }

  },[])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery)}`)
      setSearchOpen(false)
      setSearchQuery("")
    }
  }

  return (

    <Motion.nav

      className={`

        ${styles.nav}

        ${scrolled
          ? styles.active
          : ""
        }

      `}

      initial={{
        y:-100
      }}

      animate={{
        y:0
      }}

      transition={{
        duration:0.5
      }}


    >

      <div className={styles.navInner}>

        <div className={styles.left}>
          <button 
            className={styles.menuBtn} 
            onClick={() => setMenuOpen(v=>!v)} 
            aria-label="menu" 
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <Link to="/" className={styles.logoLink}>
            <Motion.h1 whileHover={{ scale: 1.05 }} className={styles.logo}>FoodVerse</Motion.h1>
          </Link>
        </div>

        <div className={styles.center}>
            <nav className={styles.links} aria-label="Main navigation">
            <Link to="/" className={location.pathname === "/" ? styles.activeLink : ""}>{t("home")}</Link>
            <Link to="/catalog" className={location.pathname === "/catalog" ? styles.activeLink : ""}>{t("catalog", "Каталог")}</Link>
            <Link to="/create" className={location.pathname === "/create" ? styles.activeLink : ""}>{t("create")}</Link>
            <Link to="/recipes" className={location.pathname === "/recipes" ? styles.activeLink : ""}>{t("recipes", "Рецепты")}</Link>
          </nav>
        </div>

        <div className={styles.right}>

          <div className={styles.searchWrapper} ref={searchRef}>
            <Motion.button 
              className={styles.iconBtn} 
              onClick={() => setSearchOpen(v=>!v)}
              whileHover={{ scale:1.1 }}
              whileTap={{ scale:0.9 }}
              aria-label="Search"
            >
              <Search size={20} />
            </Motion.button>
            {searchOpen && (
              <Motion.form 
                className={styles.searchForm}
                onSubmit={handleSearch}
                initial={{ opacity:0, y:-10 }}
                animate={{ opacity:1, y:0 }}
                transition={{ duration:0.2 }}
              >
                <input
                  type="text"
                  placeholder={t('search.placeholder', 'Search recipes...')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={styles.searchInput}
                />
                <button type="submit" className={styles.searchSubmit}>
                  <Search size={18} />
                </button>
              </Motion.form>
            )}
          </div>

          <Link to="/favorites" className={styles.iconBtn} aria-label="Favorites">
            <Heart size={20} />
            {favorites.length > 0 && <span className={styles.badge}>{favorites.length}</span>}
          </Link>

          <Link to="/cart" className={styles.iconBtn} aria-label="Cart">
            <ShoppingCart size={20} />
            {cart.length > 0 && <span className={styles.badge}>{cart.length}</span>}
          </Link>

          {user && (
            <Link to="/profile" className={styles.iconBtn} aria-label="Profile">
              <User size={20} />
            </Link>
          )}

          {!user && <Link to="/login" className={styles.loginBtn}>{t("login")}</Link>}
          {user && user.email && user.email.toLowerCase() === 'argen@gmail.com' && (<Link to="/admin" className={styles.adminBtn}>{t('admin')}</Link>)}

          <div className={styles.controls}>
            <div className={styles.langWrapper} ref={langRef}>
              <button className={`${styles.langToggle} ${langOpen ? styles.open : ''}`} onClick={() => setLangOpen(v=>!v)} aria-haspopup="menu" aria-expanded={langOpen} aria-label={`lang-${i18n.language}`}>
                <span>{i18n.language && i18n.language.toUpperCase()}</span>
                <span className={styles.arrow}>▾</span>
              </button>
              {langOpen && (
                <Motion.div className={styles.langMenu} role="menu" initial={{ opacity:0, y:-8 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.18 }}>
                  {[
                    ['en','EN'],['ru','RU'],['kg','KG']
                  ].map(([code,label])=> (
                    <button key={code} onClick={() => { i18n.changeLanguage(code); setLangOpen(false) }} aria-label={`lang-${code}`} role="menuitem">{label}</button>
                  ))}
                </Motion.div>
              )}
            </div>

            <Motion.button className={styles.themeBtn} onClick={toggleTheme} whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }} aria-label="Toggle theme">
              { darkMode ? <Sun size={20} /> : <Moon size={20} /> }
            </Motion.button>

            {user && (<button className={styles.logout} onClick={logout} aria-label="Logout">{t('logout')}</button>)}

          </div>

        </div>

        {menuOpen && (
          <Motion.div className={styles.fullMenu} role="menu" initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.3 }}>
            <div className={styles.menuHeader}>
              <h2>Menu</h2>
              <button onClick={() => setMenuOpen(false)} className={styles.closeBtn}>
                <X size={24} />
              </button>
            </div>

            <div className={styles.menuGrid}>
              <div className={styles.menuColumn}>
                <h3>{t('menu.account')}</h3>
                {!user && (
                  <>
                    <Link to="/login" onClick={() => setMenuOpen(false)}>{t('menu.login')}</Link>
                    <Link to="/register" onClick={() => setMenuOpen(false)}>{t('menu.register')}</Link>
                  </>
                )}
                {user && (
                  <>
                    <Link to="/profile" onClick={() => setMenuOpen(false)}>{t('menu.profile')}</Link>
                    <button onClick={() => { logout(); setMenuOpen(false); }}>{t('menu.logout')}</button>
                  </>
                )}
              </div>

              <div className={styles.menuColumn}>
                <h3>{t('menu.navigation')}</h3>
                <Link to="/" onClick={() => setMenuOpen(false)}>{t('menu.home')}</Link>
                <Link to="/catalog" onClick={() => setMenuOpen(false)}>{t('menu.catalog')}</Link>
                <Link to="/recipes" onClick={() => setMenuOpen(false)}>{t('menu.recipes')}</Link>
                <Link to="/contact" onClick={() => setMenuOpen(false)}>{t('menu.contacts')}</Link>
              </div>

              <div className={styles.menuColumn}>
                <h3>{t('menu.contacts')}</h3>
                <div className={styles.contactInfo}>
                  <div className={styles.contactItem}>
                    <span className={styles.contactLabel}>Телефон:</span>
                    <a href="tel:+996555123456" className={styles.contactValue}>+996 555 123 456</a>
                  </div>
                  <div className={styles.contactItem}>
                    <span className={styles.contactLabel}>Email:</span>
                    <a href="mailto:info@foodverse.kg" className={styles.contactValue}>info@foodverse.kg</a>
                  </div>
                  <div className={styles.contactItem}>
                    <span className={styles.contactLabel}>Адрес:</span>
                    <span className={styles.contactValue}>г. Бишкек, пр. Чуй 123</span>
                  </div>
                  <div className={styles.contactItem}>
                    <span className={styles.contactLabel}>Режим работы:</span>
                    <span className={styles.contactValue}>Ежедневно 9:00 - 22:00</span>
                  </div>
                </div>
              </div>

              <div className={styles.menuColumn}>
                <h3>{t('menu.actions')}</h3>
                <Link to="/favorites" onClick={() => setMenuOpen(false)}>{t('menu.favorites')}</Link>
                <Link to="/cart" onClick={() => setMenuOpen(false)}>{t('menu.cart')}</Link>
                <button onClick={() => { toggleTheme(); setMenuOpen(false); }}>
                  {darkMode ? t('menu.lightTheme') : t('menu.darkTheme')}
                </button>
              </div>
            </div>

            <div className={styles.menuFooter}>
              <div className={styles.langSection}>
                <h3>Язык</h3>
                <div className={styles.langOptions}>
                  <button onClick={() => { i18n.changeLanguage('ru'); setMenuOpen(false); }} className={i18n.language === 'ru' ? styles.activeLang : ''}>
                    🇷🇺 Русский
                  </button>
                  <button onClick={() => { i18n.changeLanguage('en'); setMenuOpen(false); }} className={i18n.language === 'en' ? styles.activeLang : ''}>
                    🇬🇧 English
                  </button>
                  <button onClick={() => { i18n.changeLanguage('kg'); setMenuOpen(false); }} className={i18n.language === 'kg' ? styles.activeLang : ''}>
                    🇰🇬 Кыргызча
                  </button>
                </div>
              </div>
            </div>
          </Motion.div>
        )}

      </div>

    </Motion.nav>

  )

}

export default Navbar