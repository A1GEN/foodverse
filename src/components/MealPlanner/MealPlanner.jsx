import {
  useState
} from "react"

import styles
from "./MealPlanner.module.css"

function MealPlanner() {

  const [goal,setGoal] =
    useState("")

  const [plan,setPlan] =
    useState("")

  const generatePlan = ()=>{

    if(goal==="fitness"){

      setPlan(`

🏋️ Fitness Meal Plan

🥚 Breakfast:
Oatmeal + Eggs

🍗 Lunch:
Chicken + Rice

🥗 Dinner:
Salad + Fish

🍌 Snack:
Banana + Nuts

      `)

    }

    else if(goal==="bulk"){

      setPlan(`

💪 Bulk Meal Plan

🥞 Breakfast:
Pancakes + Peanut Butter

🍔 Lunch:
Burger + Potatoes

🍝 Dinner:
Pasta + Chicken

🥤 Snack:
Protein Shake

      `)

    }

    else if(goal==="diet"){

      setPlan(`

🥗 Diet Meal Plan

🍓 Breakfast:
Greek Yogurt + Berries

🥙 Lunch:
Chicken Salad

🍲 Dinner:
Vegetable Soup

🍏 Snack:
Apple

      `)

    }

    else{

      setPlan(`

🍔 Random Meal Plan

🍕 Pizza
🍝 Pasta
🥗 Salad
🍗 Chicken Bowl

      `)

    }

  }

  return (

    <section className={styles.planner}>

      <h1>
        AI Meal Planner 🧠
      </h1>

      <p>
        Choose your goal 😎
      </p>

      <select
        value={goal}
        onChange={(e)=>
          setGoal(e.target.value)
        }
      >

        <option value="">
          Select Goal
        </option>

        <option value="fitness">
          Fitness
        </option>

        <option value="bulk">
          Bulk
        </option>

        <option value="diet">
          Diet
        </option>

      </select>

      <button
        onClick={generatePlan}
      >
        Generate Plan
      </button>

      {

        plan && (

          <div className={styles.result}>

            <pre>
              {plan}
            </pre>

          </div>

        )

      }

    </section>

  )

}

export default MealPlanner