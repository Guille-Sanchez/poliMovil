import { useParams } from 'react-router-dom'
import { deletePostService } from '../services/posts/deletePostService'
import { handleReservedSeat } from '../logic/handleReservedSeat'
import { useState } from 'react'
import { MessageInitialState } from '../constants'
import { MessageDialog } from '../components/post/MessageDialog'
import { PostHeader } from '../components/post/PostHeader'
import { PostTable } from '../components/post/PostTable'
import { PassengerList } from '../components/PassengerList'
import { type Post } from '../types'
import { usePostsActions } from '../redux/hooks/usePostsActions'
import { useAppSelector } from '../redux/hooks/useStore'
import { LoadingSpinner } from '../components/LoadingSpinner'

export const DetailedPost = (): JSX.Element => {
  const posts = useAppSelector((state) => state.posts)
  const { id } = useParams<{ id: string }>()
  const { userId } = useAppSelector((state) => state.authentication.userInformation)
  const { deletePostInStore, editPostInStore } = usePostsActions()
  const [loading, setLoading] = useState(false)

  // Find the post with matching ID
  const post = posts.find((post: Post) => post.id === id) ?? null

  // Handle delete of post
  const accessToken = useAppSelector((state) => state.authentication.accessToken)
  const [openDialog, setOpenDialog] = useState(false)
  const [message, setMessage] = useState({ ...MessageInitialState })

  if (post === null) {
    return (
      !openDialog
        ? <LoadingSpinner />
        : <MessageDialog message={message} />
    )
  }

  const isUserPost = post.travelId.driverId.id === userId

  const handleOnClickDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    setLoading(true)
    deletePostService({ e, id, accessToken })
      .then((responseMessage) => {
        const { message } = responseMessage
        if (message.type === '¡Éxito!' && id !== undefined) {
          setMessage(() => message)
          setOpenDialog(true)
          deletePostInStore({ id })
        }
      })
      .catch((_error) => {
        message.type = 'Error'
        message.mensaje = 'Ocurrio un error, por favor intente de nuevo'
        setMessage(() => message)
        setOpenDialog(true)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  // Handle reserve seat of post
  const travelId = post.travelId.id

  const handleOnClickReserveSeat = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    setLoading(true)
    handleReservedSeat({ e, accessToken, travelId })
      .then((data) => {
        const { message, travelId } = data
        if (message.type === '¡Éxito!') {
          const asientosDisponibles = (+post.asientosDisponibles - 1).toString()
          const newPost = { ...post, asientosDisponibles, travelId }
          editPostInStore({ newPost })
          setMessage(() => message)
          setOpenDialog(true)
        }
      })
      .catch((_error) => {
        message.type = 'Error'
        message.mensaje = 'Ocurrio un error, por favor intente de nuevo'
        setMessage(() => message)
        setOpenDialog(true)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const isUserPassanger = post?.travelId.passengerId.find((passengerId) => passengerId.id === userId)?.id === userId
  return (
    <section
      className="flex-shrink-0 w-full max-w-4xl min-h-full pt-5"
      style={{ fontSize: 'clamp(1rem, 0.711rem + 1.233vw, 1.5rem)' }}
    >
      <div className='grid gap-3 pr-5 pl-5 pb-5'>
        <PostHeader post={post} />
        <PostTable post={post} />
        {post.detalles !== '' && <p><span className='font-bold'>Detalles:&nbsp;</span>{post.detalles}</p>}
        <div className='flex justify-between items-center'>
          <p>Asientos Disponibles: {post.asientosDisponibles}</p>
        </div>
      </div>

      {!isUserPost
        ? (
            (+post.asientosDisponibles > 0 && !isUserPassanger) && (
              <div className='flex gap-5 items-center justify-center pr-5 pl-5 pb-5 w-full'>
                <button
                  className='bg-gradient-to-r from-blue-900 to-indigo-900 text-white pt-2 pb-2 p-7 pr-7 rounded-lg'
                  onClick={(e) => { handleOnClickReserveSeat(e) }}
                >
                  Reservar
                </button>
              </div>
            )
          )
        : (
            <div className='flex gap-5 items-center justify-center pr-5 pl-5 pb-5 w-full'>
              <div>
                <button
                  className='bg-[#990000] text-white pt-2 pb-2 p-7 pr-7 rounded-lg'
                  onClick={(e) => { handleOnClickDelete(e) }}
                >
                  Eliminar
                </button>
              </div>
            </div>
          )
      }

      <PassengerList post={post} />
      {loading && <LoadingSpinner />}
      {openDialog && <MessageDialog message={message} />}
    </section>
  )
}
