import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateDiaryImg } from 'redux/slice/diary/diarySlice'
import { RootState } from 'redux/store'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'

type SwiperProps = {
  images: string[]
  setImages: React.Dispatch<React.SetStateAction<string[]>>
}

const SwiperPicture: React.FC<SwiperProps> = ({
  images,
  setImages,
}): JSX.Element => {
  const imgList = useSelector(
    (diaryState: RootState) => diaryState.diary.imgGroup,
  )
  const dispatch = useDispatch()

  const onFileClear = async (url: string) => {
    const reImgArr = images.filter(el => el !== url)
    setImages([...reImgArr])
    imgList.forEach(() => dispatch(updateDiaryImg(url)))
  }

  return (
    <>
      <Swiper
        slidesPerView={2}
        spaceBetween={11}
        autoplay={false}
        loop={false}
        centeredSlides={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className={`w-full ${images.length > 0 ? 'h-[228.5px]' : 'h-0'}`}
      >
        {images &&
          images?.map((url, index) => (
            <SwiperSlide
              className="w-full h-full flex justify-center items-center relative"
              key={index}
            >
              <img
                src={url?.replace(/'/g, '')}
                key={index}
                className="object-cover w-full h-full text-center mx-auto"
                alt={`${index}번째 사진`}
              />
              <button
                className="absolute top-2 right-2 w-3 h-3 bg-sprites_icon cursor-pointer bg-[left_-55px_top_-404px]"
                onClick={() => onFileClear(url)}
                type="submit"
                aria-label="삭제 버튼"
              ></button>
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  )
}

export default SwiperPicture
