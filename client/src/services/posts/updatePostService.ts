import { hostURL } from '../../constants'
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
    fetch(`${hostURL}/api/posts/${newPostInformation.id}`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPostInformation)
      })
      .then(async (res: Response) => {
        const updatedPost: Post = await res.json()
        return ({ res, updatedPost })
      })
      .then(({ res, updatedPost }: { res: Response, updatedPost: Post }) => {
        const { message } = handleErrors({ res, action })
        if (message.type === '¡Éxito!') {
          updated = updatedPost.updated
          message.mensaje = message.type === '¡Éxito!' ? 'El post ha sido actualizado con éxito.' : 'El post no ha podido ser actualizado.'
        }

        resolve({ message, updated })
      })
      .catch((_err) => {
        message.mensaje = 'Un error ocurrión, intenta más tarde'
        message.type = 'error'
        resolve({ message, updated })
      })
  })
}
