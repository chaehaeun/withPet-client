import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDiary } from 'redux/slice/diary/diarySlice'
import { RootState } from 'redux/store'
import WeatherChoose from 'components/Diary/WeatherChoose'
import SelectedPet from 'components/Diary/SelectedPet'
import Container from 'components/UI/Container'
import Header from 'components/Header/Header'
import PublicChoose from 'components/Diary/PublicChoose'
import DateChoose from 'components/Diary/DateChoose'
import Navigation from 'components/Navigation/Navigation'

const DiaryEdit: React.FC = () => {
  const dispatch = useDispatch()
  const [textCount, setTextCount] = useState<number>(0)
  const diary = useSelector(
    (diaryState: RootState) => diaryState.diary.diaryGroup,
  )

  const onChange = async (e: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { name, value },
    } = e
    if (name === 'text') {
      setTextCount(value.length)
    }
    dispatch(getDiary({ ...diary, [name]: value }))
  }
  const onChangeText = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {
      target: { name, value },
    } = e
    setTextCount(value.length)
    dispatch(getDiary({ ...diary, [name]: value }))
  }

  return (
    <>
      <Header title={'Diary'} />
      <Container style={'bg-primary-100 gap-4 pb-20 items-start pt-16'}>
        <SelectedPet />
        <PublicChoose />
        <h2 className="font-bold w-full h-16 shrink-0">
          <input
            className="w-full h-full text-2xl text-center"
            type="text"
            aria-label="일기 제목 입력칸"
            placeholder="제목"
            maxLength={21}
            required
            name="title"
            value={diary.title}
            onChange={onChange}
          />
        </h2>
        <DateChoose />
        <WeatherChoose />
        <div className="w-full relative shrink-0">
          <textarea
            className="w-full p-4 text-justify resize-none bg-Gray-100"
            aria-label="일기 내용 입력칸"
            cols={30}
            rows={10}
            placeholder="내용을 입력해주세요."
            maxLength={300}
            name="text"
            value={diary.text}
            onChange={onChangeText}
          ></textarea>
          <p
            className="absolute right-2 bottom-3 text-Gray-300"
            role="banner"
            aria-label="작성한 글자 수"
          >{`(${textCount}/300)`}</p>
        </div>
        <p className="mx-auto text-Gray-300">
          수정은 사진을 제외한 정보만 가능합니다.
        </p>
      </Container>
      <Navigation title={'diary'} />
    </>
  )
}

export default DiaryEdit
