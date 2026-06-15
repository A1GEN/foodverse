import {

  useContext,
  useEffect,
  useState,
  useRef

} from "react"

import {

  Moon,
  Sun,
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
import { useSelector } from 'react-redux'

function Navbar() {

  const { t, i18n } = useTranslation()

  const { darkMode, toggleTheme } = useContext(ThemeContext)

  const { user, logout } = useContext(AuthContext)
  const { items: favorites } = useSelector(state => state.favorites)
  const { items: cart } = useSelector(state => state.cart)

  const [menuOpen, setMenuOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const langRef = useRef()
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
            <Link to="/delivery" className={location.pathname === "/delivery" ? styles.activeLink : ""}>{t("delivery", "Доставка")}</Link>
            <Link to="/contacts" className={location.pathname === "/contacts" ? styles.activeLink : ""}>{t("contacts", "Контакты")}</Link>
            <Link to="/about" className={location.pathname === "/about" ? styles.activeLink : ""}>{t("about", "О нас")}</Link>
          </nav>
        </div>

        <div className={styles.right}>

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
                    <Link to="/login" onClick={() => setMenuOpen(false)} className={styles.authBtn}>{t('menu.login')}</Link>
                    <Link to="/register" onClick={() => setMenuOpen(false)} className={styles.authBtnPrimary}>{t('menu.register')}</Link>
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