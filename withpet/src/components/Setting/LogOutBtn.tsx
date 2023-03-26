import React from 'react'
import { signOut } from 'firebase/auth'
import { auth } from 'firebase-config'
import { useNavigate } from 'react-router-dom'

const LogOutBtn = () => {
  const navigate = useNavigate()

  const onLogOutClick = () => {
    signOut(auth)
    navigate('/signin')
  }

  return (
    <button
      type="button"
      onClick={onLogOutClick}
      className="max-w-scr h-14 bg-primary-100 mt-10 text-base font-bold shadow-150"
    >
      로그아웃
    </button>
  )
}

export default LogOutBtn
