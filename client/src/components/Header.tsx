import { useState } from 'react'
import { IconMenu, IconClose } from '../assets/Icons'
import { Menu } from './Menu'
import { usePreventScroll } from '../hooks/usePreventScroll'

interface Props {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>

}

export const Header = ({ setIsAuthenticated }: Props): JSX.Element => {
  const [showMenu, setShowMenu] = useState(false)

  usePreventScroll({ showMenu })

  return (
    <>
      <header className="text-white bg-gradient-to-r from-blue-900 to-indigo-900 text-2xl font-bold p-5 flex justify-between">
        <h1>PoliMovil <span className='text-xs'>(beta)</span></h1>

        <button onClick={() => { setShowMenu((prev) => { return !prev }) }}>
          {
            !showMenu
              ? <IconMenu height={'1.25em'} width={'1.25em'}/>
              : <IconClose height={'1.25em'} width={'1.25em'}/>
          }
        </button>
      </header>

      {showMenu && <Menu setIsAuthenticated={setIsAuthenticated}/>}

    </>
  )
}
