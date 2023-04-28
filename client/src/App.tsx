import { Route, Routes } from 'react-router-dom'
import { Homepage } from './views/Homepage'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { PostForm } from './views/PostForm'
import { DetailedPost } from './views/DetailedPost'
import { usePostsAPI } from './hooks/usePostsAPI'
import { useUsersAPI } from './hooks/useUsersAPI'
import { Login } from './views/Login'
import { PageNotFound } from './views/PageNotFound'
import { UnAuthHeader } from './components/unAuth/UnAuthHeader'
import { UnAuthFooter } from './components/unAuth/UnAuthFooter'
import { type RootState } from './redux/store'
import { useSelector } from 'react-redux'

function App (): JSX.Element {
  const isAuthenticated = useSelector((state: RootState) => state.authentication.isAuthenticated)
  usePostsAPI()
  useUsersAPI()

  return (
    <div className='flex flex-col h-full'>
      {isAuthenticated ? <Header /> : <UnAuthHeader />}
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
                    <Route path='/' element={<Login />} />
                    <Route path='*' element={<PageNotFound />} />
                  </>
            }
          </Routes>
        </main>
      {isAuthenticated ? <Footer/> : <UnAuthFooter/>}
    </div>
  )
}

export default App
