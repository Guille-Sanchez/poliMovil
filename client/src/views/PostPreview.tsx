import { useDispatch, useSelector } from 'react-redux'
import { PostHeader } from '../components/post/PostHeader'
import { PostTable } from '../components/post/PostTable'
import { type messageType, type submittedValues } from '../types'
import { type RootState } from '../redux/store'
import { handleEditPost } from '../logic/handleEditPost'
import { handleCreatePost } from '../logic/handleCreatePost'
import { useState } from 'react'
import { MessageInitialState } from '../constants'
import { MessageDialog } from '../components/post/MessageDialog'

interface Props {
  submittedValues: submittedValues
  setSubmittedValues: React.Dispatch<React.SetStateAction<submittedValues>>
}

export const PostPreview = ({ submittedValues, setSubmittedValues }: Props): JSX.Element => {
  const dispatch = useDispatch()
  const [message, setMessage] = useState<messageType>(MessageInitialState)
  const [openDialog, setOpenDialog] = useState(false)
  const accessToken = useSelector((state: RootState) => state.authentication.accessToken)

  const handleOnClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> => {
    e.preventDefault()

    if (submittedValues.id !== '') {
      handleEditPost({ submittedValues, accessToken, dispatch, setOpenDialog })
        .then(({ message }) => {
          setMessage(() => { return ({ ...message }) })
        })
        .catch((error) => {
          console.log(error)
        })
    } else {
      handleCreatePost({ submittedValues, setOpenDialog, accessToken, dispatch })
        .then(({ message }) => {
          setMessage(() => { return ({ ...message }) })
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  return (
    <section className='bg-white w-full h-full p-5 flex flex-col gap-3 relative'>
      <PostHeader post={submittedValues} />
      <PostTable post={submittedValues} />
      {
        submittedValues.detalles !== '' &&
          <p><span className='font-bold'>Detalles:&nbsp;</span>{submittedValues.detalles}</p>
      }
      <p>Asientos Disponibles: {submittedValues.asientosDisponibles}</p>

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
          {submittedValues.id === '' ? 'Crear post' : 'Editar post'}
        </button>
      </div>

      { openDialog && <MessageDialog message={message} /> }
    </section>
  )
}
