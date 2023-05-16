import { type submittedValues } from '../types'
import { TravelInitialState } from '../constants'

interface Props {
  e: React.FormEvent<HTMLFormElement>
  driverId: {
    name: string
    lastName: string
    email: string
    phone: string
    id: string
  }
  submittedValues: submittedValues
}

interface returnProps {
  error: string
  valuesToSubmit: submittedValues
}

export const postFormValidator = ({ e, driverId, submittedValues }: Props): returnProps => {
  e.preventDefault()
  let error = ''
  let valuesToSubmit = { ...submittedValues }
  const travelState =
    submittedValues.newPost.travelId.id !== ''
      ? { ...submittedValues.newPost.travelId }
      : { ...TravelInitialState, driverId }

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
    newPost: {
      ...valuesToSubmit.newPost,
      origen: origen as string,
      destino: destino as string,
      horario: horario as string,
      asientosDisponibles: asientosDisponibles as string,
      detalles: detalles as string,
      precio: precio as string,
      travelId: travelState
    },
    setNext: true
  }

  return ({ error, valuesToSubmit })
}
