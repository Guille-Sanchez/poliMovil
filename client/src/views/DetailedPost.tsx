import { useParams } from 'react-router-dom'
import type { RootState } from '../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { deletePost } from '../redux/postsSlice'
import { type Post } from '../types'
import { PostTable } from '../components/post/PostTable'
import { PostHeader } from '../components/post/PostHeader'
import { PassangerList } from '../components/PassangerList'
import { deletePostService } from '../services/posts/deletePostService'
import { useState } from 'react'
import { MessageInitialState } from '../constants'
import { MessageDialog } from '../components/post/MessageDialog'
import { getAvailableSeats } from '../logic/getAvailableSeats'

export const DetailedPost = (): JSX.Element => {
  const posts = useSelector((state: RootState) => state.posts)
  const { id } = useParams<{ id: string }>()
  const { userId } = useSelector((state: RootState) => state.authentication.userInformation)

  // Handle delete of post
  const accessToken = useSelector((state: RootState) => state.authentication.accessToken)
  const [openDialog, setOpenDialog] = useState(false)
  const [message, setMessage] = useState(MessageInitialState)
  const dispatch = useDispatch()

  // Find the post with matching ID
  const post = posts.find((post: Post) => post.id === id)
  const isUserPost = post?.travelId.driverId === userId
  console.log(post?.travelId.driverId)
  console.log(userId)

  const { asientosDisponibles } = post !== undefined ? getAvailableSeats({ post }) : { asientosDisponibles: 0 }

  return (
    <section className="bg-white pr-5 pl-5 w-full h-full pt-5 relative">
      {
        (post != null) &&
        <div className='grid gap-3 pb-5'>
          <PostHeader post={post}/>
          <PostTable post={post}/>
          {
            post.detalles !== '' &&
              <p><span className='font-bold'>Detalles:&nbsp;</span>{post.detalles}</p>
          }
          <div className='flex justify-between items-center'>
            <p>Asientos Disponibles: {post.asientosDisponibles}</p>
          </div>
        </div>
      }

      { (!isUserPost)
        ? (post != null && asientosDisponibles > 0) &&
            <div className='flex gap-5 items-center justify-center pb-5 w-full'>
              <button className='bg-gradient-to-r from-blue-900 to-indigo-900 text-white pt-2 pb-2 p-7 pr-7 rounded-lg'>
                Reservar
              </button>
            </div>
        : (
          <div className='flex gap-5 items-center justify-center pb-5 w-full'>
            <div>
              <button className='bg-[#990000] text-white pt-2 pb-2 p-7 pr-7 rounded-lg'
                onClick={(e) => {
                  deletePostService({ e, id, accessToken })
                    .then(message => {
                      setOpenDialog(true)
                      if (message.type === '¡Exito!') {
                        dispatch(deletePost(id ?? ''))
                      }
                      setMessage(() => message)
                    })
                    .catch(error => {
                      console.log(error)
                    })
                }}
              >
                Eliminar
              </button>
            </div>
          </div>
          )
      }

      <PassangerList post={post} />
      {openDialog && <MessageDialog message={message}/>}
    </section>
  )
}
