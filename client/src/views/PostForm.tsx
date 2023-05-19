import { useState } from 'react'
import { Link } from 'react-router-dom'
import LocationSelector from '../components/post/LocationSelector'
import { postFormValidator } from '../logic/postFormValidator'
import { type submittedValues } from '../types'
import { InputPostForm } from '../components/post/InputPostForm'
import { PostInitialState } from '../constants'
import { LoadingSPinner } from '../components/LoadingSPinner'
import { usePostEditing } from '../hooks/usePostEditing'
import { PostPreview } from './PostPreview'
import { PriceSelector } from '../components/post/PriceSelector'
import { useAppSelector } from '../redux/hooks/useStore'

export const PostForm = (): JSX.Element => {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const { name, lastName, email, phone, userId } = useAppSelector((state) => state.authentication.userInformation)
  const driverId = { name, lastName, email, phone, id: userId }
  const [submittedValues, setSubmittedValues] = useState<submittedValues>({ newPost: PostInitialState, setNext: false })

  usePostEditing({ setSubmittedValues, setLoading })

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    setError(null)
    const { error, valuesToSubmit } = postFormValidator({ e, driverId, submittedValues })
    error !== '' ? setError(error) : setSubmittedValues(valuesToSubmit)
  }

  if (loading) {
    return (
      <LoadingSPinner />
    )
  }

  return (
    !submittedValues.setNext
      ? <section
          className="flex-shrink-0 w-full max-w-4xl min-h-full py-5"
          style={{ fontSize: 'clamp(1rem, 0.711rem + 1.233vw, 1.5rem)' }}
        >
          {
            <form className=' grid gap-5 w-full' onSubmit={(e) => { handleOnSubmit(e) }}>
              <LocationSelector location={'origen'} defaultValue={submittedValues.newPost.origen}/>
              <LocationSelector location={'destino'} defaultValue={submittedValues.newPost.destino}/>

              <div className='grid grid-cols-2 gap-5'>
                <InputPostForm inputLabel={'horario'} required={true} placeholder={'5:00 - 22:00'} defaultValue={submittedValues.newPost.horario}/>
                <InputPostForm inputLabel={'asientosDisponibles'} required={true} placeholder={'1, 2, 3, etc.'} defaultValue={submittedValues.newPost.asientosDisponibles}/>
              </div>

              <InputPostForm inputLabel={'detalles'} required={false} placeholder={'Por Mcal. Lopez'} defaultValue={submittedValues.newPost.detalles}/>
              <PriceSelector />

              {error !== null && <p className='text-red-500 text-center' style={{ fontSize: 'clamp(0.875rem, 0.783rem + 0.393vw, 1.25rem)' }}>{error}</p>}

              <div className='flex justify-evenly items-center w-full'>
                <Link to={'/'}>
                  <button className='bg-[#990000] text-white pt-2 pb-2 p-5 pr-5 rounded-lg' type='button'>Cancelar</button>
                </Link>
                <button className='bg-gradient-to-r from-blue-900 to-indigo-900 text-white pt-2 pb-2 p-7 pr-7 rounded-lg' type='submit'>
                  {submittedValues.newPost.id === '' ? 'Crear post' : 'Editar post'}
                </button>
              </div>
            </form>
          }
        </section>

      : <PostPreview submittedValues={submittedValues} setSubmittedValues={setSubmittedValues}/>
  )
}
