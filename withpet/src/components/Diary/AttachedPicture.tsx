import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addDiaryImg } from 'redux/slice/diary/diarySlice'
import SwiperPicture from './SwiperPicture'

type AttachedProps = {
  setAlert: React.Dispatch<React.SetStateAction<boolean>>
}

const AttachedPicture: React.FC<AttachedProps> = ({ setAlert }) => {
  const dispatch = useDispatch()
  const [images, setImages] = useState<string[]>([])
  const MAX_UPLOAD_FILES_COUNT = 4

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files: FileList | null = e.target.files
    if (files && !files[0]) return
    if (files && images.length + files.length > MAX_UPLOAD_FILES_COUNT) {
      return setAlert(true)
    }
    if (files) {
      Array.from(files).forEach(file => {
        if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
          const reader = new FileReader()
          reader.onload = async e => {
            const { result } = e.target as FileReader
            const data = result as string
            setImages(prev => [...prev, data])
            dispatch(addDiaryImg({ id: file.name, origin: data }))
          }
          reader.readAsDataURL(file)
        }
      })
    }
  }

  return (
    <>
      <form className="w-full h-10 bg-Gray-100" encType="multipart/form-data">
        <label htmlFor="attach-img" role="button">
          <span className="flex w-full h-full justify-center items-center cursor-pointer">
            + 사진첨부
          </span>
          <input
            id="attach-img"
            type="file"
            multiple
            accept=".jpg, .jpeg, .png, .gif"
            className="hidden"
            onChange={onFileChange}
          />
        </label>
      </form>
      {images[0] ? (
        <SwiperPicture images={images} setImages={setImages} />
      ) : (
        <p className="text-xs mx-auto text-Gray-300">사진 1장은 필수입니다.</p>
      )}
    </>
  )
}

export default AttachedPicture
