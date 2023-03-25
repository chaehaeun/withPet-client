import React, { useEffect, useRef, useState } from 'react'

type StoryContentProps = {
  title: string
  content: string
}

const StoryContent: React.FC<StoryContentProps> = ({ content, title }) => {
  const [more, setMore] = useState(false)
  const moreBtn = useRef<HTMLButtonElement | null>(null)
  const pContent = useRef<HTMLParagraphElement | null>(null)
  const [numP, setNumP] = useState(0)

  const moreBtnHandler = () => {
    setMore(prev => !prev)
    if (!more && moreBtn.current)
      (moreBtn.current as HTMLElement).scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
  }

  useEffect(() => {
    if (pContent.current && pContent.current !== null) {
      const text = pContent.current.textContent ?? ''
      setNumP(text.length)
    }
  }, [])

  return (
    <section className={'mt-3 p-1'}>
      <h2 className={' text-xl font-bold leading-6 '}>{title}</h2>
      <p ref={pContent} className={`my-3 ${more ? '' : 'line-clamp-2'} `}>
        {content}
      </p>
      <button
        type={'button'}
        onClick={moreBtnHandler}
        ref={moreBtn}
        className={`block mx-auto text-sm p-1 mb-3 text-Gray-300 font-semibold ${
          numP <= 65 ? 'hidden' : ''
        }`}
      >
        {more ? '숨기기' : '더보기'}
      </button>
    </section>
  )
}

export default StoryContent
