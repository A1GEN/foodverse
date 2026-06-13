import { useState } from "react"
import { askAI } from "../../services/ai"
import styles from "./AIChatChef.module.css"
import { User, Sparkles, Send, Trash2, Copy, Check } from "lucide-react"

function AIChatChef() {
  const [messages, setMessages] = useState([
    { role: 'helper', text: 'Привет! Я ваш кулинарный помощник. Могу помочь с рецептами, советами по готовке и заменами ингредиентов. Что хотите приготовить?' }
  ])
  const [inputText, setInputText] = useState("")
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const quickQuestions = [
    "Как приготовить пасту карбонара?",
    "Что можно приготовить из курицы?",
    "Вегетарианский ужин на 2 человека",
    "Простой десерт за 15 минут",
    "Рецепт домашней пиццы",
    "Как правильно готовить рыбу?"
  ]

  const handleSend = async () => {
    if (!inputText.trim()) return
    
    const userMessage = { role: 'user', text: inputText }
    setMessages(prev => [...prev, userMessage])
    setInputText("")
    setLoading(true)

    try {
      const response = await askAI(inputText)
      setMessages(prev => [...prev, { role: 'helper', text: response }])
    } catch (error) {
      setMessages(prev => [...prev, { role: 'helper', text: 'Извините, произошла ошибка. Попробуйте еще раз.' }])
    } finally {
      setLoading(false)
    }
  }

  const handleQuickQuestion = (q) => {
    setInputText(q)
    setTimeout(() => handleSend(), 100)
  }

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleClearChat = () => {
    setMessages([{ role: 'helper', text: 'Привет! Я ваш кулинарный помощник. Могу помочь с рецептами, советами по готовке и заменами ингредиентов. Что хотите приготовить?' }])
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chat}>
        <div className={styles.chatHeader}>
          <div className={styles.headerTop}>
            <h2 className={styles.chatTitle}>
              <User className={styles.titleIcon} size={28} />
              Кулинарный помощник
            </h2>
            <button onClick={handleClearChat} className={styles.clearBtn} title="Очистить чат">
              <Trash2 size={18} />
            </button>
          </div>
          <p className={styles.chatSubtitle}>
            Онлайн • Готов помочь с рецептами
          </p>
        </div>

        <div className={styles.messagesContainer}>
          {messages.map((msg, i) => (
            <div key={i} className={`${styles.message} ${msg.role === 'user' ? styles.userMessage : styles.helperMessage}`}>
              <div className={styles.messageContent}>
                {msg.role === 'helper' && <User size={20} className={styles.messageIcon} />}
                <p>{msg.text}</p>
              </div>
              {msg.role === 'helper' && (
                <button onClick={() => handleCopy(msg.text)} className={styles.copyMessageBtn}>
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                </button>
              )}
            </div>
          ))}
          {loading && (
            <div className={`${styles.message} ${styles.helperMessage}`}>
              <div className={styles.messageContent}>
                <User size={20} className={styles.messageIcon} />
                <p>Пишу...</p>
              </div>
            </div>
          )}
        </div>

        <div className={styles.quickQuestions}>
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

        <div className={styles.inputArea}>
          <textarea
            rows={2}
            placeholder="Напишите сообщение..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyPress}
            className={styles.textarea}
          />
          <button 
            onClick={handleSend} 
            disabled={loading || !inputText.trim()} 
            className={styles.sendBtn}
          >
            {loading ? (
              <Sparkles className={styles.spinIcon} size={20} />
            ) : (
              <Send size={20} />
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AIChatChef
