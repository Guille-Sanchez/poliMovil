import { handleErrors } from '../../logic/handleErrors'
import { type DataBasePost, type messageType } from '../../types'

interface Props {
  newPostInformation: DataBasePost
  accessToken: string
}

interface returnProps {
  message: messageType
}

export const updatePostService = async ({ newPostInformation, accessToken }: Props): Promise<returnProps> => {
  const message = {
    mensaje: '',
    type: ''
  }
  const action = 'editado'

  return await new Promise<returnProps>((resolve) => {
    fetch(`http://localhost:3000/api/posts/${newPostInformation.id}`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPostInformation)
      })
      .then((res) => {
        const { message } = handleErrors({ res, action })
        resolve({ message })
      })
      .catch((_err) => {
        message.mensaje = 'Un error ocurrión, intenta más tarde'
        message.type = 'error'
        resolve({ message })
      })
  })
}
