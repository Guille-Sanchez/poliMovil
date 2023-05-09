import jwt_decode, { type JwtPayload } from 'jwt-decode'
import { SET_AUTHENTICATION_DATA } from '../redux/AuthenticationSlice'
import { type useDispatch } from 'react-redux'
import { loginService } from '../services/users/loginService'

interface Props {
  e: React.FormEvent<HTMLFormElement>
  setError: React.Dispatch<React.SetStateAction<string | null>>
  dispatch: ReturnType<typeof useDispatch>
}

interface userToken extends JwtPayload {
  userId: string
}

export const handleLogin = ({ e, setError, dispatch }: Props): void => {
  e.preventDefault()

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
      if (res.message.type === '¡Exito!') {
        localStorage.setItem('accessToken', res.accessToken)
        const decoded: userToken = jwt_decode(res.accessToken)
        dispatch(SET_AUTHENTICATION_DATA({ isAuthenticated: true, accessToken: res.accessToken, userId: decoded?.userId }))
      } else {
        setError('Usuario o contraseña incorrectos')
      }
    })
    .catch(err => {
      console.log(err)
    })
}
