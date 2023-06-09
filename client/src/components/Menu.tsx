import { Link } from 'react-router-dom'
import { currentUserInformation } from '../constants'
import { useAuthenticatonActions } from '../redux/hooks/useAuthenticationActions'

interface Props {
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>
}

export const Menu = ({ setShowMenu }: Props): JSX.Element => {
  const links = ['Mi perfil', 'Acerca de']
  const { saveAuthenticationDataInStore } = useAuthenticatonActions()

  const handleLogout = (): void => {
    localStorage.removeItem('accessToken')
    saveAuthenticationDataInStore({ isAuthenticated: false, accessToken: '', userInformation: currentUserInformation })
    setShowMenu(() => false)
  }

  return (
    <nav className="absolute z-10 inset-0 h-scree bg-black bg-opacity-50 flex" style={{ top: 'calc(2rem + 2 * clamp(1.25rem, 1.066rem + 0.787vw, 2rem))' }}>
      <ul className="mx-auto flex-shrink-0 bg-gray-100 absolute flex flex-col gap- max-w-xl items-center p-5 rounded-lg text-black font-semibold"
        style={{ inset: '0 20px auto', fontSize: 'clamp(1rem, 0.711rem + 1.233vw, 1.5rem)', gap: 'clamp(1.25rem, 0.893rem + 0.952vw, 1.75rem)' }}>
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
        <li>
          <Link to={'/'} onClick={() => { handleLogout() }}>
            Cerrar sesión
          </Link>
        </li>
      </ul>
    </nav>
  )
}
