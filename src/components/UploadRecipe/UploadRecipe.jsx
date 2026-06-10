import {
  useState
} from "react"

import styles
from "./UploadRecipe.module.css"

function UploadRecipe() {

  const [preview,setPreview] =
    useState("")

  // 📸 Upload image
  const handleImage = (e)=>{

    const file =
      e.target.files[0]

    if(file){
      setPreview(URL.createObjectURL(file))
    }

  }

  return (

    <section className={styles.upload}>

      <h1>
        Upload Recipe 📸
      </h1>

      <p>
        Share your food image 😎
      </p>

      <label
        className={styles.uploadBox}
      >

        <input

          type="file"

          accept="image/*"

          onChange={handleImage}

          hidden

        />

        📸 Choose Image

      </label>

      {

        preview && (

          <div className={styles.preview}>

            <img
              src={preview}
              alt="Preview"
            />

          </div>

        )

      }

    </section>

  )

}

export default UploadRecipe