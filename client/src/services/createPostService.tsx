import { handleErrors } from '../logic/handleErrors'
import { type messageType, type DataBasePost } from '../types'

interface Props {
  accessToken: string
  newPostInformation: DataBasePost
}

interface returnProps {
  message: messageType
}

export const createPostService = async ({ accessToken, newPostInformation }: Props): Promise<returnProps> => {
  const message = {
    mensaje: '',
    type: ''
  }

  return await new Promise<returnProps>((resolve) => {
    fetch('http://localhost:3000/api/posts',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPostInformation)
      })
      .then((res) => {
        const { message } = handleErrors({ res })
        resolve({ message })
      })
      .catch((_err) => {
        message.mensaje = 'Un error ocurrión, intenta más tarde'
        message.type = 'error'
        resolve({ message })
      })
  })
}
