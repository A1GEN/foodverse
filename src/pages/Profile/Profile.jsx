import styles from "./Profile.module.css"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext/AuthContext"
import { signOut } from "firebase/auth"
import { getAuth } from "../../lib/firebaseClient"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { ShoppingCart, Heart, LogOut } from "lucide-react"

function Profile() {
  const { user, userData } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      const auth = await getAuth()
      await signOut(auth)
      toast.success("Вы вышли из аккаунта")
      navigate("/")
    } catch (error) {
      toast.error(error.message)
    }
  }

  const formatDate = (timestamp) => {
    if (!timestamp) return "Неизвестно"
    const date = new Date(timestamp)
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  if(!user) return (
    <div className={styles.profile}><p>Пожалуйста, войдите в аккаунт</p></div>
  )

  const registrationDate = user.metadata?.creationTime || userData?.createdAt

  return (
    <div className={styles.profile}>
      <div className={styles.container}>
        <div className={styles.userInfo}>
          <h1>{userData?.displayName || user.displayName || "Пользователь"}</h1>
          <p className={styles.userEmail}>{user.email}</p>
        </div>

        <div className={styles.infoSection}>
          <div className={styles.infoItem}>
            <label>Email</label>
            <span>{user.email}</span>
          </div>
          <div className={styles.infoItem}>
            <label>Дата регистрации</label>
            <span>{formatDate(registrationDate)}</span>
          </div>
        </div>

        <div className={styles.actions}>
          <button className={styles.actionBtn} onClick={() => navigate("/cart")}>
            <ShoppingCart size={20} />
            Моя корзина
          </button>
          <button className={styles.actionBtn} onClick={() => navigate("/favorites")}>
            <Heart size={20} />
            Избранное
          </button>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            <LogOut size={20} />
            Выйти
          </button>
        </div>
      </div>
    </div>
  )
}

export default Profile