import { useSelector } from 'react-redux'
import { InputPasswordType } from '../components/InputPasswordType'
import { type RootState } from '../redux/store'
import jwt_decode, { type JwtPayload } from 'jwt-decode'
import { useState } from 'react'

interface accessToken extends JwtPayload {
  userId: string
}

export const MyProfile = (): JSX.Element => {
  const { accessToken } = useSelector((state: RootState) => state.authentication)
  const userId = jwt_decode<accessToken>(accessToken).userId
  const users = useSelector((state: RootState) => state.users)
  const [personalInfoCurrentView, setPersonalInfoCurrentView] = useState(true)
  const primaryButtonClass = 'bg-gradient-to-r from-blue-900 to-indigo-900 text-white'
  const secondaryButtonClass = 'border border-blue-900 text-blue-900 pt-2 pb-2 p-7 pr-7 rounded-lg'

  const userInfo = users.find(user => user.id === userId)

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    const { name, lastName, email, phone, password, confirmPassword } = Object.fromEntries(new FormData(e.currentTarget).entries())

    console.log(name, lastName, email, phone, password, confirmPassword)
  }

  return (
    <div className="bg-white h-full w-full">
        <div className='flex w-full gap-5 justify-center p-5 text-sm'>
          <button className={`pt-2 pb-2 p-7 pr-7 rounded-lg ${personalInfoCurrentView ? primaryButtonClass : secondaryButtonClass}`}
            onClick={(e) => {
              e.preventDefault()
              setPersonalInfoCurrentView(true)
            }}
          >
            Información Personal
          </button>

          <button className={`pt-2 pb-2 p-7 pr-7 rounded-lg ${!personalInfoCurrentView ? primaryButtonClass : secondaryButtonClass}`}
            onClick={(e) => {
              e.preventDefault()
              setPersonalInfoCurrentView(false)
            }}
          >
            Actualizar Contraseña
          </button>
        </div>

      { personalInfoCurrentView
        ? (<form className='pl-5 pr-5  grid gap-6 w-full' onSubmit={(e) => { handleOnSubmit(e) }}>
          <fieldset className='grid gap-3 w-full'>
            <legend className='text-xl font-semibold text-left w-full pb-3'>Información Personal</legend>
            <div className='grid grid-cols-2 gap-5'>
              <div className="flex flex-col gap-2 justify-between items-center h-min">
                <label htmlFor="name" className='w-full text-left'>Nombre</label>
                <input type="text" id="name" name="name" className="border border-gray-500 rounded-lg pl-5 w-full" defaultValue={userInfo?.name}
                />
              </div>

              <div className="flex flex-col gap-2 justify-between items-center h-min">
                <label htmlFor="lastName" className='w-full text-left'>Apellido</label>
                <input type="text" id="lastName" name="lastName" className="border border-gray-500 rounded-lg pl-5 w-full" defaultValue={userInfo?.lastName}/>
              </div>
            </div>

            <div className="flex flex-col gap-2 justify-between items-center h-min">
              <label htmlFor="email" className='w-full text-left'>Email</label>
              <input type="email" className="border border-gray-500 rounded-lg pl-5 w-full" id="email" name="email" defaultValue={userInfo?.email}/>
            </div>

            <div className="flex flex-col gap-2 justify-between items-center h-min">
              <label htmlFor="phone" className='w-full text-left'>Telefono</label>
              <input type="text" id="phone" name="phone" className="border border-gray-500 rounded-lg pl-5 w-full" defaultValue={userInfo?.phone}/>
            </div>
          </fieldset>
          <button className='bg-gradient-to-r from-blue-900 to-indigo-900 text-white pt-2 pb-2 p-7 pr-7 rounded-lg' type="submit">
            Actualizar
          </button>
        </form>)

        : (<form className='pl-5 pr-5 grid gap-6 w-full' onSubmit={(e) => { handleOnSubmit(e) }}>
        <fieldset className='grid gap-3 w-full'>
            <legend className='text-xl font-semibold text-left w-full pb-3'>Actualizar Contraseña</legend>
            <InputPasswordType htmlFor='oldPassword' />
            <InputPasswordType htmlFor='newPassword' />
            <InputPasswordType htmlFor='confirmPassword' />
          </fieldset>

          <button className='bg-gradient-to-r from-blue-900 to-indigo-900 text-white pt-2 pb-2 p-7 pr-7 rounded-lg' type="submit">
            Actualizar
          </button>
        </form>)
      }
    </div>
  )
}
