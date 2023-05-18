import { useState } from 'react'
import { IconMenu, IconClose } from '../assets/Icons'
import { Menu } from './Menu'
import { Link } from 'react-router-dom'
import { usePreventScrollY } from '../hooks/usePreventScrollY'

export const Header = (): JSX.Element => {
  const [showMenu, setShowMenu] = useState(false)

  const toggleMenu = (): void => {
    setShowMenu((prev) => { return !prev })
  }

  usePreventScrollY({ showMenu })

  return (
    <header className="text-white bg-gradient-to-r from-blue-900 to-indigo-900 text-2xl font-bold p-5 flex justify-between">
      <Link to='/'>
        <h1>PoliMovil <span className='text-xs'>(beta)</span></h1>
      </Link>

      <button onClick={toggleMenu} aria-label='Menu desplegable'>
        {
          !showMenu
            ? <IconMenu height={'1.25em'} width={'1.25em'} />
            : <IconClose height={'1.25em'} width={'1.25em'} />
        }
      </button>

      {showMenu && <Menu setShowMenu={setShowMenu}/>}
    </header>
  )
}
