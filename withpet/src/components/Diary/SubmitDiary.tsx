import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from 'redux/store'
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'
import { storageService } from 'firebase-config'
import { dbService } from 'firebase-config'
import { resetDiary } from 'redux/slice/diary/diarySlice'
import logoSprite from 'assets/sprites_icon.png'
import moment from 'moment'
import 'moment/locale/ko'

const SubmitDiary: React.FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userUid = useSelector((state: RootState) => state.auth.userUid)
  const diary = useSelector(
    (diaryState: RootState) => diaryState.diary.diaryGroup,
  )
  const imgGroup = useSelector(
    (diaryState: RootState) => diaryState.diary.imgGroup,
  )
  const [able, setAble] = useState<boolean>(true)

  useEffect(() => {
    if (id) {
      if (diary.pet === '' || diary.text === '' || diary.title === '') {
        setAble(true)
      } else {
        setAble(false)
      }
    } else {
      if (
        diary.pet === '' ||
        diary.text === '' ||
        diary.title === '' ||
        imgGroup[0].id === ''
      ) {
        setAble(true)
      } else {
        setAble(false)
      }
    }
  }, [diary])

  const onSubmit = async () => {
    if (id) {
      const editRef = doc(dbService, 'diaryInfo', `${id}`)
      await updateDoc(editRef, {
        check: diary.check,
        date: diary.date,
        pet: diary.pet,
        text: diary.text,
        title: diary.title,
        weather: diary.weather,
      })
      dispatch(resetDiary())
      navigate('/story')
    } else {
      const createTime = moment().format('YYYYMMDDHHmmss')

      const imageGroupPromises = imgGroup.map(file => {
        const imgName = file.id
        const imagesRef = ref(storageService, `diaryImg/${userUid}/${imgName}`)

        return uploadString(imagesRef, file.origin, 'data_url')
          .then(response => getDownloadURL(response.ref))
          .then(imgUrl => ({ id: imgName, url: imgUrl }))
      })

      Promise.all(imageGroupPromises)
        .then(imageUrls => ({
          ...diary,
          user: userUid,
          createTime: createTime,
          id: new Date().getTime(),
          imagesUrl: imageUrls,
        }))
        .then(diaryInfoObj => {
          addDoc(collection(dbService, 'diaryInfo'), diaryInfoObj)
        })
        .catch(error => {
          console.error('Error adding document:', error)
        })
        .finally(() => {
          dispatch(resetDiary())
          navigate('/story')
        })
    }
  }

  return (
    <>
      <button
        type="submit"
        onClick={onSubmit}
        disabled={able}
        aria-label="전송 버튼"
      >
        <div
          className="w-8 h-8"
          style={{
            backgroundImage: `url(${logoSprite})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: able ? '-39px -264px' : '0 -264px',
          }}
        />
      </button>
    </>
  )
}

export default SubmitDiary
