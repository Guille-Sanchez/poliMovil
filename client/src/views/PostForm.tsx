import { useId, useState } from 'react'
import { Link } from 'react-router-dom'

export const PostForm = (): JSX.Element => {
  const [error, setError] = useState<string | null>(null)
  const cities = ['Centro', 'Facultad', 'Limpio', 'Luque', 'Mariano Roque Alonso', 'San Lorenzo', 'Villa Hayes']
  const citiesId = useId()
  /* const initialState = {
    origen: '',
    destino: '',
    horario: '',
    asientosDisponibles: '',
    detalles: ''
  }
  const [submittedValues, setSubmittedValues] = useState(initialState)
  */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    setError(null)
    const horarioRegex = /^(?:[5-9]|0[5-9]|1[0-9]|2[0-1]):[0-5][0-9]$|^(22:00)$/

    const { origen, destino, horario, asientosDisponibles, detalles } = Object.fromEntries(new FormData(e.currentTarget).entries())

    try {
      if (origen === '' || destino === '' || horario === '' || asientosDisponibles === '') {
        setError('Por favor, llene todos los campos necesarios.')
        return
      }
    } catch (error) {
      setError('Algo salio mal, por favor intentelo de nuevo.')
      return
    }

    const PostData = {
      origen: origen as string,
      destino: destino as string,
      horario: horario as string,
      asientosDisponibles: asientosDisponibles as string,
      detalles: detalles as string
    }
    console.log(PostData)
    console.log(PostData.destino === 'Facultad')

    try {
      if (PostData.origen === PostData.destino) {
        setError('El origen y el destino no pueden ser iguales.')
        return
      } else if (+PostData.asientosDisponibles < 1) {
        setError('El numero de asientos no puede ser menor a 1.')
        return
      } else if (!horarioRegex.test(PostData.horario)) {
        setError('El horario debe ser entre 05:00 y 22:00 h')
        return
      } else if (PostData.origen !== 'Facultad' && PostData.destino !== 'Facultad') {
        setError('Origen o destino debe ser Facultad')
        return
      }
    } catch (error) {
      setError('Algo salio mal, por favor intentelo de nuevo.')
      return
    }

    // Post data to server
    console.log(PostData)

    /* setSubmittedValues(() => {
      return ({ ...values })
    }) */
  }
  return (
    <section className='bg-white w-full h-full p-5'>
      {
        <form className=' grid gap-5 w-full' onSubmit={(e) => { handleSubmit(e) }}>
          <div className='flex flex-col gap-2 justify-between items-center h-min'>
            <label htmlFor='origen' className='w-full text-left'>
              Origen <span aria-required className='text-red-500'>*</span>
            </label>

            <select
              className="border border-gray-500 rounded-lg pl-5 w-full"
              name='origen'
              id='origen'
            >
              <option value="">Seleccione origen</option>
              {cities.map(city => {
                return <option value={city} key={`${citiesId}-${city}`}>{city}</option>
              })}
            </select>
          </div>

          <div className='flex flex-col gap-2 justify-between items-center h-min'>
            <label htmlFor='destino' className='w-full text-left'>
              Destino <span aria-required className='text-red-500'>*</span>
            </label>

            <select
              className="border border-gray-500 rounded-lg pl-5 w-full"
              name='destino'
              id='destino'
            >
              <option value="">Seleccione destino</option>
              {cities.map(city => {
                return <option value={city} key={`${citiesId}-${city}`}>{city}</option>
              })}
            </select>

          </div>

          <div className='grid grid-cols-2 gap-5'>
            <div className='flex flex-col gap-2 justify-between items-center h-min'>
              <label htmlFor='horario'className='text-left w-full'>
                Horario <span aria-required className='text-red-500'>*</span>
              </label>

              <input className="border border-gray-500 rounded-lg pl-5 w-full"
                type='text' name='horario' id='horario'
                placeholder='5:00 - 22:00'
              />
          </div>

            <div className='flex flex-col gap-2 justify-between items-center h-min'>
              <label htmlFor='asientosDisponibles'className='w-full text-left'>
                N° de Asientos <span aria-required className='text-red-500'>*</span>
              </label>

              <input className="border border-gray-500 rounded-lg pl-5 w-full"
                type='number' name='asientosDisponibles' id='asientosDisponibles'
                placeholder='1, 2, 3, etc.'
              />
            </div>
          </div>

          <div className='flex flex-col gap-2 justify-between items-center h-min'>
            <label htmlFor='detalles'className='w-full text-left'>
              Detalles
            </label>

            <input className="border border-gray-500 rounded-lg pl-5 w-full"
              type='text' name='detalles' id='detalles'
              placeholder='Por Mcal. Lopez'
            />
          </div>

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
  )
}
