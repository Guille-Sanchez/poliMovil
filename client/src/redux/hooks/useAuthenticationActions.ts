import { type AuthenticationState } from '../../types'
import { SET_AUTHENTICATION_DATA } from '../AuthenticationSlice'
import { useAppDispatch } from './useStore'

interface returnProps {
  saveAuthenticationDataInStore: ({ isAuthenticated, accessToken, userInformation }: AuthenticationState) => void
}

export const useAuthenticatonActions = (): returnProps => {
  const dispatch = useAppDispatch()

  const saveAuthenticationDataInStore = ({ isAuthenticated, accessToken, userInformation }: AuthenticationState): void => {
    dispatch(SET_AUTHENTICATION_DATA({ isAuthenticated, accessToken, userInformation }))
  }

  return ({ saveAuthenticationDataInStore })
}
