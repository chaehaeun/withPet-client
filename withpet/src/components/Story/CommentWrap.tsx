import React, { useEffect, useMemo, useState } from 'react'
import Comment from 'components/Story/Comment'
import WriteComment from 'components/Story/WriteComment'
import { dbService } from 'firebase-config'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { CommentData } from 'redux/slice/story/storySlice'
import { useSelector } from 'react-redux'
import { RootState } from 'redux/store'

type CommentWrapProps = {
  id: number
}

const CommentWrap: React.FC<CommentWrapProps> = ({ id }) => {
  const [commentList, setCommentList] = useState<CommentData[]>([])
  // const commentInfoRef = collection(dbService, 'commentInfo')
  const userUid = useSelector((state: RootState) => state.auth.userUid)

  useMemo(() => {
    const getComment = async () => {
      try {
        const commentQuery = query(
          collection(dbService, 'commentInfo'),
          where('DiaryId', '==', id),
        )
        const querySnapshot = await getDocs(commentQuery)
        const commentResult = querySnapshot.docs.map(doc =>
          doc.data(),
        ) as CommentData[]
        commentResult.sort((a, b) => a.createdAt - b.createdAt)
        setCommentList(commentResult)
      } catch (error) {
        console.error('댓글을 가져올 수 없습니다.')
      }
    }

    getComment()
  }, [id])

  return (
    <div className={'border-t py-5 px-1 flex flex-col gap-5'}>
      {commentList.map((data, i) => (
        <Comment key={i} data={data} uid={userUid} />
      ))}
      <WriteComment id={id} />
    </div>
  )
}

export default CommentWrap
