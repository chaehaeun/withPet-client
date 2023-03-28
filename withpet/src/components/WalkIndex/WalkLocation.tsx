import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'redux/store'
import { PropagateLoader } from 'react-spinners'
import { getWalkLoading } from 'redux/slice/walkIndex/walkIndexSlice'
import spritesIcon from 'assets/sprites_icon.png'
interface walkProps {
  lat: string
  lng: string
}

const WalkLocation: React.FC<walkProps> = ({ lat, lng }) => {
  const [current, setCurrent] = useState<string>('')
  const loading = useSelector(
    (walkState: RootState) => walkState.walk.walkLoading,
  )
  const dispatch = useDispatch()

  const currentLocation = async (lat: string, lng: string) => {
    const url = new URL(
      `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lng}&y=${lat}&input_coord=WGS84`,
    )
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
  }

  useEffect(() => {
    if (lat !== undefined && lng !== undefined) {
      currentLocation(lat, lng)
    } else {
      dispatch(getWalkLoading(true))
    }
  }, [lat, lng])

  return (
    <>
      {loading ? (
        <PropagateLoader
          color="#F6615A"
          size={15}
          loading={loading}
          cssOverride={{
            position: 'absolute',
            top: '50%',
            left: '50%',
          }}
        />
      ) : (
        <div className="flex justify-center items-center mb-20">
          <div
            aria-hidden
            style={{
              backgroundImage: `url(${spritesIcon})`,
              backgroundPosition: '-79px -402px',
              width: '12px',
              height: '16px',
              marginRight: '16px',
            }}
          ></div>
          <p
            className="text-white text-xl font-medium"
            role="textbox"
            aria-label="현재 위치"
          >
            {current}
          </p>
        </div>
      )}
    </>
  )
}

export default WalkLocation
