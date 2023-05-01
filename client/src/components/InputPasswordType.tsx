import { useState } from 'react'
import { IconEye, IconEyeSlash } from '../assets/Icons'

interface Props {
  htmlFor: string
}

export const InputPasswordType = ({ htmlFor }: Props): JSX.Element => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="flex flex-col gap-2 justify-between items-center h-min">
      <label htmlFor={htmlFor} className='w-full text-left'>{htmlFor === 'password' ? 'Contraseña' : 'Confirmar contraseña'}</label>

      <div className='relative w-full'>
        <input type={showPassword ? 'text' : 'password'} autoComplete="off"
          className="border border-gray-500 rounded-lg pl-5 w-full" id={htmlFor} name={htmlFor}
        />

        <button className='absolute right-4 top-1'
          onClick={(e) => {
            e.preventDefault()
            setShowPassword((prev) => !prev)
          }}
        >
          {showPassword ? <IconEyeSlash /> : <IconEye />}
        </button>
      </div>
    </div>
  )
}
