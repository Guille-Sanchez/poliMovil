import { MessageInitialState, getHostURL } from '../../constants'
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
  const message = { ...MessageInitialState }
  const action = 'obtenido'

  return await new Promise<returnProps>(resolve => {
    fetch(`${getHostURL()}/api/posts`, { signal })
      .then(async (res: Response) => {
        const posts = await res.json()
        return ({ res, posts })
      })
      .then(({ res, posts }: { res: Response, posts: Posts }) => {
        const { message } = handleErrors({ res, action })
        message.type === '¡Éxito!' ? resolve({ message, posts }) : resolve({ message, posts: [] })
      })
      .catch((_error) => {
        message.type = '¡Error!'
        message.mensaje = 'No se pudo obtener los posts'
        resolve({ message, posts: [] })
      })
  })
}
