import { PostHeader } from '../../components/post/PostHeader'
import { PostTable } from '../../components/post/PostTable'
import { PostFooter } from '../../components/post/PostFooter'
import { useAppSelector } from '../../redux/hooks/useStore'

export const UserTravels = (): JSX.Element => {
  const { posts, authentication } = useAppSelector((state) => state)
  const { userId } = authentication.userInformation

  const userInPosts = posts.filter((post) => {
    return (post.travelId.driverId.id === userId || post.travelId.passengerId.find(passanger => passanger.id === userId))
  })

  const userHasTravels = userInPosts.length > 0
  return (
    <section
        className="flex-shrink-0 flex flex-col gap-3 w-full max-w-4xl min-h-full py-5"
        style={{ fontSize: 'clamp(1rem, 0.711rem + 1.233vw, 1.5rem)' }}
      >
      <h2
        className='px-5 text-left font-semibold'
        style={{ fontSize: 'clamp(1.5rem, 1.193rem + 1.311vw, 2.75rem)' }}
      >
        Mis viajes registrados
      </h2>
      {userHasTravels
        ? <ul className='flex flex-col h-full w-full p-3 gap-5'>
            {
              userInPosts.map((post) => {
                return (
                  <li
                    className='bg-white rounded-lg'
                    style={{
                      boxShadow: '0px 4px 18px 3px rgba(0,0,0,0.25)',
                      WebkitBoxShadow: '0px 4px 18px 3px rgba(0,0,0,0.25)',
                      MozBoxShadow: ' 0px 4px 18px 3px rgba(0,0,0,0.25)'
                    }}
                    key={post.id}
                  >
                    <article className='grid gap-3 p-5'>
                      <PostHeader post={post}/>
                      <PostTable post={post}/>
                      {post.detalles !== '' && <p><span className='font-bold'>Detalles:&nbsp;</span>{post.detalles}</p>}
                      <PostFooter post={post} />
                    </article>
                  </li>
                )
              })
            }
          </ul>
        : <div className='flex h-full w-full justify-center items-center text-2xl font-semibold text-center'>
            <p style={{ fontSize: 'clamp(1.5rem, 1.193rem + 1.311vw, 2.75rem)' }}>No tiene viajes registrados.</p>
          </div>
    }
    </section>
  )
}
