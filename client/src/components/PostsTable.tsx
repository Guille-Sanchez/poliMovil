import { usePostsAPI } from '../hooks/usePostsAPI'
import { useUsersAPI } from '../hooks/useUsersAPI'

export const PostTable = (): JSX.Element => {
  const { posts } = usePostsAPI()
  const { users } = useUsersAPI()

  return (
    <>
      {
        posts?.map((post) => {
          return (
            <div className='w-full' key={post.id}>
              <div className='grid w-full pb-3 pr-5 pl-5 gap-3' style={{ flexDirection: 'column' }}>
                  <div className='flex justify-between'>
                    <div className='flex flex-col'>
                      <p>
                        {
                          users?.find((user) => {
                            return (user.id === post.userId)
                          })?.username
                        }
                      </p>

                      <p className='text-xs'>
                        {
                          users?.find((user) => {
                            return (user.id === post.userId)
                          })?.email
                        }
                      </p>
                    </div>

                    <div className='flex flex-col'>
                      <p>Publicado hace:</p>
                    </div>

                  </div>

                  <table className='border '>
                    <thead>
                      <tr>
                        <th className='border-r'>Origen</th>
                        <th className='border-r'>Destino</th>
                        <th>Horario</th>
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

                  <div className='flex justify-between items-center'>
                    <p>
                      Asientos Disponibles: {post.asientosDisponibles - post.pasajeros.length}
                    </p>

                    {
                      post.asientosDisponibles - post.pasajeros.length > 0 &&
                        <button className='bg-gradient-to-r from-blue-900 to-indigo-900 text-white font-semibold pr-3 pl-3 pt-1 pb-1 rounded-lg'>Reservar</button>
                    }
                  </div>
              </div>
              <hr className='w-full pb-3'/>
            </div>
          )
        })
      }
    </>
  )
}
