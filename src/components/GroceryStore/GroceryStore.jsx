import {
  useState
} from "react"

import styles
from "./GroceryStore.module.css"

function GroceryStore() {

  const [items,setItems] =
    useState([])

  const [input,setInput] =
    useState("")

  // ➕ Add item
  const addItem = ()=>{

    if(!input.trim()) return

    const newItem = {

      id:Date.now(),
      name:input

    }

    setItems([
      ...items,
      newItem
    ])

    setInput("")

  }

  // ❌ Remove item
  const removeItem = (id)=>{

    setItems(

      items.filter(
        item=>item.id !== id
      )

    )

  }

  return (

    <section className={styles.store}>

      <h1>
        Grocery Store 🛒
      </h1>

      <p>
        Create your shopping list 😎
      </p>

      <div className={styles.top}>

        <input
          type="text"
          placeholder="Add ingredient..."
          value={input}
          onChange={(e)=>
            setInput(e.target.value)
          }
        />

        <button
          onClick={addItem}
        >
          Add
        </button>

      </div>

      <div className={styles.total}>

        Total Items:
        {items.length}

      </div>

      <div className={styles.list}>

        {

          items.map(item=>(

            <div
              key={item.id}
              className={styles.item}
            >

              <span>
                🥦 {item.name}
              </span>

              <button
                onClick={()=>
                  removeItem(item.id)
                }
              >
                ❌
              </button>

            </div>

          ))

        }

      </div>

    </section>

  )

}

export default GroceryStore