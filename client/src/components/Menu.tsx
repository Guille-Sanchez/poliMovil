import { Link } from 'react-router-dom'

interface Props {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>

}

export const Menu = ({ setIsAuthenticated }: Props): JSX.Element => {
  const links = ['Mi perfil', 'Acerca de']

  return (
    <nav className="absolute z-10 inset-0 top-[72px] bg-black bg-opacity-50">
      <ul className="bg-white absolute flex flex-col items-center gap-4 p-5 rounded-lg text-black text-xl font-semibold" style={{ inset: '0 20px auto' }}>
        {
          links.map((link) => {
            return (
              <li key={link}>{link}</li>
            )
          })
        }
        <li><Link to={'/'} onClick={() => { setIsAuthenticated(() => false) }}>Cerrar sesión</Link></li>
      </ul>
    </nav>
  )
}
