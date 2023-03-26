import React from 'react'

const Comment = () => {
  return (
    <div className={'flex border-b pb-5 w-full'}>
      <div
        className={
          'w-14 h-14 mr-3 rounded-full bg-sprites_icon bg-[left_0px_top_-429px] overflow-hidden shrink-0'
        }
      >
        <img className={'object-cover h-full w-full'} src={''} alt={''} />
      </div>
      <div className={'flex flex-col gap-1 grow'}>
        <div className="flex flex-row justify-between">
          <div className={'flex items-center'}>
            <span className={'mr-2 font-bold'}>채하은</span>
            <span className={' text-xs'}>2분 전</span>
          </div>
          <div className={'flex gap-2'}>
            <button type={'button'}>수정</button>
            <button type={'button'}>삭제</button>
          </div>
        </div>
        <p>좋은 글이네요!</p>
      </div>
    </div>
  )
}

export default Comment
