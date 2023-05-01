import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { type Users } from '../types'
import { UserInitialState } from '../constants'

const initialState: Users = [UserInitialState]

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    getUsers: (_state, action: PayloadAction<Users>) => {
      return action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { getUsers } = usersSlice.actions

export default usersSlice.reducer
