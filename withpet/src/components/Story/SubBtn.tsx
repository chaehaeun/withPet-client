import React, { useMemo, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from 'redux/store'
import { dbService } from 'firebase-config'
import { CommentData } from 'redux/slice/story/storySlice'
import { getDiary } from 'redux/slice/diary/diarySlice'
import {
  collection,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  where,
  query,
} from 'firebase/firestore'

type SubBtnProps = {
  userUid: string
  id: number
  onDelete: ((id: number) => void) | null
}

const SubBtn: React.FC<SubBtnProps> = ({ userUid, id, onDelete }) => {
  const [like, setLike] = useState(false)
  const [docId, setDocId] = useState<string>('')
  const currentUserUid = useSelector((state: RootState) => state.auth.userUid)
  const [commentNum, setCommentNum] = useState(0)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const likeBtnHandler = () => {
    setLike(prev => !prev)
  }

  useMemo(() => {
    const getDocId = async () => {
      try {
        const diaryQuery = query(
          collection(dbService, 'diaryInfo'),
          where('id', '==', id),
        )
        const querySnapshot = await getDocs(diaryQuery)
        querySnapshot.forEach(doc => {
          setDocId(doc.id)
        })

        const commentQuery = query(
          collection(dbService, 'commentInfo'),
          where('DiaryId', '==', id),
        )
        const commentSnapshot = await getDocs(commentQuery)
        const commentResult = commentSnapshot.docs.map(doc =>
          doc.data(),
        ) as CommentData[]

        setCommentNum(commentResult.length)
      } catch (error) {
        console.error(error)
      }
    }
    getDocId()
  }, [id])

  const delDoc = async () => {
    if (!docId) return
    const docRef = doc(dbService, 'diaryInfo', docId)
    await deleteDoc(docRef)
    if (onDelete !== null) onDelete(id)
    navigate('/story')
  }

  const editDoc = async () => {
    const editInfo = await getDoc(doc(dbService, 'diaryInfo', docId))
    dispatch(getDiary(editInfo.data()))
    navigate(`/diary/${docId}`)
  }

  return (
    <div className={'border border-x-0 border-b-0 flex justify-between px-1'}>
      <div className={'py-1 flex gap-3'}>
        <button
          className={'flex items-center p-1'}
          type={'button'}
          onClick={likeBtnHandler}
        >
          <svg
            aria-label="좋아요 버튼"
            width="17"
            height="16"
            viewBox="0 0 17 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className={` duration-100 ${
                like ? 'fill-primary-300 ' : '#000'
              }  `}
              d="M8.33333 15.2917L7.125 14.1917C2.83333 10.3 0 7.73333 0 4.58333C0 2.01667 2.01667 0 4.58333 0C6.03333 0 7.425 0.675 8.33333 1.74167C9.24167 0.675 10.6333 0 12.0833 0C14.65 0 16.6667 2.01667 16.6667 4.58333C16.6667 7.73333 13.8333 10.3 9.54167 14.2L8.33333 15.2917Z"
              fill="black"
            />
          </svg>

          <span className={'ml-1'} aria-label="좋아요 개수">
            {1}
          </span>
        </button>
        <button
          className={'p-1'}
          type={'button'}
          onClick={() => navigate(`/story/${id}`)}
        >
          댓글
          <span className={'ml-1'} aria-label="댓글 개수">
            {commentNum}
          </span>
        </button>
        <button className={'p-1 cursor-not-allowed'} type={'button'}>
          공유
        </button>
      </div>
      <div
        className={`py-1 flex gap-3 ${
          userUid === currentUserUid ? '' : 'hidden'
        } `}
      >
        <button className={'p-1'} type={'button'} onClick={editDoc}>
          수정
        </button>
        <button className={'p-1'} type={'button'} onClick={delDoc}>
          삭제
        </button>
      </div>
    </div>
  )
}

export default SubBtn
