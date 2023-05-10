import { useEffect } from 'react'
import { SET_AUTHENTICATION_DATA } from '../redux/AuthenticationSlice'
import { useDispatch } from 'react-redux'
import jwt_decode, { type JwtPayload } from 'jwt-decode'
import { type currentUserInformationType } from '../types'
interface userToken extends JwtPayload {
  userId: string
  name: string
  lastName: string
  email: string
  phone: string
  isProfileCompleted: boolean
}

interface Props {
  accessToken: string
}

export const useTokenFromStorage = ({ accessToken }: Props): void => {
  const dispatch = useDispatch()

  useEffect(() => {
    let subscribed = true

    if (subscribed) {
      const token = localStorage.getItem('accessToken')
      if (token !== null && token !== undefined && token !== '') {
        const decoded: userToken = jwt_decode(token)
        const userInformation: currentUserInformationType = { userId: decoded.userId, isProfileCompleted: decoded.isProfileCompleted, name: decoded.name, lastName: decoded.lastName, email: decoded.email, phone: decoded.phone }
        dispatch(SET_AUTHENTICATION_DATA({ isAuthenticated: true, accessToken: token, userInformation }))
      }
    }

    return () => {
      subscribed = false
    }
  }, [accessToken])
}
