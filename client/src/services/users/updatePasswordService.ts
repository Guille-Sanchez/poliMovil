import { MessageInitialState } from '../../constants'
import { handleErrors } from '../../logic/handleErrors'
import { type messageType } from '../../types'

interface updatePassword {
  oldPassword: string
  newPassword: string
}

interface Props {
  accessToken: string
  updatePassword: updatePassword
}

export const updatePasswordService = async ({ accessToken, updatePassword }: Props): Promise<messageType> => {
  const message = { ...MessageInitialState }
  const action = 'actualizado'

  return await new Promise<messageType>(resolve => {
    fetch('http://localhost:3000/api/users', {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${accessToken}`,
        'content-type': 'application/json'
      },
      body: JSON.stringify({ ...updatePassword })
    })
      .then(async res => {
        const { message } = handleErrors({ res, action })
        resolve(message)
      }).catch(err => {
        message.type = 'error'
        message.mensaje = 'Ocurrio un error, intentar mas tarde'
        console.log(err)
      })
  })
}
