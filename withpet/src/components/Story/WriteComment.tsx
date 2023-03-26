import React from 'react'

const WriteComment = () => {
  return (
    <form>
      <fieldset>
        <legend className="sr-only">댓글 작성 폼</legend>
        <div className="relative w-full">
          <label htmlFor="comment" className="sr-only">
            댓글 입력
          </label>
          <input
            id="comment"
            type={'text'}
            className="w-full p-3 "
            placeholder="닉네임(으)로 댓글 달기"
          />
          <button
            type={'submit'}
            className={'absolute right-2 top-1/2 -translate-y-1/2'}
          >
            <svg
              aria-label="전송 버튼 아이콘"
              width="30"
              height="30"
              viewBox="0 0 72 72"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M64 0H8C3.56 0 0 3.6 0 8V64C0 68.4 3.56 72 8 72H64C68.4 72 72 68.4 72 64V8C72 3.6 68.4 0 64 0ZM56 40H40V56H32V40H16V32H32V16H40V32H56V40Z"
                className=" fill-Gray-400"
              />
            </svg>

            <span className="sr-only">전송 버튼</span>
          </button>
        </div>
      </fieldset>
    </form>
  )
}

export default WriteComment
