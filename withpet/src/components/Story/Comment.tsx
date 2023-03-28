import React, { useEffect, useState } from 'react'
import { CommentData } from 'redux/slice/story/storySlice'

type CommentProps = {
  data: CommentData
  uid: string
  onDelete: (createAt: number) => void
  onEdit: (createAt: number, newComment: string) => void
}

const Comment: React.FC<CommentProps> = ({ data, uid, onDelete, onEdit }) => {
  const [time, setTime] = useState('')
  const [isEdit, setIsEdit] = useState(false)
  const [localComment, setLocalComment] = useState(data.comment)
  const [comment, setComment] = useState(data.comment)
  const txtRef = React.useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const displayCreatedAt = () => {
      const time = Date.now() - data.createdAt
      if (time < 60000) {
        return setTime('방금 전')
      }
      if (3600000 > time && time > 60000) {
        return setTime(`${Math.floor((time / (1000 * 60)) % 60)}분 전`)
      }
      if (time < 86400000) {
        return setTime(`${Math.floor((time / (1000 * 60 * 60)) % 24)}시간 전`)
      }
      if (time > 86400000) {
        const date = new Date(data.createdAt)
        const createdDate = `${date.getFullYear()}년 ${date.getMonth()}월 ${date.getDate()}일`

        return setTime(createdDate)
      }
    }
    displayCreatedAt()
  }, [])

  const onDeleteHandler = () => {
    onDelete(data.createdAt)
  }

  const toggleIsEdit = () => {
    setIsEdit(prev => !prev)
  }

  const handleQuitEdit = () => {
    setIsEdit(prev => !prev)
    setLocalComment(comment)
  }

  const handleEdit = () => {
    onEdit(data.createdAt, localComment)
    toggleIsEdit()
    setComment(localComment)
  }

  return (
    <div className={'flex border-b pb-5 w-full'}>
      <div
        className={
          'w-14 h-14 mr-3 rounded-full bg-sprites_icon bg-[left_0px_top_-429px] overflow-hidden shrink-0'
        }
      >
        <img
          className={'object-cover h-full w-full'}
          src={data.imgUrl}
          alt={`${data.petName} 프로필 이미지`}
        />
      </div>
      <div className={'flex flex-col gap-1 grow'}>
        <div className="flex flex-row justify-between">
          <div className={'flex items-center'}>
            <span className={'mr-2 font-bold'}>{data.petName}</span>
            <span className={' text-xs'}>{time}</span>
          </div>
          <div className={`flex gap-2 ${uid === data.user ? '' : 'hidden'}`}>
            {isEdit ? (
              <>
                <button onClick={handleEdit} type={'button'}>
                  완료
                </button>
                <button onClick={handleQuitEdit} type={'button'}>
                  취소
                </button>
              </>
            ) : (
              <>
                <button type={'button'} onClick={toggleIsEdit}>
                  수정
                </button>
                <button onClick={onDeleteHandler} type={'button'}>
                  삭제
                </button>
              </>
            )}
          </div>
        </div>

        {isEdit ? (
          <>
            <label className="hidden" htmlFor="commentTxt">
              댓글 수정
            </label>
            <textarea
              id="commentTxt"
              value={localComment}
              ref={txtRef}
              onChange={e => setLocalComment(e.target.value)}
            ></textarea>
          </>
        ) : (
          <p>{comment}</p>
        )}
      </div>
    </div>
  )
}

export default Comment
