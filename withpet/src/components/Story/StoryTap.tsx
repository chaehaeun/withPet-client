import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getVisibility } from 'redux/slice/story/storySlice'

const StoryTap = () => {
  const dispatch = useDispatch()
  const [toggle, setToggle] = useState(true)

  return (
    <div className="flex">
      <button
        type="button"
        aria-label="전체 스토리 보기"
        className={`${
          toggle ? 'bg-primary-200 text-white' : 'bg-Gray-200 text-Gray-400'
        } w-[100px] h-10 rounded-t-2xl font-bold`}
        onClick={() => {
          dispatch(getVisibility(true))
          setToggle(true)
        }}
      >
        ALL
      </button>
      <button
        type="button"
        aria-label="내 스토리만 보기"
        className={`${
          toggle ? 'bg-Gray-200 text-Gray-400' : 'bg-primary-200 text-white'
        } w-[100px] h-10 rounded-t-2xl font-bold`}
        onClick={() => {
          dispatch(getVisibility(false))
          setToggle(false)
        }}
      >
        MY
      </button>
    </div>
  )
}

export default StoryTap
