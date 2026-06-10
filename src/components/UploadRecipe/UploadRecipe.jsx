import { useState } from "react"
import styles from "./UploadRecipe.module.css"
import { useTranslation } from "react-i18next"

function UploadRecipe() {
  const { t } = useTranslation()
  const [preview,setPreview] = useState("")

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

      <h1>{t('upload.title','Upload Recipe 📸')}</h1>

      <p>{t('upload.share','Share your food image 😎')}</p>

      <label
        className={styles.uploadBox}
      >

        <input

          type="file"

          accept="image/*"

          onChange={handleImage}

          hidden

        />

        {t('upload.choose','📸 Choose Image')}

      </label>

      {

        preview && (

          <div className={styles.preview}>

            <img src={preview} alt={t('upload.previewAlt','Preview')} />

          </div>

        )

      }

    </section>

  )

}

export default UploadRecipe