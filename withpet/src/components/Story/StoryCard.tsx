import React from 'react'
import StorySwiperImg from 'components/Story/StorySwiperImg'
import StoryWriter from 'components/Story/StoryWriter'
import StoryContent from 'components/Story/StoryContent'
import SubBtn from 'components/Story/SubBtn'
import { DiaryData } from 'router/Story'

type StoryCardProps = {
  data: DiaryData
  key: number
}

const StoryCard: React.FC<StoryCardProps> = ({ data }) => {
  const imgData = {
    id: data.imagesUrl[0].id,
    url: data.imagesUrl[0].url,
  }

  return (
    <article key={data.id} className={'mb-5'}>
      <StorySwiperImg imagesData={data.imagesUrl} />
      <StoryWriter
        DiaryWeather={data.weather}
        userUid={data.user}
        createTime={data.id}
        date={data.date}
        pet={data.pet}
      />
      <StoryContent title={data.title} content={data.text} />
      <SubBtn userUid={data.user} />
    </article>
  )
}

export default StoryCard
