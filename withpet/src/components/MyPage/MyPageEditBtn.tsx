import React from 'react'
import 'components/App/App.css'
import { useDispatch, } from 'react-redux'
import { dbService } from 'firebase-config'
import { doc, getDoc } from 'firebase/firestore'
import { getPetInfo, getPetInfoId } from 'redux/slice/petInfo/petInfoSlice'
import { useNavigate } from 'react-router-dom'

type EditProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  value: string
}
const MyPageEditBtn: React.FC<EditProps> = ({ value }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onEdit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(getPetInfoId(e.currentTarget.value))
    const targetInfo = await getDoc(
      doc(dbService, 'petInfo', e.currentTarget.value),
    )
    dispatch(getPetInfo(targetInfo.data()))
    navigate('/petinfo')
  }

  return (
    <div className="relative w-full">
      <button
        name="editButton"
        value={value}
        type="button"
        className="absolute w-6 h-6 m-2 bg-sprites_icon bg-[left_-1px_top_-401px] right-0 p-2"
        onClick={onEdit}
      />
    </div>
  )
}

export default MyPageEditBtn
