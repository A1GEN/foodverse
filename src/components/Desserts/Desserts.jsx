import styles from "./Desserts.module.css"
import { useTranslation } from 'react-i18next'

const desserts = [

  {
    name:"Chocolate Cake 🍫",
    image:"https://images.unsplash.com/photo-1578985545062-69928b1d9587"
  },

  {
    name:"Ice Cream 🍦",
    image:"https://images.unsplash.com/photo-1563805042-7684c019e1cb"
  },

  {
    name:"Donut 🍩",
    image:"https://images.unsplash.com/photo-1551024601-bec78aea704b"
  },

  {
    name:"Cookie 🍪",
    image:"https://images.unsplash.com/photo-1499636136210-6f4ee915583e"
  }

]

function Desserts() {
  const { t } = useTranslation()

  return (
    <div className={styles.wrapper}>
      <h2>{t('desserts.title','Desserts 🍫')}</h2>

      <div className={styles.grid}>
        {desserts.map((item,index)=>(
          <div key={index} className={styles.card}>
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Desserts