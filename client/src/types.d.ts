import { type TravelInitialState, type PostInitialState, type AuthenticationInitialState } from './constants'

export type Posts = Post[]

export type Post = typeof PostInitialState

export type travel = typeof TravelInitialState

export type Users = User[]

export interface User {
  id: string
  name: string
  lastName: string
  email: string
  password: string
  isAdmin: boolean
  phone: string
  travels: travel[]
}

export type AuthenticationState = typeof AuthenticationInitialState
