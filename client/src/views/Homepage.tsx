import { PostTable } from '../components/post/PostTable'
import { PostFooter } from '../components/post/PostFooter'
import { PostHeader } from '../components/post/PostHeader'
import { useAppSelector } from '../redux/hooks/useStore'
import { LoadingSpinner } from '../components/LoadingSpinner'

export const Homepage = (): JSX.Element => {
  const posts = useAppSelector((state) => state.posts)
  const loadPostsFromStore = posts.length === 1 && posts[0].id === ''
  const arePostAvailable = posts.length > 0 && posts[0].id !== ''

  return (
    loadPostsFromStore
      ? <LoadingSpinner />
      : <section
        className="flex-shrink-0 flex flex-col gap-3 w-full max-w-4xl min-h-full py-5"
        style={{ fontSize: 'clamp(1rem, 0.711rem + 1.233vw, 1.5rem)' }}
      >
        <h2
          className='px-5 text-left font-semibold'
          style={{ fontSize: 'clamp(1.5rem, 1.193rem + 1.311vw, 2.75rem)' }}
        >
          Viajes disponibles
        </h2>
        {
          arePostAvailable
            ? <ul className='flex flex-col gap-5 p-3'>
                {posts.map((post) => {
                  return (
                    <li key={post.id}>
                      <article
                        className='bg-white grid gap-3 p-5 rounded-lg'
                        style={{
                          boxShadow: '0px 4px 18px 3px rgba(0,0,0,0.25)',
                          WebkitBoxShadow: '0px 4px 18px 3px rgba(0,0,0,0.25)',
                          MozBoxShadow: ' 0px 4px 18px 3px rgba(0,0,0,0.25)'
                        }}>
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
                    </li>
                  )
                })}
              </ul>
            : <div className='flex h-full justify-center items-center'>
                <p
                  className='text-center text-2xl font-semibold px-5'
                  style={{ fontSize: 'clamp(1.5rem, 1.193rem + 1.311vw, 2.75rem)' }}
                >
                  No hay viajes disponibles que mostrar.
                </p>
              </div>
        }
      </section>
  )
}
