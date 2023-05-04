import { useEffect/*, useState */ } from 'react'
import { type Users } from '../types'
import { formatUsers } from '../logic/formatUsers'
import { getUsers } from '../redux/usersSlice'
import { useDispatch } from 'react-redux'

export const useUsersAPI = (): void => {
  const dispatch = useDispatch()

  useEffect(() => {
    let subscribed = true

    if (subscribed) {
      fetch('http://localhost:3000/api/users')
        .then(async (response) => await response.json())
        .then((data: Users) => {
          dispatch(getUsers(formatUsers(data)))
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
