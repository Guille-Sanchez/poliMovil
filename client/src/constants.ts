export const User = {
  email: '',
  id: '',
  lastName: '',
  name: '',
  phone: ''
}

export const TravelInitialState = {
  id: '',
  driverId: User,
  passengerId: [User],
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
  precio: '',
  created: '',
  updated: ''
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
