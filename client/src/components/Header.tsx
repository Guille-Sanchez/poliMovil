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
    <header className="text-white bg-gradient-to-r from-blue-900 to-indigo-900 text-2xl font-bold w-full flex justify-center">
      <div className='w-full max-w-[1600px] full flex justify-between' style={{ padding: 'clamp(1.25rem, 1.066rem + 0.787vw, 2rem)' }}>
        <Link to='/'>
          <h1 style={{ fontSize: 'clamp(1.25rem, 1.004rem + 1.049vw, 2.25rem) !important' }} >PoliMovil <span className='text-xs'>(beta)</span></h1>
        </Link>

        <button onClick={toggleMenu} aria-label='Menu desplegable'>
          {
            !showMenu
              ? <IconMenu height={'1.25em'} width={'1.25em'} />
              : <IconClose height={'1.25em'} width={'1.25em'} />
          }
        </button>

        {showMenu && <Menu setShowMenu={setShowMenu}/>}
      </div>
    </header>
  )
}
