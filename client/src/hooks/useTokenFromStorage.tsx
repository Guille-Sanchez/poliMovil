import { useEffect } from 'react'
import jwt_decode, { type JwtPayload } from 'jwt-decode'
import { type currentUserInformationType } from '../types'
import { useAuthenticatonActions } from '../redux/hooks/useAuthenticationActions'
interface userToken extends JwtPayload {
  userId: string
  name: string
  lastName: string
  email: string
  phone: string
  isProfileCompleted: boolean
}

export const useTokenFromStorage = (): void => {
  const { saveAuthenticationDataInStore } = useAuthenticatonActions()

  useEffect(() => {
    let subscribed = true

    if (subscribed) {
      const token = localStorage.getItem('accessToken')
      if (token !== null && token !== undefined && token !== '') {
        const decoded: userToken = jwt_decode(token)
        const userInformation: currentUserInformationType = { userId: decoded.userId, isProfileCompleted: decoded.isProfileCompleted, name: decoded.name, lastName: decoded.lastName, email: decoded.email, phone: decoded.phone }
        saveAuthenticationDataInStore({ isAuthenticated: true, accessToken: token, userInformation })
      }
    }

    return () => {
      subscribed = false
    }
  }, [])
}
