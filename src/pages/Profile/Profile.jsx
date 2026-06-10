import styles from "./Profile.module.css"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext/AuthContext"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { collection, query, where, getDocs } from "firebase/firestore"
import { getDb } from "../../lib/firebaseClient"

function Profile() {
  const { user, userData } = useContext(AuthContext)
  const { t } = useTranslation()

  const [myRecipes, setMyRecipes] = useState([])

  useEffect(()=>{
    const load = async ()=>{
      if(!user) return
      const db = await getDb()
      const q = query(collection(db, 'recipes'), where('author','==', user.uid))
      const snap = await getDocs(q)
      setMyRecipes(snap.docs.map(d=>({ id:d.id, ...d.data() })))
    }
    load()
  },[user])

  if(!user) return (
    <div className={styles.profile}><p>{t('profile.loginPrompt','Please log in to see your profile.')}</p></div>
  )

  return (
    <div className={styles.profile}>
      <div className={styles.header}>
        <img src={userData?.avatar || user.photoURL || 'https://i.pravatar.cc/300'} alt="avatar" className={styles.avatar} />
        <h1>{userData?.displayName || user.displayName || t('profile.defaultName','Chef')}</h1>
        <p>{userData?.bio || t('profile.defaultBio','Food lover & recipe creator')}</p>
        <button>{t('profile.editProfile','Edit Profile')}</button>
      </div>

      <div className={styles.stats}>
        <div><h2>{myRecipes.length}</h2><p>{t('profile.stats.recipes','Recipes')}</p></div>
        <div><h2>{userData?.favorites ? userData.favorites.length : 0}</h2><p>{t('profile.stats.favorites','Favorites')}</p></div>
        <div><h2>{userData?.followers || 0}</h2><p>{t('profile.stats.followers','Followers')}</p></div>
      </div>

      <div className={styles.saved}>
        <h2>{t('profile.saved.title','Saved Recipes ❤️')}</h2>
        <div className={styles.grid}>
          {(userData?.favorites || []).map((fav, i) => (
            <div key={i} className={styles.card}>{fav.strMeal || fav.title || 'Recipe'}</div>
          ))}
        </div>

      </div>

      <div className={styles.uploaded}>
        <h2>{t('profile.uploads.title','Your uploads')}</h2>
        <div className={styles.grid}>
          {myRecipes.map(r=> (
            <div key={r.id} className={styles.card}>{r.title}</div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default Profile