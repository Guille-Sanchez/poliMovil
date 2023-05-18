import { MessageInitialState } from '../../constants'
import { handleErrors } from '../../logic/handleErrors'
import { type messageType } from '../../types'

interface Props {
  postData: {
    email: string
    password: string
  }
}

interface returnProps {
  message: messageType
}

export const createUser = async ({ postData }: Props): Promise<returnProps> => {
  const message = { ...MessageInitialState }
  const action = 'Crear usuario'

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
        resolve({ message })
      })
      . catch(_err => {
        message.type = 'Error'
        resolve({ message })
      })
  })
}
