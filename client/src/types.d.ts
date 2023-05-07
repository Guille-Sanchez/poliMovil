import { type TravelInitialState, type PostInitialState, type AuthenticationInitialState, type UserInitialState, type PostToSendToDataBase, type MessageInitialState } from './constants'

export type Posts = Post[]

export type Post = typeof PostInitialState

export type DataBasePost = typeof PostToSendToDataBase

export interface submittedValues extends Post {
  setNext: boolean
}

export type travel = typeof TravelInitialState

export type Users = User[]

export type User = typeof UserInitialState

export type AuthenticationState = typeof AuthenticationInitialState

export type messageType = typeof MessageInitialState
