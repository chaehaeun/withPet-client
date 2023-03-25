import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import Header from 'components/Header/Header'
import Container from 'components/UI/Container'
import Navigation from 'components/Navigation/Navigation'
import WalkSmallCard from 'components/WalkIndex/WalkSmallCard'
import WalkLocation from 'components/WalkIndex/WalkLocation'
import WalkAirQuality from 'components/WalkIndex/WalkAirQuality'

interface locationType {
  loaded: boolean
  coordinates?: { lat: number; lng: number }
  error?: { code: number; message: string }
}

const WalkIndex = () => {
  const [location, setLocation] = useState<locationType>({
    loaded: false,
    coordinates: { lat: 0, lng: 0 },
  })
  const walk = useSelector((walkState: RootState) => walkState.walk.walkGroup)

  const onSuccess = (location: {
    coords: { latitude: number; longitude: number }
  }) => {
    setLocation({
      loaded: true,
      coordinates: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      },
    })
  }
  const onError = (error: { code: number; message: string }) => {
    setLocation({
      loaded: true,
      error,
    })
  }

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      onError({
        code: 0,
        message: 'Geolocation not supported',
      })
    }
    navigator.geolocation.getCurrentPosition(onSuccess, onError)
  }, [])

  return (
    <>
      <Header title={'WalkIndex'} />
      <Container
        style={`${walk.color} pt-16 flex flex-col items-center justify-center`}
      >
        {location.coordinates?.lat !== 0 && (
          <WalkLocation
            lat={`${location.coordinates?.lat}`}
            lng={`${location.coordinates?.lng}`}
          />
        )}
        {location.coordinates?.lat !== 0 && <WalkAirQuality />}
        {location.coordinates?.lat !== 0 && (
          <h2 className="text-white text-[40px] font-bold">{walk.desc}</h2>
        )}
        {location.coordinates?.lat !== 0 && (
          <WalkSmallCard
            lat={`${location.coordinates?.lat}`}
            lng={`${location.coordinates?.lng}`}
          />
        )}
      </Container>
      <Navigation title={'walkindex'} />
    </>
  )
}

export default WalkIndex
