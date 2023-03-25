import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import Header from 'components/Header/Header'
import Container from 'components/UI/Container'
import Navigation from 'components/Navigation/Navigation'
import WalkSmallCard from 'components/WalkIndex/WalkSmallCard'
import WalkLocation from 'components/WalkIndex/WalkLocation'
import WalkAirQuality from 'components/WalkIndex/WalkAirQuality'
import { PropagateLoader } from 'react-spinners'

const WalkIndex = () => {
  const walk = useSelector((walkState: RootState) => walkState.walk.walkGroup)
  const loading = useSelector(
    (walkState: RootState) => walkState.walk.walkLoading,
  )

  return (
    <>
      <Header title={'WalkIndex'} />
      <Container
        style={`${walk.color} pt-16 flex flex-col items-center justify-center`}
      >
        <PropagateLoader
          color="#FAEFE9"
          size={15}
          loading={loading}
          cssOverride={{
            position: 'absolute',
            top: '50%',
            left: '50%',
          }}
        />
        <WalkLocation />
        <WalkAirQuality />
        <h2 className="text-white text-[40px] font-bold">{walk.desc}</h2>
        <WalkSmallCard />
      </Container>
      <Navigation title={'walkindex'} />
    </>
  )
}

export default WalkIndex
