import { Link, useNavigate } from 'react-router-dom'
import { type RootState } from '../../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { type Post } from '../../types'
import { deletePost } from '../../redux/postsSlice'

interface Props {
  post: Post
}

export const AvailableSeats = ({ post }: Props): JSX.Element => {
  const navigate = useNavigate()
  const userId = useSelector((state: RootState) => state.authentication).accessToken
  const dispatch = useDispatch()
  const numberOfPassengers = post.travelId.passengerId.filter(value => value !== '').length
  const asientosDisponibles = +post.asientosDisponibles - numberOfPassengers

  const handleOptionSelected = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const option = e.target.value
    // TODO: Handle options
    switch (option) {
      case 'ver-mas':
        navigate(`/posts/${post.id}`)
        break
      case 'editar':
        // TODO: editar post from API
        navigate(`/posts/editar/${post.id}`)
        break
      case 'eliminar':
        // TODO: eliminar post from API
        dispatch(deletePost(post.id))
        navigate('/')
        break
      default:
        break
    }
  }

  return (
    <div className='flex justify-between items-center'>
      <p>Asientos Disponibles: {asientosDisponibles}</p>

      {
        post.travelId.driverId === userId
          ? (
              <div>
                <select name="userOptions" id="userOptions"
                  className='flex gap-5 w-full justify-center bg-gradient-to-r from-blue-900 to-indigo-900 text-white font-semibold pl-1 pr-1 pt-1 pb-1 rounded-lg'
                  onChange={handleOptionSelected}
                >
                  <option value="">Opciones</option>
                  <option value="ver-mas" className='bg-indigo-900 text-white'>Ver más</option>
                  <option value="editar" className='bg-indigo-900 text-white'>Editar</option>
                  <option value="eliminar" className='bg-indigo-900 text-white'>Eliminar</option>
                </select>
              </div>
            )
          : (
              <Link to={`/posts/${post.id}`} title='Ver detalles del post'>
                <button className='bg-gradient-to-r from-blue-900 to-indigo-900 text-white font-semibold pr-3 pl-3 pt-1 pb-1 rounded-lg'>
                  Ver mas
                </button>
              </Link>
            )
      }
    </div>
  )
}
