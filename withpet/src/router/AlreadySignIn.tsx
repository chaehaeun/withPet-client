import React from 'react'
import { useNavigate } from 'react-router-dom'
import Container from 'components/UI/Container'
import LinkButton from 'components/UI/LinkButton'

const AlreadySignIn = () => {
  const navigate = useNavigate()

  return (
    <Container style={'bg-primary-100 justify-center'}>
      <p className={'text-center font-extrabold text-xl'}>
        이미 로그인 되어있습니다!
      </p>
      <LinkButton
        type={'button'}
        text={'홈으로 가기'}
        onClick={() => navigate('/story')}
        isValid={true}
      />
    </Container>
  )
}

export default AlreadySignIn
