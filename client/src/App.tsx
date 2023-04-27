import { Route, Routes } from 'react-router-dom'
import { Homepage } from './views/Homepage'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { PostForm } from './views/PostForm'
import { DetailedPost } from './views/DetailedPost'
import { usePostsAPI } from './hooks/usePostsAPI'

function App (): JSX.Element {
  usePostsAPI()

  return (
    <div className='flex flex-col h-full'>
      <Header/>
        <main className='flex-grow'>
          <Routes>
            <Route path='/' element={<Homepage/>}/>
            <Route path='/posts' element={<PostForm/>}/>
            <Route path='/posts/:id' element={<DetailedPost/>}/>
          </Routes>
        </main>
      <Footer/>
    </div>
  )
}

export default App
