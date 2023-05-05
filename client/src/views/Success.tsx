import { Link, useLocation } from 'react-router-dom'

export const Success = (): JSX.Element => {
  const location = useLocation()
  return (
    <section className='bg-white h-full inset-0 flex justify-center items-center'>
      <div className='grid place-items-center gap-5 p-5 rounded-lg text-black font-semibold text-xl'>
        <p className='text-center text-2xl'>{location.state.message}</p>
        <Link to={'/'}>
          <button className='bg-gradient-to-r from-blue-900 to-indigo-900 text-white font-semibold pr-5 pl-5 pt-3 pb-3 rounded-lg'>
            Ir al inicio
          </button>
        </Link>
      </div>
    </section>
  )
}
