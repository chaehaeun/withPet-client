import { configureStore } from '@reduxjs/toolkit'
import weatherReducer from './diarySlice'

const store = configureStore({
  reducer: {
    weather: weatherReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export default store