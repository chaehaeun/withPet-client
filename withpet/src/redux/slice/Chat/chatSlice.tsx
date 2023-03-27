import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ChatState {
  messages: Array<{ content: string; isUser: boolean }>
}

const initialState: ChatState = {
  messages: [],
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<{ content: string; isUser: boolean }>) => {
      state.messages.push(action.payload)
    },
    clearMessages: (state) => {
      state.messages = []
    },
  },
})

export const { addMessage, clearMessages } = chatSlice.actions

export default chatSlice.reducer
