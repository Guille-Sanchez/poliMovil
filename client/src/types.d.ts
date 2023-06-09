import { type TravelInitialState, type PostInitialState, type AuthenticationInitialState, type UserInitialState, type PostToSendToDataBase, type MessageInitialState, type currentUserInformation } from './constants'

export type Posts = PostInitialState[]

export type Post = typeof PostInitialState

export type DataBasePost = typeof PostToSendToDataBase

export interface submittedValues {
  newPost: Post
  setNext: boolean
}

export type travel = typeof TravelInitialState

export type Users = User[]

export type User = typeof UserInitialState

export type AuthenticationState = typeof AuthenticationInitialState

export type currentUserInformationType = typeof currentUserInformation

export type messageType = typeof MessageInitialState

export interface messageConfirmationInterface {
  title: string
  buttonAction: string
}
