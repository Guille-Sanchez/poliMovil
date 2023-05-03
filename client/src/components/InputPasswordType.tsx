import { useState } from 'react'
import { IconEye, IconEyeSlash } from '../assets/Icons'

interface Props {
  htmlFor: 'password' | 'confirmPassword' | 'newPassword' | 'oldPassword'
}

export const InputPasswordType = ({ htmlFor }: Props): JSX.Element => {
  const [showPassword, setShowPassword] = useState(false)

  const formattedHtmlFor = {
    password: { name: 'password', label: 'Contraseña' },
    confirmPassword: { name: 'confirmPassword', label: 'Confirmar contraseña' },
    newPassword: { name: 'password', label: 'Nueva contraseña' },
    oldPassword: { name: 'oldpassword', label: 'Contraseña actual' }
  } as const

  const toggleButton = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    e.preventDefault()
    setShowPassword((prev) => !prev)
  }

  return (
    <div className="flex flex-col gap-2 justify-between items-center h-min">
      <label htmlFor={htmlFor} className='w-full text-left'>{formattedHtmlFor[htmlFor].label}</label>

      <div className='relative w-full'>
        <input type={showPassword ? 'text' : 'password'} autoComplete="off" name={formattedHtmlFor[htmlFor].name} id={formattedHtmlFor[htmlFor].name}
          className="border border-gray-500 rounded-lg pl-5 w-full"
        />

        <button
          className='absolute right-4 top-1'
          type='button'
          onClick={(e) => { toggleButton(e) }}
        >
          {showPassword ? <IconEyeSlash /> : <IconEye />}
        </button>
      </div>
    </div>
  )
}
