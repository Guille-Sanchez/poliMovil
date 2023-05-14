import { useSelector } from 'react-redux'
import { PostHeader } from '../components/post/PostHeader'
import { PostTable } from '../components/post/PostTable'
import { type messageType, type submittedValues } from '../types'
import { type RootState } from '../redux/store'
import { useState } from 'react'
import { MessageInitialState } from '../constants'
import { MessageDialog } from '../components/post/MessageDialog'
import { usePostsActions } from '../redux/hooks/usePostsActions'
import { createPostService } from '../services/posts/createPostService'
import { updatePostService } from '../services/posts/updatePostService'

interface Props {
  submittedValues: submittedValues
  setSubmittedValues: React.Dispatch<React.SetStateAction<submittedValues>>
}

export const PostPreview = ({ submittedValues, setSubmittedValues }: Props): JSX.Element => {
  const { addNewPostInStore, editPostInStore } = usePostsActions()
  const [message, setMessage] = useState<messageType>(MessageInitialState)
  const [openDialog, setOpenDialog] = useState(false)
  const accessToken = useSelector((state: RootState) => state.authentication.accessToken)

  const handleOnClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> => {
    e.preventDefault()
    const { newPost } = submittedValues
    const { travelId, ...newPostInformation } = newPost

    if (newPost.id !== '') {
      updatePostService({ newPostInformation, accessToken })
        .then((res) => {
          const { message } = res

          if (message.type === '¡Exito!') {
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

          if (message.type === '¡Exito!') {
            addNewPostInStore({ post })
          }

          setMessage(() => { return ({ ...message }) })
        }).catch((err) => {
          console.log(err)
        })
    }
  }

  return (
    <section className='bg-white w-full h-full p-5 flex flex-col gap-3 relative'>
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
          onClick={ (e) => {
            handleOnClick(e)
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
