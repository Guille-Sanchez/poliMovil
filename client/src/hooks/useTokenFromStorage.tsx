import { useEffect } from 'react'
import { SET_AUTHENTICATION_DATA } from '../redux/AuthenticationSlice'
import { useDispatch } from 'react-redux'

export const useTokenFromStorage = (): void => {
  const dispatch = useDispatch()

  useEffect(() => {
    let subscribed = true

    if (subscribed) {
      const token = localStorage.getItem('accessToken')
      if (token !== null && token !== undefined && token !== '') {
        dispatch(SET_AUTHENTICATION_DATA({ isAuthenticated: true, accessToken: token }))
      }
    }

    return () => {
      subscribed = false
    }
  }, [])
}
