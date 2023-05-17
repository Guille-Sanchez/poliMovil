import { handleErrors } from '../../logic/handleErrors'
import { type Post, type DataBasePost, type messageType } from '../../types'

interface Props {
  newPostInformation: DataBasePost
  accessToken: string
}

interface returnProps {
  message: messageType
  updated: string
}

export const updatePostService = async ({ newPostInformation, accessToken }: Props): Promise<returnProps> => {
  const message = {
    mensaje: '',
    type: ''
  }
  const action = 'editado'
  let updated = ''

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
        if (message.type === '¡Exito!') {
          res.json()
            .then((data: Post) => {
              updated = data.updated
              resolve({ message, updated })
            }).catch((_err) => {
              message.mensaje = 'Un error ocurrión, intenta más tarde'
              message.type = 'error'
              resolve({ message, updated })
            })
        } else {
          resolve({ message, updated })
        }
      })
      .catch((_err) => {
        message.mensaje = 'Un error ocurrión, intenta más tarde'
        message.type = 'error'
        resolve({ message, updated })
      })
  })
}
