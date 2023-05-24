import { useState } from 'react'
import { Link } from 'react-router-dom'
import { InputPasswordType } from '../../components/InputPasswordType'
import { useAuthenticatonActions } from '../../redux/hooks/useAuthenticationActions'
import { loginService } from '../../services/users/loginService'
import jwt_decode, { type JwtPayload } from 'jwt-decode'
import { type currentUserInformationType } from '../../types'
import { LoadingSpinner } from '../../components/LoadingSpinner'

interface userToken extends JwtPayload {
  userId: string
  name: string
  lastName: string
  email: string
  phone: string
  isProfileCompleted: boolean
}

export const Login = (): JSX.Element => {
  const [error, setError] = useState<string | null>(null)
  const { saveAuthenticationDataInStore } = useAuthenticatonActions()
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = ({ e }: { e: React.FormEvent<HTMLFormElement> }): void => {
    e.preventDefault()

    setIsLoading(() => true)
    const { email, password } = Object.fromEntries(new FormData(e.currentTarget).entries())
    const authData = {
      email: email as string,
      password: password as string
    }

    if (email === '' || password === '') {
      setError('Todos los campos son requeridos')
    }

    loginService({ authData })
      .then(res => {
        setIsLoading(() => false)
        if (res.message.type === '¡Éxito!') {
          localStorage.setItem('accessToken', res.accessToken)
          const decoded: userToken = jwt_decode(res.accessToken)
          const userInformation: currentUserInformationType = { userId: decoded.userId, isProfileCompleted: decoded.isProfileCompleted, name: decoded.name, lastName: decoded.lastName, email: decoded.email, phone: decoded.phone }
          saveAuthenticationDataInStore({ isAuthenticated: true, accessToken: res.accessToken, userInformation })
        } else {
          setError('Usuario o contraseña incorrectos')
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <section
      className="flex-shrink-0 w-full max-w-4xl min-h-full p-5 flex flex-col gap-3"
      style={{ fontSize: 'clamp(1rem, 0.711rem + 1.233vw, 1.5rem)' }}
    >
      <div className='min-h-max border-gray-500 shadow-sm border border-1 rounded-3xl'>
        <form className="p-5 grid gap-6 w-full" onSubmit={e => { handleLogin({ e }) }}>
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

        <div className="flex flex-col mb-5 gap-2 justify-between items-center h-min">
          <div className="flex items-center w-full">
            <hr className="flex-1 border-gray-500 border-1"/>
            <span className="mx-3 border-gray-500 text-xl">o</span>
            <hr className="flex-1 border-gray-500 border-1"/>
          </div>

          <Link to={'/signup'}>
            <button className='border shadow-md border-blue-900 text-blue-900 py-2 px-7 rounded-lg'>
              Crear cuenta
            </button>
          </Link>
        </div>
      </div>
      {isLoading && <LoadingSpinner />}
    </section>
  )
}
