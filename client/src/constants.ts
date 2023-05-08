export const TravelInitialState = {
  id: '',
  driverId: '',
  passengerId: [''],
  postId: ''
}

export const PostInitialState = {
  id: '',
  origen: '',
  destino: '',
  horario: '',
  asientosDisponibles: '',
  detalles: '',
  travelId: TravelInitialState,
  precio: ''
}

export const PostToSendToDataBase = {
  id: '',
  origen: '',
  destino: '',
  horario: '',
  asientosDisponibles: '',
  detalles: '',
  precio: ''
}

export const Post = [PostInitialState]

export const AuthenticationInitialState = {
  isAuthenticated: false,
  accessToken: '',
  userId: ''
}

export const UserInitialState = {
  id: '',
  name: '',
  lastName: '',
  email: '',
  password: '',
  isAdmin: false,
  phone: '',
  travels: [TravelInitialState]
}

export const MessageInitialState = {
  mensaje: '',
  type: ''
}
