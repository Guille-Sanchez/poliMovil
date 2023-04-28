import { useId, useState } from 'react'
import { Link } from 'react-router-dom'

export const PostForm = (): JSX.Element => {
  const [error, setError] = useState<string | null>(null)
  const cities = ['Centro', 'Facultad', 'Luque', 'Mariano Roque Alonso', 'San Lorenzo', 'Villa Hayes']
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

    const { origen, destino, horario, asientosDisponibles, detalles } = Object.fromEntries(new FormData(e.currentTarget).entries())
    if (origen === '' || destino === '' || horario === '' || asientosDisponibles === '') {
      setError('Por favor, llene todos los campos necesarios.')
      return
    } else if (origen === destino) {
      setError('El origen y el destino no pueden ser iguales.')
      return
    } else if (+asientosDisponibles < 1) {
      setError('El numero de asientos no puede ser menor a 1.')
      return
    } else if (origen !== 'Facultad' && destino !== 'Facultad') {
      setError('Origen o destino debe ser la facultad')
      return
    }

    const values = {
      origen: origen as string,
      destino: destino as string,
      horario: horario as string,
      asientosDisponibles: asientosDisponibles as string,
      detalles: detalles as string
    }

    // Post data to server
    console.log(values)

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
              Origen (<span aria-required className='text-red-500'>*</span>):
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
              Destino (<span aria-required className='text-red-500'>*</span>):
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

          <div className='flex flex-col gap-2 justify-between items-center h-min'>
            <label htmlFor='horario'className='w-full text-left'>
              Horario<span aria-required className='text-red-500'>*</span>
            </label>

            <input className="border border-gray-500 rounded-lg pl-5 w-full"
              type='text' name='horario' id='horario'
              placeholder='13:30'
            />
          </div>

          <div className='flex flex-col gap-2 justify-between items-center h-min'>
            <label htmlFor='asientosDisponibles'className='w-full text-left'>
              N° de Asientos<span aria-required className='text-red-500'>*</span>
            </label>

            <input className="border border-gray-500 rounded-lg pl-5 w-full"
              type='number' name='asientosDisponibles' id='asientosDisponibles'
              placeholder='1, 2, 3, etc.'
            />
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
