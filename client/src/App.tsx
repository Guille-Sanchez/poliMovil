import { Route, Routes } from 'react-router-dom'
import { Homepage } from './views/Homepage'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { PostForm } from './views/PostForm'
import { DetailedPost } from './views/DetailedPost'
import { usePostsAPI } from './hooks/usePostsAPI'
import { useUsersAPI } from './hooks/useUsersAPI'
import { Login } from './views/Login'
import { useState } from 'react'

function App (): JSX.Element {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  usePostsAPI()
  useUsersAPI()

  return (
    <div className='flex flex-col h-full'>
      <Header/>
        <main className='flex-grow'>
          <Routes>
            {
              isAuthenticated
                ? <>
                  <Route path='/' element={<Homepage />} />
                  <Route path='/posts' element={<PostForm />} />
                  <Route path='/posts/:id' element={<DetailedPost />} />
                </>
                : <>
                  <Route path='/' element={<Login setIsAuthenticated={setIsAuthenticated}/>} />
                  <Route path='*' element={<Homepage />} />
                  </>
            }
          </Routes>
        </main>
      <Footer/>
    </div>
  )
}

export default App
