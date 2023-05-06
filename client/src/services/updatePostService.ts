import { type DataBasePost } from '../types'

interface Props {
  updateOldPost: DataBasePost
  accessToken: string
}

interface message {
  mensaje: string
  type: string
}

interface returnProps {
  message: message
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
        if (res.status === 200) {
          message.type = 'success'
          message.mensaje = 'Post editado correctamente'
        } else if (res.status === 401) {
          message.type = 'error'
          message.mensaje = 'No se encuentra autorizado para realizar esta acción'
        } else if (res.status === 404) {
          message.type = 'error'
          message.mensaje = 'No se encuentra el post'
        } else if (res.status === 500) {
          message.type = 'error'
          message.mensaje = 'Error interno del servidor'
        }
        return await res.json()
      }).then((_data) => {
        resolve({ message })
      })
      .catch((err) => {
        console.log(err)
        resolve({ message })
      })
  })
}
