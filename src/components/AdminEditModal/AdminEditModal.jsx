import React, { useEffect, useState } from 'react'
import styles from './AdminEditModal.module.css'

export default function AdminEditModal({ open, data, onClose, onSave }){
  const [form, setForm] = useState({ title: '', status: '' })

  useEffect(()=>{
    if(open && data){ setForm({ title: data.title || data.name || '', status: data.status || '' }) }
  },[open,data])

  if(!open) return null

  return (
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true">
      <div className={styles.modal} onClick={e=>e.stopPropagation()}>
        <h3>Edit recipe</h3>
        <label>Title
          <input value={form.title} onChange={e=> setForm(f=> ({...f, title: e.target.value}))} />
        </label>
        <label>Status
          <input value={form.status} onChange={e=> setForm(f=> ({...f, status: e.target.value}))} />
        </label>
        <div className={styles.actions}>
          <button className="btn btn-primary" onClick={()=> onSave({ ...data, title: form.title, status: form.status })}>Save</button>
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  )
}
