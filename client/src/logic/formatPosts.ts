import { type Post, type Posts } from '../types'

export const formatPosts = (data: Posts): Posts => {
  return (
    data.map((post: Post) => {
      return ({
        id: post.id,
        origen: post.origen,
        destino: post.destino,
        horario: post.horario,
        asientosDisponibles: post.asientosDisponibles,
        detalles: post.detalles,
        travelId: post.travelId,
        precio: post.precio
      })
    })
  )
}
