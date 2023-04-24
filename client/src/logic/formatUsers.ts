import { type Users } from '../types'

export const formatUsers = (users: Users): Users => {
  return users.map((user) => {
    return ({
      id: user.id,
      username: user.username,
      email: user.email,
      password: user.password,
      posts: user.posts
    })
  })
}
