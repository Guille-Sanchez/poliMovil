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
import { useDispatch, useSelector } from 'react-redux'
import { MyProfile } from './views/MyProfile'
import { SignUp } from './views/SignUp'
import { useEffect } from 'react'
import { SET_AUTHENTICATION_DATA } from './redux/AuthenticationSlice'

function App (): JSX.Element {
  const isAuthenticated = useSelector((state: RootState) => state.authentication.isAuthenticated)
  const dispatch = useDispatch()
  usePostsAPI()
  useUsersAPI()

  useEffect(() => {
    let subscribed = true

    if (subscribed) {
      const token = localStorage.getItem('accessToken')
      if (token !== null && token !== undefined && token !== '') {
        dispatch(SET_AUTHENTICATION_DATA({ isAuthenticated: true, accessToken: token }))
      }
    }

    return () => {
      subscribed = false
    }
  }, [])

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
                    <Route path='/mi-perfil' element={<MyProfile />} />
                  </>
                : <>
                    <Route path='/' element={<Login />} />
                    <Route path='/signup' element={<SignUp />} />
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
