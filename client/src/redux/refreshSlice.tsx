import { createSlice } from '@reduxjs/toolkit'

export interface RefreshState {
  refresh: boolean
}

const initialState: RefreshState = {
  refresh: true
}

export const counterSlice = createSlice({
  name: 'refresh',
  initialState,
  reducers: {
    refresh: (state) => {
      state.refresh = !state.refresh
    }
  }
})

// Action creators are generated for each case reducer function
export const { refresh } = counterSlice.actions

export default counterSlice.reducer
