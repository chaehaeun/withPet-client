import React from 'react'
import Header from 'components/Header/Header'
import Container from 'components/UI/Container'
import Navigation from 'components/Navigation/Navigation'
import ChangeProfile from 'components/Setting/ChangeProfile'
import Notice from 'components/Setting/Notice'
import DarkMode from 'components/Setting/DarkMode'
import LogOutBtn from 'components/Setting/LogOutBtn'
import UnsubscribingBtn from 'components/Setting/UnsubscribingBtn'
import AppInfo from 'components/Setting/AppInfo'

const Setting = () => {
  return (
    <>
      <Header title={'Setting'} />
      <Container style={'bg-Gray-100 pt-16 px-3.5'}>
        <ChangeProfile />
        <Notice />
        <DarkMode />
        <LogOutBtn />
        <UnsubscribingBtn />
        <AppInfo />
      </Container>
      <Navigation title={'mypage'} />
    </>
  )
}

export default Setting
