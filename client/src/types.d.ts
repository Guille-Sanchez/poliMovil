export type Posts = Post[]

export interface Post {
  origen: string
  destino: string
  horario: string
  asientosDisponibles: number
  detalles: string
  userId: string
  id: string
  pasajeros: string[]
  createdAt: Date
  updatedAt: Date
}

export type Users = User[]

export interface User {
  id: string
  username: string
  email: string
  password: string
  posts: string[]
}
