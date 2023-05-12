import { MessageInitialState, UserInitialState } from '../../constants'
import { handleErrors } from '../../logic/handleErrors'
import { type User, type messageType } from '../../types'

interface Props {
  postData: {
    email: string
    password: string
  }
}

interface returnProps {
  message: messageType
  newUser: User
}

export const createUser = async ({ postData }: Props): Promise<returnProps> => {
  const message = MessageInitialState
  const action = 'Crear usuario'
  let newUser: User = { ...UserInitialState }

  return await new Promise<returnProps>(resolve => {
    fetch('http://localhost:3000/api/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    })
      .then((res) => {
        const { message } = handleErrors({ res, action })
        res.json().then((data: User) => {
          newUser = { ...newUser, ...data }
          resolve({ message, newUser })
        }).catch(_err => {
          message.type = 'Error'
          resolve({ message, newUser })
        })
      })
      . catch(_err => {
        message.type = 'Error'
        resolve({ message, newUser })
      })
  })
}
