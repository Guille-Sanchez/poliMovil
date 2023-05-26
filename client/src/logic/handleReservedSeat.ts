import { getHostURL } from '../constants'
import { type messageType, type travel } from '../types'
import { handleErrors } from './handleErrors'

interface Props {
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  accessToken: string
  id: string
  travelId: string
}

interface returnProps {
  message: messageType
  travelId: travel
}

export const handleReservedSeat = async ({ e, accessToken, travelId, id }: Props): Promise<returnProps> => {
  e.preventDefault()
  const action = 'reservado'
  const postId = id

  return await new Promise<returnProps>(resolve => {
    fetch(`${getHostURL()}/api/travels/${travelId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json',
          authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({ postId })
      })
      .then(async res => {
        const travelId: travel = await res.json()
        return ({ res, travelId })
      })
      .then(({ res, travelId }: { res: Response, travelId: travel }) => {
        console.log({ res })
        const { message } = handleErrors({ res, action })
        if (message.type === '¡Éxito!') {
          message.mensaje = 'El asiento ha sido reservado correctamente.'
        } else if (res.status === 409) {
          message.type = '¡Error!'
          message.mensaje = 'Los asientos ya han sido reservados.'
        }
        resolve({ message, travelId })
      })
      .catch(err => {
        console.log(err)
      })
  })
}
