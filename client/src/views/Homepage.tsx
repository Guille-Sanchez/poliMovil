import { PostTable } from '../components/PostsTable'
import { useSelector } from 'react-redux'
import { type RootState } from '../redux/store'
import { Link } from 'react-router-dom'

export const Homepage = (): JSX.Element => {
  const posts = useSelector((state: RootState) => state.posts)

  return (
    <section className="bg-white pr-5 pl-5 w-full h-full pt-5">
      {
        posts?.map((post, index) => {
          const asientosDisponibles = +post.asientosDisponibles - post.travelId.passengerId.length
          return (
          <div key={post.id}>
            <PostTable post={post}/>

            <div className='flex justify-between items-center'>
              <p>Asientos Disponibles: {asientosDisponibles}</p>

              {
                asientosDisponibles > 0 &&
                <Link to={`/posts/${post.id}`} title='Ver detalles del post'>
                  <button className='bg-gradient-to-r from-blue-900 to-indigo-900 text-white font-semibold pr-3 pl-3 pt-1 pb-1 rounded-lg'>
                    Ver mas
                  </button>
                </Link>
              }
            </div>

            {(index < posts.length - 1) && <hr className='w-full mt-4 mb-4'/>}
          </div>
          )
        })
      }
    </section>
  )
}
