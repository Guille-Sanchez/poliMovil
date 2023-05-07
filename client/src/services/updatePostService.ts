import { handleErrors } from '../logic/handleErrors'
import { type messageType, type DataBasePost } from '../types'

interface Props {
  updateOldPost: DataBasePost
  accessToken: string
}

interface returnProps {
  message: messageType
}

export const updatePostService = async ({ updateOldPost, accessToken }: Props): Promise<returnProps> => {
  const postId = updateOldPost.id
  const message = {
    mensaje: '',
    type: ''
  }

  return await new Promise<returnProps>((resolve) => {
    fetch(`http://localhost:3000/api/posts/${postId}`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateOldPost)
      })
      .then(async (res) => {
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
