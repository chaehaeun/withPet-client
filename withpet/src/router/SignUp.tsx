import React, { ChangeEvent, FormEvent, useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, dbService } from 'firebase-config'
import { collection, addDoc } from 'firebase/firestore'
import logoSignUp from 'assets/Logo/signUpLogo.webp'
import Container from 'components/UI/Container'
import SignUpInput from 'components/SignUp/SignUpInput'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [checkPassword, setCheckPassword] = useState('')
  const [userName, setUserName] = useState('')
  const [userNickName, setUserNickName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const navigate = useNavigate()

  const [passwordMessage, setPasswordMessage] = useState('')
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState('')
  const [phoneMessage, setPhoneMessage] = useState('')

  const [isPassword, setIsPassword] = useState(false)
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false)
  const [isPhone, setIsPhone] = useState(false)

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    const currentPassword = e.target.value
    setPassword(currentPassword)
    const passwordRegExp =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
    if (!passwordRegExp.test(currentPassword)) {
      setPasswordMessage(
        '숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요.',
      )
      setIsPassword(false)
    } else {
      setPasswordMessage('안전한 비밀번호 입니다.')
      setIsPassword(true)
    }
  }
  const onChangePasswordConfirm = (e: ChangeEvent<HTMLInputElement>) => {
    const currentPasswordConfirm = e.target.value
    setCheckPassword(currentPasswordConfirm)
    if (password !== currentPasswordConfirm) {
      setPasswordConfirmMessage('비밀번호가 일치하지 않습니다.')
      setIsPasswordConfirm(false)
    } else {
      setPasswordConfirmMessage('비밀번호가 일치합니다.')
      setIsPasswordConfirm(true)
    }
  }

  const onChangePhone = (getNumber: string) => {
    const currentPhone = getNumber
    setPhoneNumber(currentPhone)
    const phoneRegExp = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/

    if (!phoneRegExp.test(currentPhone)) {
      setPhoneMessage('올바른 형식이 아닙니다!!!')
      setIsPhone(false)
    } else {
      setPhoneMessage('사용 가능한 번호입니다.')
      setIsPhone(true)
    }
  }

  const addHyphen = (e: ChangeEvent<HTMLInputElement>) => {
    const currentNumber = e.target.value
    setPhoneNumber(currentNumber)
    if (currentNumber.length == 3 || currentNumber.length == 8) {
      setPhoneNumber(`${currentNumber}-`)
      onChangePhone(`${currentNumber}-`)
    } else {
      onChangePhone(currentNumber)
    }
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e
    switch (name) {
      case 'email':
        setEmail(value)
        break
      case 'password':
        setPassword(value)
        break
      case 'checkPassword':
        setCheckPassword(value)
        break
      case 'userName':
        setUserName(value)
        break
      case 'userNickName':
        setUserNickName(value)
        break
      case 'phoneNumber':
        setPhoneNumber(value)
        break
      default:
        break
    }
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    try {
      const data = await createUserWithEmailAndPassword(auth, email, password)
      const docRef = await addDoc(collection(dbService, 'userInfo'), {
        email: email,
        password: password,
        checkPassword: checkPassword,
        userName: userName,
        userNickName: userNickName,
        phoneNumber: phoneNumber,
        createdAt: new Date(),
        creatorID: auth.currentUser ? auth.currentUser.uid : '',
      })
      setEmail('')
      setPassword('')
      setCheckPassword('')
      setUserName('')
      setUserNickName('')
      setPhoneNumber('')
      navigate('/petinfo')
    } catch (error: any) {
      switch (error.code) {
        case 'auth/invalid-email':
          setErrorMsg('잘못된 이메일 주소입니다.')
          break
        case 'auth/email-already-in-use':
          setErrorMsg('이미 가입되어 있는 계정입니다.')
          break
      }
    }
  }

  return (
    <Container style={'bg-primary-100 justify-center'}>
      <section className="max-w-scr py-6 flex flex-col gap-2.5 justify-center items-center">
        <img src={logoSignUp} alt="logo" className="h-40 w-72" />
        <form
          className="flex flex-col items-center justify-center w-full gap-6 max-w-scr"
          onSubmit={onSubmit}
        >
          <SignUpInput
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            placeholder="이메일"
            required
          />
          <SignUpInput
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={onChangePassword}
            placeholder="비밀번호"
            required
          />
          <p className="-mt-3 text-xs text-left text-primary-300">
            {passwordMessage}
          </p>
          <SignUpInput
            id="checkPassword"
            type="password"
            name="checkPassword"
            value={checkPassword}
            onChange={onChangePasswordConfirm}
            placeholder="비밀번호확인"
            required
          />
          <p className="-mt-3 text-xs text-left text-primary-300">
            {passwordConfirmMessage}
          </p>
          <SignUpInput
            id="userName"
            type="text"
            name="userName"
            value={userName}
            onChange={onChange}
            placeholder="이름"
            required
          />
          <SignUpInput
            id="userNickName"
            type="text"
            name="userNickName"
            value={userNickName}
            onChange={onChange}
            placeholder="닉네임"
            required
          />
          <SignUpInput
            id="phoneNumber"
            type="text"
            name="phoneNumber"
            value={phoneNumber}
            onChange={addHyphen}
            placeholder="전화번호"
            required
          />
          <p className="-mt-3 text-xs text-left text-primary-300">
            {phoneMessage}
          </p>
          <input
            type="submit"
            value="회원가입"
            className="font-bold text-white border-2 border-black border-solid w-85 h-14 bg-primary-200 shadow-100 cursor-pointer"
          />
          {errorMsg && (
            <span className="text-xs text-left text-primary-300">
              {errorMsg}
            </span>
          )}
        </form>
      </section>
    </Container>
  )
}

export default SignUp
