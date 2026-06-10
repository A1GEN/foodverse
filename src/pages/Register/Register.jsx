import { useState } from "react"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { getAuth, getDb } from "../../lib/firebaseClient"
import { toast } from "react-toastify"
import { doc, setDoc } from "firebase/firestore"
import styles from "./Register.module.css"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext/AuthContext"

function Register() {

  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")

  const validateEmail = (e) => /\S+@\S+\.\S+/.test(e)

  const handleRegister = async (e) => {
    e.preventDefault()

    if (!name.trim()) return toast.error("Enter your name")
    if (!validateEmail(email)) return toast.error("Enter a valid email")
    if (password.length < 6) return toast.error("Password must be at least 6 characters")
    if (password !== confirm) return toast.error("Passwords do not match")

    try {
      const auth = await getAuth()
      const db = await getDb()
      const res = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(res.user, { displayName: name, photoURL: `https://i.pravatar.cc/150?u=${res.user.uid}` })

      // create user doc
      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        displayName: name,
        email,
        avatar: `https://i.pravatar.cc/150?u=${res.user.uid}`,
        favorites: []
      })

      toast.success("Account created 🔥")
      navigate("/")

    } catch (error) {
      toast.error(error.message)
    }

  }

  return (
    <div className={styles.register}>
      <form onSubmit={handleRegister} className={styles.form}>
        <h1>Create Account</h1>

        <input type="text" placeholder="Full name" value={name} onChange={e=>setName(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />

        <div className={styles.row}>
          <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
          <input type="password" placeholder="Confirm password" value={confirm} onChange={e=>setConfirm(e.target.value)} />
        </div>

        <button className="btn btn-primary">Register</button>

      </form>
    </div>
  )

}

export default Register