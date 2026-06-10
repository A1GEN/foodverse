import TinderCard
from "react-tinder-card"

import styles
from "./SwipeRecipes.module.css"

const recipes = [

  {

    id:1,

    title:"Pizza 🍕",

    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591"

  },

  {

    id:2,

    title:"Burger 🍔",

    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd"

  },

  {

    id:3,

    title:"Cake 🍰",

    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587"

  }

]

function SwipeRecipes() {

  const onSwipe =
    (direction,name)=>{

      console.log(
        name,
        "swiped",
        direction
      )

    }

  return (

    <div className={styles.swipe}>

      <h2>
        Swipe Recipes 🔥
      </h2>

      <div className={styles.container}>

        {

          recipes.map(recipe=>(

            <TinderCard

              key={recipe.id}

              onSwipe={(dir)=>
                onSwipe(
                  dir,
                  recipe.title
                )
              }

              preventSwipe={[
                "up",
                "down"
              ]}

            >

              <div
                className={styles.card}
              >

                <img
                  src={recipe.image}
                  alt={recipe.title}
                />

                <h3>
                  {recipe.title}
                </h3>

              </div>

            </TinderCard>

          ))

        }

      </div>

    </div>

  )

}

export default SwipeRecipes