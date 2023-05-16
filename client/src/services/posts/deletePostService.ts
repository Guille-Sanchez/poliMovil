import { handleErrors } from '../../logic/handleErrors'
import { type messageType } from '../../types'
import { MessageInitialState } from '../../constants'

interface Props {
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  id: string | undefined
  accessToken: string
}

interface returnProps {
  message: messageType
}

export const deletePostService = async ({ e, id, accessToken }: Props): Promise<returnProps> => {
  e.preventDefault()
  const message: messageType = { ...MessageInitialState }
  const action = 'eliminado'

  return await new Promise<returnProps>((resolve) => {
    fetch(`http://localhost:3000/api/posts/${id ?? ''}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${accessToken}`
      }
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
