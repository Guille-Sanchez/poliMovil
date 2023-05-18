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
  console.log({ accessToken })

  return await new Promise<returnProps>((resolve) => {
    fetch('http://localhost:3000/api/posts', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newPostInformation)
    })
      .then(async (res) => {
        const post = await res.json()
        return ({ post, res })
      })
      .then(({ post, res }: { post: Post, res: Response }) => {
        const { message } = handleErrors({ res, action })
        message.mensaje = message.type === '¡Éxito!' ? 'El post ha sido creado con éxito.' : 'El post no ha podido ser creado.'
        resolve({ message, post })
      })
      .catch((_err) => {
        message.mensaje = 'Un error ocurrió, intenta más tarde'
        message.type = 'error'
        resolve({ message, post })
      })
  })
}
