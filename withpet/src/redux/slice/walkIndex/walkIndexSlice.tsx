import { createSlice } from '@reduxjs/toolkit'

export interface WalkState {
  walkGroup: {
    id: number
    position: string
    desc: string
    color: string
  }
  walkLoading: boolean
  walkWeather: {
    temp: number
    rain: number
    air: number
  }
  walkSMCARD: {
    title: string
    position: string
    width: string
    height: string
    count: number
    unit: string
  }[]
  walkAirIndex: {
    id: number
    position: string
    desc: string
    color: string
  }[]
}

const initialState: WalkState = {
  walkGroup: {
    id: 0,
    position: '',
    desc: '',
    color: '',
  },
  walkLoading: true,
  walkWeather: {
    temp: 0,
    rain: 0,
    air: 0,
  },
  walkSMCARD: [
    {
      title: '현재온도',
      position: '-3px -189px',
      width: '24px',
      height: '30px',
      count: 0,
      unit: '℃',
    },
    {
      title: '강수량',
      position: '-41px -189px',
      width: '30px',
      height: '29px',
      count: 0,
      unit: 'mm',
    },
    {
      title: '미세먼지',
      position: '-83px -189px',
      width: '28px',
      height: '30px',
      count: 0,
      unit: '㎍/㎥',
    },
  ],
  walkAirIndex: [
    {
      id: 0,
      position: '',
      desc: '',
      color: 'bg-primary-100',
    },
    {
      id: 1,
      position: '0px 0px',
      desc: '최고',
      color: 'bg-Air-100',
    },
    {
      id: 2,
      position: '-225px 0px',
      desc: '좋음',
      color: 'bg-Air-200',
    },
    {
      id: 3,
      position: '-450px 0px',
      desc: '양호',
      color: 'bg-Air-300',
    },
    {
      id: 4,
      position: '-675px 0px',
      desc: '보통',
      color: 'bg-Air-400',
    },
    {
      id: 5,
      position: '-900px 0px',
      desc: '나쁨',
      color: 'bg-Air-500',
    },
    {
      id: 6,
      position: '-1125px 0px',
      desc: '상당히 나쁨',
      color: 'bg-Air-600',
    },
    {
      id: 7,
      position: '-1350px 0px',
      desc: '매우 나쁨',
      color: 'bg-Air-700',
    },
    {
      id: 8,
      position: '-1575px 0px',
      desc: '최악',
      color: 'bg-Air-800',
    },
  ],
}

export const walkSlice = createSlice({
  name: 'walkIndex',
  initialState,
  reducers: {
    getWalkGroup: (state, action) => {
      state.walkGroup = action.payload
    },
    getWalkLoading: (state, action) => {
      state.walkLoading = action.payload
    },
    getWalkWeather: (state, action) => {
      state.walkWeather = action.payload
    },
    updateTemp: (state, action) => {
      state.walkSMCARD[0].count = action.payload
    },
    updateRain: (state, action) => {
      state.walkSMCARD[1].count = action.payload
    },
    updateAir: (state, action) => {
      state.walkSMCARD[2].count = action.payload
    },
  },
})

export const {
  getWalkGroup,
  getWalkLoading,
  getWalkWeather,
  updateTemp,
  updateRain,
  updateAir,
} = walkSlice.actions

export default walkSlice.reducer
