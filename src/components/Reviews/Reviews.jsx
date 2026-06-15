import { useState } from 'react'
import { Star, Send, X } from 'lucide-react'
import { useSelector, useDispatch } from 'react-redux'
import { addReview } from '../../redux/reviewsSlice'
import styles from './Reviews.module.css'

function Reviews({ productId }) {
  const dispatch = useDispatch()
  const { items: reviews } = useSelector(state => state.reviews)
  
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: '',
    author: ''
  })
  const [showForm, setShowForm] = useState(false)

  const productReviews = reviews.filter(review => review.productId === productId)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!newReview.comment.trim() || !newReview.author.trim()) return

    const review = {
      id: Date.now(),
      productId,
      ...newReview,
      date: new Date().toISOString()
    }

    dispatch(addReview(review))
    setNewReview({ rating: 5, comment: '', author: '' })
    setShowForm(false)
  }

  const averageRating = productReviews.length > 0
    ? (productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length).toFixed(1)
    : '0.0'

  return (
    <div className={styles.reviews}>
      <div className={styles.header}>
        <h2>Отзывы покупателей</h2>
        <div className={styles.ratingSummary}>
          <div className={styles.averageRating}>
            <span className={styles.ratingValue}>{averageRating}</span>
            <Star size={20} className={styles.star} fill="#ff6b35" color="#ff6b35" />
          </div>
          <span className={styles.reviewCount}>{productReviews.length} отзывов</span>
        </div>
      </div>

      {!showForm ? (
        <button className={styles.addReviewBtn} onClick={() => setShowForm(true)}>
          <Star size={18} /> Оставить отзыв
        </button>
      ) : (
        <form className={styles.reviewForm} onSubmit={handleSubmit}>
          <div className={styles.formHeader}>
            <h3>Новый отзыв</h3>
            <button type="button" className={styles.closeBtn} onClick={() => setShowForm(false)}>
              <X size={18} />
            </button>
          </div>

          <div className={styles.formGroup}>
            <label>Ваше имя</label>
            <input
              type="text"
              value={newReview.author}
              onChange={(e) => setNewReview({ ...newReview, author: e.target.value })}
              placeholder="Введите ваше имя"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Оценка</label>
            <div className={styles.ratingSelector}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={`${styles.starBtn} ${star <= newReview.rating ? styles.active : ''}`}
                  onClick={() => setNewReview({ ...newReview, rating: star })}
                >
                  <Star size={24} fill={star <= newReview.rating ? '#ff6b35' : 'none'} color="#ff6b35" />
                </button>
              ))}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Комментарий</label>
            <textarea
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              placeholder="Поделитесь вашим мнением о продукте..."
              rows={4}
              required
            />
          </div>

          <button type="submit" className={styles.submitBtn}>
            <Send size={18} /> Отправить отзыв
          </button>
        </form>
      )}

      <div className={styles.reviewsList}>
        {productReviews.length === 0 ? (
          <p className={styles.noReviews}>Пока нет отзывов. Будьте первым!</p>
        ) : (
          productReviews.map((review) => (
            <div key={review.id} className={styles.reviewCard}>
              <div className={styles.reviewHeader}>
                <div className={styles.authorInfo}>
                  <span className={styles.authorName}>{review.author}</span>
                  <span className={styles.reviewDate}>
                    {new Date(review.date).toLocaleDateString('ru-RU')}
                  </span>
                </div>
                <div className={styles.reviewRating}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={16}
                      fill={star <= review.rating ? '#ff6b35' : 'none'}
                      color="#ff6b35"
                    />
                  ))}
                </div>
              </div>
              <p className={styles.reviewComment}>{review.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Reviews
