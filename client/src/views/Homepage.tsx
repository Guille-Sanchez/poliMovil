import { useState } from 'react'
import { PostForm } from '../components/PostForm'
import { PostTable } from '../components/PostsTable'

export const Homepage = (): JSX.Element => {
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="bg-white grid place-items-center w-full">
      <button onClick={() => { setShowForm((prev) => !prev) }}>
        Agregar destino
      </button>

      {showForm && <PostForm/>}
      <PostTable/>

    </div>
  )
}
