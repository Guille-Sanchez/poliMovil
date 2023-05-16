import { type Post, type Posts } from '../types'
import { getAvailableSeats } from './getAvailableSeats'

export const formatPosts = (data: Posts): Posts => {
  return (
    data.map((post: Post) => {
      const { asientosDisponibles } = getAvailableSeats({ post })

      return ({
        id: post.id,
        origen: post.origen,
        destino: post.destino,
        horario: post.horario,
        asientosDisponibles: asientosDisponibles.toString(),
        detalles: post.detalles,
        travelId: post.travelId,
        precio: post.precio
      })
    })
  )
}
