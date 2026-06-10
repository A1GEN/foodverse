import {
  useEffect,
  useState
} from "react"

import styles from "./ShoppingList.module.css"
import { useTranslation } from "react-i18next"

function ShoppingList({ ingredients, recipeId }) {
  const { t } = useTranslation()

  const [checkedItems, setCheckedItems] =
    useState(() => JSON.parse(localStorage.getItem(`shopping-${recipeId}`)) || [])

  // 🔥 Save checked items
  useEffect(() => {

    localStorage.setItem(
      `shopping-${recipeId}`,
      JSON.stringify(checkedItems)
    )

  }, [checkedItems, recipeId])

  // ✅ Toggle check
  const toggleItem = (item) => {

    if(
      checkedItems.includes(item)
    ) {

      setCheckedItems(
        checkedItems.filter(
          (i) => i !== item
        )
      )

    } else {

      setCheckedItems([
        ...checkedItems,
        item
      ])

    }

  }

  return (

    <div className={styles.shopping}>
      <h2>{t('shopping.title','Shopping List 🛒')}</h2>

      <div className={styles.list}>

        {ingredients.map(
          (item, index) => (

            <div
              key={index}
              className={styles.item}
              onClick={() =>
                toggleItem(item)
              }
            >

              <input
                type="checkbox"
                checked={
                  checkedItems.includes(item)
                }
                readOnly
              />

              <span
                className={
                  checkedItems.includes(item)
                    ? styles.checked
                    : ""
                }
              >
                {item}
              </span>

            </div>

          )
        )}

      </div>

    </div>

  )

}

export default ShoppingList