import React from 'react'
import 'components/App/App.css'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import { deleteDoc, doc, setDoc } from 'firebase/firestore'
import { dbService, storageService } from 'firebase-config'
import { useNavigate } from 'react-router-dom'
import LongButton from 'components/UI/LongButton'
import { resetPetInfo } from 'redux/slice/petInfo/petInfoSlice'
import { deleteObject, getDownloadURL, ref, uploadString } from 'firebase/storage'

const PetInfoModifyAndDelete: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userUid = useSelector((state: RootState) => state.auth.userUid)
  const petInfo = useSelector(
    (petInfoState: RootState) => petInfoState.petInfo.petInfoGroup,
  )
  const petInfoId = useSelector((state: RootState) => state.petInfo.petInfoId)
  const imgData = useSelector((state: RootState) => state.petInfo.imgData)
  const onModifyClick = async () => {
    if (petInfo.petImg.includes('https://')) {
      await setDoc(doc(dbService, 'petInfo', petInfoId), {
        ...petInfo,
        user: userUid,
      })
      dispatch(resetPetInfo())
      navigate('/mypage')
    } else {
      await deleteObject(ref(storageService, `petImg/${userUid}/${petInfo.petImgName}`))
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
        .then(petInfoObj =>
          setDoc(doc(dbService, 'petInfo', petInfoId), petInfoObj),
        )
        .catch(error => {
          console.error('Error adding document: ', error)
        })
        .finally(() => {
          dispatch(resetPetInfo())
          navigate('/mypage')
        })
    }
  }

  const onDeleteClick = async () => {
    await deleteDoc(doc(dbService, 'petInfo', petInfoId))
    await deleteObject(ref(storageService, `petImg/${userUid}/${petInfo.petImgName}`))
    dispatch(resetPetInfo())
    navigate('/mypage')
  }

  return (
    <section className="flex flex-col w-full items-center">
      <LongButton
        type="button"
        value="수정하기"
        onClick={onModifyClick}
        className="bg-primary-200 text-white"
      />
      <LongButton
        type="button"
        value="삭제하기"
        onClick={onDeleteClick}
        className="bg-stone-400 text-white"
      />
    </section>
  )
}

export default PetInfoModifyAndDelete
