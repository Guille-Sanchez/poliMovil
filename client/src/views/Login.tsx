import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { SET_AUTHENTICATION_DATA } from '../redux/AuthenticationSlice'
import { Link } from 'react-router-dom'
import { InputPasswordType } from '../components/InputPasswordType'
import jwt_decode, { type JwtPayload } from 'jwt-decode'

interface userToken extends JwtPayload {
  userId: string
}

export const Login = (): JSX.Element => {
  const [error, setError] = useState<string | null>(null)
  const dispatch = useDispatch()

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()

    const { email, password } = Object.fromEntries(new FormData(e.currentTarget).entries())

    const data = {
      email: email as string,
      password: password as string
    }

    if (email === '' || password === '') {
      setError(() => 'Todos los campos son requeridos')
      return
    }

    fetch('http://localhost:3000/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(async res => {
        if (res.status === 200) {
          const { accessToken } = await res.json()
          localStorage.setItem('accessToken', accessToken)

          const decoded: userToken = jwt_decode(accessToken)
          dispatch(SET_AUTHENTICATION_DATA({ isAuthenticated: true, accessToken: decoded?.userId }))
        } else if (res.status === 401) {
          setError(() => 'Usuario o contraseña incorrectos')
          throw new Error('Usuario o contraseña incorrectos')
        }
      })
      .catch(err => { console.log(err) })
  }

  return (
    <section className="bg-white w-full h-full">
      <form className='p-5 grid gap-6 w-full' onSubmit={e => { handleOnSubmit(e) }}>
        <div className="flex flex-col gap-2 justify-between items-center h-min">
          <label htmlFor="email" className='w-full text-left'>Email</label>
          <input autoComplete="off" autoFocus={true} type="text" className="border border-gray-500 rounded-lg pl-5 w-full" placeholder="poligata@fpuna.edu.py" id="email" name="email"/>
        </div>

        <InputPasswordType htmlFor={'password'} />

        {error !== null && <p className='text-red-900 text-center'>{error}</p>}

        <button className='bg-gradient-to-r from-blue-900 to-indigo-900 text-white pt-2 pb-2 p-7 pr-7 rounded-lg' type="submit">
          Iniciar sesión
        </button>
      </form>

      <div className="flex flex-col gap-2 justify-between items-center h-min">
        <div className="flex items-center w-full">
          <hr className="flex-1 border-blue-900 border-1"/>
          <span className="mx-3 text-blue-900 text-xl">o</span>
          <hr className="flex-1 border-blue-900 border-1"/>
        </div>

        <Link to={'/signup'}>
          <button className='border border-blue-900 text-blue-900 pt-2 pb-2 p-7 pr-7 rounded-lg'>
            Crear cuenta
          </button>
        </Link>
      </div>
    </section>
  )
}
