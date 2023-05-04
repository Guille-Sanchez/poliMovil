import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { type Posts } from '../types'
import { Post, type PostInitialState } from '../constants'

const initialState = Post

// Create slice
export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    getPosts: (_state, action: PayloadAction<Posts>) => {
      return action.payload
    },
    addPost: (state, action: PayloadAction<typeof PostInitialState>) => {
      state.push(action.payload)
    }
  }
})

// Export action creators and reducer
export const { getPosts, addPost } = postsSlice.actions
export default postsSlice.reducer
