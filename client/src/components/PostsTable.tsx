import { Link } from 'react-router-dom'
import { IconFlag } from '../assets/Icons'
import { useUsersAPI } from '../hooks/useUsersAPI'
import { useSelector } from 'react-redux'
import { type RootState } from '../redux/store'

export const PostTable = (): JSX.Element => {
  const posts = useSelector((state: RootState) => state.posts)
  const { users } = useUsersAPI()

  return (
    <>
      {
        posts?.map((post, index) => {
          return (
            <div className='w-full' key={post.id}>
              <div className='grid w-full pb-3 gap-3'>
                  <div className='flex w-full justify-between items-center'>
                    <div className='flex flex-col'>
                      <p>
                        {
                          users?.find((user) => {
                            return (user.id === post.travelId.driverId)
                          })?.name
                        }
                      </p>

                      <p className='text-xs'>
                        {
                          users?.find((user) => {
                            return (user.id === post.travelId.driverId)
                          })?.email
                        }
                      </p>
                    </div>

                    <button>
                      <IconFlag width={'1.5em'} height={'1.5em'} viewBox='0 0 25 25'/>
                    </button>
                  </div>

                  <table className='border'>
                    <thead>
                      <tr className='border-b'>
                        <th className='border-r'>Origen</th>
                        <th className='border-r'>Destino</th>
                        <th className='border-r'>Horario</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <td className='text-center border-r'>{post.origen}</td>
                        <td className='text-center border-r'>{post.destino}</td>
                        <td className='text-center'>{post.horario}</td>
                      </tr>
                    </tbody>
                  </table>

                  {post.detalles !== '' && <p><span className='font-bold'>Detalles:&nbsp;</span>{post.detalles}</p>}
                  <div className='flex justify-between items-center'>
                    <p>
                      Asientos Disponibles: {+post.asientosDisponibles - post.travelId.passengerId.length}
                    </p>

                    {
                      +post.asientosDisponibles - post.travelId.passengerId.length > 0 &&
                      <Link to={`/posts/${post.id}`}>
                        <button className='bg-gradient-to-r from-blue-900 to-indigo-900 text-white font-semibold pr-3 pl-3 pt-1 pb-1 rounded-lg'>
                          Ver mas
                        </button>
                      </Link>
                    }
                  </div>
              </div>

              {(index < posts.length - 1) && <hr className='w-full pb-3'/>}
            </div>
          )
        })
      }
    </>
  )
}
