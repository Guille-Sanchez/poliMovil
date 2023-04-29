import { useSelector } from 'react-redux'
import { type Post } from '../../types'
import { type RootState } from '../../redux/store'

interface Props {
  post: Post
}

export const PostHeader = ({ post }: Props): JSX.Element => {
  const users = useSelector((state: RootState) => state.users)

  // Find information of user who posted the trip
  const user = users?.find((user) => {
    return (user.id === post.travelId.driverId)
  })

  return (
    <header className='flex w-full justify-between items-center'>
      <div className='flex flex-col'>
        <h2>{`${user?.name ?? ''} ${user?.lastName ?? ''}`}</h2>
        <p className='text-xs'>{user?.email}</p>
      </div>

      <p>Precio:&nbsp;<span className='font-bold'>{post.precio}</span></p>
    </header>
  )
}
