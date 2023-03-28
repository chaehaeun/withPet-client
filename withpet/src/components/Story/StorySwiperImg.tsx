import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, A11y } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'

type StorySwiperProps = {
  imagesData: { id: string; origin: string; url: string }[]
}

const StorySwiperImg: React.FC<StorySwiperProps> = ({ imagesData }) => {
  return (
    <Swiper
      modules={[Pagination, A11y]}
      pagination={{
        clickable: true,
        type: 'fraction',
      }}
      slidesPerView={1}
    >
      {imagesData.map((img, i) => (
        <SwiperSlide key={i}>
          <div
            className={
              'relative w-full after:block after:content-[" "] after:pb-[100%] bg-slate-600'
            }
          >
            <img
              className={'absolute top-0 left-0 w-full h-full object-cover'}
              src={img.url}
              alt={img.id}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default StorySwiperImg
