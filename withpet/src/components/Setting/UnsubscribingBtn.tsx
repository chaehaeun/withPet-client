import React from 'react'
import { auth } from 'firebase-config'
import { deleteUser } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

const UnsubscribingBtn = () => {
  const navigate = useNavigate()

  const onUnsubscribing = async () => {
    try {
      const user = auth.currentUser
      await deleteUser(user as any)
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <button
      type="button"
      onClick={onUnsubscribing}
      className="max-w-scr h-14 bg-Gray-500 mt-4 text-base font-bold text-white shadow-150"
    >
      회원 탈퇴
    </button>
  )
}

export default UnsubscribingBtn
