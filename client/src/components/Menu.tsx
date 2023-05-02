import { Link } from 'react-router-dom'
import { SET_AUTHENTICATION_DATA } from '../redux/AuthenticationSlice'
import { useDispatch } from 'react-redux'

interface Props {
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>
}

export const Menu = ({ setShowMenu }: Props): JSX.Element => {
  const links = ['Mi perfil', 'Acerca de']
  const dispatch = useDispatch()

  const logOut = (): void => {
    localStorage.removeItem('accessToken')
    dispatch(SET_AUTHENTICATION_DATA({ isAuthenticated: false, accessToken: '' }))
    setShowMenu(false)
  }

  return (
    <nav className="absolute z-10 inset-0 top-[72px] bg-black bg-opacity-50">
      <ul className="bg-white absolute flex flex-col items-center gap-4 p-5 rounded-lg text-black text-xl font-semibold"
        style={{ inset: '0 20px auto' }}>
        {
          links.map((link) => {
            return (
              <li key={link}>
                <Link to={link.replace(' ', '-').toLowerCase()}
                  onClick={() => { setShowMenu(false) }}
                >
                  {link}
                </Link>
              </li>
            )
          })
        }
        <li><Link to={'/'} onClick={logOut}>Cerrar sesión</Link></li>
      </ul>
    </nav>
  )
}
