import { useParams } from 'react-router-dom'
import type { RootState } from '../redux/store'
import { useSelector } from 'react-redux'
import { type Post } from '../types'
import { PostTable } from '../components/post/PostTable'
import { PostHeader } from '../components/post/PostHeader'
import { PassangerList } from '../components/PassangerList'

export const DetailedPost = (): JSX.Element => {
  const posts = useSelector((state: RootState) => state.posts)
  const { id } = useParams<{ id: string }>()

  // Find the post with matching ID
  const detailedPost = posts.find((post: Post) => post.id === id)

  return (
    <section className="bg-white pr-5 pl-5 w-full h-full pt-5">
      {
        (detailedPost != null) &&
        <div className='grid gap-3 pb-5'>
          <PostHeader post={detailedPost}/>
          <PostTable post={detailedPost}/>
          {detailedPost.detalles !== '' && <p><span className='font-bold'>Detalles:&nbsp;</span>{detailedPost.detalles}</p>}
          <div className='flex justify-between items-center'>
            <p>Asientos Disponibles: {detailedPost.asientosDisponibles}</p>
          </div>
        </div>
      }

      <div className='flex justify-evenly items-center w-full'>
        <button className='bg-gradient-to-r from-blue-900 to-indigo-900 text-white pt-2 pb-2 p-7 pr-7 rounded-lg'>
          Reservar
        </button>
      </div>

      <PassangerList detailedPost={detailedPost} />
    </section>
  )
}
