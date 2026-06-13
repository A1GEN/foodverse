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
        <h1>Вход в аккаунт</h1>
        <p className={styles.subtitle}>Введите свои данные для входа</p>

        <div className={styles.inputGroup}>
          <label>Email</label>
          <input type="email" placeholder="example@email.com" value={email} onChange={e=>setEmail(e.target.value)} />
        </div>

        <div className={styles.inputGroup}>
          <label>Пароль</label>
          <input type="password" placeholder="Минимум 6 символов" value={password} onChange={e=>setPassword(e.target.value)} />
        </div>

        <button className="btn btn-primary">Войти</button>

        <div className={styles.switch}>
          Нет аккаунта? <a href="/register">Зарегистрироваться</a>
        </div>

      </form>
    </div>
  )

}

export default Login