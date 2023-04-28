import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface AuthenticationState {
  isAuthenticated: boolean
  accessToken: string | null
}

const initialState: AuthenticationState = {
  isAuthenticated: false,
  accessToken: null
}

export const AuthenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    SET_AUTHENTICATION_DATA: (state, action: PayloadAction<AuthenticationState>) => {
      state.isAuthenticated = action.payload.isAuthenticated
      state.accessToken = action.payload.accessToken
    }
  }
})

export const { SET_AUTHENTICATION_DATA } = AuthenticationSlice.actions

export default AuthenticationSlice.reducer
