import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { dbService } from 'firebase-config'
import { collection, getDocs } from 'firebase/firestore'
import { DiaryData } from 'router/Story'

export interface StoryState {
  storyGroup: {
    visibility: boolean
  }
  storyData: DiaryData[] | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed' // 상태 추가
  error: any
}

const initialState: StoryState = {
  storyGroup: {
    visibility: true,
  },
  storyData: [
    // {
    //   check: 0,
    //   date: '',
    //   id: 0,
    //   imagesUrl: [
    //     {
    //       id: '',
    //       origin: '',
    //       url: '',
    //     },
    //   ],
    //   pet: '',
    //   title: '',
    //   text: '',
    //   user: '',
    //   weather: 'sunny',
    // },
  ],
  status: 'idle',
  error: null,
}

const diaryCollectionRef = collection(dbService, 'diaryInfo')

export const fetchData = createAsyncThunk(
  'diary/fetchData',
  async (_, thunkAPI) => {
    try {
      const diarySnap = await getDocs(diaryCollectionRef)
      const data = diarySnap.docs.map((doc): any => doc.data())

      return data
    } catch (error) {
      console.log(error)
      throw error
    }
  },
)

export const storySlice = createSlice({
  name: 'story',
  initialState,
  reducers: {
    getVisibility: (state, action) => {
      state.storyGroup.visibility = action.payload
    },
    getDiaryData: (state, action) => {
      state.storyData = action.payload
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchData.pending, state => {
      state.status = 'loading'
    })
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.storyData = action.payload
    })
    builder.addCase(fetchData.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    })
  },
})

export const { getVisibility, getDiaryData } = storySlice.actions

export default storySlice.reducer
