import { MessageInitialState } from '../../constants'
import { handleErrors } from '../../logic/handleErrors'
import { type messageType } from '../../types'

interface Props {
  updateProfile: {
    name: string
    lastName: string
    email: string
    phone: string
  }
  accessToken: string
}

interface returnProps {
  message: messageType
  accessToken: string
}

export const updatePersonalInformationService = async ({ updateProfile, accessToken }: Props): Promise<returnProps> => {
  const message = { ...MessageInitialState }
  const action = 'actualizado'

  return await new Promise<returnProps>(resolve => {
    fetch('http://localhost:3000/api/users', {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify({ ...updateProfile })
    })
      .then(async res => {
        const { message } = handleErrors({ res, action })
        if (message.type === '¡Exito!') {
          await res.json().then(data => {
            const accessToken: string = data.accessToken
            resolve({ message, accessToken })
          })
        } else {
          resolve({ message, accessToken })
        }
      })
      .catch(err => {
        message.type = '¡Error!'
        message.mensaje = 'Hubo un error al actualizar los datos'
        resolve({ message, accessToken })
        console.log(err)
      })
  })
}
