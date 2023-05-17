import { PostHour } from './PostHour'
import { type Post } from '../../types'
interface Props {
  post: Post
}

export const PostHeader = ({ post }: Props): JSX.Element => {
  const username = post.travelId.driverId.name + ' ' + post.travelId.driverId.lastName

  return (
    <header className='flex w-full justify-between items-center'>
      <div className='flex flex-col max-w-[50%]'>
        <h2 className='truncate overflow-ellipsis'>{username}</h2>
        <p className='text-xs'>{post.travelId.driverId.phone}</p>
      </div>

      <div>
        <p>Precio:&nbsp;<span className='font-bold'>{post.precio}</span></p>
        <PostHour created={post.created} updated={post.updated}/>
      </div>
    </header>
  )
}
