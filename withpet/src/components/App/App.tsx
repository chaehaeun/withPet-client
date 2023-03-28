import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { auth } from 'firebase-config'
import { onAuthStateChanged } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { authAction } from 'redux/slice/user/auth-slice'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { dbService } from 'firebase-config'
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
import Setting from 'router/Setting'
import AlreadySignIn from 'router/AlreadySignIn'
import DiaryComments from 'router/DiaryComments'
import DiaryEdit from 'router/DiaryEdit'

function App() {
  const dispatch = useDispatch()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [existedPet, setExistedPet] = useState(false)

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        setIsLoggedIn(true)
        dispatch(authAction.getUserUid(user.uid))

        const getMyPet = async () => {
          const q = query(
            collection(dbService, 'petInfo'),
            where('user', '==', user.uid),
          )
          const myPetList = await getDocs(q)
          const myFirstPet = myPetList.docs.map(doc => doc.data())
          setExistedPet(myFirstPet[0] ? true : false)
        }
        getMyPet()
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
          element={
            existedPet ? <AlreadySignIn /> : isLoggedIn ? '' : <SignUp />
          }
        />
        <Route path="/petinfo" element={isLoggedIn && <PetInfo />} />
        <Route path="/story" element={isLoggedIn && <Story />} />
        <Route
          path="/story/:diaryDocId"
          element={isLoggedIn && <DiaryComments />}
        />
        <Route path="/chatting" element={isLoggedIn && <Chatting />} />
        <Route path="/diary" element={isLoggedIn && <Diary />} />
        <Route path="/diary/:id" element={isLoggedIn && <DiaryEdit />} />
        <Route path="/walkindex" element={isLoggedIn && <WalkIndex />} />
        <Route path="/mypage" element={isLoggedIn && <MyPage />} />
        <Route path="/setting" element={isLoggedIn && <Setting />} />
      </Routes>
    </>
  )
}

export default App
