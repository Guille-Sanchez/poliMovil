import { useEffect/*, useState */ } from 'react'
import { type Users } from '../types'
import { formatUsers } from '../logic/formatUsers'
import { getUsers } from '../redux/usersSlice'
import { useDispatch } from 'react-redux'

/* interface returnProps {
  users: Users | null
  setUsers: React.Dispatch<React.SetStateAction<Users | null>>
} */

export const useUsersAPI = (): void => {
  // const [users, setUsers] = useState<Users | null>(null)
  const dispatch = useDispatch()

  useEffect(() => {
    let subscribed = true

    if (subscribed) {
      fetch('http://localhost:3000/api/users')
        .then(async (response) => await response.json())
        .then((data: Users) => {
          // setUsers(() => formatUsers(data))
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
  // return ({ users, setUsers })
}
