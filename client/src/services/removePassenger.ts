import { type Post, type messageType, type travel } from '../types'
import { MessageInitialState } from '../constants'
import { handleErrors } from '../logic/handleErrors'

interface Props {
  accessToken: string
  post: Post
}

interface returnProps {
  message: messageType
  updatedPost: Post
}

export const removePassenger = async ({ accessToken, post }: Props): Promise<returnProps> => {
  const message = MessageInitialState
  const action = 'cancelado'
  let updatedPost = { ...post }

  return await new Promise<returnProps>(resolve => {
    fetch(`http://localhost:3000/api/travels/remove/${post?.travelId.id ?? ''}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${accessToken}`
        }
      })
      .then(async res => {
        const { message } = handleErrors({ res, action })
        if (message.type === '¡Exito!') {
          await res.json().then((data: travel) => {
            updatedPost = { ...post, travelId: data }
            resolve({ message, updatedPost })
          })
            .catch(() => {
              resolve({ message, updatedPost })
            })
        } else {
          resolve({ message, updatedPost })
        }
      })
      .catch(err => {
        message.type = '¡Error!'
        message.mensaje = 'No se pudo cancelar el viaje'
        resolve({ message, updatedPost })
        console.log(err)
      })
  })
}
