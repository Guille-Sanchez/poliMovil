import { Route, Routes } from 'react-router-dom'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { PageNotFound } from './views/PageNotFound'
import { UnAuthHeader } from './components/unAuth/UnAuthHeader'
import { UnAuthFooter } from './components/unAuth/UnAuthFooter'
import { useAppSelector } from './redux/hooks/useStore'
import { lazy, Suspense, useState } from 'react'
import { LoadingSpinner } from './components/LoadingSpinner'
import { useTokenFromStorage } from './hooks/useTokenFromStorage'
import { usePostsAPI } from './hooks/usePostsAPI'

const About = lazy(async () => await import('./views/About').then(module => ({ default: module.About })))
const CompleteProfile = lazy(async () => await import('./views/user/CompleteProfile').then(module => ({ default: module.CompleteProfile })))
const DetailedPost = lazy(async () => await import('./views/DetailedPost').then(module => ({ default: module.DetailedPost })))
const Homepage = lazy(async () => await import('./views/Homepage').then(module => ({ default: module.Homepage })))
const Login = lazy(async () => await import('./views/user/Login').then(module => ({ default: module.Login })))
const MyProfile = lazy(async () => await import('./views/user/MyProfile').then(module => ({ default: module.MyProfile })))
const PostForm = lazy(async () => await import('./views/PostForm').then(module => ({ default: module.PostForm })))
const SignUp = lazy(async () => await import('./views/user/SignUp').then(module => ({ default: module.SignUp })))
const TermsOfService = lazy(async () => await import('./views/TermsOfService').then(module => ({ default: module.TermsOfService })))
const UserTravels = lazy(async () => await import('./views/user/UserTravels').then(module => ({ default: module.UserTravels })))

function App (): JSX.Element {
  const isAuthenticated = useAppSelector((state) => state.authentication.isAuthenticated)
  const { isProfileCompleted } = useAppSelector((state) => state.authentication.userInformation)
  const [arePostsLoading, setArePostsLoading] = useState(true)

  // Get posts from API and store them in Redux Store
  const { message } = usePostsAPI({ setArePostsLoading, isAuthenticated })
  useTokenFromStorage()

  if (!isAuthenticated) {
    return (
      <div className='bg-gray-100  flex flex-col min-h-full'>
        <UnAuthHeader />
          <main className='flex-grow flex justify-center h-full relative'>
            <Suspense fallback={<LoadingSpinner/>}>
              {
                <Routes>
                  <Route path='/' element={<Login />} />
                  <Route path='/signup' element={<SignUp />} />
                  <Route path='/acerca-de' element={<About />} />
                  <Route path='/terminos-y-condiciones' element={<TermsOfService />} />
                  <Route path='*' element={<PageNotFound />} />
                </Routes>
              }
            </Suspense>
          </main>
        <UnAuthFooter/>
      </div>
    )
  } else if (isAuthenticated && !isProfileCompleted) {
    return (
      <div className='bg-gray-100  flex flex-col min-h-full'>
        <Header />
          <main className='flex-grow flex justify-center h-full relative'>
            <Suspense fallback={<LoadingSpinner/>}>
              {
                <Routes>
                  <Route path='*' element={<CompleteProfile />} />
                </Routes>
              }
            </Suspense>
          </main>
        <Footer/>
      </div>
    )
  } else {
    return (
    <div className='bg-gray-100  flex flex-col min-h-full'>
      <Header />
        <main className='flex-grow flex justify-center h-full relative'>
          <Suspense fallback={<LoadingSpinner/>}>
            {
              <Routes>
                <Route path='/' element={<Homepage message={message} arePostsLoading={arePostsLoading}/>} />
                <Route path='/posts' element={<PostForm />} />
                <Route path='/posts/:id' element={<DetailedPost />} />
                <Route path='/mi-perfil' element={<MyProfile />} />
                <Route path='/posts/editar/:id' element={<PostForm />} />
                <Route path='/travels' element={<UserTravels />} />
                <Route path='/acerca-de' element={<About />} />
                <Route path='/terminos-y-condiciones' element={<TermsOfService />} />
                <Route path='*' element={<PageNotFound />} />
              </Routes>
            }
          </Suspense>
        </main>
      <Footer/>
    </div>
    )
  }
}

export default App
