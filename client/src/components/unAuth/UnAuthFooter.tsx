import { Link } from 'react-router-dom'

export const UnAuthFooter = (): JSX.Element => {
  return (
    <footer className="bg-white p-5 flex flex-col items-center justify-center gap-2">
      <div className='flex-shrink-0 w-full grid grid-cols-3 gap-5 justify-evenly items-center max-w-xl mx-auto'
        style={{ fontSize: 'clamp(0.875rem, 0.658rem + 0.924vw, 1.25rem)' }}
      >
        <Link to={'/acerca-de'}>
          <p className='text-center text-gray-500 w-full'>Acerca de</p>
        </Link>

        <Link to={'/terminos-y-condiciones'}>
          <p className='text-center text-gray-500 w-full'>Terminos y<br/>condiciones</p>
        </Link>

        <Link to={'/'}>
          <p className='text-center text-gray-500 w-full'>Iniciar sesión</p>
        </Link>
      </div>

      <p className="text-center text-gray-500">Beta - Mayo 2023</p>
    </footer>
  )
}
