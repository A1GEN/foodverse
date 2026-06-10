import { useState }
from "react"

import styles
from "./CookingChallenges.module.css"

function CookingChallenges() {

  const challenges = [

    {

      id:1,

      title:
        "Make Italian Pizza 🍕",

      reward:
        "100 XP"

    },

    {

      id:2,

      title:
        "Cook Healthy Salad 🥗",

      reward:
        "70 XP"

    },

    {

      id:3,

      title:
        "Bake Chocolate Cake 🍰",

      reward:
        "150 XP"

    }

  ]

  const [completed,setCompleted] =
    useState([])

  const completeChallenge =
    (id)=>{

      if(
        completed.includes(id)
      ) return

      setCompleted([
        ...completed,
        id
      ])

    }

  return (

    <div className={styles.challenges}>

      <h2>
        Cooking Challenges 🔥
      </h2>

      <div className={styles.grid}>

        {

          challenges.map(challenge=>(

            <div

              key={challenge.id}

              className={styles.card}

            >

              <h3>
                {challenge.title}
              </h3>

              <p>
                Reward:
                {challenge.reward}
              </p>

              <button

                onClick={()=>
                  completeChallenge(
                    challenge.id
                  )
                }

              >

                {

                  completed.includes(
                    challenge.id
                  )

                  ? "Completed ✅"

                  : "Complete"

                }

              </button>

            </div>

          ))

        }

      </div>

    </div>

  )

}

export default CookingChallenges