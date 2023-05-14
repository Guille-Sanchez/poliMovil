import { PostInitialState } from '../../constants'
import { handleErrors } from '../../logic/handleErrors'
import { type messageType, type DataBasePost, type Post } from '../../types'

interface Props {
  accessToken: string
  newPostInformation: DataBasePost
}

interface returnProps {
  message: messageType
  post: Post
}

export const createPostService = async ({ accessToken, newPostInformation }: Props): Promise<returnProps> => {
  const message = {
    mensaje: '',
    type: ''
  }
  const action = 'creado'
  const post = PostInitialState

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
        await res.json().then((post: Post) => {
          const { message } = handleErrors({ res, action })
          resolve({ message, post })
        }).catch((_err) => {
          message.mensaje = 'Un error ocurrión, intenta más tarde'
          message.type = 'error'
          resolve({ message, post })
        })
      })
      .catch((_err) => {
        message.mensaje = 'Un error ocurrión, intenta más tarde'
        message.type = 'error'
        resolve({ message, post })
      })
  })
}
