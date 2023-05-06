import { Link, useNavigate } from 'react-router-dom'
import { type RootState } from '../../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { type Post } from '../../types'
import { handleOptionSelected } from '../../logic/handleOptionSelected'

interface Props {
  post: Post
}

export const PostFooter = ({ post }: Props): JSX.Element => {
  const navigate = useNavigate()
  const userId = useSelector((state: RootState) => state.authentication).userId
  const dispatch = useDispatch()
  const numberOfPassengers = post.travelId.passengerId.filter(value => value !== '').length
  const asientosDisponibles = +post.asientosDisponibles - numberOfPassengers
  const postId = post.id

  return (
    <footer className='flex justify-between items-center'>
      <p>Asientos Disponibles: {asientosDisponibles}</p>

      {
        post.travelId.driverId === userId
          ? (
              <div>
                <select name="userOptions" id="userOptions"
                  className='block bg-gradient-to-r from-blue-900 to-indigo-900 text-white font-semibold p-1 rounded-lg'
                  onChange={(e) => { handleOptionSelected({ e, navigate, dispatch, postId }) }}
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
    </footer>
  )
}
