import { Globe, Mail, Phone, MapPin, Clock } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import styles from './Footer.module.css'

function Footer() {
  const { t } = useTranslation()

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.column}>
            <h3 className={styles.title}>FoodVerse</h3>
            <p className={styles.description}>
              {t('footer.description')}
            </p>
            <div className={styles.socialLinks}>
              <a href="#" className={styles.socialLink} aria-label="Facebook">
                <span>FB</span>
              </a>
              <a href="#" className={styles.socialLink} aria-label="Instagram">
                <span>IG</span>
              </a>
              <a href="#" className={styles.socialLink} aria-label="Twitter">
                <span>X</span>
              </a>
              <a href="#" className={styles.socialLink} aria-label="YouTube">
                <span>YT</span>
              </a>
            </div>
          </div>

          <div className={styles.column}>
            <h3 className={styles.title}>{t('footer.navigation')}</h3>
            <ul className={styles.links}>
              <li><a href="/" className={styles.link}>{t('home')}</a></li>
              <li><a href="/catalog" className={styles.link}>{t('catalog')}</a></li>
              <li><a href="/recipes" className={styles.link}>{t('recipes', 'Рецепты')}</a></li>
              <li><a href="/create" className={styles.link}>{t('create')}</a></li>
            </ul>
          </div>

          <div className={styles.column}>
            <h3 className={styles.title}>{t('footer.contacts')}</h3>
            <ul className={styles.contactList}>
              <li className={styles.contactItem}>
                <Phone size={18} />
                <div>
                  <span className={styles.contactLabel}>{t('footer.phone')}:</span>
                  <a href="tel:+996502333384" className={styles.contactValue}>+996 502 333 384</a>
                </div>
              </li>
              <li className={styles.contactItem}>
                <Mail size={18} />
                <div>
                  <span className={styles.contactLabel}>{t('footer.email')}:</span>
                  <a href="mailto:m3534994@gmail.com" className={styles.contactValue}>m3534994@gmail.com</a>
                </div>
              </li>
              <li className={styles.contactItem}>
                <MapPin size={18} />
                <div>
                  <span className={styles.contactLabel}>{t('footer.address')}:</span>
                  <span className={styles.contactValue}>г. Бишкек, пр. Чуй 123</span>
                </div>
              </li>
              <li className={styles.contactItem}>
                <Clock size={18} />
                <div>
                  <span className={styles.contactLabel}>{t('footer.hours')}:</span>
                  <span className={styles.contactValue}>Ежедневно 9:00 - 22:00</span>
                </div>
              </li>
            </ul>
          </div>

          <div className={styles.column}>
            <h3 className={styles.title}>{t('footer.support')}</h3>
            <ul className={styles.links}>
              <li><a href="#" className={styles.link}>{t('footer.faq')}</a></li>
              <li><a href="#" className={styles.link}>{t('footer.delivery')}</a></li>
              <li><a href="#" className={styles.link}>{t('footer.returns')}</a></li>
              <li><a href="#" className={styles.link}>{t('footer.privacy')}</a></li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
