import React from 'react'
import Header from 'components/Header/Header'
import Container from 'components/UI/Container'
import Navigation from 'components/Navigation/Navigation'
import MyPageSection from 'components/MyPage/MyPageSection'
import MyPageMyPet from 'components/MyPage/MyPageMyPet'
import MyPageAddBtn from 'components/MyPage/MyPageAddBtn'
import MyPageCalendar from 'components/MyPage/MyPageCalendar'

const MyPage = () => {
  return (
    <>
      <Header title={'MyPage'} />
      <Container style={'bg-primary-100 pt-16'}>
        <MyPageSection text="나의 반려동물">
          <MyPageMyPet />
          <MyPageAddBtn />
        </MyPageSection>
        <MyPageSection text="히스토리">
          <MyPageCalendar />
        </MyPageSection>
      </Container>
      <Navigation title={'mypage'} />
    </>
  )
}

export default MyPage
