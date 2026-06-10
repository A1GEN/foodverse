import styles from "./AdminStats.module.css"

function AdminStats() {

  return (

    <div className={styles.stats}>

      <div className={styles.card}>
        <h2>120</h2>
        <p>Recipes</p>
      </div>

      <div className={styles.card}>
        <h2>45</h2>
        <p>Users</p>
      </div>

      <div className={styles.card}>
        <h2>320</h2>
        <p>Favorites</p>
      </div>

    </div>

  )

}

export default AdminStats