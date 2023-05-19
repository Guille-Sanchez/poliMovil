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
        className="flex-shrink-0 w-full max-w-4xl min-h-full py-5"
        style={{ fontSize: 'clamp(1rem, 0.711rem + 1.233vw, 1.5rem)' }}
      >
      {userHasTravels
        ? <ul>
            {
              userInPosts.map((post, index) => {
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
        : <div className='flex h-full w-full justify-center items-center text-2xl font-semibold text-center'>
            <p>No tiene viajes registrados.</p>
          </div>
    }
    </section>
  )
}
