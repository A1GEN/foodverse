import { useState } from "react"
import { askAI } from "../../../services/ai"
import styles from "./AIChatChef.module.css"
import { useTranslation } from "react-i18next"
import { Bot, MessageSquare, Sparkles } from "lucide-react"

function AIChatChef() {
  const { t } = useTranslation()
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")
  const [loading, setLoading] = useState(false)
  const [history, setHistory] = useState([])
  const [error, setError] = useState("")

  const handleAsk = async () => {
    if (!question) return
    setLoading(true)
    setError("")
    try{
      const timeoutMs = 12000
      const p = askAI(question)
      const response = await Promise.race([
        p,
        new Promise((_,rej)=> setTimeout(()=> rej(new Error('timeout')), timeoutMs))
      ])
      setAnswer(response)
      setHistory((h) => [{ q: question, a: response }].concat(h).slice(0, 8))
    }catch(e){
      console.error('AI error', e)
      setError(e.message || 'AI service error')
      setAnswer('')
    }finally{
      setLoading(false)
      setQuestion("")
    }
  }

  return (

    <div className={styles.chat}>

      <h2 className={styles.chatTitle}>
        <Bot className={styles.titleIcon} size={28} />
        {t('aiChat.title','AI Chef')}
      </h2>

      <div className={styles.chatBox}>
        <textarea
          rows={3}
          placeholder={t('aiChat.placeholder','Ask recipe ideas, substitutes or cooking tips...')}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <div style={{display:'flex',flexDirection:'column',gap:10}}>
          <button onClick={handleAsk} disabled={loading || !question} className={styles.askBtn}>
            {loading ? (
              <><Sparkles className={styles.spinIcon} size={16} /> {t('aiChat.thinking','Thinking...')}</>
            ) : (
              <><MessageSquare size={16} /> {t('aiChat.ask','Ask AI')}</>
            )}
          </button>
          <div className={styles.suggestions}>
            <button onClick={()=>setQuestion(t('aiChat.suggestion1','Easy weeknight chicken recipe'))}>{t('aiChat.suggestionLabel1','Chicken idea')}</button>
            <button onClick={()=>setQuestion(t('aiChat.suggestion2','Vegetarian dinner for 2'))}>{t('aiChat.suggestionLabel2','Veg dinner')}</button>
          </div>
        </div>
      </div>

      <div className={styles.answer}>
        {answer ? <p>{answer}</p> : <p className={styles.hint}>{t('aiChat.hint','Ask me for recipe ideas, substitutes, or cooking tips.')}</p>}
      </div>

      {history.length>0 && (
        <div className={styles.history}>
          <h4>{t('aiChat.history','History')}</h4>
          {history.map((h,i)=> (
            <div key={i} className={styles.hRow}>
              <strong>Q:</strong> <span>{h.q}</span>
              <div><strong>A:</strong> <span>{h.a}</span></div>
            </div>
          ))}
        </div>
      )}

    </div>

  )

}

export default AIChatChef