import { type Post, type travel } from '../types'

interface submittedValues extends Post {
  setNext: boolean
}

interface Props {
  e: React.FormEvent<HTMLFormElement>
  setError: React.Dispatch<React.SetStateAction<string | null>>
  setSubmittedValues: React.Dispatch<React.SetStateAction<submittedValues>>
}

export const postFormValidator = ({ e, setError, setSubmittedValues }: Props): void => {
  const travelState: travel = {
    id: '',
    driverId: '644a95842386a55800559cfb', // From token
    passengerId: [''],
    postId: ''
  }

  e.preventDefault()
  setError(null)
  const horarioRegex = /^(?:[5-9]|0[5-9]|1[0-9]|2[0-1]):[0-5][0-9]$|^(22:00)$/

  const { origen, destino, horario, asientosDisponibles, detalles, precio } = Object.fromEntries(new FormData(e.currentTarget).entries())

  if (origen === '' || destino === '' || horario === '' || asientosDisponibles === '') {
    setError('Por favor, llene todos los campos necesarios.')
    return
  }

  try {
    if (origen === destino) {
      setError('El origen y el destino no pueden ser iguales.')
      return
    } else if (+asientosDisponibles < 1) {
      setError('El numero de asientos no puede ser menor a 1.')
      return
    } else if (!horarioRegex.test(horario as string)) {
      setError('El horario debe ser entre 05:00 y 22:00 h')
      return
    } else if (origen !== 'Facultad' && destino !== 'Facultad') {
      setError('Origen o destino debe ser Facultad')
      return
    }
  } catch (error) {
    setError('Algo salio mal, por favor intentelo de nuevo.')
    return
  }

  const PostData = {
    id: '',
    origen: origen as string,
    destino: destino as string,
    horario: horario as string,
    asientosDisponibles: asientosDisponibles as string,
    detalles: detalles as string,
    precio: precio as string,
    travelId: travelState
  }

  setSubmittedValues(() => { return ({ ...PostData, setNext: true }) })
}
