import { Route, Routes } from 'react-router-dom'
import { Homepage } from './views/homepage/Homepage'
import { Header } from './components/header/Header'
import { Footer } from './components/Footer'

function App (): JSX.Element {
  return (
    <div className='App'>
      <Header/>
        <main>
          <Routes>
            <Route path='/' element={<Homepage/>}/>
          </Routes>
        </main>
      <Footer/>
    </div>
  )
}

export default App
