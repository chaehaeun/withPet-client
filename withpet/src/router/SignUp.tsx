import React, { ChangeEvent, FormEvent, useState } from 'react'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth, dbService } from 'firebase-config'
import { collection, addDoc } from 'firebase/firestore'

import logoSignUp from 'assets/Logo/signUpLogo.webp'

const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [checkPassword, setCheckPassword] = useState('')
  const [userName, setUserName] = useState('')
  const [userNickName, setUserNickName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e
    if (name === 'email') {
      setEmail(value)
    } else if (name === 'password') {
      setPassword(value)
    } else if (name === 'checkPassword') {
      setCheckPassword(value)
    } else if (name === 'userName') {
      setUserName(value)
    } else if (name === 'userNickName') {
      setUserNickName(value)
    } else if (name === 'phoneNumber') {
      setPhoneNumber(value)
    }
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      // const auth = getAuth()
      const data = await createUserWithEmailAndPassword(auth, email, password)
      const docRef = await addDoc(collection(dbService, 'userInfo'), {
        email: email,
        password: password,
        checkPassword: checkPassword,
        userName: userName,
        userNickName: userNickName,
        phoneNumber: phoneNumber,
        createdAt: new Date(),
      })
      setEmail('')
      setPassword('')
      setCheckPassword('')
      setUserName('')
      setUserNickName('')
      setPhoneNumber('')
    } catch (error: any) {
      switch (error.code) {
        case 'auth/weak-password':
          setErrorMsg('비밀번호는 6자리 이상이어야 합니다')
          break
        case 'auth/invalid-email':
          setErrorMsg('잘못된 이메일 주소입니다')
          break
        case 'auth/email-already-in-use':
          setErrorMsg('이미 가입되어 있는 계정입니다')
          break
      }
      console.log(error.message)
    }
  }

  return (
    <section className="max-w-scr bg-primary-100 py-6 flex flex-col gap-2.5 justify-center items-center">
      <img src={logoSignUp} alt="logo" className="w-72 h-40" />
      <form
        className="w-full max-w-scr flex flex-col justify-center items-center gap-6"
        onSubmit={onSubmit}
      >
        <input
          type="email"
          name="email"
          value={email}
          onChange={onChange}
          placeholder="이메일"
          required
          className="w-85 h-14 py-4 pl-4 text-xs text-Gray-400 font-black border-2 border-solid border-black"
        />
        <input
          type="button"
          value="중복확인"
          className="w-85 h-14 bg-primary-200 font-bold text-white border-2 border-solid border-black shadow-2md"
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={onChange}
          placeholder="비밀번호"
          required
          className="w-85 h-14 py-4 pl-4 text-xs text-Gray-400 font-black border-2 border-solid border-black"
        />
        <input
          type="password"
          name="checkPassword"
          value={checkPassword}
          onChange={onChange}
          placeholder="비밀번호확인"
          required
          className="w-85 h-14 py-4 pl-4 text-xs text-Gray-400 font-black border-2 border-solid border-black"
        />
        <input
          type="text"
          name="userName"
          value={userName}
          onChange={onChange}
          placeholder="이름"
          required
          className="w-85 h-14 py-4 pl-4 text-xs text-Gray-400 font-black border-2 border-solid border-black"
        />
        <input
          type="text"
          name="userNickName"
          value={userNickName}
          onChange={onChange}
          placeholder="닉네임"
          required
          className="w-85 h-14 py-4 pl-4 text-xs text-Gray-400 font-black border-2 border-solid border-black"
        />
        <input
          type="text"
          name="phoneNumber"
          value={phoneNumber}
          onChange={onChange}
          placeholder="전화번호"
          required
          className="w-85 h-14 py-4 pl-4 text-xs text-Gray-400 font-black border-2 border-solid border-black"
        />
        <input
          type="submit"
          value="회원가입"
          className="w-85 h-14 bg-primary-200 font-bold text-white border-2 border-solid border-black shadow-2md"
        />
        {errorMsg && (
          <span className="text-xs text-primary-300 text-left">{errorMsg}</span>
        )}
      </form>
    </section>
  )
}

export default SignUp