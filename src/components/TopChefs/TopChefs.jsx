import { useState, useEffect } from "react"
import styles from "./TopChefs.module.css"
import { useTranslation } from "react-i18next"

const chefs = [

  {
    name:"Gordon Ramsay",
    image:"https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    recipes: 128,
    followers: 2100000
  },

  {
    name:"Jamie Oliver",
    image:"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
    recipes: 98,
    followers: 1400000
  },

  {
    name:"Chef Maria",
    image:"https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    recipes: 76,
    followers: 890000
  }

]

function TopChefs() {
  const { t } = useTranslation()
  const [selected, setSelected] = useState(null)

  useEffect(()=>{
    const onKey = (e)=>{ if(e.key === 'Escape') setSelected(null) }
    if(selected !== null){ window.addEventListener('keydown', onKey) }
    return ()=> window.removeEventListener('keydown', onKey)
  },[selected])

  return (

    <section className={styles.section}>

      <h2>{t('topChefs.title')}</h2>

      <div className={styles.grid}>

        {chefs.map((chef,index)=>(

          <div
            key={index}
            className={styles.card}
            onClick={()=> setSelected(index)}
            role="button"
            tabIndex={0}
          >

            <img src={chef.image} alt={chef.name} />

            <div className={styles.info}>
              <h3>{chef.name}</h3>
              <div className={styles.stats}>
                <span>🍽 {chef.recipes} {t('topChefs.recipesLabel')}</span>
                <span>❤️ {chef.followers.toLocaleString()} {t('topChefs.followersLabel')}</span>
              </div>
            </div>

          </div>

        ))}

      </div>

      {selected !== null && (
        <div className={styles.modalOverlay} onClick={()=>setSelected(null)}>
          <div className={styles.modal} onClick={(e)=>e.stopPropagation()}>
            <button className={styles.close} onClick={()=>setSelected(null)}>✕</button>
            <img src={chefs[selected].image} alt={chefs[selected].name} />
            <h3>{chefs[selected].name}</h3>
            <p>{t('topChefs.modalInfo', { count: chefs[selected].recipes, followers: chefs[selected].followers.toLocaleString() })}</p>
            <p>{t('topChefs.modalExplore', { name: chefs[selected].name })}</p>
          </div>
        </div>
      )}

    </section>

  )

}

export default TopChefs