import { PostTable } from '../components/post/PostTable'
import { PostFooter } from '../components/post/PostFooter'
import { PostHeader } from '../components/post/PostHeader'
import { useAppSelector } from '../redux/hooks/useStore'

export const Homepage = (): JSX.Element => {
  const posts = useAppSelector((state) => state.posts)

  return (
    <section className="bg-white w-full h-full pt-5 pb-5">
      {
        posts.length > 0
          ? <ul>
              {posts.map((post, index) => {
                return (
                  <li key={post.id} className='grid gap-3'>
                    <article className='grid gap-3 px-5'>
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
          : <div className='flex h-full justify-center items-center'>
              <p className='text-center text-2xl font-semibold px-5'>No hay publicaciones que mostrar.</p>
            </div>
      }
    </section>
  )
}
