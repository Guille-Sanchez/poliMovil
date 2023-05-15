import { PostTable } from '../components/post/PostTable'
import { PostFooter } from '../components/post/PostFooter'
import { PostHeader } from '../components/post/PostHeader'
import { useAppSelector } from '../redux/hooks/useStore'
import { useState } from 'react'
import { usePostsAPI } from '../hooks/usePostsAPI'
import { LoadingSPinner } from '../components/LoadingSPinner'

export const Homepage = (): JSX.Element => {
  const [areLoadingPosts, setAreLoadingPosts] = useState(true)
  usePostsAPI({ setAreLoadingPosts })
  const posts = useAppSelector((state) => state.posts)

  return (
    areLoadingPosts
      ? <LoadingSPinner />
      : <section className="bg-white w-full h-full pt-5 pb-5">
          <ul>
            {posts?.map((post, index) => {
              return (
                <li key={post.id} className='grid gap-3'>
                  <article className='grid gap-3 pr-5 pl-5'>
                    <PostHeader post={post} />
                    <PostTable post={post} />
                    {post.detalles !== '' && (
                      <p>
                        <span className='font-bold'>Detalles:&nbsp;</span>
                        {post.detalles}
                      </p>
                    )}
                    <PostFooter post={post} />
                  </article>

                  {index < posts.length - 1 && <hr className='w-full mt-4 mb-4' />}
                </li>
              )
            })}
          </ul>
        </section>
  )
}
