import React, { useEffect } from 'react'
import dogFace from 'assets/sprites_face.png'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'redux/store'
import {
  getWalkLoading,
  getWalkGroup,
} from 'redux/slice/walkIndex/walkIndexSlice'
import { PropagateLoader } from 'react-spinners'

const WalkAirQuality = () => {
  const walk = useSelector((walkState: RootState) => walkState.walk.walkGroup)
  const loading = useSelector(
    (walkState: RootState) => walkState.walk.walkLoading,
  )
  const AIR = useSelector((walkState: RootState) => walkState.walk.walkAirIndex)
  const aqi = useSelector(
    (walkState: RootState) => walkState.walk.walkSMCARD[2].count,
  )
  const dispatch = useDispatch()

  const AirLevel = (aqi: number) => {
    if (0 <= aqi && aqi <= 15) {
      return dispatch(getWalkGroup(AIR[0]))
    } else if (15 < aqi && aqi <= 30) {
      return dispatch(getWalkGroup(AIR[1]))
    } else if (30 < aqi && aqi <= 40) {
      return dispatch(getWalkGroup(AIR[2]))
    } else if (40 < aqi && aqi <= 50) {
      return dispatch(getWalkGroup(AIR[3]))
    } else if (50 < aqi && aqi <= 75) {
      return dispatch(getWalkGroup(AIR[4]))
    } else if (75 < aqi && aqi <= 100) {
      return dispatch(getWalkGroup(AIR[5]))
    } else if (100 < aqi && aqi <= 150) {
      return dispatch(getWalkGroup(AIR[6]))
    } else if (150 < aqi) {
      return dispatch(getWalkGroup(AIR[7]))
    }
  }

  useEffect(() => {
    AirLevel(aqi)
    if (aqi > 0) {
      dispatch(getWalkLoading(false))
    }
  }, [aqi])

  return (
    <>
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
        <div
          style={{
            backgroundImage: `url(${dogFace})`,
            backgroundPosition: walk.position,
            width: '200px',
            height: '200px',
            marginTop: '30px',
            marginBottom: '30px',
            flexShrink: 0,
          }}
        ></div>
      )}
    </>
  )
}

export default WalkAirQuality
