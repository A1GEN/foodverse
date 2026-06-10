import { useState }
from "react"

import styles
from "./SmartGroceryAI.module.css"

function SmartGroceryAI() {

  const [recipe,setRecipe] =
    useState("")

  const [items,setItems] =
    useState([])

  const [loading,setLoading] = useState(false)

  const generateList = ()=>{

    if(!recipe || !recipe.trim()) return
    setLoading(true)
    // simulate AI generation
    setTimeout(()=>{
      const parts = recipe.toLowerCase().split(/\s+/)
      const grocery = []
      if(parts.includes('chicken')) grocery.push('Chicken 🍗')
      if(parts.includes('cheese')) grocery.push('Cheese 🧀')
      if(parts.includes('salad') || parts.includes('salad')) grocery.push('Lettuce 🥬')
      grocery.push('Tomatoes 🍅', 'Onion 🧅', 'Salt & Pepper 🧂')
      setItems(grocery)
      setLoading(false)
    },700)

  }

  return (

    <div className={styles.grocery}>

      <h2>
        Smart Grocery AI 🛒
      </h2>

      <input

        type="text"

        placeholder="
        Enter recipe name...
        "

        value={recipe}

        onChange={(e)=>
          setRecipe(e.target.value)
        }

      />

      <button onClick={generateList} disabled={loading || !recipe}>
        {loading ? 'Generating...' : 'Generate List'}
      </button>

      <div className={styles.list}>
        {items.length === 0 ? <p className={styles.hint}>Enter a recipe name and press Generate.</p> : (
          items.map((item, index) => (
            <div key={index} className={styles.item}>{item}</div>
          ))
        )}
      </div>

    </div>

  )

}

export default SmartGroceryAI