import { useState } from "react"
import { useTranslation } from "react-i18next"
import { signInWithEmailAndPassword } from "firebase/auth"
import { getAuth } from "../../lib/firebaseClient"
import { toast } from "react-toastify"
import styles from "./Login.module.css"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext/AuthContext"

function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [remember, setRemember] = useState(false)
  const [show, setShow] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const auth = await getAuth()
      await signInWithEmailAndPassword(auth, email, password)
      toast.success("Вход выполнен успешно")
      if (email.toLowerCase() === 'argen@gmail.com') {
        navigate('/admin')
      } else {
        navigate('/profile')
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const { t } = useTranslation()

  return (
    <div className={styles.login}>
      <form onSubmit={handleLogin} className={styles.form}>
        <h1>{t('welcomeBack')}</h1>

        <input type="email" placeholder={t('emailPlaceholder')} value={email} onChange={e=>setEmail(e.target.value)} />

        <div className={styles.passRow}>
          <input type={show?"text":"password"} placeholder={t('passwordPlaceholder')} value={password} onChange={e=>setPassword(e.target.value)} />
          <button type="button" className={styles.showBtn} onClick={()=>setShow(s=>!s)}>{show? t('hide'):t('show')}</button>
        </div>

        <div className={styles.options}>
          <label><input type="checkbox" checked={remember} onChange={e=>setRemember(e.target.checked)} /> {t('rememberMe')}</label>
        </div>

        <button className="btn btn-primary">{t('loginButton')}</button>

        <div className={styles.regLink}>{t('noAccount')} <a href="/register">{t('register')}</a></div>

      </form>
    </div>
  )

}

export default Login