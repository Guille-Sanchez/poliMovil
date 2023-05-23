import { updatePersonalInformationService } from '../services/users/updatePersonalInformationService'
import { useState } from 'react'
import { MessageDialog } from './post/MessageDialog'
import { MessageInitialState } from '../constants'
import { useAuthenticatonActions } from '../redux/hooks/useAuthenticationActions'
import { useAppSelector } from '../redux/hooks/useStore'
import { LoadingSpinner } from './LoadingSpinner'
interface Props {
  formLegend: string
}

export const UpdatePersonalInformationForm = ({ formLegend }: Props): JSX.Element => {
  const { accessToken, userInformation } = useAppSelector((state) => state.authentication)
  const { name, lastName, email, phone, userId } = userInformation
  const { saveAuthenticationDataInStore } = useAuthenticatonActions()
  const [openDialog, setOpenDialog] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ ...MessageInitialState })

  const [error, setError] = useState('')

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    setError(() => '')
    setLoading(() => true)

    const { name, lastName, email, phone } = Object.fromEntries(new FormData(e.currentTarget).entries())
    const updateProfile = {
      name: name as string,
      lastName: lastName as string,
      email: email as string,
      phone: phone as string
    }

    if (name === '' || lastName === '' || email === '' || phone === '') {
      setError(() => 'Todos los campos son obligatorios')
      setLoading(() => false)
      return
    }

    updatePersonalInformationService({ updateProfile, accessToken })
      .then((res) => {
        if (res.message.type === '¡Éxito!') {
          // Update token and information from token
          const { accessToken } = res
          localStorage.setItem('accessToken', accessToken)
          const userInformation = { userId, ...updateProfile, isProfileCompleted: true }
          saveAuthenticationDataInStore({ isAuthenticated: true, accessToken: res.accessToken, userInformation })
          setMessage(() => { return { ...res.message } })
        }
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setLoading(() => false)
        setOpenDialog(() => true)
      })
  }

  return (
    <>
      <form className='pl-5 pr-5  grid gap-6 w-full' onSubmit={(e) => { handleOnSubmit(e) }}>
        <fieldset className='grid gap-3 w-full'>
          <legend className='text-xl font-semibold text-left w-full pb-3'>{formLegend}</legend>
          <div className='grid grid-cols-2 gap-5'>
            <div className="flex flex-col gap-2 justify-between items-center h-min">
              <label htmlFor="name" className='w-full text-left'>Nombre <span aria-required className='text-red-500'>*</span></label>
              <input type="text" id="name" name="name" className="border border-gray-500 rounded-lg pl-5 w-full" autoComplete='off' defaultValue={name}
              />
            </div>

            <div className="flex flex-col gap-2 justify-between items-center h-min">
              <label htmlFor="lastName" className='w-full text-left'>Apellido <span aria-required className='text-red-500'>*</span></label>
              <input type="text" id="lastName" name="lastName" className="border border-gray-500 rounded-lg pl-5 w-full" autoComplete='off' defaultValue={lastName}/>
            </div>
          </div>

          <div className="flex flex-col gap-2 justify-between items-center h-min">
            <label htmlFor="email" className='w-full text-left'>Email <span aria-required className='text-red-500'>*</span></label>
            <input type="email" className="border border-gray-500 rounded-lg pl-5 w-full" id="email" name="email" autoComplete='off' defaultValue={email} readOnly/>
          </div>

          <div className="flex flex-col gap-2 justify-between items-center h-min">
            <label htmlFor="phone" className='w-full text-left'>Telefono <span aria-required className='text-red-500'>*</span></label>
            <input type="text" id="phone" name="phone" className="border border-gray-500 rounded-lg pl-5 w-full" autoComplete='off' defaultValue={phone}/>
          </div>
        </fieldset>

        {error !== null && <p className='text-red-900 text-center'>{error}</p>}
        <button className='bg-gradient-to-r from-blue-900 to-indigo-900 text-white pt-2 pb-2 p-7 pr-7 rounded-lg' type="submit">
          Actualizar
        </button>
      </form>
      {loading && <LoadingSpinner />}
      {openDialog && <MessageDialog message={message }/>}
    </>
  )
}
