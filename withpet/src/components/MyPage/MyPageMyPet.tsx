import React, { useEffect, useState } from 'react'
import 'components/App/App.css'
import 'swiper/css'
import 'swiper/css/navigation'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'
import { useSelector } from 'react-redux'
import { dbService } from 'firebase-config'
import { RootState } from 'redux/store'
import {
  collection,
  DocumentData,
  getDocs,
  query,
  where,
} from 'firebase/firestore'
import MyPetInfo from './MyPetInfo'
import MyPageEditBtn from './MyPageEditBtn'

const MyPageMyPet: React.FC = () => {
  const userUid = useSelector((state: RootState) => state.auth.userUid)
  const [myPets, setMyPets] = useState<DocumentData[]>([])

  useEffect(() => {
    const getMyPet = async () => {
      const q = query(
        collection(dbService, 'petInfo'),
        where('user', '==', userUid),
      )
      const querySnapshot = await getDocs(q)
      setMyPets(querySnapshot.docs.map(doc => [doc.data(), doc.id]))
    }
    getMyPet()
  }, [])

  return (
    <Swiper
      spaceBetween={30}
      slidesPerView={2}
      centeredSlides={true}
      modules={[Navigation]}
      navigation
      className="w-full"
    >
      {myPets &&
        myPets.map(pet => (
          <SwiperSlide className="w-full" key={pet[0].petName}>
            <div
              aria-label="MyPet"
              className="bg-white w-full mb-8 flex flex-col items-center border-black border-2 shadow-300"
              key={pet[0].petName}
            >
              <MyPageEditBtn value={pet[1]} />
              <img
                alt="반려동물 사진"
                src={pet[0].petImg}
                className="w-32 h-32 my-8 rounded-full border-2 border-black bg-white"
              />
              <div
                aria-label="MyPetInfo"
                className="bg-primary-100 w-full px-5 py-6 border-t-2 border-gray-600"
              >
                <MyPetInfo title="타입" value={pet[0].petType} />
                <MyPetInfo title="이름" value={pet[0].petName} />
                <MyPetInfo title="생년월일" value={pet[0].petBirth} />
              </div>
            </div>
          </SwiperSlide>
        ))}
    </Swiper>
  )
}

export default MyPageMyPet
