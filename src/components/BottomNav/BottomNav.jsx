import {
  House,
  Heart,
  PlusSquare,
  User
} from "lucide-react"

import styles
from "./BottomNav.module.css"

function BottomNav() {

  return (

    <div className={styles.bottomNav}>

      <a href="/">
        <House />
      </a>

      <a href="/favorites">
        <Heart />
      </a>

      <a href="/create">
        <PlusSquare />
      </a>

      <a href="/profile">
        <User />
      </a>

    </div>

  )

}

export default BottomNav