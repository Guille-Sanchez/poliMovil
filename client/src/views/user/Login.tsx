import { useState } from 'react'
import { Link } from 'react-router-dom'
import { InputPasswordType } from '../../components/InputPasswordType'
import { handleLogin } from '../../logic/handleLogin'
import { useAuthenticatonActions } from '../../redux/hooks/useAuthenticationActions'

export const Login = (): JSX.Element => {
  const [error, setError] = useState<string | null>(null)
  const { saveAuthenticationDataInStore } = useAuthenticatonActions()

  return (
    <section className="p-5">
      <div className='max-w-xl mx-auto min-h-max border-gray-500 shadow-sm border border-1 rounded-3xl'>
        <form className="p-5 grid gap-6 w-full" onSubmit={e => { handleLogin({ e, setError, saveAuthenticationDataInStore }) }}>
          <div className="flex flex-col gap-2 justify-between items-center h-min">
            <label htmlFor="email" className='w-full text-left'>Email</label>
            <input autoComplete="off" autoFocus={true} type="text" className="border border-gray-500 rounded-lg pl-5 w-full" placeholder="poligata@fpuna.edu.py" id="email" name="email"/>
          </div>

          <InputPasswordType htmlFor={'password'} />

          {error !== null && <p className='text-red-900 text-center'>{error}</p>}

          <button className='bg-gradient-to-r shadow-md from-blue-900 to-indigo-900 text-white pt-2 pb-2 p-7 pr-7 rounded-lg' type="submit">
            Iniciar sesión
          </button>
        </form>

        <div className="flex flex-col gap-2 justify-between items-center h-min">
          <div className="flex items-center w-full">
            <hr className="flex-1 border-gray-500 border-1"/>
            <span className="mx-3 border-gray-500 text-xl">o</span>
            <hr className="flex-1 border-gray-500 border-1"/>
          </div>

          <Link to={'/signup'}>
            <button className='border shadow-md border-blue-900 text-blue-900 py-2 px-7 mb-5 rounded-lg'>
              Crear cuenta
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}
