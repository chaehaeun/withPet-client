import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDiary } from 'redux/slice/diary/diarySlice'
import { RootState } from 'redux/store'
import AttachedPicture from 'components/Diary/AttachedPicture'
import WeatherChoose from 'components/Diary/WeatherChoose'
import SelectedPet from 'components/Diary/SelectedPet'
import Container from 'components/UI/Container'
import Header from 'components/Header/Header'
import PublicChoose from 'components/Diary/PublicChoose'
import DateChoose from 'components/Diary/DateChoose'
import CustomModal from 'components/UI/CustomModal'
import Navigation from 'components/Navigation/Navigation'

const Diary: React.FC = () => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState<string>('')
  const [text, setText] = useState<string>('')
  const [textCount, setTextCount] = useState<number>(0)
  const [alert, setAlert] = useState<boolean>(false)
  const diary = useSelector(
    (diaryState: RootState) => diaryState.diary.diaryGroup,
  )

  return (
    <>
      {alert && (
        <CustomModal
          message={'최대 4개의 사진만 첨부할 수 있습니다.'}
          ea={1}
          left={'확인'}
          setAlert={setAlert}
        />
      )}
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
            value={title}
            onChange={e => {
              setTitle(e.target.value)
              dispatch(getDiary({ ...diary, title }))
            }}
          />
        </h2>
        <DateChoose />
        <WeatherChoose />
        <AttachedPicture setAlert={setAlert} />
        <div className="w-full relative shrink-0">
          <textarea
            className="w-full p-4 text-justify resize-none bg-Gray-100"
            name="description"
            aria-label="일기 내용 입력칸"
            cols={30}
            rows={10}
            placeholder="내용을 입력해주세요."
            value={text}
            maxLength={300}
            onChange={e => {
              setTextCount(e.target.value.length)
              setText(e.target.value)
              dispatch(getDiary({ ...diary, text }))
            }}
          ></textarea>
          <p
            className="absolute right-2 bottom-3 text-Gray-300"
            role="banner"
            aria-label="작성한 글자 수"
          >{`(${textCount}/300)`}</p>
        </div>
      </Container>
      <Navigation title={'diary'} />
    </>
  )
}

export default Diary
