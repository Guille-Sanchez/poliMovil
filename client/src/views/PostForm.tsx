import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PostTable } from '../components/post/PostTable'
import { PostHeader } from '../components/post/PostHeader'
import LocationSelector from '../components/post/LocationSelector'
import { postFormValidator } from '../logic/postFormValidator'
import { type Post } from '../types'
import { InputPostForm } from '../components/post/InputPostForm'
import { PostInitialState } from '../constants'

interface submittedValues extends Post {
  setNext: boolean
}

export const PostForm = (): JSX.Element => {
  const [error, setError] = useState<string | null>(null)
  const [submittedValues, setSubmittedValues] = useState<submittedValues>({ ...PostInitialState, setNext: false })

  return (
    !submittedValues.setNext
      ? <section className='bg-white w-full h-full p-5'>
            {
              <form className=' grid gap-5 w-full' onSubmit={(e) => { postFormValidator({ e, setError, setSubmittedValues }) }}>
                <LocationSelector location={'origen'} />
                <LocationSelector location={'destino'} />

                <div className='grid grid-cols-2 gap-5'>
                  <InputPostForm inputLabel={'horario'} required={true} placeholder={'5:00 - 22:00'} />
                  <InputPostForm inputLabel={'asientosDisponibles'} required={true} placeholder={'1, 2, 3, etc.'} />
                </div>

                <InputPostForm inputLabel={'detalles'} required={false} placeholder={'Por Mcal. Lopez'} />

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

      : <section className='bg-white w-full h-full p-5 flex flex-col gap-3'>
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
              onClick={() => { console.log(setSubmittedValues) }}
            >
              Enviar
            </button>
          </div>
        </section>
  )
}
