import { Link } from 'react-router-dom'

export const PageNotFound = (): JSX.Element => {
  return (
    <section
      className='flex-shrink-0 flex flex-col gap-5 items-center justify-center bg-gray-100 w-full max-w-4xl min-h-full px-5'
      style={{ fontSize: 'clamp(1rem, 0.711rem + 1.233vw, 1.5rem)' }}
    >
      <div>
        <p className='text-9xl font-bold text-center'>404</p>
        <p className='font-bold text-center' style={{ fontSize: 'clamp(1.5rem, 1.131rem + 1.574vw, 3rem)' }}>Página no encontrada</p>
        <p className='font-bold text-center' style={{ fontSize: 'clamp(1.25rem, 1.004rem + 1.049vw, 2.25rem)' }}>La página que estás buscando no existe</p>
      </div>

      <Link to='/'>
        <button className='bg-gradient-to-r from-blue-900 to-indigo-900 text-white pt-2 pb-2 p-7 pr-7 rounded-lg'>
          Volver al inicio
        </button>
      </Link>
    </section>
  )
}
