import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { type travel, type User, type Users } from '../types'

// Define initial states
const initialStateTravel: travel[] = [{
  id: '',
  driverId: '',
  passengerId: [''],
  postId: ''
}]

const initialStateUser: User = {
  id: '',
  name: '',
  lastName: '',
  email: '',
  password: '',
  isAdmin: false,
  phone: '',
  travels: initialStateTravel
}

const initialState: Users = [initialStateUser]

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
