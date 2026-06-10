import { useState, useEffect } from "react"

import {
  motion as Motion
} from "framer-motion"

import styles
from "./Search.module.css"

function Search({ search, setSearch, handleSearch }) {

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

  // 🎤 Voice Search
  const startVoiceSearch = ()=>{

    const recognition =

      new window.webkitSpeechRecognition()

    recognition.lang = "en-US"

    recognition.start()

    recognition.onresult = (event)=>{

      const transcript =

        event.results[0][0].transcript

      setSearch(transcript)

    }

  }

  return (

    <div className={styles.searchBox}>

      <input type="text" placeholder="Search recipes..." value={search} onChange={(e)=> setSearch(e.target.value)} />

      <select value={mode} onChange={e=>setMode(e.target.value)} className={styles.modeSelect}>
        <option value="title">Title</option>
        <option value="category">Category</option>
        <option value="ingredient">Ingredient</option>
      </select>

      <Motion.button
        onClick={()=>handleSearch(search, mode)}

        whileHover={{
          scale:1.05
        }}

        whileTap={{
          scale:0.95
        }}

      >Search</Motion.button>

      <Motion.button

        onClick={startVoiceSearch}

        whileHover={{
          scale:1.05
        }}

        whileTap={{
          scale:0.95
        }}

      >
        🎤
      </Motion.button>

    </div>

  )

}

export default Search