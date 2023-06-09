import { MessageInitialState, getHostURL } from '../../constants'
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
    fetch(`${getHostURL()}/api/users`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${accessToken}`,
        'content-type': 'application/json'
      },
      body: JSON.stringify({ ...updatePassword })
    })
      .then(res => {
        const { message } = handleErrors({ res, action })
        message.mensaje = message.type === '¡Éxito!' ? 'La contraseña ha sido actualizada con éxito.' : 'La contraseña no ha podido ser actualizada.'
        resolve(message)
      })
      .catch(err => {
        message.type = 'error'
        message.mensaje = 'Ocurrio un error, intentar mas tarde'
        console.log(err)
      })
  })
}
