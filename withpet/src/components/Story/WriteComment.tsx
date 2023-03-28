import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import { CommentData } from 'redux/slice/story/storySlice'
import { dbService } from 'firebase-config'
import { collection, addDoc, getDocs } from 'firebase/firestore'

type WriteCommentProps = {
  id: number
  getNewComment: (obj: CommentData) => void
}

const WriteComment: React.FC<WriteCommentProps> = ({ id, getNewComment }) => {
  const userUid = useSelector((state: RootState) => state.auth.userUid)
  const [commentValue, setCommentValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const [userImg, setUserImg] = useState('')
  const [userName, setUserName] = useState('')

  const inputValHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentValue(e.target.value)
  }

  const petInfoRef = collection(dbService, 'petInfo')
  useEffect(() => {
    const getUser = async () => {
      try {
        const petSnap = await getDocs(petInfoRef)
        const petData = petSnap.docs.map(doc => doc.data())
        const petResult = petData.filter(item => item.user === userUid)
        setUserImg(petResult[0].petImg)
        setUserName(petResult[0].petName)
      } catch (error) {
        console.error(`사용자 정보를 가져올 수 없습니다. ${error}`)
      }
    }

    getUser()
  }, [])

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const addCommentData = async () => {
      const commentData = {
        comment: commentValue,
        createdAt: Date.now(),
        user: userUid,
        imgUrl: userImg,
        petName: userName,
        DiaryId: id,
      }

      await addDoc(collection(dbService, 'commentInfo'), commentData)
      setCommentValue('')
      getNewComment(commentData)
    }
    addCommentData()
  }

  return (
    <form onSubmit={onSubmitHandler}>
      <fieldset>
        <legend className="sr-only">댓글 작성 폼</legend>
        <div className="relative w-full">
          <label htmlFor="comment" className="sr-only">
            댓글 입력
          </label>
          <input
            required
            id="comment"
            value={commentValue}
            ref={inputRef}
            type={'text'}
            className="w-full p-3 pr-12"
            placeholder={`${userName}(으)로 댓글 달기`}
            onChange={inputValHandler}
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
