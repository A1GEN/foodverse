import { Truck, CreditCard, Shield, Clock, MapPin, Phone, Mail } from 'lucide-react'
import styles from './Delivery.module.css'

function Delivery() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Доставка и оплата</h1>
        <p>Вся информация о способах доставки и оплаты</p>
      </div>

      <div className={styles.sections}>
        {/* Delivery Section */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <Truck size={32} className={styles.sectionIcon} />
            <h2>Способы доставки</h2>
          </div>

          <div className={styles.cards}>
            <div className={styles.card}>
              <div className={styles.cardIcon}>
                <Clock size={28} />
              </div>
              <h3>Экспресс доставка</h3>
              <p className={styles.cardTime}>30-45 минут</p>
              <p className={styles.cardPrice}>Бесплатно при заказе от 1000 сом</p>
              <p className={styles.cardDesc}>Доставка по городу в течение 30-45 минут после оформления заказа</p>
            </div>

            <div className={styles.card}>
              <div className={styles.cardIcon}>
                <MapPin size={28} />
              </div>
              <h3>Стандартная доставка</h3>
              <p className={styles.cardTime}>1-2 часа</p>
              <p className={styles.cardPrice}>150 сом</p>
              <p className={styles.cardDesc}>Доставка по городу в течение 1-2 часов</p>
            </div>

            <div className={styles.card}>
              <div className={styles.cardIcon}>
                <Truck size={28} />
              </div>
              <h3>Доставка за город</h3>
              <p className={styles.cardTime}>2-3 часа</p>
              <p className={styles.cardPrice}>от 300 сом</p>
              <p className={styles.cardDesc}>Доставка в пригород и соседние районы</p>
            </div>
          </div>
        </section>

        {/* Payment Section */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <CreditCard size={32} className={styles.sectionIcon} />
            <h2>Способы оплаты</h2>
          </div>

          <div className={styles.paymentMethods}>
            <div className={styles.paymentMethod}>
              <div className={styles.methodIcon}>
                <CreditCard size={24} />
              </div>
              <div className={styles.methodInfo}>
                <h4>Банковской картой</h4>
                <p>Visa, MasterCard, Elkart</p>
              </div>
              <div className={styles.methodBadge}>Онлайн</div>
            </div>

            <div className={styles.paymentMethod}>
              <div className={styles.methodIcon}>
                <Phone size={24} />
              </div>
              <div className={styles.methodInfo}>
                <h4>Мобильный платеж</h4>
                <p>Balance, O! Money, MegaPay</p>
              </div>
              <div className={styles.methodBadge}>Онлайн</div>
            </div>

            <div className={styles.paymentMethod}>
              <div className={styles.methodIcon}>
                <Shield size={24} />
              </div>
              <div className={styles.methodInfo}>
                <h4>Наличными при получении</h4>
                <p>Оплата курьеру при доставке</p>
              </div>
              <div className={styles.methodBadge}>При получении</div>
            </div>
          </div>
        </section>

        {/* Terms Section */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <Shield size={32} className={styles.sectionIcon} />
            <h2>Условия и гарантии</h2>
          </div>

          <div className={styles.terms}>
            <div className={styles.termItem}>
              <h4>Минимальная сумма заказа</h4>
              <p>Минимальная сумма заказа для доставки — 300 сом</p>
            </div>

            <div className={styles.termItem}>
              <h4>Время работы</h4>
              <p>Ежедневно с 10:00 до 23:00</p>
            </div>

            <div className={styles.termItem}>
              <h4>Зона доставки</h4>
              <p>Доставка осуществляется по всему городу и пригороду</p>
            </div>

            <div className={styles.termItem}>
              <h4>Возврат товара</h4>
              <p>При обнаружении брака или несоответствия заказа, возврат возможен в течение 24 часов</p>
            </div>

            <div className={styles.termItem}>
              <h4>Гарантия качества</h4>
              <p>Мы гарантируем свежесть и качество всех продуктов. При нарушении этих условий — полный возврат средств</p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <Phone size={32} className={styles.sectionIcon} />
            <h2>Контакты</h2>
          </div>

          <div className={styles.contactInfo}>
            <div className={styles.contactItem}>
              <Phone size={20} className={styles.contactIcon} />
              <div>
                <p className={styles.contactLabel}>Телефон</p>
                <p className={styles.contactValue}>+996 555 123 456</p>
              </div>
            </div>

            <div className={styles.contactItem}>
              <Mail size={20} className={styles.contactIcon} />
              <div>
                <p className={styles.contactLabel}>Email</p>
                <p className={styles.contactValue}>info@foodverse.kg</p>
              </div>
            </div>

            <div className={styles.contactItem}>
              <MapPin size={20} className={styles.contactIcon} />
              <div>
                <p className={styles.contactLabel}>Адрес</p>
                <p className={styles.contactValue}>г. Бишкек, пр. Чуй 123</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Delivery
