import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  collection,
  getDocs,
  DocumentData,
  query,
  where,
} from 'firebase/firestore'
import { dbService } from 'firebase-config'
import { getDiary } from 'redux/slice/diary/diarySlice'
import { RootState } from 'redux/store'

const SelectedPet: React.FC = () => {
  const dispatch = useDispatch()
  const [myPets, setMyPets] = useState<DocumentData[]>([])
  const [btnActive, setBtnActive] = useState<string>('')
  const diary = useSelector(
    (diaryState: RootState) => diaryState.diary.diaryGroup,
  )
  const userUid = useSelector((state: RootState) => state.auth.userUid)

  useEffect(() => {
    const getMyPet = async () => {
      const q = query(
        collection(dbService, 'petInfo'),
        where('user', '==', userUid),
      )
      const myPetList = await getDocs(q)
      setMyPets(myPetList.docs.map(doc => doc.data()))
    }
    getMyPet()

    if (diary.pet !== '') {
      setBtnActive(diary.pet)
    }
  }, [])

  const onFocusPet = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const pet = e.currentTarget.value
    setBtnActive(pet)
    dispatch(getDiary({ ...diary, pet }))
  }

  return (
    <div>
      <p className="text-xs mt-2">반려동물 선택</p>
      {myPets &&
        myPets.map(pet => (
          <button
            type="button"
            value={pet.petName}
            key={pet.petName}
            onClick={e => onFocusPet(e)}
            className={`w-[50px] h-[60px] bg-white mr-4 mt-1.5 mb-3 ${
              pet.petName === btnActive
                ? 'border-2 border-solid border-primary-200'
                : ''
            }`}
          >
            <figure className="flex flex-col justify-center items-center">
              <img
                src={pet.petImg}
                alt={pet.petName}
                className="w-11 h-[38px] object-cover"
              />
              <figcaption className="text-xs">{pet.petName}</figcaption>
            </figure>
          </button>
        ))}
    </div>
  )
}

export default SelectedPet
