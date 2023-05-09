import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { AuthenticationInitialState } from '../constants'
import { type AuthenticationState } from '../types'

const initialState = AuthenticationInitialState

export const AuthenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    SET_AUTHENTICATION_DATA: (state, action: PayloadAction<AuthenticationState>) => {
      state.isAuthenticated = action.payload.isAuthenticated
      state.accessToken = action.payload.accessToken
      state.userId = action.payload.userId
      state.isProfileCompleted = action.payload.isProfileCompleted
    }
  }
})

export const { SET_AUTHENTICATION_DATA } = AuthenticationSlice.actions

export default AuthenticationSlice.reducer
