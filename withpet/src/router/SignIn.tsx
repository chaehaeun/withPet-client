import React, { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import SignInHead from 'assets/Logo/signInLogo.webp'
import Container from 'components/UI/Container'
import SignInInput from 'components/SignIn/SignInInput'
import LinkButton from 'components/UI/LinkButton'
import SignInLink from 'components/SignIn/SignInLink'
import SocialLogin from 'components/SignIn/SocialLogin'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { authAction } from '../redux/slice/user/auth-slice'
import CustomModal from 'components/UI/CustomModal'

const SignIn = () => {
  const [idValue, setIdValue] = useState('')
  const [pwValue, setPwValue] = useState('')
  const [isChecked, setIsChecked] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const getIdVal = useCallback((value: string): void => {
    setIdValue(value)
  }, [])
  const getPwVal = useCallback((value: string): void => {
    setPwValue(value)
  }, [])

  const login = useCallback(async (): Promise<void> => {
    const auth = getAuth()
    try {
      await signInWithEmailAndPassword(auth, idValue, pwValue)
      dispatch(authAction.login())
      navigate('/mypage')
    } catch (error) {
      setIsChecked(true)
    }
  }, [idValue, navigate, pwValue])

  const btnIsValid: boolean =
    pwValue.trim().length >= 6 && idValue.includes('@')

  return (
    <Container style={'bg-primary-100 justify-center'}>
      <img src={SignInHead} alt="로그인" className="block mx-auto" />
      <form>
        <fieldset>
          <legend className="sr-only">로그인 입력 폼</legend>
          <div className={'flex flex-col gap-4 mt-5'}>
            <SignInInput
              type={'text'}
              id={'userID'}
              label={'이메일'}
              inputValHandler={getIdVal}
            />
            <SignInInput
              type={'password'}
              id={'userPW'}
              label={'비밀번호'}
              inputValHandler={getPwVal}
            />
          </div>
          <p
            className={`mt-2 ml-2 text-xs font-bold text-primary-300 ${
              !isChecked ? 'hidden' : ''
            }`}
          >
            이메일과 비밀번호가 일치하지 않습니다.
          </p>
        </fieldset>
      </form>
      <LinkButton
        type={'button'}
        text={'로그인'}
        onClick={login}
        isValid={btnIsValid}
      />
      <SocialLogin />
      <SignInLink to={'/signup'} text={'회원가입'} />
      <SignInLink to={'/'} text={'아이디/비밀번호 찾기'} />
      {/* <CustomModal
        message={'유효한 값을 입력해주세요.'}
        left={'확인'}
        right={'취소'}
        ea={1}
      /> */}
    </Container>
  )
}

export default SignIn
