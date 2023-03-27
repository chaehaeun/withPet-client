import React from 'react'

const AppInfo = () => {
  return (
    <section className="max-w-scr mt-9 pl-8">
      <div className="w-full h-12 leading-12 border-solid border-b border-Gray-800">
        <span className="text-base text-Gray-600">개발사</span>
        <span className="ml-9 text-2xs text-Gray-700">(주) 팔랑9</span>
      </div>
      <div className="w-full h-12 leading-12 border-solid border-b border-Gray-800">
        <span className="text-base text-Gray-600">개발자</span>
        <span className="ml-9 text-2xs text-Gray-700">
          김성은 박재석 백승연 이원준 채하은
        </span>
      </div>
      <div className="w-full h-12 leading-12 border-solid border-b border-Gray-800">
        <span className="text-base text-Gray-600">주소</span>
        <span className="ml-9 text-2xs text-Gray-700">
          <a href="https://github.com/PetDiary-team/petdiary-client/wiki">
            https://github.com/PetDiary-team/petdiary-client/wiki
          </a>
        </span>
      </div>
      <p className="mt-5 px-7 text-2xs text-Gray-700">
        본 사이트는 상업적인 목적이 아닌 포트폴리오 용도로 만들어졌습니다.
        홈페이지의 일부 내용과 이미지 등은 출처가 따로 있음을 밝힙니다.
      </p>
    </section>
  )
}

export default AppInfo
