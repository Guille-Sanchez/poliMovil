import { Link } from 'react-router-dom'

export const UnAuthFooter = (): JSX.Element => {
  return (
    <footer className="bg-white p-5 flex flex-col items-center justify-center gap-2">
      <div className='grid grid-cols-3 gap-5 items-center'>
        <Link to={'/acerca-de'}>
          <p className='text-center text-gray-500 text-sm'>Acerca de</p>
        </Link>

        <Link to={'/terminos-y-condiciones'}>
          <p className='text-center text-gray-500 text-sm'>Terminos y<br/>condiciones</p>
        </Link>

        <Link to={'/'}>
          <p className='text-center text-gray-500 text-sm'>Iniciar sesión</p>
        </Link>
      </div>

      <p className="text-center text-gray-500 text-sm">Beta - Mayo 2023</p>
    </footer>
  )
}
