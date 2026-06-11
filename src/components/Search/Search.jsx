import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"

import {
  motion as Motion
} from "framer-motion"

import styles
from "./Search.module.css"

function Search({ search, setSearch, handleSearch }) {
  const { t } = useTranslation()

  const [mode, setMode] = useState('title')

  // debounce instant search
  useEffect(()=>{
    const t = setTimeout(()=>{
      if(search && search.trim().length>0){
        handleSearch(search, mode)
      }
    }, 400)
    return ()=>clearTimeout(t)
  },[search, mode, handleSearch])

  return (

    <div className={styles.searchBox}>

      <input type="text" placeholder={t('search.placeholder')} value={search} onChange={(e)=> setSearch(e.target.value)} />

      <select value={mode} onChange={e=>setMode(e.target.value)} className={styles.modeSelect}>
        <option value="title">{t('search.title')}</option>
        <option value="category">{t('search.category')}</option>
        <option value="ingredient">{t('search.ingredient')}</option>
      </select>

      <Motion.button
        onClick={()=>handleSearch(search, mode)}

        whileHover={{
          scale:1.05
        }}

        whileTap={{
          scale:0.95
        }}

      >{t('search.searchButton')}</Motion.button>

    </div>

  )

}

export default Search