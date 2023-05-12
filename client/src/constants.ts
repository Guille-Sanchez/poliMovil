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

export const currentUserInformation = {
  userId: '',
  name: '',
  lastName: '',
  email: '',
  phone: '',
  isProfileCompleted: false
}

export const AuthenticationInitialState = {
  isAuthenticated: false,
  accessToken: '',
  userInformation: currentUserInformation
}

export const UserInitialState = {
  id: '',
  name: '',
  lastName: '',
  email: '',
  isAdmin: false,
  phone: '',
  travels: [TravelInitialState]
}

export const MessageInitialState = {
  mensaje: '',
  type: ''
}
