import { useState } from 'react'
import './homepage.css'
import { PostForm } from '../../components/postForm/PostForm'
import { PostTable } from '../../components/postsTable/PostsTable'

export const Homepage = (): JSX.Element => {
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="homepage">
      <button onClick={() => { setShowForm((prev) => !prev) }}>
        Agregar destino
      </button>

      {showForm && <PostForm/>}
      <PostTable/>

    </div>
  )
}
