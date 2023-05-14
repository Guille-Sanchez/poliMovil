import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { type Users } from '../types'
import { UserInitialState } from '../constants'

const initialState: Users = [UserInitialState]

export interface updateProfile {
  name: string
  lastName: string
  email: string
  phone: string
}
interface updateProps {
  userId: string
  updateProfile: updateProfile
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    getUsers: (_state, action: PayloadAction<Users>) => {
      return action.payload
    },
    updateUsers: (state, action: PayloadAction<updateProps>) => {
      return state.map(user => {
        if (user.id === action.payload.userId) {
          return { ...user, ...action.payload.updateProfile }
        }
        return user
      })
    },
    addNewUser: (state, action: PayloadAction<typeof UserInitialState>) => {
      state.push(action.payload)
    }
  }
})

// Action creators are generated for each case reducer function
export const { getUsers, updateUsers, addNewUser } = usersSlice.actions

export default usersSlice.reducer
