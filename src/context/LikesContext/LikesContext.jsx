/* eslint-disable react-refresh/only-export-components */
import {

  createContext,
  useEffect,
  useState

} from "react"

export const LikesContext =
  createContext()

function LikesProvider({
  children
}) {

  const [likes,setLikes] =
    useState(()=> JSON.parse(localStorage.getItem('likes')) || {})

  // 🔥 Save likes
  useEffect(()=>{

    localStorage.setItem(
      "likes",
      JSON.stringify(likes)
    )

  },[likes])

  // ❤️ Toggle like
  const toggleLike = (id)=>{

    setLikes(prev=>({

      ...prev,

      [id]:
        prev[id]
          ? prev[id]-1
          : 1

    }))

  }

  return (

    <LikesContext.Provider

      value={{
        likes,
        toggleLike
      }}

    >

      {children}

    </LikesContext.Provider>

  )

}

export default LikesProvider