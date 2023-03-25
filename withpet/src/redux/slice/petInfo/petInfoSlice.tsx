import { createSlice } from '@reduxjs/toolkit'

export interface PetInfoState {
  petInfoGroup: {
    petImg: string
    petType: string
    petName: string
    petBirth: string
    petGender: string
    petNeuter: string
  },
  petInfoId: string,
  imgData: string,
  isData: boolean,
}

const initialState: PetInfoState = {
  petInfoGroup: {
    petImg: '',
    petType: '',
    petName: '',
    petBirth: '',
    petGender: 'male',
    petNeuter: 'yes',
  },
  petInfoId: '',
  imgData: '',
  isData: false,
}

const petInfoSlice = createSlice({
  name: 'petInfoGroup',
  initialState,
  reducers: {
    getPetInfo: (state, action) => {
      state.petInfoGroup = action.payload
    },
    getPetImg: (state, action) => {
      state.petInfoGroup.petImg = action.payload
    },
    getPetInfoId:(state, action):void => {
      state.isData = true
      state.petInfoId = action.payload
    },
    getImgData: (state, action) => {
      state.imgData = action.payload
    },
    resetPetInfo: state =>{
      state.petInfoGroup = initialState.petInfoGroup
      state.petInfoId = initialState.petInfoId
      state.isData =  initialState.isData
    }
  },
})

export const { getPetInfo, getPetImg, getPetInfoId, getImgData, resetPetInfo } = petInfoSlice.actions

export default petInfoSlice.reducer
