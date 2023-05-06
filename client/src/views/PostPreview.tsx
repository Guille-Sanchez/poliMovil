import { useDispatch, useSelector } from 'react-redux'
import { PostHeader } from '../components/post/PostHeader'
import { PostTable } from '../components/post/PostTable'
import { type submittedValues } from '../types'
import { useNavigate } from 'react-router-dom'
import { type RootState } from '../redux/store'
import { handleEditPost } from '../logic/handleEditPost'
import { handleCreatePost } from '../logic/handleCreatePost'

interface Props {
  submittedValues: submittedValues
  setSubmittedValues: React.Dispatch<React.SetStateAction<submittedValues>>
}

export const PostPreview = ({ submittedValues, setSubmittedValues }: Props): JSX.Element => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const accessToken = useSelector((state: RootState) => state.authentication.accessToken)

  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    if (submittedValues.id !== '') {
      handleEditPost({ e, submittedValues, setSubmittedValues, accessToken, navigate, dispatch })
        .catch((error) => {
          console.log(error)
        })
    } else {
      handleCreatePost({ e, submittedValues, setSubmittedValues, accessToken, navigate, dispatch })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  return (
    <section className='bg-white w-full h-full p-5 flex flex-col gap-3'>
      <PostHeader post={submittedValues} />
      <PostTable post={submittedValues} />
      <p>Asientos Disponibles: {submittedValues.asientosDisponibles}</p>

      <div className='flex justify-evenly items-center w-full'>
        <button className='bg-[#990000] text-white pt-2 pb-2 p-5 pr-5 rounded-lg'
          onClick={() => { setSubmittedValues((prev) => { return ({ ...prev, setNext: false }) }) }}
        >
          Atras
        </button>

        <button className='bg-gradient-to-r from-blue-900 to-indigo-900 text-white pt-2 pb-2 p-7 pr-7 rounded-lg'
          onClick={(e) => { handleOnClick(e) }}
        >
        {submittedValues.id === '' ? 'Crear post' : 'Editar post'}
        </button>
      </div>
    </section>
  )
}
