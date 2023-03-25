import { createSlice } from '@reduxjs/toolkit'
import { DiaryData } from 'router/Story'

export interface StoryState {
  storyGroup: {
    visibility: boolean
  }
  storyData: DiaryData[]
}

const initialState: StoryState = {
  storyGroup: {
    visibility: true,
  },
  storyData: [
    {
      check: 0,
      date: '',
      id: 0,
      imagesUrl: [
        {
          id: '',
          origin: '',
          url: '',
        },
      ],
      pet: '',
      title: '',
      text: '',
      user: '',
      weather: 'sunny',
    },
  ],
}

export const storySlice = createSlice({
  name: 'story',
  initialState,
  reducers: {
    getVisibility: (state, action) => {
      state.storyGroup.visibility = action.payload
    },
    getData: (state, action) => {
      state.storyData = action.payload
    },
  },
})

export const { getVisibility } = storySlice.actions

export default storySlice.reducer
