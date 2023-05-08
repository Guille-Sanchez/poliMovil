import { handleErrors } from '../logic/handleErrors'
import { type messageType, type DataBasePost, type Post } from '../types'

interface Props {
  accessToken: string
  newPostInformation: DataBasePost
}

interface returnProps {
  message: messageType
  response?: Post
}

export const createPostService = async ({ accessToken, newPostInformation }: Props): Promise<returnProps> => {
  const message = {
    mensaje: '',
    type: ''
  }
  const action = 'creado'

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
      .then(async (res) => {
        await res.json().then((response: Post) => {
          const { message } = handleErrors({ res, action })
          resolve({ message, response })
        })
      })
      .catch((_err) => {
        message.mensaje = 'Un error ocurrión, intenta más tarde'
        message.type = 'error'
        resolve({ message, response: undefined })
      })
  })
}
