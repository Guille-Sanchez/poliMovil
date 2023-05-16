import { useState } from 'react'
import { UpdatePersonalInformationForm } from '../../components/UpdatePersonalInformationForm'
import { UpdatePasswordForm } from '../../components/UpdatePasswordForm'

export const MyProfile = (): JSX.Element => {
  const [personalInfoCurrentView, setPersonalInfoCurrentView] = useState(true)
  const primaryButtonClass = 'bg-gradient-to-r from-blue-900 to-indigo-900 text-white'
  const secondaryButtonClass = 'border border-blue-900 text-blue-900 pt-2 pb-2 p-7 pr-7 rounded-lg'

  return (
    <section className="bg-white h-full w-full">
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

      {
       personalInfoCurrentView
         ? <UpdatePersonalInformationForm formLegend={'Información Personal'}/>
         : <UpdatePasswordForm />
      }
    </section>
  )
}
