import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { type travel, type Post, type Posts } from '../types'

// Define initial states
const initialStateTravel: travel = {
  id: '',
  driverId: '',
  passengerId: [''],
  postId: ''
}

const intialStatePost: Post = {
  id: '',
  origen: '',
  destino: '',
  horario: '',
  asientosDisponibles: '',
  detalles: '',
  travelId: initialStateTravel,
  precio: ''
}

const initialState: Posts = [intialStatePost]

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
