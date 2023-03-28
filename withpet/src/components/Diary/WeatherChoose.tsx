import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getDiary } from 'redux/slice/diary/diarySlice'
import { RootState } from 'redux/store'
import spritesIcon from 'assets/sprites_icon.png'

interface Weather {
  id: string
  position: string
  selectedPosition: string
}

export const WEATHERS: Weather[] = [
  {
    id: 'sunny',
    position: '-133px -140px',
    selectedPosition: '-132px -90px',
  },
  {
    id: 'rainy',
    position: '-90px -143px',
    selectedPosition: '-88px -94px',
  },
  {
    id: 'cloudy',
    position: '-47px -143px',
    selectedPosition: '-44px -94px',
  },
  {
    id: 'stormy',
    position: '-1px -140px',
    selectedPosition: '0 -90px',
  },
  {
    id: 'snowy',
    position: '-177px -139px',
    selectedPosition: '-178px -90px',
  },
]

const WeatherChoose: React.FC = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const diary = useSelector(
    (diaryState: RootState) => diaryState.diary.diaryGroup,
  )
  const [selectedWeather, setSelectedWeather] = useState(WEATHERS[0].id)

  useEffect(() => {
    if (id) {
      setSelectedWeather(diary.weather)
    }
  }, [])

  const handleWeatherSelect = (weather: string) => {
    setSelectedWeather(weather)
    dispatch(getDiary({ ...diary, weather }))
  }

  return (
    <>
      <div className="flex justify-center gap-[34px] items-center w-full h-[70px] bg-Gray-100">
        {WEATHERS.map(weather => (
          <button
            key={weather.id}
            className={`w-[40px] h-[40px] gap-[10px]${
              selectedWeather === weather.id
                ? 'bg-cover bg-no-repeat bg-center cursor-pointer'
                : 'cursor-pointer'
            }`}
            style={{
              backgroundImage: `url(${spritesIcon})`,
              backgroundPosition: `${
                selectedWeather === weather.id
                  ? weather.selectedPosition
                  : weather.position
              }`,
              width: '40px',
              height: '40px',
            }}
            onClick={() => handleWeatherSelect(weather.id)}
            role="button"
            aria-label={`${weather.id} 날씨 선택`}
          />
        ))}
      </div>
    </>
  )
}

export default WeatherChoose
