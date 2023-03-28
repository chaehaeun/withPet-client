import React, { useEffect, useState } from 'react'
import { dbService } from 'firebase-config'
import { collection, getDocs } from 'firebase/firestore'

type StoryWriterProps = {
  DiaryWeather: 'sunny' | 'rainy' | 'cloudy' | 'stormy' | 'snowy'
  userUid: string
  createTime: number
  pet: string
  date: string
}

interface Weathers {
  sunny: string
  rainy: string
  cloudy: string
  stormy: string
  snowy: string
}

const DiaryWeathers: Weathers = {
  sunny: 'w-10 h-10 bg-sprites_icon bg-[left_-132px_top_-90px] -133px -140px',
  rainy: 'w-10 h-10 bg-sprites_icon bg-[left_-88px_top_-94px] -90px -143px',
  cloudy: 'w-10 h-10 bg-sprites_icon bg-[left_-44px_top_-94px] -47px -143px',
  stormy: 'w-10 h-10 bg-sprites_icon bg-[left_0px_top_-90px] -1px -140px',
  snowy: 'w-10 h-10 bg-sprites_icon bg-[left_-178px_top_-90px] -177px -139px',
}

const MONTH = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

const StoryWriter: React.FC<StoryWriterProps> = ({
  DiaryWeather = 'sunny',
  userUid,
  pet,
  date,
}) => {
  const [userImg, setUserImg] = useState('')
  const [diaryDate, setDiaryDate] = useState({
    year: '2023',
    month: '01',
    day: '01',
  })

  const petInfoRef = collection(dbService, 'petInfo')
  useEffect(() => {
    const getUser = async () => {
      try {
        const petSnap = await getDocs(petInfoRef)
        const petData = petSnap.docs.map(doc => doc.data())
        const petResult = petData.filter(
          item => item.user === userUid && item.petName === pet,
        )
        setUserImg(petResult[0].petImg)
      } catch (error) {
        console.error(`사용자 정보를 가져올 수 없습니다. ${error}`)
      }
    }

    const makeDate = (date: string) => {
      const dateArr = date.split('-')
      const month = parseInt(dateArr[1]) - 1
      setDiaryDate({ year: dateArr[0], month: MONTH[month], day: dateArr[2] })
    }

    makeDate(date)
    getUser()
  }, [])

  return (
    <div className={'flex items-center justify-between p-1'}>
      <div className={'flex items-center mt-2 text-sm'}>
        <div
          className={
            'w-14 h-14 mr-3 rounded-full bg-sprites_icon bg-[left_0px_top_-429px] bg-slate-700 overflow-hidden'
          }
        >
          <img
            className={'object-cover h-full w-full'}
            src={userImg}
            alt={`${pet} 프로필`}
          />
        </div>
        <div className={'flex flex-col'}>
          <span className={'font-bold'}>{pet}</span>
          <span
            className={'font-normal'}
          >{`${diaryDate.month} ${diaryDate.day}, ${diaryDate.year}`}</span>
        </div>
      </div>
      <div
        aria-label={DiaryWeather}
        className={`${DiaryWeathers[DiaryWeather]}`}
      ></div>
    </div>
  )
}

export default StoryWriter
