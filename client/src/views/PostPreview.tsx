import { useDispatch } from 'react-redux'
import { addPost } from '../redux/postsSlice'
import { PostHeader } from '../components/post/PostHeader'
import { PostTable } from '../components/post/PostTable'
import { PostInitialState } from '../constants'
import { type Post } from '../types'

interface submittedValues extends Post {
  setNext: boolean
}

interface Props {
  submittedValues: submittedValues
  setSubmittedValues: React.Dispatch<React.SetStateAction<submittedValues>>
}

export const PostPreview = ({ submittedValues, setSubmittedValues }: Props): JSX.Element => {
  const dispatch = useDispatch()
  const handleOnSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    // TODO: send to api
    e.preventDefault()

    dispatch(addPost(submittedValues)) // Guardar id de post from API
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
              Publicar
            </button>
          </div>
        </section>
  )
}
