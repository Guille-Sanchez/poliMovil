import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { type Posts } from '../types'
import { Post } from '../constants'

const initialState = Post

// Create slice
export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    getPosts: (_state, action: PayloadAction<Posts>) => {
      return action.payload
    }
  }
})

// Export action creators and reducer
export const { getPosts } = postsSlice.actions
export default postsSlice.reducer
