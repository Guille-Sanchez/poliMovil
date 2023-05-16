import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { type Posts, type Post } from '../types'
import { PostInitialState } from '../constants'

const initialState = [PostInitialState]

// Create slice
export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    getPosts: (_state, action: PayloadAction<Posts>) => {
      return action.payload
    },
    addPost: (state, action: PayloadAction<Post>) => {
      state.push(action.payload)
    },
    updatePost: (state, action: PayloadAction<Post>) => {
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
