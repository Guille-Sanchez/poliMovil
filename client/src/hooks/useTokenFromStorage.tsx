import { useEffect } from 'react'
import { SET_AUTHENTICATION_DATA } from '../redux/AuthenticationSlice'
import { useDispatch } from 'react-redux'
import jwt_decode, { type JwtPayload } from 'jwt-decode'
interface userToken extends JwtPayload {
  userId: string
}

export const useTokenFromStorage = (): void => {
  const dispatch = useDispatch()

  useEffect(() => {
    let subscribed = true

    if (subscribed) {
      const token = localStorage.getItem('accessToken')
      if (token !== null && token !== undefined && token !== '') {
        const decoded: userToken = jwt_decode(token)
        dispatch(SET_AUTHENTICATION_DATA({ isAuthenticated: true, accessToken: decoded.userId }))
      }
    }

    return () => {
      subscribed = false
    }
  }, [])
}
