import { type Post, type Posts } from '../types'

export const formatPosts = (data: Posts): Posts => {
  return (
    data.map((post: Post) => {
      return ({
        origen: post.origen,
        destino: post.destino,
        horario: post.horario,
        asientosDisponibles: post.asientosDisponibles,
        detalles: post.detalles,
        userId: post.userId,
        id: post.id,
        pasajeros: post.pasajeros
      })
    })
  )
}
