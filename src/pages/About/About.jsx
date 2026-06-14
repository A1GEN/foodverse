import { Heart, Users, Award, Globe, Clock, ChefHat, Truck, Shield, Star } from 'lucide-react'
import styles from './About.module.css'

function About() {
  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>О FoodVerse</h1>
          <p className={styles.subtitle}>
            Мы создаем будущее здорового питания, объединяя традиции кыргызской кухни с современными технологиями
          </p>
        </div>
      </div>

      <div className={styles.content}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Наша миссия</h2>
          <p className={styles.text}>
            FoodVerse - это не просто платформа для заказа еды, это целая вселенная кулинарных возможностей. 
            Мы верим, что каждый человек заслуживает доступа к качественной, вкусной и полезной пище. 
            Наша миссия - сделать здоровое питание доступным для каждого жителя Кыргызстана и за его пределами.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Почему выбирают нас</h2>
          <div className={styles.features}>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <Heart size={40} />
              </div>
              <h3 className={styles.featureTitle}>Качество</h3>
              <p className={styles.featureText}>
                Только свежие продукты от проверенных поставщиков. Строгий контроль качества на каждом этапе.
              </p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <Users size={40} />
              </div>
              <h3 className={styles.featureTitle}>Команда</h3>
              <p className={styles.featureText}>
                Профессиональные повара с многолетним опытом. Любовь к делу в каждом блюде.
              </p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <Award size={40} />
              </div>
              <h3 className={styles.featureTitle}>Опыт</h3>
              <p className={styles.featureText}>
                Более 5 лет на рынке кейтеринга. Тысячи довольных клиентов по всей стране.
              </p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <Globe size={40} />
              </div>
              <h3 className={styles.featureTitle}>Доступность</h3>
              <p className={styles.featureText}>
                Удобный онлайн-заказ. Быстрая доставка по Бишкеку и другим городам.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Наши ценности</h2>
          <div className={styles.values}>
            <div className={styles.value}>
              <ChefHat size={32} className={styles.valueIcon} />
              <h3>Мастерство</h3>
              <p>Каждое блюдо - произведение искусства, созданное с любовью и вниманием к деталям</p>
            </div>
            <div className={styles.value}>
              <Heart size={32} className={styles.valueIcon} />
              <h3>Забота</h3>
              <p>Мы заботимся о здоровье наших клиентов, используя только натуральные ингредиенты</p>
            </div>
            <div className={styles.value}>
              <Clock size={32} className={styles.valueIcon} />
              <h3>Пунктуальность</h3>
              <p>Ценим ваше время - доставляем заказы точно в срок</p>
            </div>
            <div className={styles.value}>
              <Shield size={32} className={styles.valueIcon} />
              <h3>Надежность</h3>
              <p>Гарантируем качество и безопасность каждого продукта</p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>История компании</h2>
          <div className={styles.timeline}>
            <div className={styles.timelineItem}>
              <div className={styles.timelineYear}>2019</div>
              <div className={styles.timelineContent}>
                <h3>Начало пути</h3>
                <p>Основание FoodVerse как небольшой семейной кейтеринг-компании в Бишкеке</p>
              </div>
            </div>
            <div className={styles.timelineItem}>
              <div className={styles.timelineYear}>2020</div>
              <div className={styles.timelineContent}>
                <h3>Расширение</h3>
                <p>Открытие первого ресторана и запуск онлайн-платформы для заказов</p>
              </div>
            </div>
            <div className={styles.timelineItem}>
              <div className={styles.timelineYear}>2022</div>
              <div className={styles.timelineContent}>
                <h3>Инновации</h3>
                <p>Внедрение системы рецептов и кулинарного блога для наших клиентов</p>
              </div>
            </div>
            <div className={styles.timelineItem}>
              <div className={styles.timelineYear}>2024</div>
              <div className={styles.timelineContent}>
                <h3>Масштабирование</h3>
                <p>Запуск доставки по всему Кыргызстану и выход на международный рынок</p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Наши услуги</h2>
          <div className={styles.services}>
            <div className={styles.service}>
              <Truck size={48} className={styles.serviceIcon} />
              <h3>Доставка еды</h3>
              <p>Быстрая доставка горячих блюд прямо к вашей двери</p>
            </div>
            <div className={styles.service}>
              <ChefHat size={48} className={styles.serviceIcon} />
              <h3>Кейтеринг</h3>
              <p>Организация питания для мероприятий любого масштаба</p>
            </div>
            <div className={styles.service}>
              <Star size={48} className={styles.serviceIcon} />
              <h3>Кулинарные курсы</h3>
              <p>Обучение кулинарному искусству от наших шеф-поваров</p>
            </div>
            <div className={styles.service}>
              <Users size={48} className={styles.serviceIcon} />
              <h3>Корпоративное питание</h3>
              <p>Комплексные решения для питания сотрудников компаний</p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Статистика</h2>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <div className={styles.statNumber}>5000+</div>
              <div className={styles.statLabel}>Довольных клиентов</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNumber}>200+</div>
              <div className={styles.statLabel}>Блюд в меню</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNumber}>50+</div>
              <div className={styles.statLabel}>Профессиональных поваров</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNumber}>5 лет</div>
              <div className={styles.statLabel}>На рынке</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default About
