import { useDispatch } from 'react-redux'
import { type AuthenticationState } from '../../types'
import { SET_AUTHENTICATION_DATA } from '../AuthenticationSlice'

interface returnProps {
  saveAuthenticationDataInStore: ({ isAuthenticated, accessToken, userInformation }: AuthenticationState) => void
}

export const useAuthenticatonActions = (): returnProps => {
  const dispatch = useDispatch()

  const saveAuthenticationDataInStore = ({ isAuthenticated, accessToken, userInformation }: AuthenticationState): void => {
    dispatch(SET_AUTHENTICATION_DATA({ isAuthenticated, accessToken, userInformation }))
  }

  return ({ saveAuthenticationDataInStore })
}
