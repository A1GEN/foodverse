import { useState } from "react"
import styles from "./ConsultantChat.module.css"
import { X, MessageCircle, Clock, Check, Copy, Send } from "lucide-react"
import { askAI } from "../../services/ai"

function ConsultantChat({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('chat')
  const [copied, setCopied] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'consultant', text: 'Привет! Я консультант FoodVerse. Могу помочь с поиском рецептов, сохранением, корзиной и другими вопросами. Что вас интересует?' }
  ])
  const [inputText, setInputText] = useState("")
  const [loading, setLoading] = useState(false)

  const faqs = [
    {
      q: "Как найти рецепт?",
      a: "Используйте поиск по названию, категории или ингредиенту. Также можно просмотреть популярные категории в разделе 'Категории'."
    },
    {
      q: "Как сохранить рецепт?",
      a: "Нажмите на кнопку 'Сохранить' (сердечко) на карточке рецепта. Сохраненные рецепты будут доступны в вашем профиле."
    },
    {
      q: "Как добавить свой рецепт?",
      a: "Перейдите в раздел 'Каталог' и нажмите кнопку 'Создать рецепт'. Заполните все поля и загрузите изображение."
    },
    {
      q: "Как работает корзина?",
      a: "Добавьте рецепты в корзину нажав кнопку 'В корзину'. В корзине можно изменить количество товаров и оформить заказ."
    },
    {
      q: "Как изменить язык?",
      a: "Язык можно изменить в навигационной панели в правом верхнем углу. Доступны русский, английский и киргизский."
    }
  ]

  const info = [
    {
      title: "О проекте",
      content: "FoodVerse - это платформа для любителей готовки. Здесь вы можете находить рецепты, делиться своими кулинарными творениями и общаться с единомышленниками."
    },
    {
      title: "Режим работы",
      content: "Консультант доступен 24/7. Среднее время ответа: мгновенно."
    },
    {
      title: "Контакты",
      content: "Email: support@foodverse.com"
    }
  ]

  const handleSend = async () => {
    if (!inputText.trim()) return
    
    const userMessage = { role: 'user', text: inputText }
    setMessages(prev => [...prev, userMessage])
    setInputText("")
    setLoading(true)

    try {
      const response = await askAI(inputText)
      setMessages(prev => [...prev, { role: 'consultant', text: response }])
    } catch (error) {
      setMessages(prev => [...prev, { role: 'consultant', text: 'Извините, произошла ошибка. Попробуйте еще раз.' }])
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

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  if (!isOpen) return null

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <MessageCircle className={styles.icon} size={24} />
            <div>
              <h2>Консультант</h2>
              <p className={styles.status}>
                <Clock size={14} />
                Онлайн • Отвечает мгновенно
              </p>
            </div>
          </div>
          <button onClick={onClose} className={styles.closeBtn}>
            <X size={20} />
          </button>
        </div>

        <div className={styles.tabs}>
          <button 
            className={`${styles.tab} ${activeTab === 'chat' ? styles.active : ''}`}
            onClick={() => setActiveTab('chat')}
          >
            Чат
          </button>
          <button 
            className={`${styles.tab} ${activeTab === 'faq' ? styles.active : ''}`}
            onClick={() => setActiveTab('faq')}
          >
            Частые вопросы
          </button>
          <button 
            className={`${styles.tab} ${activeTab === 'info' ? styles.active : ''}`}
            onClick={() => setActiveTab('info')}
          >
            Информация
          </button>
        </div>

        {activeTab === 'chat' && (
          <>
            <div className={styles.chatContent}>
              {messages.map((msg, i) => (
                <div key={i} className={`${styles.message} ${msg.role === 'user' ? styles.userMessage : styles.consultantMessage}`}>
                  <div className={styles.messageContent}>
                    <p>{msg.text}</p>
                  </div>
                  {msg.role === 'consultant' && (
                    <button onClick={() => handleCopy(msg.text)} className={styles.copyMessageBtn}>
                      {copied ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                  )}
                </div>
              ))}
              {loading && (
                <div className={`${styles.message} ${styles.consultantMessage}`}>
                  <div className={styles.messageContent}>
                    <p>Пишу...</p>
                  </div>
                </div>
              )}
            </div>

            <div className={styles.quickQuestions}>
              {faqs.slice(0, 3).map((item, i) => (
                <button
                  key={i}
                  onClick={() => handleQuickQuestion(item.q)}
                  className={styles.quickQuestionBtn}
                  disabled={loading}
                >
                  {item.q}
                </button>
              ))}
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
                <Send size={20} />
              </button>
            </div>
          </>
        )}

        {activeTab === 'faq' && (
          <div className={styles.content}>
            <div className={styles.faqList}>
              {faqs.map((item, i) => (
                <div key={i} className={styles.faqItem}>
                  <div className={styles.faqQuestion}>
                    <strong>{item.q}</strong>
                  </div>
                  <div className={styles.faqAnswer}>
                    <p>{item.a}</p>
                    <button 
                      onClick={() => handleCopy(item.a)}
                      className={styles.copyBtn}
                      title="Копировать"
                    >
                      {copied ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'info' && (
          <div className={styles.content}>
            <div className={styles.infoList}>
              {info.map((item, i) => (
                <div key={i} className={styles.infoItem}>
                  <h3>{item.title}</h3>
                  <p style={{whiteSpace: 'pre-line'}}>{item.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ConsultantChat
