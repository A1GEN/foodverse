import {

  useContext,
  useEffect,
  useState

} from "react"

import {

  Moon,
  Sun

} from "lucide-react"

import {
  Link,
  useLocation
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

function Navbar() {

  const { t, i18n } = useTranslation()

  const { darkMode, toggleTheme } = useContext(ThemeContext)

  const { user, logout } = useContext(AuthContext)

  const [menuOpen, setMenuOpen] = useState(false)

  const [scrolled,setScrolled] =
    useState(false)

  const location = useLocation()

  useEffect(()=>{
    if (!menuOpen) return
    const t = setTimeout(()=> setMenuOpen(false), 0)
    return ()=> clearTimeout(t)
  },[location.pathname, menuOpen])

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
          <Motion.h1 whileHover={{ scale: 1.05 }} className={styles.logo}>FoodVerse</Motion.h1>
        </div>

        <div className={styles.center}>
          <nav className={styles.links} aria-label="Main navigation">
            <Link to="/" className={location.pathname === "/" ? styles.activeLink : ""}>{t("home")}</Link>
            <Link to="/favorites" className={location.pathname === "/favorites" ? styles.activeLink : ""}>{t("favorites")}</Link>
            <Link to="/create" className={location.pathname === "/create" ? styles.activeLink : ""}>Create</Link>
          </nav>
        </div>

        <div className={styles.right}>
          {!user && <Link to="/login">{t("login")}</Link>}
          {user && <Link to="/profile">{user.displayName || 'Profile'}</Link>}
          {user && user.email && user.email.toLowerCase() === 'argen@gmail.com' && (<Link to="/admin">Admin</Link>)}

          <div className={styles.controls}>
            <div className={styles.languages}>
              {[
                ['en','EN'],['ru','RU'],['kg','KG'],['es','ES'],['fr','FR'],['de','DE'],['it','IT'],['pt','PT'],['zh','中'],['ja','JP'],['hi','HI'],['ar','AR'],['tr','TR']
              ].map(([code,label])=> (
                <button key={code} onClick={() => i18n.changeLanguage(code)} aria-label={`lang-${code}`}>{label}</button>
              ))}
            </div>

            <Motion.button className={styles.themeBtn} onClick={toggleTheme} whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }} aria-label="Toggle theme">
              { darkMode ? <Sun /> : <Moon /> }
            </Motion.button>

            {user && (<button className={styles.logout} onClick={logout}>Logout</button>)}

            <button className={styles.menuBtn} onClick={() => setMenuOpen(v=>!v)} aria-label="menu" aria-expanded={menuOpen}>☰</button>
          </div>

        </div>

        {menuOpen && (
          <Motion.div className={styles.mobileMenu} role="menu" initial={{ opacity:0, y:-8 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.18 }}>
            <Link to="/" className={location.pathname === "/" ? styles.activeLink : ""}>{t("home")}</Link>
            <Link to="/favorites" className={location.pathname === "/favorites" ? styles.activeLink : ""}>{t("favorites")}</Link>
            <Link to="/create" className={location.pathname === "/create" ? styles.activeLink : ""}>Create</Link>
            {!user && <Link to="/login">{t("login")}</Link>}
            {user && <Link to="/profile">{user.displayName || 'Profile'}</Link>}
            <div className={styles.mobileControls}>
              <div className={styles.languages}>
                <button onClick={() => i18n.changeLanguage("en")}>EN</button>
                <button onClick={() => i18n.changeLanguage("ru")}>RU</button>
              </div>
              <Motion.button className={styles.themeBtn} onClick={toggleTheme} aria-label="Toggle theme">{ darkMode ? <Sun /> : <Moon /> }</Motion.button>
            </div>
          </Motion.div>
        )}

      </div>

    </Motion.nav>

  )

}

export default Navbar