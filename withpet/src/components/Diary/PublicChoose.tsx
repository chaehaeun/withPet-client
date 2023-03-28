import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDiary } from 'redux/slice/diary/diarySlice'
import { RootState } from 'redux/store'
import { useParams } from 'react-router-dom'

const PublicChoose: React.FC = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const [check, setCheck] = useState<number>(0)
  const diary = useSelector(
    (diaryState: RootState) => diaryState.diary.diaryGroup,
  )

  useEffect(() => {
    if (id) {
      setCheck(diary.check)
    }
  }, [])

  return (
    <div className="shrink-0">
      <label
        className={`mr-6 relative radio-before cursor-pointer ${
          check === 0 ? 'radio-after' : ''
        }`}
        htmlFor="public-btn"
        role="button"
        aria-label="공개 버튼"
      >
        <input
          className="hidden absolute"
          type="radio"
          id="public-btn"
          checked={check === 0}
          onChange={() => {
            setCheck(0)
            dispatch(getDiary({ ...diary, check: 0 }))
          }}
        />
        <span className="relative inline-block pl-8 text-xs">공개</span>
      </label>
      <label
        className={`relative radio-before cursor-pointer ${
          check === 1 ? 'radio-after' : ''
        }`}
        htmlFor="private-btn"
        role="button"
        aria-label="비공개 버튼"
      >
        <input
          className="hidden absolute"
          type="radio"
          id="private-btn"
          checked={check === 1}
          onChange={() => {
            setCheck(1)
            dispatch(getDiary({ ...diary, check: 1 }))
          }}
        />
        <span className="relative inline-block pl-8 text-xs">비공개</span>
      </label>
    </div>
  )
}

export default PublicChoose
