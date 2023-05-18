import { type messageType } from '../types'

interface Props {
  res: Response
  action: string
}

interface returnProps {
  message: messageType
}

export const handleErrors = ({ res, action }: Props): returnProps => {
  const message = {
    mensaje: '',
    type: ''
  }

  switch (res.status) {
    case 200:
      message.type = '¡Éxito!'
      message.mensaje = `El archivo se ha ${action} correctamente.`
      break
    case 201:
      message.type = '¡Éxito!'
      message.mensaje = `El archivo se ha ${action} correctamente.`
      break
    case 400:
      message.type = 'Un error ha ocurrido.'
      message.mensaje = 'Error en la petición.'
      break
    case 401:
      message.type = 'Un error ha ocurrido.'
      message.mensaje = 'No se encuentra autorizado para realizar esta acción.'
      break
    case 404:
      message.type = 'Un error ha ocurrido.'
      message.mensaje = 'No se encuentra el archivo requerido.'
      break
    case 500:
      message.type = 'Un error ha ocurrido.'
      message.mensaje = 'Error interno del servidor.'
      break
    case 503:
      message.type = 'Un error ha ocurrido.'
      message.mensaje = 'El servidor no está disponible.'
      break

    default:
      break
  }

  return ({ message })
}
