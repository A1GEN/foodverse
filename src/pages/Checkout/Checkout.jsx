import { useSelector, useDispatch } from 'react-redux'
import { clearCart } from '../../redux/cartSlice'
import { Link } from 'react-router-dom'
import { ShoppingCart, CheckCircle, ArrowLeft } from 'lucide-react'
import styles from './Checkout.module.css'

function Checkout() {
  const { items } = useSelector(state => state.cart)
  const dispatch = useDispatch()

  const total = items.reduce((sum, item) => sum + (item.quantity || 1), 0)

  const handleCheckout = () => {
    alert('Checkout functionality coming soon!')
    dispatch(clearCart())
  }

  return (
    <div className={styles.checkout}>
      <div className={styles.container}>
        <Link to="/cart" className={styles.backBtn}>
          <ArrowLeft size={20} /> Back to Cart
        </Link>

        <h1 className={styles.title}>
          <ShoppingCart size={32} className={styles.titleIcon} />
          Оформление заказа
        </h1>

        {items.length === 0 ? (
          <div className={styles.empty}>
            <ShoppingCart size={64} className={styles.emptyIcon} />
            <p>Ваша корзина пуста</p>
            <Link to="/catalog" className={styles.shopBtn}>
              Смотреть рецепты
            </Link>
          </div>
        ) : (
          <div className={styles.content}>
            <div className={styles.summary}>
              <h2>Order Summary</h2>
              <div className={styles.summaryItem}>
                <span>Total Items:</span>
                <strong>{total}</strong>
              </div>
              <div className={styles.summaryItem}>
                <span>Recipes:</span>
                <strong>{items.length}</strong>
              </div>
            </div>

            <div className={styles.items}>
              <h2>Items in Cart</h2>
              {items.map(item => (
                <div key={item.idMeal} className={styles.item}>
                  <img src={item.strMealThumb} alt={item.strMeal} />
                  <div className={styles.itemInfo}>
                    <h3>{item.strMeal}</h3>
                    <p>Quantity: {item.quantity || 1}</p>
                  </div>
                </div>
              ))}
            </div>

            <button onClick={handleCheckout} className={styles.checkoutBtn}>
              <CheckCircle size={20} /> Завершить заказ
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Checkout
