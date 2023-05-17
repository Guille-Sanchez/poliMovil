import { PostHour } from './PostHour'
import { type Post } from '../../types'
interface Props {
  post: Post
}

export const PostHeader = ({ post }: Props): JSX.Element => {
  return (
    <header className='flex w-full justify-between items-center'>
      <div className='flex flex-col'>
        <h2>{`${post.travelId.driverId.name} ${post.travelId.driverId.lastName}`}</h2>
        <p className='text-xs'>{post.travelId.driverId.email}</p>
      </div>

      <div>
        <p>Colaboración:&nbsp;<span className='font-bold'>{post.precio}</span></p>
        <PostHour created={post.created} updated={post.updated}/>
      </div>
    </header>
  )
}
