import { Route, Routes } from 'react-router-dom'
import { Homepage } from './views/Homepage'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { PostForm } from './views/PostForm'

function App (): JSX.Element {
  return (
    <div className='flex flex-col h-full'>
      <Header/>
        <main className='flex-grow'>
          <Routes>
            <Route path='/' element={<Homepage/>}/>
            <Route path='/posts' element={<PostForm/>}/>
          </Routes>
        </main>
      <Footer/>
    </div>
  )
}

export default App
