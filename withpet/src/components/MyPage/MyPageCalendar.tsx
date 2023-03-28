import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import 'components/App/App.css'
import 'react-calendar/dist/Calendar.css'
import { dbService } from 'firebase-config'
import {
  collection,
  query,
  where,
  DocumentData,
  getDocs,
} from 'firebase/firestore'
import { RootState } from 'redux/store'
import moment from 'moment'
import Calendar from 'react-calendar'
import StoryCard from 'components/Story/StoryCard'

type CalenderProps = {
  onChange?: (() => void) | (() => Promise<void>)
}

const MyPageCalendar: React.FC<CalenderProps> = () => {
  const [date, onChange] = useState<Date | null>(new Date())
  const chooseDate = moment(date).format('YYYY-MM-DD')
  const [myDiary, setMyDiary] = useState<DocumentData[]>([])
  const userUid = useSelector((state: RootState) => state.auth.userUid)
  const [isData, setData] = useState<boolean>(false)
  useEffect(() => {
    const getMyDiary = async () => {
      const diary = query(
        collection(dbService, 'diaryInfo'),
        where('date', '==', chooseDate),
        where('user', '==', userUid),
      )
      const querySnapshot = await getDocs(diary)
      setMyDiary(querySnapshot.docs.map(doc => [doc.data(), doc.id]))
    }
    getMyDiary()
    setData(true)
  }, [date])

  return (
    <>
      {isData ? (
        <>
          <Calendar onChange={onChange} value={date} />
          <div className="mt-6 mb-12 bg-Gray-100 w-full">
            {myDiary.map(data => (
              <StoryCard key={data[1]} data={data[0]} onDelete={null} />
            ))}
          </div>
        </>
      ) : (
        <Calendar onChange={onChange} value={date} className="mb-3" />
      )}
    </>
  )
}

export default MyPageCalendar
