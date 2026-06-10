import { useState, useContext } from "react"
import styles from "./CreateRecipe.module.css"
import { getStorage, getDb } from "../../lib/firebaseClient"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { AuthContext } from "../../context/AuthContext/AuthContext"
import { toast } from "react-toastify"
import { useTranslation } from "react-i18next"

function CreateRecipe() {
  const { t } = useTranslation()
  const { user } = useContext(AuthContext)

  const [title,setTitle] = useState("")
  const [category,setCategory] = useState("")
  const [ingredients,setIngredients] = useState("")
  const [instructions,setInstructions] = useState("")
  const [image,setImage] = useState(null)
  const [preview,setPreview] = useState("")
  const [uploading,setUploading] = useState(false)

  const handleImage = (e)=>{
    const file = e.target.files[0]
    if(file){
      setImage(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()
      if(!title.trim() || !category.trim() || !ingredients.trim() || !instructions.trim()) return toast.error(t('create.fillFields', 'Please fill all fields'))
    setUploading(true)

    try{
      let imageUrl = ""
      if(image){
        const storageInst = await getStorage()
        const storageRef = ref(storageInst, `recipes/${Date.now()}_${image.name}`)
        const uploadTask = uploadBytesResumable(storageRef, image)
        await new Promise((res, rej)=>{
          uploadTask.on('state_changed', null, rej, ()=>res())
        })
        imageUrl = await getDownloadURL(storageRef)
      }

      const ingredientsArray = ingredients.split('\n').map(s=>s.trim()).filter(Boolean)

      const dbInst = await getDb()
      await addDoc(collection(dbInst, 'recipes'), {
        title,
        category,
        ingredients: ingredientsArray,
        instructions,
        image: imageUrl,
        author: user?.uid || null,
        createdAt: serverTimestamp()
      })

      toast.success(t('create.uploadSuccess', 'Recipe uploaded!'))

      // reset
      setTitle("")
      setCategory("")
      setIngredients("")
      setInstructions("")
      setImage(null)
      setPreview("")

    }catch(error){
      console.error(error)
      toast.error(t('create.uploadFailed', 'Upload failed'))
    } finally {
      setUploading(false)
    }
  }

  return (
    <section className={styles.create}>
        <h1>{t('create.title', 'Create Recipe 🍳')}</h1>
      <p>{t('create.share', 'Share your amazing food 😎')}</p>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input type="text" placeholder={t('create.placeholders.title', 'Recipe title')} value={title} onChange={e=>setTitle(e.target.value)} required />
        <input type="text" placeholder={t('create.placeholders.category', 'Category')} value={category} onChange={e=>setCategory(e.target.value)} required />
        <textarea placeholder={t('create.placeholders.ingredients', 'Ingredients (one per line)')} value={ingredients} onChange={e=>setIngredients(e.target.value)} required />
        <textarea placeholder={t('create.placeholders.instructions', 'Instructions')} value={instructions} onChange={e=>setInstructions(e.target.value)} required />

        <label className={styles.upload}>
          <input type="file" accept="image/*" onChange={handleImage} hidden />
          {t('create.uploadLabel', '📸 Upload Image')}
        </label>

        {preview && <img src={preview} alt="Preview" className={styles.preview} />}

        <button type="submit" disabled={uploading}>{uploading ? t('create.uploading', 'Uploading...') : t('create.createButton', 'Create Recipe 🚀')}</button>
      </form>
    </section>
  )
}

export default CreateRecipe