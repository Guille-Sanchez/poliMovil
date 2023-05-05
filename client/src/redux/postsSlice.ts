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
    },
    updatePost: (state, action: PayloadAction<typeof PostInitialState>) => {
      const index = state.findIndex(post => post.id === action.payload.id)
      state[index] = action.payload
    },
    deletePost: (state, action: PayloadAction<string>) => {
      return state.filter(post => post.id !== action.payload)
    }
  }
})

// Export action creators and reducer
export const { getPosts, addPost, updatePost, deletePost } = postsSlice.actions
export default postsSlice.reducer
