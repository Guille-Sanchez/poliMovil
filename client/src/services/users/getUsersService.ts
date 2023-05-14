import { MessageInitialState, UserInitialState } from '../../constants'
import { handleErrors } from '../../logic/handleErrors'
import { type Users, type messageType } from '../../types'

interface returnProps {
  users: Users
  message: messageType
}

export const getUsersService = async (): Promise<returnProps> => {
  const message = MessageInitialState
  const users = [UserInitialState]
  const action = 'getUsers'

  return await new Promise((resolve) => {
    fetch('http://localhost:3000/api/users')
      .then(async (res) => {
        const { message } = handleErrors({ res, action })
        if (message.type === '¡Exito!') {
          res.json().then((users: Users) => {
            resolve({ message, users })
          }).catch((_error) => {
            message.type = '¡Error!'
            message.mensaje = 'Ocurrio un error al obtener los usuarios'
            resolve({ message, users })
          })
        }
      })
      .catch((_error) => {
        message.type = '¡Error!'
        message.mensaje = 'Ocurrio un error al obtener los usuarios'
        resolve({ message, users })
      })
  })
}
