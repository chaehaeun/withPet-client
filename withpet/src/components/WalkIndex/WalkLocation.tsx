import spritesIcon from 'assets/sprites_icon.png'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getWalkLoading } from 'redux/slice/walkIndex/walkIndexSlice'
import { RootState } from 'redux/store'

const WalkLocation = () => {
  const [current, setCurrent] = useState<string>('')
  const loca = useSelector(
    (walkState: RootState) => walkState.walk.walkLocation,
  )
  const loading = useSelector(
    (walkState: RootState) => walkState.walk.walkLoading,
  )

  const dispatch = useDispatch()
  const currentLocation = async (lat: string, lon: string) => {
    try {
      const url = new URL(
        `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lon}&y=${lat}&input_coord=WGS84`,
      )
      dispatch(getWalkLoading(true))

      const response = await fetch(url, {
        headers: {
          Authorization: `KakaoAK ${process.env.REACT_APP_REST_API}`,
        },
      })
      const data = await response.json()
      const reg1 = data.documents[0].address.region_1depth_name
      const reg2 = data.documents[0].address.region_2depth_name
      const reg3 = data.documents[0].address.region_3depth_name
      setCurrent(`${reg1} ${reg2} ${reg3}`)
      dispatch(getWalkLoading(false))
    } catch (err: any) {
      console.error(err.message)
    }
  }

  useEffect(() => {
    currentLocation(loca.lat, loca.lng)
  }, [])

  return (
    <>
      {loading ? (
        ''
      ) : (
        <div className="flex justify-center items-center mb-20">
          <div
            style={{
              backgroundImage: `url(${spritesIcon})`,
              backgroundPosition: '-79px -402px',
              width: '12px',
              height: '16px',
              marginRight: '16px',
            }}
          ></div>
          <p className="text-white text-xl font-medium">{current}</p>
        </div>
      )}
    </>
  )
}

export default WalkLocation
