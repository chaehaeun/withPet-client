import React, { useState } from 'react'
import logoSprite from 'assets/sprites_icon.png'

const Notice = () => {
  const [allowNotice, setAllowNotice] = useState<boolean>(true)

  const toggleNotice = () => {
    setAllowNotice(prev => !prev)
  }

  return (
    <>
      <section className="max-w-scr mt-5 px-6 flex flex-row flex-nowrap justify-between content-center">
        <span className="text-base font-bold">PUSH 알림설정</span>
        <button
          type="button"
          onClick={toggleNotice}
          aria-label="알림 허용 버튼"
        >
          <div
            className="w-11 h-6"
            style={{
              backgroundImage: `url(${logoSprite})`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: allowNotice ? '-1px -231px' : '-52px -231px',
            }}
          />
        </button>
      </section>
    </>
  )
}

export default Notice
