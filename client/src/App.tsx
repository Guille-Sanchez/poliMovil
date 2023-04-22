import { Route, Routes } from 'react-router-dom'
import { Homepage } from './views/Homepage'
import { Header } from './components/Header'
import { Footer } from './components/Footer'

function App (): JSX.Element {
  return (
    <div className='flex flex-col h-full'>
      <Header/>
        <main className='flex-grow h-full'>
          <Routes>
            <Route path='/' element={<Homepage/>}/>
          </Routes>
        </main>
      <Footer/>
    </div>
  )
}

export default App
