import { useState } from 'react'
import { useAppSelector } from '../redux/hooks/useStore'
import { usePostsActions } from '../redux/hooks/usePostsActions'
import { createPostService } from '../services/posts/createPostService'
import { updatePostService } from '../services/posts/updatePostService'
import { PostHeader } from '../components/post/PostHeader'
import { PostTable } from '../components/post/PostTable'
import { MessageDialog } from '../components/post/MessageDialog'
import { MessageInitialState } from '../constants'
import { type submittedValues } from '../types'

interface Props {
  submittedValues: submittedValues
  setSubmittedValues: React.Dispatch<React.SetStateAction<submittedValues>>
}

export const PostPreview = ({ submittedValues, setSubmittedValues }: Props): JSX.Element => {
  const { addNewPostInStore, editPostInStore } = usePostsActions()
  const [message, setMessage] = useState({ ...MessageInitialState })
  const [openDialog, setOpenDialog] = useState(false)
  const accessToken = useAppSelector((state) => state.authentication.accessToken)

  const handlePostSubmit = async (): Promise<void> => {
    const { newPost } = submittedValues
    const { travelId, ...newPostInformation } = newPost

    if (newPost.id !== '') {
      updatePostService({ newPostInformation, accessToken })
        .then((res) => {
          const { message, updated } = res

          if (message.type === '¡Éxito!') {
            newPost.updated = updated
            editPostInStore({ newPost })
          }

          setMessage(() => { return ({ ...message }) })
          setOpenDialog(() => true)
        }).catch((err) => {
          console.log(err)
        })
    } else {
      createPostService({ accessToken, newPostInformation })
        .then((res) => {
          const { message, post } = res
          setOpenDialog(() => true)

          if (message.type === '¡Éxito!') {
            addNewPostInStore({ post })
          }

          setMessage(() => { return ({ ...message }) })
        }).catch((err) => {
          console.log(err)
        })
    }
  }

  return (
    <section
      className="flex-shrink-0 w-full max-w-4xl min-h-full p-5 flex flex-col gap-3"
      style={{ fontSize: 'clamp(1rem, 0.711rem + 1.233vw, 1.5rem)' }}
    >
      <PostHeader post={submittedValues.newPost} />
      <PostTable post={submittedValues.newPost} />
      {
        submittedValues.newPost.detalles !== '' &&
          <p><span className='font-bold'>Detalles:&nbsp;</span>{submittedValues.newPost.detalles}</p>
      }
      <p>Asientos Disponibles: {submittedValues.newPost.asientosDisponibles}</p>

      <div className='flex justify-evenly items-center w-full'>
        <button className='bg-[#990000] text-white pt-2 pb-2 p-5 pr-5 rounded-lg'
          onClick={() => { setSubmittedValues((prev) => { return ({ ...prev, setNext: false }) }) }}
        >
          Atras
        </button>

        <button className='bg-gradient-to-r from-blue-900 to-indigo-900 text-white pt-2 pb-2 p-7 pr-7 rounded-lg'
          onClick={ () => {
            handlePostSubmit()
              .catch((error) => {
                console.log(error)
              })
          }}
        >
          {submittedValues.newPost.id === '' ? 'Crear post' : 'Editar post'}
        </button>
      </div>

      { openDialog && <MessageDialog message={message} /> }
    </section>
  )
}
