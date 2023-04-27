import { configureStore } from '@reduxjs/toolkit'
import postReducer from './postsSlice'
import userReducer from './usersSlice'

// create Redux store with the post reducer
export const store = configureStore({
  reducer: {
    posts: postReducer,
    users: userReducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
