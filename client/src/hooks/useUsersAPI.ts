import type React from 'react'
import { useEffect, useState } from 'react'
import { type Users } from '../types'
import { formatUsers } from '../logic/formatUsers'

interface returnProps {
  users: Users | null
  setUsers: React.Dispatch<React.SetStateAction<Users | null>>
}

export const useUsersAPI = (): returnProps => {
  const [users, setUsers] = useState<Users | null>(null)

  useEffect(() => {
    let subscribed = true

    if (subscribed) {
      fetch('http://localhost:3000/api/users')
        .then(async (response) => await response.json())
        .then((data: Users) => {
          setUsers(() => formatUsers(data))
        })
        .catch((error) => {
          console.log(error)
        })
    }

    return () => {
      subscribed = false
    }
  }, [])
  return ({ users, setUsers })
}
