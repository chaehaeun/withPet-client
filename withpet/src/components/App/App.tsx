import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import 'components/App/App.css'
import Diary from 'router/Diary'
import PetInfo from 'router/PetInfo'
import SignIn from 'router/SignIn'
import SignUp from 'router/SignUp'
import Welcome from 'router/Welcome'
import MyPage from 'router/MyPage'
import Story from 'router/Story'
import WalkIndex from 'router/WalkIndex'
import Chatting from 'router/Chatting'
import AlreadySignIn from 'router/AlreadySignIn'
import { auth } from 'firebase-config'
import { onAuthStateChanged } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { authAction } from 'redux/slice/user/auth-slice'
import DiaryEdit from 'router/DiaryEdit'

function App() {
  const dispatch = useDispatch()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        setIsLoggedIn(true)
        dispatch(authAction.getUserUid(user.uid))
      } else {
        setIsLoggedIn(false)
      }
    })
  }, [])

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <AlreadySignIn /> : <Welcome />}
        />
        <Route
          path="/signin"
          element={isLoggedIn ? <AlreadySignIn /> : <SignIn />}
        />
        <Route
          path="/signup"
          element={isLoggedIn ? <AlreadySignIn /> : <SignUp />}
        />
        <Route path="/petinfo" element={isLoggedIn && <PetInfo />} />
        <Route path="/story" element={<Story />} />
        <Route path="/chatting" element={<Chatting />} />
        <Route path="/diary" element={isLoggedIn && <Diary />} />
        <Route path="/diary/:id" element={<DiaryEdit />} />
        <Route path="/walkindex" element={<WalkIndex />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </>
  )
}

export default App
