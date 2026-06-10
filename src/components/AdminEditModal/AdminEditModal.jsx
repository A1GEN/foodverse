import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import styles from './AdminEditModal.module.css'
import { useTranslation } from 'react-i18next'

export default function AdminEditModal({ open, data, onClose, onSave }){
  const { t } = useTranslation()
  const [form, setForm] = useState({ title: '', status: '' })

  useEffect(()=>{
    if(open && data){ setForm({ title: data.title || data.name || '', status: data.status || '' }) }
  },[open,data])

  if(!open) return null

  return (
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true">
      <motion.div className={styles.modal}
        onClick={e=>e.stopPropagation()}
        initial={{ opacity: 0, y: 10, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 8, scale: 0.99 }}
        transition={{ duration: 0.16, ease: 'easeOut' }}
      >
        <h3>{t('admin.editModal.title','Edit recipe')}</h3>
        <label>{t('admin.editModal.fields.title','Title')}
          <input value={form.title} onChange={e=> setForm(f=> ({...f, title: e.target.value}))} />
        </label>
        <label>{t('admin.editModal.fields.status','Status')}
          <input value={form.status} onChange={e=> setForm(f=> ({...f, status: e.target.value}))} />
        </label>
        <div className={styles.actions}>
          <button className="btn btn-primary" onClick={()=> onSave({ ...data, title: form.title, status: form.status })}>{t('admin.editModal.save','Save')}</button>
          <button className="btn btn-ghost" onClick={onClose}>{t('admin.editModal.cancel','Cancel')}</button>
        </div>
      </motion.div>
    </div>
  )
}
