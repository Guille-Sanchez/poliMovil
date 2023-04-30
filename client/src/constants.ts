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

export const Post = [PostInitialState]

export const AuthenticationInitialState = {
  isAuthenticated: false,
  accessToken: null
}
