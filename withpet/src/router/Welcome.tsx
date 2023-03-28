import React, { useEffect, useState } from 'react'
import WelcomeBtn from 'components/Welcome/WelcomeBtn'
import withPetLogo from 'assets/Logo/welcomeLogo.webp'
import Container from 'components/UI/Container'

const Welcome: React.FC = () => {
  const [logoOpacity, setLogoOpacity] = useState('opacity-0')
  const [btnOpacity, setBtnOpacity] = useState('opacity-0')
  const [logoY, setLogoY] = useState('translate-y-10')
  const [btnPointer, setBtnPointer] = useState('pointer-events-none')

  useEffect(() => {
    setTimeout(() => {
      setLogoOpacity('opacity-100')
    }, 500)
    setTimeout(() => {
      setLogoY('-translate-y-5')
    }, 2000)
    setTimeout(() => {
      setBtnOpacity('opacity-100')
      setBtnPointer('')
    }, 2500)
  }, [])

  const btnContainer = (
    <div
      className={`flex justify-around  transition-all delay-300 ease-in ${btnOpacity}`}
    >
      <WelcomeBtn
        pointer={btnPointer}
        page={'/signin'}
        style={'bg-primary-200 text-white'}
        linkText={'로그인'}
      />
      <WelcomeBtn
        pointer={btnPointer}
        page={'/signup'}
        style={'bg-white hover:text-white focus:text-white'}
        linkText={'회원가입'}
      />
    </div>
  )

  return (
    <Container style={'bg-primary-100 justify-center'}>
      <img
        src={withPetLogo}
        alt="윗펫 로고"
        className={`block mx-auto transition-all  delay-300 ease-in ${logoOpacity} ${logoY}`}
      />
      {btnContainer}
    </Container>
  )
}

export default Welcome
