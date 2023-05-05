import { type Post } from '../types'
import { PostInitialState, TravelInitialState } from '../constants'

interface submittedValues extends Post {
  setNext: boolean
}

interface Props {
  e: React.FormEvent<HTMLFormElement>
  userId: string
}

interface returnProps {
  error: string
  valuesToSubmit: submittedValues
}

export const postFormValidator = ({ e, userId }: Props): returnProps => {
  e.preventDefault()
  let error = ''
  let valuesToSubmit = { ...PostInitialState, setNext: false }
  const travelState = { ...TravelInitialState, driverId: userId }

  const horarioRegex = /^(?:[5-9]|0[5-9]|1[0-9]|2[0-1]):[0-5][0-9]$|^(22:00)$/

  const { origen, destino, horario, asientosDisponibles, detalles, precio } = Object.fromEntries(new FormData(e.currentTarget).entries())

  if (origen === '' || destino === '' || horario === '' || asientosDisponibles === '') {
    error = 'Por favor, llene todos los campos necesarios.'
    return ({ error, valuesToSubmit })
  }

  try {
    if (origen === destino) {
      error = 'El origen y el destino no pueden ser iguales.'
    } else if (+asientosDisponibles < 1) {
      error = 'El numero de asientos no puede ser menor a 1.'
    } else if (!horarioRegex.test(horario as string)) {
      error = 'El horario debe ser entre 05:00 y 22:00 h'
    } else if (origen !== 'Facultad' && destino !== 'Facultad') {
      error = 'Origen o destino debe ser Facultad'
    }
  } catch (err) {
    error = 'Ocurrio un error.'
    console.log(err)
  }

  valuesToSubmit = {
    id: '', // Id is obtain from API
    origen: origen as string,
    destino: destino as string,
    horario: horario as string,
    asientosDisponibles: asientosDisponibles as string,
    detalles: detalles as string,
    precio: precio as string,
    travelId: travelState,
    setNext: true
  }

  return ({ error, valuesToSubmit })
}
