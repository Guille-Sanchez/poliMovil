import { type Post } from '../types'
import { type RootState } from '../redux/store'
import { useSelector } from 'react-redux'

interface Props {
  post: Post
}

export const PostTable = ({ post }: Props): JSX.Element => {
  const users = useSelector((state: RootState) => state.users)

  // Find information of user who posted the trip
  const user = users?.find((user) => {
    return (user.id === post.travelId.driverId)
  })

  return (
    <>
      <div className='w-full'>
        <div className='grid w-full pb-3 gap-3'>
            <div className='flex w-full justify-between items-center'>
              <div className='flex flex-col'>
                <p>{`${user?.name ?? ''} ${user?.lastName ?? ''}`}</p>
                <p className='text-xs'>{user?.email}</p>
              </div>

              <p>Precio:&nbsp;<span className='font-bold'>{post.precio}</span></p>
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
        </div>
      </div>
    </>
  )
}
