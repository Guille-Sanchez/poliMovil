import { useId } from 'react'

interface Props {
  location: string
  defaultValue: string
}

const LocationSelector = ({ location, defaultValue }: Props): JSX.Element => {
  const labelLocation = location.charAt(0).toUpperCase() + location.slice(1)
  const cities = ['Centro', 'Facultad', 'Limpio', 'Luque', 'Mariano Roque Alonso', 'San Lorenzo', 'Villa Hayes']
  const citiesId = useId()

  return (
    <div className='flex flex-col gap-2 justify-between items-center h-min'>
      <label htmlFor={location} className='w-full text-left'>
        {labelLocation} <span aria-required className='text-red-500'>*</span>
      </label>

      <select
        className="border border-gray-500 rounded-lg pl-5 w-full"
        name={location}
        id={location}
        defaultValue={cities.filter(city => defaultValue === city)?.at(0) ?? ''}
      >
        <option value="">Seleccione {location}</option>
        {
          cities.map(city => {
            return <option value={city} key={`${citiesId}-${city}`}>{city}</option>
          })
        }
      </select>
    </div>
  )
}

export default LocationSelector
