export type Posts = Post[]

export interface Post {
  id: string
  origen: string
  destino: string
  horario: string
  asientosDisponibles: number
  detalles: string
  travelId: travel
  precio: string
}

export type Users = User[]

export interface User {
  id: string
  name: string
  lastName: string
  email: string
  password: string
  isAdmin: boolean
  phone: string
  travels: travel
}

export interface travel {
  id: string
  driverId: string
  passengerId: string[]
  postId: string
}
