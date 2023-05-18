import { MessageInitialState } from '../../constants'
import { handleErrors } from '../../logic/handleErrors'
import { type messageType } from '../../types'

interface Props {
  postData: {
    email: string
    password: string
  }
}

interface returnProps {
  message: messageType
}

export const createUser = async ({ postData }: Props): Promise<returnProps> => {
  const message = { ...MessageInitialState }
  const action = 'Crear usuario'

  return await new Promise<returnProps>(resolve => {
    fetch('http://localhost:3000/api/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    })
      .then((res) => {
        const { message } = handleErrors({ res, action })
        console.log({ message })
        console.log(message.type === '¡Éxito!')
        message.mensaje = message.type === '¡Éxito!' ? 'El usuario ha sido creado con éxito.' : 'El usuario no ha podido ser creado.'
        resolve({ message })
      })
      . catch(_err => {
        message.type = 'Error'
        resolve({ message })
      })
  })
}
