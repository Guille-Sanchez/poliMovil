import { useState } from 'react'
import { InputPasswordType } from './InputPasswordType'
import { updatePasswordService } from '../services/users/updatePasswordService'
import { MessageInitialState } from '../constants'
import { MessageDialog } from './post/MessageDialog'
import { useAppSelector } from '../redux/hooks/useStore'
import { LoadingSpinner } from './LoadingSpinner'

export const UpdatePasswordForm = (): JSX.Element => {
  const [error, setError] = useState('')
  const accessToken = useAppSelector((state) => state.authentication.accessToken)
  const [openDialog, setOpenDialog] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ ...MessageInitialState })

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    setError(() => '')
    setLoading(() => true)
    const { oldPassword, newPassword, confirmPassword } = Object.fromEntries(new FormData(e.currentTarget).entries())

    if (oldPassword === '' || newPassword === '' || confirmPassword === '') {
      setError('Todos los campos son obligatorios')
      setLoading(() => false)
      return
    } else if (oldPassword === newPassword) {
      setError('La nueva contraseña no puede ser igual a la anterior')
      setLoading(() => false)
      return
    } else if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden')
      setLoading(() => false)
      return
    }

    const updatePassword = {
      oldPassword: oldPassword as string,
      newPassword: newPassword as string
    }

    updatePasswordService({ accessToken, updatePassword })
      .then((message) => {
        if (message.type === '¡Éxito!') {
          setMessage(() => message)
          setOpenDialog(true)
        } else {
          setError(() => message.mensaje)
        }
      })
      .catch(err => {
        setError('Un error ha ocurrido, intentelo nuevamente')
        console.log(err)
      })
      .finally(() => {
        setLoading(() => false)
      })
  }

  return (
    <>
      <form className='pl-5 pr-5 grid gap-6 w-full' onSubmit={(e) => { handleOnSubmit(e) }}>
        <fieldset className='grid gap-3 w-full'>
          <legend className='text-xl font-semibold text-left w-full pb-3'>Actualizar Contraseña</legend>
          <InputPasswordType htmlFor='oldPassword' />
          <InputPasswordType htmlFor='newPassword' />
          <InputPasswordType htmlFor='confirmPassword' />
        </fieldset>

        {error !== '' && <p className='text-red-500 text-center'>{error}</p>}
        <button className='bg-gradient-to-r from-blue-900 to-indigo-900 text-white pt-2 pb-2 p-7 pr-7 rounded-lg' type="submit">
          Actualizar
        </button>
      </form>
      {loading && <LoadingSpinner />}
      {openDialog && <MessageDialog message={message}/>}
    </>
  )
}
