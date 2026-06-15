import { useState, useEffect } from "react"
import { Heart, Utensils, X, Award, Star, MapPin, ChefHat, Globe } from 'lucide-react'
import styles from "./TopChefs.module.css"
import { useTranslation } from "react-i18next"

const chefs = [

  {
    name:"Gordon Ramsay",
    image:"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&h=800&fit=crop",
    recipes: 128,
    followers: 2100000,
    specialty: "French Cuisine",
    rating: 4.9,
    location: "London, UK"
  },

  {
    name:"Jamie Oliver",
    image:"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&h=800&fit=crop",
    recipes: 98,
    followers: 1400000,
    specialty: "Italian Cuisine",
    rating: 4.8,
    location: "Essex, UK"
  },

  {
    name:"Chef Maria",
    image:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=800&fit=crop",
    recipes: 76,
    followers: 890000,
    specialty: "Mediterranean",
    rating: 4.7,
    location: "Barcelona, Spain"
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
              <p className={styles.specialty}>{chef.specialty}</p>
              <div className={styles.stats}>
                <span><Utensils size={14} className={styles.icon} /> {chef.recipes} {t('topChefs.recipesLabel')}</span>
                <span><Heart size={14} className={styles.icon} /> {chef.followers.toLocaleString()} {t('topChefs.followersLabel')}</span>
              </div>
            </div>

          </div>

        ))}

      </div>

      {selected !== null && (
        <div className={styles.modalOverlay} onClick={()=>setSelected(null)}>
          <div className={styles.modal} onClick={(e)=>e.stopPropagation()}>
            <button className={styles.close} onClick={()=>setSelected(null)} aria-label="Close">
              <X size={24} />
            </button>
            
            <div className={styles.modalHeader}>
              <div className={styles.modalImageWrapper}>
                <img src={chefs[selected].image} alt={chefs[selected].name} />
                <div className={styles.modalImageOverlay} />
              </div>
            </div>

            <div className={styles.modalContent}>
              <div className={styles.modalBadge}>
                <Award size={16} className={styles.badgeIcon} />
                <span>Top Chef</span>
              </div>

              <h3 className={styles.modalTitle}>{chefs[selected].name}</h3>
              
              <div className={styles.modalMeta}>
                <span className={styles.metaItem}>
                  <MapPin size={16} className={styles.metaIcon} />
                  {chefs[selected].location}
                </span>
                <span className={styles.metaItem}>
                  <ChefHat size={16} className={styles.metaIcon} />
                  {chefs[selected].specialty}
                </span>
              </div>

              <div className={styles.modalStats}>
                <div className={styles.statItem}>
                  <div className={styles.statIcon}>
                    <Utensils size={20} />
                  </div>
                  <div className={styles.statInfo}>
                    <span className={styles.statValue}>{chefs[selected].recipes}</span>
                    <span className={styles.statLabel}>{t('topChefs.recipesLabel')}</span>
                  </div>
                </div>

                <div className={styles.statDivider} />

                <div className={styles.statItem}>
                  <div className={styles.statIcon}>
                    <Heart size={20} />
                  </div>
                  <div className={styles.statInfo}>
                    <span className={styles.statValue}>{(chefs[selected].followers / 1000000).toFixed(1)}M</span>
                    <span className={styles.statLabel}>{t('topChefs.followersLabel')}</span>
                  </div>
                </div>

                <div className={styles.statDivider} />

                <div className={styles.statItem}>
                  <div className={styles.statIcon}>
                    <Star size={20} />
                  </div>
                  <div className={styles.statInfo}>
                    <span className={styles.statValue}>{chefs[selected].rating}</span>
                    <span className={styles.statLabel}>Rating</span>
                  </div>
                </div>
              </div>

              <p className={styles.modalDescription}>
                {t('topChefs.modalInfo', { count: chefs[selected].recipes, followers: chefs[selected].followers.toLocaleString() })}
              </p>

              <p className={styles.modalExplore}>
                {t('topChefs.modalExplore', { name: chefs[selected].name })}
              </p>

              <button className={styles.modalButton}>
                View Recipes <Utensils size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

    </section>

  )

}

export default TopChefs