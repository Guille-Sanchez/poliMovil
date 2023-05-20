import { hostURL } from '../../constants'
import { handleErrors } from '../../logic/handleErrors'
import { type messageType } from '../../types'

interface Props {
  authData: {
    email: string
    password: string
  }
}

interface returnProps {
  message: messageType
  accessToken: string
}

export const loginService = async ({ authData }: Props): Promise<returnProps> => {
  const message = {
    mensaje: '',
    type: ''
  }
  const action = 'Iniciar sesión'

  return await new Promise((resolve) => {
    fetch(`${hostURL}/api/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(authData)
    })
      .then(async (res: Response) => {
        const data: { accessToken: string } = await res.json()
        return ({ res, data })
      })
      .then(({ res, data }: { res: Response, data: { accessToken: string } }) => {
        const { message } = handleErrors({ res, action })
        const { accessToken } = data
        resolve({ message, accessToken })
      })
      .catch(_err => {
        message.type = 'Un error ha ocurrido.'
        message.mensaje = 'Error en la petición.'
        const accessToken = ''
        resolve({ message, accessToken })
      })
  })
}
