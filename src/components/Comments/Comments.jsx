import { useState, useEffect, useContext } from "react"
import styles from "./Comments.module.css"
import { getDb } from "../../lib/firebaseClient"
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, deleteDoc, doc } from "firebase/firestore"
import { AuthContext } from "../../context/AuthContext/AuthContext"
import { useTranslation } from "react-i18next"

function Comments({ recipeId }){
  const { user, userData } = useContext(AuthContext)
  const { t } = useTranslation()
  const [comments, setComments] = useState([])
  const [message, setMessage] = useState("")
  const [replyTo, setReplyTo] = useState(null)
  const [replyText, setReplyText] = useState("")

  useEffect(()=>{
    let unsub = null
    let mounted = true
    ;(async ()=>{
      const db = await getDb()
      if(!mounted) return
      const commentsRef = collection(db, 'recipeMeta', recipeId, 'comments')
      const q = query(commentsRef, orderBy('createdAt','desc'))
      unsub = onSnapshot(q, snap=>{
        const data = snap.docs.map(d=>({ id:d.id, ...d.data() }))
        setComments(data)
      }, err=> console.error('comments snap', err))
    })()
    return ()=>{ mounted=false; if(unsub) unsub() }
  },[recipeId])

  const addComment = async () =>{
      if(!message.trim()) return
    const db = await getDb()
    const commentsRef = collection(db, 'recipeMeta', recipeId, 'comments')
    try{
      await addDoc(commentsRef, {
        uid: user?.uid || null,
        username: userData?.displayName || user?.displayName || t('comments.guest','Guest'),
        message,
        parentId: null,
        createdAt: serverTimestamp()
      })
      setMessage("")
    }catch(e){
      console.error('add comment', e)
    }
  }

  const addReply = async (parentId) =>{
    if(!replyText.trim()) return
    const db = await getDb()
    const commentsRef = collection(db, 'recipeMeta', recipeId, 'comments')
    try{
      await addDoc(commentsRef, {
        uid: user?.uid || null,
        username: userData?.displayName || user?.displayName || t('comments.guest','Guest'),
        message: replyText,
        parentId,
        createdAt: serverTimestamp()
      })
      setReplyText("")
      setReplyTo(null)
    }catch(e){ console.error('add reply', e) }
  }

  const deleteComment = async (id, uid) =>{
    // allow delete if you are author or admin
      if(!user) return
    const isAdmin = user.email && user.email.toLowerCase() === 'argen@gmail.com'
    if(uid !== user.uid && !isAdmin) return
    try{
      const db = await getDb()
      await deleteDoc(doc(db, 'recipeMeta', recipeId, 'comments', id))
    }catch(e){ console.error('delete', e) }
  }

  return (
    <div className={styles.comments}>
      <h2>{t('comments.title','Comments 💬')}</h2>
      <div className={styles.form}>
        <textarea placeholder={t('comments.placeholder','Write comment...')} value={message} onChange={e=>setMessage(e.target.value)} />
        <button onClick={addComment}>{t('comments.add','Add Comment')}</button>
      </div>

      <div className={styles.list}>
        {/** build tree */}
        {comments.filter(c=>!c.parentId).map(c => (
          <div key={c.id} className={styles.comment}>
            <div className={styles.top}>
              <h3>{c.username}</h3>
              <div>
                <button onClick={()=>setReplyTo(c.id)}>{t('comments.reply','Reply')}</button>
                <button onClick={()=>deleteComment(c.id, c.uid)}>{t('comments.delete','Delete')}</button>
              </div>
            </div>
            <p>{c.message}</p>

            {replyTo === c.id && (
              <div className={styles.replyForm}>
                <textarea value={replyText} onChange={e=>setReplyText(e.target.value)} placeholder={t('comments.replyPlaceholder','Write a reply...')} />
                <button onClick={()=>addReply(c.id)}>{t('comments.sendReply','Send Reply')}</button>
                <button onClick={()=>{ setReplyTo(null); setReplyText("") }}>{t('comments.cancel','Cancel')}</button>
              </div>
            )}

            <div className={styles.replies}>
              {comments.filter(r=>r.parentId===c.id).map(r=> (
                <div key={r.id} className={styles.reply}>
                  <div className={styles.top}><h4>{r.username}</h4><button onClick={()=>deleteComment(r.id, r.uid)}>{t('comments.delete','Delete')}</button></div>
                  <p>{r.message}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Comments