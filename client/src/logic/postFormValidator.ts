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
    } else if (origen !== 'Facultad' && destino !== 'Facultad') {
      error = 'Origen o destino debe ser Facultad'
    }
  } catch (err) {
    error = 'Ocurrio un error.'
    console.log(err)
  }

  const created = new Date().toISOString()

  valuesToSubmit = {
    newPost: {
      ...valuesToSubmit.newPost,
      origen: origen as string,
      destino: destino as string,
      horario: horario as string,
      asientosDisponibles: asientosDisponibles as string,
      detalles: detalles as string,
      precio: precio as string,
      travelId: travelState,
      created,
      updated: created
    },
    setNext: true
  }

  return ({ error, valuesToSubmit })
}
