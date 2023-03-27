import React, { useState } from 'react'
import logoSprite from 'assets/sprites_icon.png'

const DarkMode = () => {
  const [allowDark, setAllowDark] = useState<boolean>(true)

  const toggleNotice = () => {
    setAllowDark(prev => !prev)
  }

  return (
    <>
      <section className="max-w-scr mt-5 px-6 flex flex-row flex-nowrap justify-between content-center">
        <span className="text-base font-bold">다크 모드</span>
        <button
          type="button"
          onClick={toggleNotice}
          aria-label="다크 모드 버튼"
        >
          <div
            className="w-11 h-6"
            style={{
              backgroundImage: `url(${logoSprite})`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: allowDark ? '-1px -231px' : '-52px -231px',
            }}
          />
        </button>
      </section>
    </>
  )
}

export default DarkMode
