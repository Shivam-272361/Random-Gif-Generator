import Random from "./Random"
import Tag from "./Tag"
import { useState} from "react"


function App() {
  return (
    <>
        <h1 className="text-5xl md:text-6xl font-extrabold text-center text-white bg-gradient-to-r from-purple-600 to-pink-600 py-8 mb-0 shadow-lg">
        Random GIFS
      </h1>
      <Random/>
      <Tag/>
    </>
  )
}

export default App
