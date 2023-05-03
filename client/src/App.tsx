import { Route, Routes } from 'react-router-dom'
import { Homepage } from './views/Homepage'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { usePostsAPI } from './hooks/usePostsAPI'
import { useUsersAPI } from './hooks/useUsersAPI'
import { PageNotFound } from './views/PageNotFound'
import { UnAuthHeader } from './components/unAuth/UnAuthHeader'
import { UnAuthFooter } from './components/unAuth/UnAuthFooter'
import { type RootState } from './redux/store'
import { useSelector } from 'react-redux'
import { lazy, Suspense } from 'react'
import { LoadingSPinner } from './components/LoadingSPinner'
import { useTokenFromStorage } from './hooks/useTokenFromStorage'

const PostForm = lazy(async () => await import('./views/PostForm').then(module => ({ default: module.PostForm })))
const DetailedPost = lazy(async () => await import('./views/DetailedPost').then(module => ({ default: module.DetailedPost })))
const Login = lazy(async () => await import('./views/Login').then(module => ({ default: module.Login })))
const MyProfile = lazy(async () => await import('./views/MyProfile').then(module => ({ default: module.MyProfile })))
const SignUp = lazy(async () => await import('./views/SignUp').then(module => ({ default: module.SignUp })))

function App (): JSX.Element {
  const isAuthenticated = useSelector((state: RootState) => state.authentication.isAuthenticated)

  usePostsAPI()
  useUsersAPI()
  useTokenFromStorage()

  return (
    <div className='flex flex-col h-full'>
      {isAuthenticated ? <Header /> : <UnAuthHeader />}
        <main className='flex-grow'>
          <Suspense fallback={<LoadingSPinner/>}>
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
          </Suspense>
        </main>
      {isAuthenticated ? <Footer/> : <UnAuthFooter/>}
    </div>
  )
}

export default App
