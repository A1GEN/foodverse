import {
  useState
} from "react"

import styles
from "./AIFoodDetector.module.css"

function AIFoodDetector() {

  const [preview,setPreview] =
    useState("")

  const [result,setResult] =
    useState(null)
  const [loading,setLoading] = useState(false)

  // 📸 Upload
  const handleImage = (e)=>{

    const file =
      e.target.files[0]

    if(file){
      setPreview(URL.createObjectURL(file))
    }

  }

  // 🤖 Fake AI detect
  const detectFood = ()=>{
    if(!preview) return
    setLoading(true)
    setTimeout(()=>{
      setResult({
        name: "Cheese Burger 🍔",
        calories: "540 kcal",
        category: "Fast Food",
        ingredients: ["Bread", "Cheese", "Beef", "Tomato", "Salad"]
      })
      setLoading(false)
    },800)
  }

  return (

    <section className={styles.ai}>

      <h1>
        AI Food Detector 🤖
      </h1>

      <p>
        Upload food image and let AI detect it 😎
      </p>

      {/* 📸 Upload */}
      <label className={styles.upload}>

        <input

          type="file"

          accept="image/*"

          hidden

          onChange={handleImage}

        />

        Upload Food Image 📸

      </label>

      {/* 🖼 Preview */}
      {

        preview && (

          <img

            src={preview}

            alt="Food"

            className={styles.preview}

          />

        )

      }

      {/* 🤖 Detect */}
      {

        preview && (
          <button onClick={detectFood} className={styles.detectBtn} disabled={loading}>
            {loading ? 'Detecting...' : 'Detect Food 🤖'}
          </button>
        )

      }

      {/* 🍔 Result */}
      {

        result && (

          <div className={styles.result}>

            <h2>
              {result.name}
            </h2>

            <p>
              🔥 {result.calories}
            </p>

            <p>
              🍽 {result.category}
            </p>

            <h3>
              Ingredients:
            </h3>

            <ul>

              {

                result.ingredients.map(
                  (item,index)=>(

                    <li key={index}>
                      {item}
                    </li>

                  )
                )

              }

            </ul>

          </div>

        )

      }

    </section>

  )

}

export default AIFoodDetector