import { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { getAuth } from "../../lib/firebaseClient"
import { toast } from "react-toastify"
import styles from "./Login.module.css"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext/AuthContext"

function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [remember, setRemember] = useState(false)
  const [show, setShow] = useState(false)
  const sampleCreds = { email: 'argen@gmail.com', password: '123456789' }

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const auth = await getAuth()
      await signInWithEmailAndPassword(auth, email, password)
      toast.success("Login successful 😎")
      if (email.toLowerCase() === 'argen@gmail.com') {
        navigate('/admin')
      } else {
        navigate('/profile')
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className={styles.login}>
      <form onSubmit={handleLogin} className={styles.form}>
        <h1>Welcome Back</h1>

        <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />

        <div className={styles.passRow}>
          <input type={show?"text":"password"} placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
          <button type="button" className={styles.showBtn} onClick={()=>setShow(s=>!s)}>{show? 'Hide':'Show'}</button>
        </div>

        <div className={styles.options}>
          <label><input type="checkbox" checked={remember} onChange={e=>setRemember(e.target.checked)} /> Remember me</label>
          <a href="#">Forgot?</a>
        </div>

        <button className="btn btn-primary">Login</button>

        <div className={styles.sample}>
          <div>Demo: <strong>{sampleCreds.email}</strong> / <strong>{sampleCreds.password}</strong></div>
          <button type="button" onClick={()=>{ setEmail(sampleCreds.email); setPassword(sampleCreds.password) }}>Use demo</button>
          <div className={styles.regLink}>No account? <a href="/register">Register</a></div>
        </div>

      </form>
    </div>
  )

}

export default Login