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
import { PageNotFound } from './PageNotFound'

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

  if (post === null || id === undefined) {
    return (
      !openDialog
        ? <PageNotFound />
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
    handleReservedSeat({ e, accessToken, travelId, id })
      .then((data) => {
        const { message, travelId } = data
        let asientosDisponibles = post.asientosDisponibles

        if (message.type === '¡Éxito!') {
          asientosDisponibles = (+post.asientosDisponibles - 1).toString()
        } else if (message.mensaje === 'Los asientos ya han sido reservados.') {
          asientosDisponibles = '0'
        }

        const newPost = { ...post, asientosDisponibles, travelId }

        if (message.type !== 'Error') {
          editPostInStore({ newPost })
        }

        setMessage(() => message)
        setOpenDialog(true)
      })
      .catch((_error) => {
        const message = {
          type: 'Error',
          mensaje: 'Ocurrio un error, por favor intente de nuevo'
        }
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
      className="flex-shrink-0 flex flex-col gap-3 w-full max-w-4xl min-h-full pt-5"
      style={{ fontSize: 'clamp(1rem, 0.711rem + 1.233vw, 1.5rem)' }}
    >
      <h2
        className='px-5 text-left font-semibold pb-3'
        style={{ fontSize: 'clamp(1.5rem, 1.193rem + 1.311vw, 2.75rem)' }}
      >
        Detalles del viaje
      </h2>
      <div
        className='bg-white grid gap-3 p-5 rounded-lg mx-3'
        style={{
          boxShadow: '0px 4px 18px 3px rgba(0,0,0,0.25)',
          WebkitBoxShadow: '0px 4px 18px 3px rgba(0,0,0,0.25)',
          MozBoxShadow: ' 0px 4px 18px 3px rgba(0,0,0,0.25)'
        }}
      >
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
              <div className='flex gap-5 items-center justify-center pr-5 pl-5 w-full'>
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
            <div className='flex gap-5 items-center justify-center pr-5 pl-5 w-full'>
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
