import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import store, { RootState } from 'redux/store'
import { fetchData } from 'redux/slice/story/storySlice'
import Container from './../components/UI/Container'
import Header from 'components/Header/Header'
import Navigation from 'components/Navigation/Navigation'
import StoryCard from 'components/Story/StoryCard'
import CommentWrap from 'components/Story/CommentWrap'
import { DocumentData } from 'firebase/firestore'

const DiaryComments = () => {
  const params = useParams()
  const diaryData =
    useSelector((state: RootState) => state.story.storyData) || []
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    setLoading(true)
    store.dispatch(fetchData())
  }, [dispatch])

  useEffect(() => {
    if (diaryData.length) {
      setLoading(false)
    }
  }, [diaryData])

  const currentData = diaryData.find(
    (data: DocumentData) => data.id === Number(params.diaryDocId),
  )

  return (
    <>
      <Header title={'Story'} />
      <Container style={'bg-Gray-100 justify-center pb-20 pt-20'}>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            {currentData ? (
              <>
                <StoryCard
                  key={currentData.id}
                  data={currentData}
                  onDelete={null}
                />
                <CommentWrap id={currentData.id} />
              </>
            ) : (
              <div>Data not found</div>
            )}
          </>
        )}
      </Container>
      <Navigation title={'story'} />
    </>
  )
}

export default DiaryComments
