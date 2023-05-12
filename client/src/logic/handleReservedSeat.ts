import { type messageType, type travel } from '../types'
import { handleErrors } from './handleErrors'

interface Props {
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  accessToken: string
  travelId: string
}

interface returnProps {
  message: messageType
  travelId: travel
}

export const handleReservedSeat = async ({ e, accessToken, travelId }: Props): Promise<returnProps> => {
  e.preventDefault()
  const action = 'reservado'

  return await new Promise<returnProps>(resolve => {
    fetch(`http://localhost:3000/api/travels/${travelId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json',
          authorization: `Bearer ${accessToken}`
        }
      })
      .then(async res => {
        const { message } = handleErrors({ res, action })
        res.json()
          .then((data: travel) => {
            const travelId = { ...data }
            resolve({ message, travelId })
          })
          .catch(err => {
            console.log(err)
          })
      })
      .catch(err => { console.log(err) })
  })
}
