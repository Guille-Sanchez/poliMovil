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
import { type RootState } from '../redux/store'
import { useSelector } from 'react-redux'

export const PostForm = (): JSX.Element => {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const userId = useSelector((state: RootState) => state.authentication.accessToken)
  const [submittedValues, setSubmittedValues] = useState<submittedValues>({ ...PostInitialState, setNext: false })

  usePostEditing({ setSubmittedValues, setLoading })

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    setError(null)
    const { error, valuesToSubmit } = postFormValidator({ e, userId, submittedValues })
    error !== '' ? setError(error) : setSubmittedValues(valuesToSubmit)
  }

  if (loading) {
    return (
      <LoadingSPinner />
    )
  }

  return (
    !submittedValues.setNext
      ? <section className='bg-white w-full h-full p-5'>
            {
              <form className=' grid gap-5 w-full' onSubmit={(e) => { handleOnSubmit(e) }}>
                <LocationSelector location={'origen'} defaultValue={submittedValues.origen}/>
                <LocationSelector location={'destino'} defaultValue={submittedValues.destino}/>

                <div className='grid grid-cols-2 gap-5'>
                  <InputPostForm inputLabel={'horario'} required={true} placeholder={'5:00 - 22:00'} defaultValue={submittedValues.horario}/>
                  <InputPostForm inputLabel={'asientosDisponibles'} required={true} placeholder={'1, 2, 3, etc.'} defaultValue={submittedValues.asientosDisponibles}/>
                </div>

                <InputPostForm inputLabel={'detalles'} required={false} placeholder={'Por Mcal. Lopez'} defaultValue={submittedValues.detalles}/>

                <div className='flex flex-col gap-2 justify-between items-center h-min'>
                  <label htmlFor='precio' className='w-full text-left'>
                    Precio <span aria-required className='text-red-500'>*</span>
                  </label>
                  <select
                      className="border border-gray-500 rounded-lg pl-5 w-full"
                      name='precio'
                      id='precio'
                  >
                    <option value="gratis">Gratis</option>
                    <option value="2.300 Gs">2.300 Gs</option>
                    <option value="A convenir" disabled>A convenir</option>
                  </select>
                </div>

                {error !== null && <p className='text-red-500 text-center text-sm'>{error}</p>}

                <div className='flex justify-evenly items-center w-full'>
                  <Link to={'/'}>
                    <button className='bg-[#990000] text-white pt-2 pb-2 p-5 pr-5 rounded-lg'>Cancelar</button>
                  </Link>
                  <button className='bg-gradient-to-r from-blue-900 to-indigo-900 text-white pt-2 pb-2 p-7 pr-7 rounded-lg'>Enviar</button>
                </div>
              </form>
            }
        </section>

      : <PostPreview submittedValues={submittedValues} setSubmittedValues={setSubmittedValues}/>
  )
}
