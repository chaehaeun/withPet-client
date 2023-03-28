import spritesIcon from 'assets/sprites_icon.png'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import {
  getWalkWeather,
  updateTemp,
  updateRain,
  updateAir,
} from 'redux/slice/walkIndex/walkIndexSlice'
import { PropagateLoader } from 'react-spinners'

interface walkProps {
  lat: string
  lng: string
}

const WalkSmallCard: React.FC<walkProps> = ({ lat, lng }) => {
  const weather = useSelector(
    (walkState: RootState) => walkState.walk.walkWeather,
  )
  const loading = useSelector(
    (walkState: RootState) => walkState.walk.walkLoading,
  )
  const SMCARD = useSelector(
    (walkState: RootState) => walkState.walk.walkSMCARD,
  )
  const dispatch = useDispatch()

  const currentWeather = async (lat: string, lon: string) => {
    try {
      const url = new URL(
        `https://api.openweathermap.org/data/2.5/weather?lang=kr&units=metric&lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API}`,
      )
      const response = await fetch(url)
      const data = await response.json()
      const temp = Math.floor(data.main.temp)
      const rain = data.rain === undefined ? 0 : data.rain[0][0]
      dispatch(getWalkWeather({ ...weather, temp, rain }))
      dispatch(updateTemp(temp))
      dispatch(updateRain(rain))
    } catch (error) {
      console.error(error)
    }
  }

  const currentAirQuality = async (lat: string, lon: string) => {
    try {
      const url = new URL(
        `https://api.waqi.info/feed/geo:${lat};${lon}/?token=${process.env.REACT_APP_AIRQUALITY_API}`,
      )
      const response = await fetch(url)
      const data = await response.json()
      const airQuality = data.data.aqi
      dispatch(updateAir(airQuality))
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (lat && lng) {
      currentWeather(lat, lng)
      currentAirQuality(lat, lng)
    }
  }, [lat, lng])

  return (
    <div className="w-full flex flex-row justify-center gap-6 mt-20">
      {loading ? (
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
      ) : (
        SMCARD.map((data, idx) => (
          <div
            className="bg-white w-[96px] flex flex-col items-center justify-center rounded-xl p-4 "
            key={idx}
          >
            <div
              className="shrink-0"
              aria-hidden
              style={{
                backgroundImage: `url(${spritesIcon})`,
                backgroundPosition: `${data.position}`,
                width: `${data.width}`,
                height: `${data.height}`,
                marginBottom: '8px',
              }}
            ></div>
            <h3 className="grow text-center">{data.title}</h3>
            <p className="shrink-0 text-center ">
              {data.count}
              {data.unit}
            </p>
          </div>
        ))
      )}
    </div>
  )
}

export default WalkSmallCard
