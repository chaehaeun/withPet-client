import React from 'react'
import { useNavigate } from 'react-router-dom'
import 'components/App/App.css'

const MyPageAddBtn: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div
      className="pb-1 w-full flex flex-col items-center 
    after:block after:content-[''] after:h-1 after:border-b-2 after:border-black after:mt-6 after:w-11/12"
    >
      <button
        name="addButton"
        type="button"
        onClick={() => navigate('/petinfo')}
        className="mx-auto w-8/12 py-4 px-12 inline-block box-border border-2 border-black bg-white text-base text-center cursor-pointer"
      >
        추가하기
      </button>
    </div>
  )
}

export default MyPageAddBtn
