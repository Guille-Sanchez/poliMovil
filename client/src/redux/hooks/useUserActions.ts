import { useDispatch } from 'react-redux'
import { getUsers, type updateProfile, updateUsers, addNewUser } from '../usersSlice'
import { formatUsers } from '../../logic/formatUsers'
import { type User, type Users } from '../../types'

interface returnProps {
  saveUsersInStore: ({ users }: { users: Users }) => void
  updateUsersInStore: ({ userId, updateProfile }: { userId: string, updateProfile: updateProfile }) => void
  saveNewUserInStore: ({ newUser }: { newUser: User }) => void
}

export const useUserActions = (): returnProps => {
  const dispatch = useDispatch()

  const saveUsersInStore = ({ users }: { users: Users }): void => {
    dispatch(getUsers(formatUsers(users)))
  }

  const saveNewUserInStore = ({ newUser }: { newUser: User }): void => {
    dispatch(addNewUser(newUser))
  }

  const updateUsersInStore = ({ userId, updateProfile }: { userId: string, updateProfile: updateProfile }): void => {
    dispatch(updateUsers({ userId, updateProfile }))
  }

  return { saveUsersInStore, updateUsersInStore, saveNewUserInStore }
}
