import { House, Heart, PlusSquare, User } from "lucide-react"
import styles from "./BottomNav.module.css"
import { Link } from "react-router-dom"

function BottomNav() {
  return (
    <div className={styles.bottomNav}>
      <Link to="/">
        <House />
      </Link>

      <Link to="/favorites">
        <Heart />
      </Link>

      <Link to="/create">
        <PlusSquare />
      </Link>

      <Link to="/profile">
        <User />
      </Link>
    </div>
  )
}

export default BottomNav