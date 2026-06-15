import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, Send, Share2, Globe, MessageCircle } from 'lucide-react'
import styles from './Contacts.module.css'

function Contacts() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setSubmitted(true)
    setLoading(false)
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    })
    
    setTimeout(() => setSubmitted(false), 5000)
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Свяжитесь с нами</h1>
        <p>Мы всегда рады помочь вам. Напишите нам или позвоните!</p>
      </div>

      <div className={styles.content}>
        {/* Contact Info */}
        <div className={styles.contactInfo}>
          <h2>Контактная информация</h2>
          
          <div className={styles.infoCards}>
            <div className={styles.infoCard}>
              <div className={styles.cardIcon}>
                <Phone size={24} />
              </div>
              <div className={styles.cardContent}>
                <h3>Телефон</h3>
                <p>+996 555 123 456</p>
                <p>+996 555 789 012</p>
                <span className={styles.available}>Доступно 24/7</span>
              </div>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.cardIcon}>
                <Mail size={24} />
              </div>
              <div className={styles.cardContent}>
                <h3>Email</h3>
                <p>info@foodverse.kg</p>
                <p>support@foodverse.kg</p>
                <span className={styles.available}>Ответим в течение 1 часа</span>
              </div>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.cardIcon}>
                <MapPin size={24} />
              </div>
              <div className={styles.cardContent}>
                <h3>Адрес</h3>
                <p>г. Бишкек</p>
                <p>пр. Чуй 123, офис 456</p>
                <span className={styles.available}>Работаем ежедневно</span>
              </div>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.cardIcon}>
                <Clock size={24} />
              </div>
              <div className={styles.cardContent}>
                <h3>Время работы</h3>
                <p>Пн-Пт: 9:00 - 22:00</p>
                <p>Сб-Вс: 10:00 - 23:00</p>
                <span className={styles.available}>Доставка до 23:00</span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className={styles.socialSection}>
            <h3>Мы в социальных сетях</h3>
            <div className={styles.socialLinks}>
              <a href="#" className={styles.socialLink} aria-label="Facebook">
                <Share2 size={24} />
              </a>
              <a href="#" className={styles.socialLink} aria-label="Instagram">
                <Globe size={24} />
              </a>
              <a href="#" className={styles.socialLink} aria-label="Twitter">
                <Share2 size={24} />
              </a>
              <a href="#" className={styles.socialLink} aria-label="WhatsApp">
                <MessageCircle size={24} />
              </a>
            </div>
          </div>

          {/* Map */}
          <div className={styles.mapSection}>
            <h3>Мы на карте</h3>
            <div className={styles.mapContainer}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2923.8!2d74.6!3d42.87!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDLCsDUyJzEyLjAiTiA3NMKwMzYnMDAuMCJF!5e0!3m2!1sru!2skg!4v1620000000000!5m2!1sru!2skg"
                width="100%"
                height="300"
                style={{ border: 0, borderRadius: '12px' }}
                allowFullScreen=""
                loading="lazy"
                title="FoodVerse Location"
              />
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className={styles.formSection}>
          <h2>Напишите нам</h2>
          
          {submitted ? (
            <div className={styles.successMessage}>
              <Send size={48} />
              <h3>Сообщение отправлено!</h3>
              <p>Мы свяжемся с вами в ближайшее время</p>
            </div>
          ) : (
            <form className={styles.contactForm} onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Ваше имя *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Введите ваше имя"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@email.com"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="phone">Телефон</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+996 555 123 456"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="subject">Тема сообщения *</label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                >
                  <option value="">Выберите тему</option>
                  <option value="order">Вопрос по заказу</option>
                  <option value="delivery">Доставка</option>
                  <option value="payment">Оплата</option>
                  <option value="partnership">Партнерство</option>
                  <option value="feedback">Отзыв</option>
                  <option value="other">Другое</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message">Сообщение *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Опишите ваш вопрос или предложение..."
                  rows={6}
                  required
                />
              </div>

              <button type="submit" className={styles.submitBtn} disabled={loading}>
                {loading ? 'Отправка...' : (
                  <>
                    <Send size={18} />
                    Отправить сообщение
                  </>
                )}
              </button>
            </form>
          )}

          {/* FAQ */}
          <div className={styles.faqSection}>
            <h3>Часто задаваемые вопросы</h3>
            <div className={styles.faqList}>
              <div className={styles.faqItem}>
                <h4>Как быстро доставляют заказ?</h4>
                <p>Экспресс доставка занимает 30-45 минут, стандартная — 1-2 часа.</p>
              </div>
              <div className={styles.faqItem}>
                <h4>Какие способы оплаты доступны?</h4>
                <p>Мы принимаем банковские карты, мобильные платежи и наличные при получении.</p>
              </div>
              <div className={styles.faqItem}>
                <h4>Есть ли минимальная сумма заказа?</h4>
                <p>Да, минимальная сумма заказа для доставки — 300 сом.</p>
              </div>
              <div className={styles.faqItem}>
                <h4>Можно ли отменить заказ?</h4>
                <p>Да, вы можете отменить заказ в течение 15 минут после оформления.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contacts
