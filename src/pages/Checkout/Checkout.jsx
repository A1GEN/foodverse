import { useSelector, useDispatch } from 'react-redux'
import { clearCart } from '../../redux/cartSlice'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, CheckCircle, ArrowLeft, User, Phone, MapPin, CreditCard } from 'lucide-react'
import { useState } from 'react'
import { sendOrderToTelegram } from '../../services/telegramService'
import { useTranslation } from 'react-i18next'
import styles from './Checkout.module.css'

function Checkout() {
  const { t } = useTranslation()
  const { items } = useSelector(state => state.cart)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    comment: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const total = items.reduce((sum, item) => sum + (item.quantity || 1), 0)

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleCheckout = async (e) => {
    e.preventDefault()
    
    if (!formData.name || !formData.phone || !formData.address) {
      setError(t('checkout.fillRequired'))
      return
    }

    setLoading(true)
    setError('')

    try {
      await sendOrderToTelegram({
        ...formData,
        items: items,
        total: total
      })
      
      dispatch(clearCart())
      navigate('/success')
    } catch (err) {
      setError(t('checkout.error'))
      console.error('Checkout error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.checkout}>
      <div className={styles.container}>
        <Link to="/cart" className={styles.backBtn}>
          <ArrowLeft size={20} /> {t('checkout.backToCart')}
        </Link>

        <h1 className={styles.title}>
          <ShoppingCart size={32} className={styles.titleIcon} />
          {t('checkout.title')}
        </h1>

        {items.length === 0 ? (
          <div className={styles.empty}>
            <ShoppingCart size={64} className={styles.emptyIcon} />
            <p>{t('checkout.empty')}</p>
            <Link to="/catalog" className={styles.shopBtn}>
              {t('checkout.shopRecipes')}
            </Link>
          </div>
        ) : (
          <form onSubmit={handleCheckout} className={styles.content}>
            <div className={styles.formSection}>
              <h2>{t('checkout.recipientData')}</h2>
              
              <div className={styles.formGroup}>
                <label>
                  <User size={18} />
                  {t('checkout.name')} *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder={t('checkout.name')}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>
                  <Phone size={18} />
                  {t('checkout.phone')} *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+996 XXX XXX XXX"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>
                  <MapPin size={18} />
                  {t('checkout.address')} *
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder={t('checkout.address')}
                  required
                  rows={3}
                />
              </div>

              <div className={styles.formGroup}>
                <label>
                  <CreditCard size={18} />
                  {t('checkout.comment')}
                </label>
                <textarea
                  name="comment"
                  value={formData.comment}
                  onChange={handleInputChange}
                  placeholder={t('checkout.comment')}
                  rows={3}
                />
              </div>
            </div>

            <div className={styles.summary}>
              <h2>{t('checkout.yourOrder')}</h2>
              <div className={styles.summaryItem}>
                <span>{t('checkout.totalItems')}:</span>
                <strong>{total}</strong>
              </div>
              <div className={styles.summaryItem}>
                <span>{t('checkout.positions')}:</span>
                <strong>{items.length}</strong>
              </div>

              <div className={styles.items}>
                <h3>{t('checkout.itemsInCart')}</h3>
                {items.map(item => (
                  <div key={item.idMeal || item.id} className={styles.item}>
                    <img src={item.strMealThumb || item.image} alt={item.strMeal || item.name} />
                    <div className={styles.itemInfo}>
                      <h3>{item.strMeal || item.name}</h3>
                      <p>{t('checkout.quantity')}: {item.quantity || 1}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {error && <div className={styles.error}>{error}</div>}

            <button 
              type="submit" 
              className={styles.checkoutBtn}
              disabled={loading}
            >
              {loading ? t('checkout.sending') : <><CheckCircle size={20} /> {t('checkout.placeOrder')}</>}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default Checkout
