import { type Post, type messageType, type travel } from '../../types'
import { MessageInitialState, getHostURL } from '../../constants'
import { handleErrors } from '../../logic/handleErrors'

interface Props {
  accessToken: string
  post: Post
}

interface returnProps {
  message: messageType
  newPost: Post
}

export const removePassenger = async ({ accessToken, post }: Props): Promise<returnProps> => {
  const message = { ...MessageInitialState }
  const action = 'cancelado'
  let newPost = { ...post }

  return await new Promise<returnProps>(resolve => {
    fetch(`${getHostURL()}/api/travels/remove/${post?.travelId.id ?? ''}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${accessToken}`
        }
      })
      .then(async res => {
        const travelId: travel = await res.json()
        return ({ res, travelId })
      })
      .then(({ res, travelId }: { res: Response, travelId: travel }) => {
        const { message } = handleErrors({ res, action })
        if (message.type === '¡Éxito!') {
          const asientosDisponibles = (+post.asientosDisponibles + 1).toString()
          newPost = { ...post, asientosDisponibles, travelId }
          resolve({ message, newPost })
        } else {
          resolve({ message, newPost })
        }
      })
      .catch(err => {
        message.type = '¡Error!'
        message.mensaje = 'No se pudo cancelar el viaje'
        resolve({ message, newPost })
        console.log(err)
      })
  })
}
