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
  const [imageUrl,setImageUrl] = useState("")
  const [preview,setPreview] = useState("")
  const [uploading,setUploading] = useState(false)
  const [useUrl,setUseUrl] = useState(false)

  const handleImage = (e)=>{
    const file = e.target.files[0]
    if(file){
      setImage(file)
      setPreview(URL.createObjectURL(file))
      setImageUrl("")
    }
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()
      if(!title.trim() || !category.trim() || !ingredients.trim() || !instructions.trim()) return toast.error('Заполните все поля')
      
      if (!useUrl && !image) return toast.error('Загрузите изображение или укажите URL')
      if (useUrl && !imageUrl.trim()) return toast.error('Укажите URL изображения')
      
    setUploading(true)

    try{
      let finalImageUrl = ""
      
      if (useUrl) {
        finalImageUrl = imageUrl.trim()
      } else if (image) {
        try {
          const storageInst = await getStorage()
          const storageRef = ref(storageInst, `recipes/${Date.now()}_${image.name}`)
          const uploadTask = uploadBytesResumable(storageRef, image)
          await new Promise((res, rej)=>{
            uploadTask.on('state_changed', null, rej, ()=>res())
          })
          finalImageUrl = await getDownloadURL(storageRef)
        } catch (uploadError) {
          console.error('Upload error:', uploadError)
          toast.error('Ошибка загрузки изображения. Используйте опцию URL вместо загрузки файла.')
          setUploading(false)
          return
        }
      }

      const ingredientsArray = ingredients.split('\n').map(s=>s.trim()).filter(Boolean)

      const dbInst = await getDb()
      await addDoc(collection(dbInst, 'recipes'), {
        title,
        category,
        ingredients: ingredientsArray,
        instructions,
        image: finalImageUrl || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500",
        author: user?.uid || null,
        createdAt: serverTimestamp()
      })

      toast.success('Рецепт успешно создан')

      setTitle("")
      setCategory("")
      setIngredients("")
      setInstructions("")
      setImage(null)
      setImageUrl("")
      setPreview("")
      setUseUrl(false)

    }catch(error){
      console.error(error)
      toast.error('Ошибка создания рецепта')
    } finally {
      setUploading(false)
    }
  }

  return (
    <section className={styles.create}>
        <h1>Создать рецепт</h1>
      <p>Поделитесь своим кулинарным шедевром</p>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input type="text" placeholder="Название рецепта" value={title} onChange={e=>setTitle(e.target.value)} required />
        <input type="text" placeholder="Категория" value={category} onChange={e=>setCategory(e.target.value)} required />
        <textarea placeholder="Ингредиенты (каждый с новой строки)" value={ingredients} onChange={e=>setIngredients(e.target.value)} required />
        <textarea placeholder="Инструкции приготовления" value={instructions} onChange={e=>setInstructions(e.target.value)} required />

        <div className={styles.imageOptions}>
          <div className={styles.toggleButtons}>
            <button 
              type="button" 
              className={`${styles.toggleBtn} ${!useUrl ? styles.active : ''}`}
              onClick={() => { setUseUrl(false); setImageUrl(""); }}
            >
              Загрузить файл
            </button>
            <button 
              type="button" 
              className={`${styles.toggleBtn} ${useUrl ? styles.active : ''}`}
              onClick={() => { setUseUrl(true); setImage(null); setPreview(""); }}
            >
              Вставить URL
            </button>
          </div>

          {!useUrl ? (
            <label className={styles.upload}>
              <input type="file" accept="image/*" onChange={handleImage} hidden />
              Выберите изображение
            </label>
          ) : (
            <input 
              type="url" 
              placeholder="https://example.com/image.jpg" 
              value={imageUrl} 
              onChange={e=>setImageUrl(e.target.value)}
              className={styles.urlInput}
            />
          )}

          {preview && <img src={preview} alt="Превью" className={styles.preview} />}
          {useUrl && imageUrl && !preview && (
            <img src={imageUrl} alt="Превью" className={styles.preview} onError={()=>toast.error('Не удалось загрузить изображение по URL')} />
          )}
        </div>

        <button type="submit" disabled={uploading} className={styles.submitBtn}>
          {uploading ? 'Создание...' : 'Создать рецепт'}
        </button>
      </form>
    </section>
  )
}

export default CreateRecipe