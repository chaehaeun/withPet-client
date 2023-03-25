import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Container from 'components/UI/Container'
import StoryCard from 'components/Story/StoryCard'
import Header from 'components/Header/Header'
import { auth, dbService } from 'firebase-config'
import Navigation from 'components/Navigation/Navigation'
import { collection, getDocs } from 'firebase/firestore'
import StoryTap from 'components/Story/StoryTap'
import { RootState } from 'redux/store'

export interface DiaryData {
  check: number
  date: string
  id: number
  imagesUrl: {
    id: string
    origin: string
    url: string
  }[]
  pet: string
  title: string
  text: string
  user: string
  weather: 'sunny' | 'rainy' | 'cloudy' | 'stormy' | 'snowy'
}

const Story = () => {
  const [diaryData, setDiaryData] = useState<DiaryData[]>([])
  const diaryCollectionRef = collection(dbService, 'diaryInfo')
  const story = useSelector(
    (StoryState: RootState) => StoryState.story.storyGroup,
  )
  const userUid = useSelector((state: RootState) => state.auth.userUid)

  useEffect(() => {
    const getData = async () => {
      try {
        const diarySnap = await getDocs(diaryCollectionRef)
        const data = diarySnap.docs.map((doc): any => doc.data())
        if (story.visibility) {
          const publicData = data.filter(el => el.check === 0)
          const allTimeLine = publicData.sort(
            (a, b) => Number(b.createTime) - Number(a.createTime),
          )
          setDiaryData(allTimeLine)
        } else {
          const myData = data.filter(el => el.user === userUid)
          const myTimeLine = myData.sort(
            (a, b) =>
              new Date(b.date).getTime() - new Date(a.date).getTime() ||
              Number(b.createTime) - Number(a.createTime),
          )
          setDiaryData(myTimeLine)
        }
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [story.visibility])

  return (
    <>
      <Header title={'Story'} />
      <Container style={'bg-Gray-100 pb-20 pt-20'}>
        <StoryTap />
        {diaryData.map(data => (
          <StoryCard key={data.id} data={data} />
        ))}
        {diaryData.length === 0 ? (
          <div className={'mt-2 ml-1'}>데이터가 없습니다.</div>
        ) : null}
      </Container>
      <Navigation title={'story'} />
      <button onClick={() => auth.signOut()}>로그아웃</button>
    </>
  )
}

export default Story
