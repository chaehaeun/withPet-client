import { createSlice } from '@reduxjs/toolkit'

interface AuthState {
  isAuthenticated: boolean
  userUid: string
}

const initialAuthState: AuthState = {
  isAuthenticated: false,
  userUid: '',
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    login(state): void {
      state.isAuthenticated = true
    },
    logout(state): void {
      state.isAuthenticated = false
    },
    getUserUid(state, action): void {
      state.userUid = action.payload
    },
  },
})

export const authAction = authSlice.actions
export default authSlice
