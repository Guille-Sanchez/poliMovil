interface Props {
  inputLabel: string
  required: boolean
  placeholder: string
  defaultValue: string
}

export const InputPostForm = ({ inputLabel, required, placeholder, defaultValue }: Props): JSX.Element => {
  let capitalizedLabel = inputLabel.charAt(0).toUpperCase() + inputLabel.slice(1)

  if (capitalizedLabel === 'AsientosDisponibles') {
    capitalizedLabel = 'N° de Asientos'
  }

  return (
    <div className='flex flex-col gap-2 justify-between items-center h-min'>
      <label htmlFor={ inputLabel } className='text-left w-full'>
        {capitalizedLabel} {required && <span aria-required className='text-red-500'>*</span>}
      </label>

      <input className="border border-gray-500 rounded-lg pl-5 w-full"
        type='text' name={inputLabel} id={inputLabel} autoComplete="off"
        placeholder={placeholder} defaultValue={defaultValue}
      />
    </div>
  )
}
