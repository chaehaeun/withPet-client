import React from 'react'
import 'components/App/App.css'
import PetInfoImg from 'components/PetInfo/PetInfoImg'
import PetInfoInput from 'components/PetInfo/PetInfoInput'
import PetInfoRadioBtn from 'components/PetInfo/PetInfoRadioBtn'
import PetInfoRegister from 'components/PetInfo/PetInfoRegister'
import PetInfoRadioGroup from 'components/PetInfo/PetInfoRadioGroup'
import PetInfoModifyAndDelete from './PetInfoModifyAndDelete'

import { RootState } from 'redux/store'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getPetInfo, resetPetInfo } from 'redux/slice/petInfo/petInfoSlice'
import { dbService, storageService } from 'firebase-config'
import { setDoc, doc, collection } from 'firebase/firestore'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'

const PetInfoForm: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const petInfo = useSelector(
    (petInfoState: RootState) => petInfoState.petInfo.petInfoGroup,
  )
  const userUid = useSelector((state: RootState) => state.auth.userUid)
  const petInfoRef = doc(collection(dbService, 'petInfo'))
  const imgData = useSelector((state: RootState) => state.petInfo.imgData)
  const isData = useSelector((state: RootState) => state.petInfo.isData)
  const onChange = async (e: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { name, value },
    } = e
    dispatch(
      getPetInfo({
        ...petInfo,
        [name]: value,
      }),
    )
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const imgRef = ref(storageService, `petImg/${userUid}/${petInfo.petImg}`)
    const response = await uploadString(imgRef, imgData, 'data_url')
    const imgUrl = await getDownloadURL(response.ref)
    Promise.all([response, imgUrl])
      .then(imgUrl => ({
        ...petInfo,
        petImgName: petInfo.petImg,
        petImg: imgUrl[1],
        user: userUid,
      }))
      .then(petInfoObj => setDoc(petInfoRef, petInfoObj))
      .catch(error => {
        console.error('Error adding document: ', error)
      })
      .finally(() => {
        dispatch(resetPetInfo())
        navigate('/mypage')
      })
  }

  return (
    <form
      className="flex flex-col justify-center items-center mb-16"
      aria-label="Pet Information"
      onSubmit={onSubmit}
    >
      <PetInfoImg />

      <PetInfoInput
        id="petType"
        name="petType"
        type="text"
        list="petList"
        value={petInfo.petType}
        onChange={onChange}
      >
        type
      </PetInfoInput>
      <datalist id="petList">
        <option value="강아지" />
        <option value="고양이" />
        <option value="쥐" />
        <option value="새" />
        <option value="파충류" />
      </datalist>

      <PetInfoInput
        id="petName"
        name="petName"
        type="text"
        onChange={onChange}
        value={petInfo.petName}
      >
        이름
      </PetInfoInput>

      <PetInfoInput
        id="petBirth"
        name="petBirth"
        type="date"
        onChange={onChange}
        value={petInfo.petBirth}
      >
        생년월일
      </PetInfoInput>

      <PetInfoRadioGroup label="성별">
        <PetInfoRadioBtn
          required
          name="petGender"
          value="male"
          onChange={onChange}
        >
          남
        </PetInfoRadioBtn>
        <PetInfoRadioBtn name="petGender" value="female" onChange={onChange}>
          여
        </PetInfoRadioBtn>
      </PetInfoRadioGroup>

      <PetInfoRadioGroup label="중성화">
        <PetInfoRadioBtn
          required
          name="petNeuter"
          value="yes"
          onChange={onChange}
        >
          네
        </PetInfoRadioBtn>
        <PetInfoRadioBtn name="petNeuter" value="no" onChange={onChange}>
          아니오
        </PetInfoRadioBtn>
      </PetInfoRadioGroup>
      {isData ? (
        <PetInfoModifyAndDelete />
      ) : (
        <PetInfoRegister id="submit" type="submit" value="등록하기" />
      )}
    </form>
  )
}

export default PetInfoForm
