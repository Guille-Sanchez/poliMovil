import { useState } from 'react'
import { InputPasswordType } from './InputPasswordType'
import { updatePasswordService } from '../services/users/updatePasswordService'
import { useSelector } from 'react-redux'
import { type RootState } from '../redux/store'
import { MessageInitialState } from '../constants'
import { MessageDialog } from './post/MessageDialog'

export const UpdatePasswordForm = (): JSX.Element => {
  const [error, setError] = useState('')
  const accessToken = useSelector((state: RootState) => state.authentication.accessToken)
  const [openDialog, setOpenDialog] = useState(false)
  const [message, setMessage] = useState(MessageInitialState)

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    setError(() => '')
    const { oldPassword, newPassword, confirmNewPassword } = Object.fromEntries(new FormData(e.currentTarget).entries())

    if (oldPassword === '' || newPassword === '' || confirmNewPassword === '') {
      setError('Todos los campos son obligatorios')
      return
    } else if (oldPassword === newPassword) {
      setError('La nueva contraseña no puede ser igual a la anterior')
      return
    } else if (newPassword !== confirmNewPassword) {
      setError('Las contraseñas no coinciden')
      return
    }

    const updatePassword = {
      oldPassword: oldPassword as string,
      newPassword: newPassword as string
    }

    updatePasswordService({ accessToken, updatePassword })
      .then((message) => {
        if (message.type === '¡Exito!') {
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

      {openDialog && <MessageDialog message={message}/>}
    </>
  )
}
