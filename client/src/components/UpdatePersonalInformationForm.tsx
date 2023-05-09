import { useSelector } from 'react-redux'
import { type RootState } from '../redux/store'
import { updatePersonalInformationService } from '../services/users/updatePersonalInformationService'
import { useState } from 'react'

interface Props {
  formLegend: string
}

export const UpdatePersonalInformationForm = ({ formLegend }: Props): JSX.Element => {
  const { userId } = useSelector((state: RootState) => state.authentication)
  const { accessToken } = useSelector((state: RootState) => state.authentication)
  const users = useSelector((state: RootState) => state.users)
  const [error, setError] = useState('')

  const userInfo = users.find(user => user.id === userId)

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    setError(() => '')

    const { name, lastName, email, phone } = Object.fromEntries(new FormData(e.currentTarget).entries())
    const updateProfile = {
      name: name as string,
      lastName: lastName as string,
      email: email as string,
      phone: phone as string
    }

    if (name === '' || lastName === '' || email === '' || phone === '') {
      setError(() => 'Todos los campos son obligatorios')
      return
    }

    updatePersonalInformationService({ updateProfile, accessToken })
      .then((res) => {
        if (res.message.type === '¡Exito!') {
          localStorage.setItem('accessToken', res.accessToken)
          window.location.reload()
        } else {
          setError(() => res.message.mensaje)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <form className='pl-5 pr-5  grid gap-6 w-full' onSubmit={(e) => { handleOnSubmit(e) }}>
      <fieldset className='grid gap-3 w-full'>
        <legend className='text-xl font-semibold text-left w-full pb-3'>{formLegend}</legend>
        <div className='grid grid-cols-2 gap-5'>
          <div className="flex flex-col gap-2 justify-between items-center h-min">
            <label htmlFor="name" className='w-full text-left'>Nombre <span aria-required className='text-red-500'>*</span></label>
            <input type="text" id="name" name="name" className="border border-gray-500 rounded-lg pl-5 w-full" defaultValue={userInfo?.name}
            />
          </div>

          <div className="flex flex-col gap-2 justify-between items-center h-min">
            <label htmlFor="lastName" className='w-full text-left'>Apellido <span aria-required className='text-red-500'>*</span></label>
            <input type="text" id="lastName" name="lastName" className="border border-gray-500 rounded-lg pl-5 w-full" defaultValue={userInfo?.lastName}/>
          </div>
        </div>

        <div className="flex flex-col gap-2 justify-between items-center h-min">
          <label htmlFor="email" className='w-full text-left'>Email <span aria-required className='text-red-500'>*</span></label>
          <input type="email" className="border border-gray-500 rounded-lg pl-5 w-full" id="email" name="email" defaultValue={userInfo?.email}/>
        </div>

        <div className="flex flex-col gap-2 justify-between items-center h-min">
          <label htmlFor="phone" className='w-full text-left'>Telefono <span aria-required className='text-red-500'>*</span></label>
          <input type="text" id="phone" name="phone" className="border border-gray-500 rounded-lg pl-5 w-full" defaultValue={userInfo?.phone}/>
        </div>
      </fieldset>

      {error !== null && <p className='text-red-900 text-center'>{error}</p>}
      <button className='bg-gradient-to-r from-blue-900 to-indigo-900 text-white pt-2 pb-2 p-7 pr-7 rounded-lg' type="submit">
        Actualizar
      </button>
    </form>
  )
}
