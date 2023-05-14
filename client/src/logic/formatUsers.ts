import { type Users } from '../types'

export const formatUsers = (users: Users): Users => {
  return users.map((user) => {
    return ({
      id: user.id,
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin,
      phone: user.phone,
      travels: user.travels
    })
  })
}
