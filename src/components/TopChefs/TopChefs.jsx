import { useState, useEffect } from "react"
import styles from "./TopChefs.module.css"

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

  const [selected, setSelected] = useState(null)

  useEffect(()=>{
    const onKey = (e)=>{ if(e.key === 'Escape') setSelected(null) }
    if(selected !== null){ window.addEventListener('keydown', onKey) }
    return ()=> window.removeEventListener('keydown', onKey)
  },[selected])

  return (

    <section className={styles.section}>

      <h2>Top Chefs 👨‍🍳</h2>

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
                <span>🍽 {chef.recipes} recipes</span>
                <span>❤️ {chef.followers.toLocaleString()}</span>
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
            <p>Top chef with {chefs[selected].recipes} curated recipes and {chefs[selected].followers.toLocaleString()} followers.</p>
            <p>Explore signature dishes and cooking tips from {chefs[selected].name}.</p>
          </div>
        </div>
      )}

    </section>

  )

}

export default TopChefs