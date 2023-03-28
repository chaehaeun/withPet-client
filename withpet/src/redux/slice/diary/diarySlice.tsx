import { createSlice } from '@reduxjs/toolkit'

const now = new Date()
const year = now.getFullYear()
const month =
  now.getMonth() + 1 > 9 ? now.getMonth() + 1 : `0${now.getMonth() + 1}`
const date = now.getDate() > 9 ? now.getDate() : `0${now.getDate()}`
const current = `${year}-${month}-${date}`

export interface DiaryState {
  diaryGroup: {
    title: string
    check: number
    date: string
    weather: string
    text: string
    pet: string
  }
  imgGroup: { id: string; origin: string }[]
}

const initialState: DiaryState = {
  diaryGroup: {
    title: '',
    check: 0,
    date: current,
    weather: 'sunny',
    text: '',
    pet: '',
  },
  imgGroup: [{ id: '', origin: '' }],
}

export const diarySlice = createSlice({
  name: 'diary',
  initialState,
  reducers: {
    getDiary: (state, action) => {
      state.diaryGroup = action.payload
    },
    addDiaryImg: (state, action) => {
      if (state.imgGroup[0].origin === '') {
        state.imgGroup.shift()
      }
      state.imgGroup.push(action.payload)
    },
    updateDiaryImg: (state, action) => {
      const currentData = state.imgGroup.filter(
        el => el.origin !== action.payload,
      )
      state.imgGroup = currentData
    },
    resetDiary: state => {
      state.diaryGroup = initialState.diaryGroup
      state.imgGroup = initialState.imgGroup
    },
  },
})

export const { getDiary, addDiaryImg, updateDiaryImg, resetDiary } =
  diarySlice.actions

export default diarySlice.reducer
