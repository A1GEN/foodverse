import { useState } from "react"
import { askAI } from "../../services/ai"
import styles from "./AIChatChef.module.css"
import { useTranslation } from "react-i18next"
import { ChefHat, Sparkles, Send, Trash2, Copy, Check } from "lucide-react"

function AIChatChef() {
  const { t } = useTranslation()
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")
  const [loading, setLoading] = useState(false)
  const [history, setHistory] = useState([])
  const [error, setError] = useState("")
  const [copied, setCopied] = useState(false)

  const quickQuestions = [
    "Как приготовить пасту карбонара?",
    "Что можно приготовить из курицы?",
    "Вегетарианский ужин на 2 человека",
    "Простой десерт за 15 минут",
    "Рецепт домашней пиццы",
    "Как правильно готовить рыбу?"
  ]

  const handleAsk = async () => {
    if (!question) return
    setLoading(true)
    setError("")
    try{
      const timeoutMs = 20000
      const p = askAI(question)
      const response = await Promise.race([
        p,
        new Promise((_,rej)=> setTimeout(()=> rej(new Error('timeout')), timeoutMs))
      ])
      setAnswer(response)
      setHistory((h) => [{ q: question, a: response, timestamp: new Date().toISOString() }].concat(h).slice(0, 10))
    }catch(e){
      console.error('AI error', e)
      setError(e.message || 'Ошибка сервиса ИИ')
      setAnswer('')
    }finally{
      setLoading(false)
      setQuestion("")
    }
  }

  const handleQuickQuestion = (q) => {
    setQuestion(q)
    setTimeout(() => handleAsk(), 100)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(answer)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleClearHistory = () => {
    setHistory([])
  }

  const handleDeleteHistoryItem = (index) => {
    setHistory((h) => h.filter((_, i) => i !== index))
  }

  const formatAnswer = (text) => {
    if (!text) return ""
    return text.split('\n').map((line, i) => (
      <p key={i}>{line}</p>
    ))
  }

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chat}>
        <div className={styles.chatHeader}>
          <h2 className={styles.chatTitle}>
            <ChefHat className={styles.titleIcon} size={28} />
            Шеф-повар
          </h2>
          <p className={styles.chatSubtitle}>
            Задайте вопросы о рецептах, ингредиентах или советах по готовке
          </p>
        </div>

        <div className={styles.quickQuestions}>
          <h3>Популярные вопросы:</h3>
          <div className={styles.quickQuestionsGrid}>
            {quickQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => handleQuickQuestion(q)}
                className={styles.quickQuestionBtn}
                disabled={loading}
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.chatBox}>
          <textarea
            rows={4}
            placeholder="Спросите идеи рецептов, заменители или советы по готовке..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleAsk()
              }
            }}
            className={styles.textarea}
          />

          <div className={styles.chatActions}>
            <button 
              onClick={handleAsk} 
              disabled={loading || !question} 
              className={styles.askBtn}
            >
              {loading ? (
                <><Sparkles className={styles.spinIcon} size={16} /> Думаю...</>
              ) : (
                <><Send size={16} /> Отправить</>
              )}
            </button>
          </div>
        </div>

        {error && (
          <div className={styles.error}>
            {error}
          </div>
        )}

        <div className={styles.answer}>
          {answer ? (
            <div className={styles.answerContent}>
              <div className={styles.answerHeader}>
                <h3>Ответ:</h3>
                <button onClick={handleCopy} className={styles.copyBtn}>
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                  {copied ? 'Скопировано' : 'Копировать'}
                </button>
              </div>
              <div className={styles.answerText}>
                {formatAnswer(answer)}
              </div>
            </div>
          ) : (
            <p className={styles.hint}>
              Спросите меня о идеях рецептов, заменителях или советах по готовке.
            </p>
          )}
        </div>

        {history.length > 0 && (
          <div className={styles.history}>
            <div className={styles.historyHeader}>
              <h3>История</h3>
              <button onClick={handleClearHistory} className={styles.clearHistoryBtn}>
                <Trash2 size={16} /> Очистить
              </button>
            </div>
            <div className={styles.historyList}>
              {history.map((h, i) => (
                <div key={i} className={styles.historyItem}>
                  <div className={styles.historyQuestion}>
                    <strong>Вопрос:</strong> <span>{h.q}</span>
                    <button 
                      onClick={() => handleDeleteHistoryItem(i)}
                      className={styles.deleteItemBtn}
                      aria-label="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <div className={styles.historyAnswer}>
                    <strong>Ответ:</strong> <span>{h.a.substring(0, 150)}{h.a.length > 150 ? '...' : ''}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AIChatChef
