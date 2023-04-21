export type Posts = Post[]

export interface Post {
  origen: string
  destino: string
  horario: string
  numeroAsientos: number
  detalles: string
  usuarioID: string
  id: string
  pasajeros: string[]
}

export type Users = User[]

export interface User {
  usuarioID: string
  username: string
  email: string
  password: string
  posts: string[]
  isAdmin: boolean
}
