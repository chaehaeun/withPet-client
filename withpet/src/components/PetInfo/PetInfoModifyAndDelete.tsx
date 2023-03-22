import React from 'react'
import 'components/App/App.css'
import { useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import { deleteDoc, doc, setDoc } from 'firebase/firestore'
import { dbService } from 'firebase-config'
import { useNavigate } from 'react-router-dom'
import LongButton from 'components/UI/LongButton'

const PetInfoModifyAndDelete: React.FC = () => {
  const navigate = useNavigate()
  const userUid = useSelector((state: RootState) => state.auth.userUid)
  const petInfo = useSelector(
    (petInfoState: RootState) => petInfoState.petInfo.petInfoGroup,
  )
  const petInfoId = useSelector((state: RootState) => state.petInfo.petInfoId)

  const onModifyClick = async () => {
    await setDoc(doc(dbService, 'petInfo', petInfoId), { ...petInfo, userUid })
    navigate('/mypage')
  }

  const onDeleteClick = async () => {
    await deleteDoc(doc(dbService, 'petInfo', petInfoId))
    navigate('/mypage')
  }

  return (
    <section className="flex flex-col w-full items-center">
      <LongButton type="button" value="수정하기" onClick={onModifyClick} className="bg-primary-200 text-white"/>
      <LongButton type="button" value="삭제하기" onClick={onDeleteClick} className="bg-stone-400 text-white"/>
    </section>
  )
}

export default PetInfoModifyAndDelete
