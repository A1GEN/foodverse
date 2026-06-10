import { useState }
from "react"

import styles
from "./NutritionCalculator.module.css"

function NutritionCalculator() {

  const [protein,setProtein] =
    useState("")

  const [carbs,setCarbs] =
    useState("")

  const [fat,setFat] =
    useState("")

  const [result,setResult] =
    useState(null)

  const calculateNutrition = ()=>{

    const total =

      Number(protein) * 4 +

      Number(carbs) * 4 +

      Number(fat) * 9

    setResult(total)

  }

  return (

    <div className={styles.calculator}>

      <h2>
        Nutrition Calculator 🥗
      </h2>

      <div className={styles.inputs}>

        <input

          type="number"

          placeholder="Protein (g)"

          value={protein}

          onChange={(e)=>
            setProtein(e.target.value)
          }

        />

        <input

          type="number"

          placeholder="Carbs (g)"

          value={carbs}

          onChange={(e)=>
            setCarbs(e.target.value)
          }

        />

        <input

          type="number"

          placeholder="Fat (g)"

          value={fat}

          onChange={(e)=>
            setFat(e.target.value)
          }

        />

      </div>

      <button
        onClick={calculateNutrition}
      >

        Calculate 🔥

      </button>

      {

        result && (

          <div className={styles.result}>

            <h3>
              Total Calories:
            </h3>

            <p>
              {result} kcal
            </p>

          </div>

        )

      }

    </div>

  )

}

export default NutritionCalculator