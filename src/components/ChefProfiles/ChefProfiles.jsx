import { useState } from "react"

import styles
from "./ChefProfiles.module.css"

const chefs = [

  {

    id:1,

    name:"Gordon Ramsay",

    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",

    recipes:128,

    followers:2100000,

    bio:
      "Master Chef & Restaurant Owner"

  },

  {

    id:2,

    name:"Jamie Oliver",

    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",

    recipes:98,

    followers:1400000,

    bio:
      "Healthy Food Creator"

  },

  {

    id:3,

    name:"Sophie Kim",

    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330",

    recipes:76,

    followers:890000,

    bio:
      "Asian Food Expert"

  }

]

function ChefProfiles() {

  const [followed,setFollowed] =
    useState(()=> JSON.parse(localStorage.getItem('followedChefs')) || [])

  // 🔥 Toggle follow
  const toggleFollow =
    (chefId)=>{

      let updated = []

      if(

        followed.includes(chefId)

      ){

        updated =

          followed.filter(
            id=>id !== chefId
          )

      }

      else{

        updated = [
          ...followed,
          chefId
        ]

      }

      setFollowed(updated)

      localStorage.setItem(

        "followedChefs",

        JSON.stringify(updated)

      )

  }

  return (

    <section className={styles.chefs}>

      <h1>
        Top Chefs 👨‍🍳
      </h1>

      <p>
        Follow your favorite chefs 😎
      </p>

      <div className={styles.grid}>

        {

          chefs.map(chef=>(

            <div

              key={chef.id}

              className={styles.card}

            >

              <img
                src={chef.image}
                alt={chef.name}
              />

              <h2>
                {chef.name}
              </h2>

              <p>
                {chef.bio}
              </p>

              <div className={styles.stats}>

                <span>
                  🍔 {chef.recipes}
                </span>

                <span>
                  ❤️ {chef.followers}
                </span>

              </div>

              <button

                onClick={()=>
                  toggleFollow(chef.id)
                }

              >

                {

                  followed.includes(
                    chef.id
                  )

                  ? "Following ❤️"

                  : "Follow"

                }

              </button>

            </div>

          ))

        }

      </div>

    </section>

  )

}

export default ChefProfiles