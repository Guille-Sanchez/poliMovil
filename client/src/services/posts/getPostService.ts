import { MessageInitialState } from '../../constants'
import { handleErrors } from '../../logic/handleErrors'
import { type Posts, type messageType } from '../../types'

interface Props {
  signal: AbortSignal
}
interface returnProps {
  message: messageType
  posts: Posts
}

export const getPostService = async ({ signal }: Props): Promise<returnProps> => {
  const message = MessageInitialState
  const action = 'obtenido'

  return await new Promise<returnProps>(resolve => {
    fetch('http://localhost:3000/api/posts', { signal })
      .then((res) => {
        const { message } = handleErrors({ res, action })
        if (message.type === '¡Exito!') {
          res.json().then((posts: Posts) => {
            resolve({ message, posts })
          }).catch((error) => {
            console.log(error)
          })
        } else {
          message.type = '¡Error!'
          message.mensaje = 'No se pudo obtener los posts'
          resolve({ message, posts: [] })
        }
      })
      .catch((_error) => {
        message.type = '¡Error!'
        message.mensaje = 'No se pudo obtener los posts'
        resolve({ message, posts: [] })
      })
  })
}
