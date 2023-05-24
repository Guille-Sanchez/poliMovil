import { MessageInitialState, getHostURL } from '../../constants'
import { handleErrors } from '../../logic/handleErrors'
import { type Posts, type messageType } from '../../types'

interface Props {
  controller: AbortController
  signal: AbortSignal
}
interface returnProps {
  message: messageType
  posts: Posts
}

export const getPostService = async ({ controller, signal }: Props): Promise<returnProps> => {
  const message = { ...MessageInitialState }
  const action = 'obtenido'

  return await new Promise<returnProps>((resolve) => {
    const timeout = setTimeout(() => {
      controller.abort()
      message.type = '¡Error!'
      message.mensaje = 'No se pudo obtener los posts (timeout).'
      resolve({ message, posts: [] })
    }, 5000)

    fetch(`${getHostURL()}/api/posts`, { signal })
      .then(async (res: Response) => {
        clearTimeout(timeout)
        const posts = await res.json()
        const { message } = handleErrors({ res, action })
        message.type === '¡Éxito!' ? resolve({ message, posts }) : resolve({ message, posts: [] })
      })
      .catch((error) => {
        clearTimeout(timeout)
        if (error.name !== 'AbortError') {
          // Handle other types of errors
          message.type = '¡Error!'
          message.mensaje = 'Se produjo un error al obtener los posts.'
          resolve({ message, posts: [] })
        }
      })
  })
}
