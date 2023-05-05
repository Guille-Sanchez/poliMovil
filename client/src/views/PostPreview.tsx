import { useDispatch } from 'react-redux'
import { addPost, updatePost } from '../redux/postsSlice'
import { PostHeader } from '../components/post/PostHeader'
import { PostTable } from '../components/post/PostTable'
import { PostInitialState } from '../constants'
import { type submittedValues } from '../types'
import { useNavigate } from 'react-router-dom'
interface Props {
  submittedValues: submittedValues
  setSubmittedValues: React.Dispatch<React.SetStateAction<submittedValues>>
}

export const PostPreview = ({ submittedValues, setSubmittedValues }: Props): JSX.Element => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleOnSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    // TODO: send to api
    e.preventDefault()
    if (submittedValues.id === '') {
      dispatch(addPost(submittedValues)) // Guardar id de post from API
      navigate('/success', { state: { message: 'Post creado correctamente', type: 'success' } })
    } else {
      navigate('/success', { state: { message: 'Post editado correctamente', type: 'success' } })
      dispatch(updatePost(submittedValues))
    }
    setSubmittedValues({ ...PostInitialState, setNext: false })
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
          onClick={(e) => { handleOnSubmit(e) }}
        >
        {submittedValues.id === '' ? 'Crear post' : 'Editar post'}
        </button>
      </div>
    </section>
  )
}
