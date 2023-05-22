import { useState } from 'react'
import { Link } from 'react-router-dom'
import LocationSelector from '../components/post/LocationSelector'
import { postFormValidator } from '../logic/postFormValidator'
import { type submittedValues } from '../types'
import { PostInitialState } from '../constants'
import { LoadingSpinner } from '../components/LoadingSpinner'
import { usePostEditing } from '../hooks/usePostEditing'
import { PostPreview } from './PostPreview'
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
      <LoadingSpinner />
    )
  }

  return (
    !submittedValues.setNext
      ? <section
          className="flex-shrink-0 w-full max-w-4xl min-h-full py-5"
          style={{ fontSize: 'clamp(1rem, 0.711rem + 1.233vw, 1.5rem)' }}
        >
          {
            <form className=' grid gap-5 px-5 w-full' onSubmit={(e) => { handleOnSubmit(e) }}>
              <LocationSelector location={'origen'} defaultValue={submittedValues.newPost.origen}/>
              <LocationSelector location={'destino'} defaultValue={submittedValues.newPost.destino}/>

              <div className='grid grid-cols-2 gap-5'>
                <div className='flex flex-col gap-2 justify-between items-center h-min'>
                  <label htmlFor='horario' className='text-left w-full'>
                    Horario <span aria-required className='text-red-500'>*</span>
                  </label>

                  <input className="border border-gray-500 rounded-lg pl-5 w-full"
                    type='time' name='horario' id='horario' autoComplete="off"
                    placeholder={'05:00AM'} defaultValue={submittedValues.newPost.horario}
                  />
                </div>

                <div className='flex flex-col gap-2 justify-between items-center h-min'>
                  <label htmlFor='asientosDisponibles' className='text-left w-full'>
                    N° de Asientos <span aria-required className='text-red-500'>*</span>
                  </label>
                  <select
                    className='border border-gray-500 rounded-lg pl-5 w-full'
                    id='asientosDisponibles'
                    name='asientosDisponibles'
                    defaultValue={submittedValues.newPost.asientosDisponibles !== null ? submittedValues.newPost.asientosDisponibles : '1'}
                  >
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                  </select>
                </div>
              </div>

              <div className='flex flex-col gap-2 justify-between items-center h-min'>
                <label htmlFor='detalles' className='text-left w-full'>Detalles</label>

                <input className="border border-gray-500 rounded-lg pl-5 w-full"
                  type='text' name='detalles' id='detalles' autoComplete="off"
                  placeholder='Por Mcal. Lopez' defaultValue={submittedValues.newPost.detalles}
                />
              </div>

              <div className='flex flex-col gap-2 justify-between items-center h-min'>
                <label htmlFor='precio' className='w-full text-left'>
                  Precio <span aria-required className='text-red-500'>*</span>
                </label>
                <select
                  className="border border-gray-500 rounded-lg pl-5 w-full"
                  defaultValue={submittedValues.newPost.precio}
                  name='precio'
                  id='precio'
                >
                  <option value="gratis">Gratis</option>
                  <option value="2.300 Gs">2.300 Gs</option>
                  <option value="A convenir" disabled>A convenir</option>
                </select>
              </div>

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
