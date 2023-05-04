import jwt_decode, { type JwtPayload } from 'jwt-decode'
import { SET_AUTHENTICATION_DATA } from '../redux/AuthenticationSlice'
import { type useDispatch } from 'react-redux'

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

  fetch('http://localhost:3000/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(authData)
  })
    .then(async res => {
      if (res.status === 200) {
        const { accessToken } = await res.json()
        localStorage.setItem('accessToken', accessToken)

        const decoded: userToken = jwt_decode(accessToken)
        dispatch(SET_AUTHENTICATION_DATA({ isAuthenticated: true, accessToken: decoded?.userId }))
      } else if (res.status === 401) {
        setError('Usuario o contraseña incorrectos')
      }
    })
    .catch(err => { console.log(err) })
}
