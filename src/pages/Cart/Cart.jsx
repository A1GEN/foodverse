import { useSelector, useDispatch } from 'react-redux'
import { removeFromCart, updateQuantity, clearCart } from '../../redux/cartSlice'
import { Link } from 'react-router-dom'
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react'
import styles from './Cart.module.css'

function Cart() {
  const { items } = useSelector(state => state.cart)
  const dispatch = useDispatch()

  const total = items.reduce((sum, item) => sum + (item.quantity || 1), 0)

  const handleRemove = (idMeal) => {
    dispatch(removeFromCart(idMeal))
  }

  const handleQuantityChange = (idMeal, quantity) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ idMeal, quantity }))
    }
  }

  const handleClearCart = () => {
    dispatch(clearCart())
  }

  return (
    <div className={styles.cart}>
      <div className={styles.container}>
        <h1 className={styles.title}>
          <ShoppingBag size={32} className={styles.titleIcon} />
          Корзина
        </h1>

        {items.length === 0 ? (
          <div className={styles.empty}>
            <ShoppingBag size={64} className={styles.emptyIcon} />
            <p>Ваша корзина пуста</p>
            <Link to="/catalog" className={styles.shopBtn}>
              Смотреть рецепты <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <>
            <div className={styles.header}>
              <span>{total} {total === 1 ? 'товар' : 'товаров'}</span>
              <button onClick={handleClearCart} className={styles.clearBtn}>
                <Trash2 size={16} /> Очистить корзину
              </button>
            </div>

            <div className={styles.items}>
              {items.map(item => (
                <div key={item.idMeal} className={styles.item}>
                  <img src={item.strMealThumb} alt={item.strMeal} className={styles.itemImage} />
                  
                  <div className={styles.itemInfo}>
                    <h3>{item.strMeal}</h3>
                    <p className={styles.category}>{item.strCategory}</p>
                  </div>

                  <div className={styles.quantityControl}>
                    <button 
                      onClick={() => handleQuantityChange(item.idMeal, (item.quantity || 1) - 1)}
                      className={styles.qtyBtn}
                      disabled={(item.quantity || 1) <= 1}
                    >
                      <Minus size={16} />
                    </button>
                    <span className={styles.qty}>{item.quantity || 1}</span>
                    <button 
                      onClick={() => handleQuantityChange(item.idMeal, (item.quantity || 1) + 1)}
                      className={styles.qtyBtn}
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <button 
                    onClick={() => handleRemove(item.idMeal)}
                    className={styles.removeBtn}
                    aria-label="Remove item"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>

            <div className={styles.footer}>
              <div className={styles.total}>
                <span>Всего товаров:</span>
                <strong>{total}</strong>
              </div>
              <Link to="/checkout" className={styles.checkoutBtn}>
                Оформить заказ <ArrowRight size={18} />
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Cart
