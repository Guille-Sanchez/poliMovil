import { configureStore } from '@reduxjs/toolkit'
import postReducer from './postsSlice'
import authReducer from './AuthenticationSlice'

export const store = configureStore({
  reducer: {
    posts: postReducer,
    authentication: authReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
