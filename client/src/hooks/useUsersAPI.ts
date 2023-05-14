import { useEffect } from 'react'
import { useUserActions } from '../redux/hooks/useUserActions'
import { getUsersService } from '../services/users/getUsersService'

export const useUsersAPI = (): void => {
  const { saveUsersInStore } = useUserActions()

  useEffect(() => {
    let subscribed = true

    if (subscribed) {
      getUsersService()
        .then((data) => {
          const { message, users } = data
          if (message.type === '¡Exito!') {
            saveUsersInStore({ users })
          } else {
            alert(message.mensaje)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }

    return () => {
      subscribed = false
    }
  }, [])
}
