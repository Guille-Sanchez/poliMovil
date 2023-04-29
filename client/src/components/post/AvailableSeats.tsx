import { Link } from 'react-router-dom'

interface Props {
  asientosDisponibles: number
  postId: string
}

export const AvailableSeats = ({ asientosDisponibles, postId }: Props): JSX.Element => {
  return (
    <div className='flex justify-between items-center'>
      <p>Asientos Disponibles: {asientosDisponibles}</p>

      {
        asientosDisponibles > 0 &&
        <Link to={`/posts/${postId}`} title='Ver detalles del post'>
          <button className='bg-gradient-to-r from-blue-900 to-indigo-900 text-white font-semibold pr-3 pl-3 pt-1 pb-1 rounded-lg'>
            Ver mas
          </button>
        </Link>
      }
    </div>
  )
}
