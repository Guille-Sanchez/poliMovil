import jwt_decode, { type JwtPayload } from 'jwt-decode'
import { loginService } from '../services/users/loginService'
import { type AuthenticationState, type currentUserInformationType } from '../types'

interface Props {
  e: React.FormEvent<HTMLFormElement>
  setError: React.Dispatch<React.SetStateAction<string | null>>
  saveAuthenticationDataInStore: ({ isAuthenticated, accessToken, userInformation }: AuthenticationState) => void
}

interface userToken extends JwtPayload {
  userId: string
  name: string
  lastName: string
  email: string
  phone: string
  isProfileCompleted: boolean
}

export const handleLogin = ({ e, setError, saveAuthenticationDataInStore }: Props): void => {
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
