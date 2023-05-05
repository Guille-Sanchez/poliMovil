import { PostTable } from '../components/post/PostTable'
import { useSelector } from 'react-redux'
import { type RootState } from '../redux/store'
import { PostFooter } from '../components/post/PostFooter'
import { PostHeader } from '../components/post/PostHeader'

export const Homepage = (): JSX.Element => {
  const posts = useSelector((state: RootState) => state.posts)

  return (
    <section className="bg-white w-full h-full pt-5 pb-5">
      <ul>
        {
          posts?.map((post, index) => {
            return (
              <li key={post.id} className='grid gap-3'>
                <article className='grid gap-3 pr-5 pl-5'>
                  <PostHeader post={post}/>
                  <PostTable post={post}/>
                  {post.detalles !== '' && <p><span className='font-bold'>Detalles:&nbsp;</span>{post.detalles}</p>}
                  <PostFooter post={post} />
                </article>

                {(index < posts.length - 1) && <hr className='w-full mt-4 mb-4'/>}
              </li>
            )
          })
        }
      </ul>
    </section>
  )
}
