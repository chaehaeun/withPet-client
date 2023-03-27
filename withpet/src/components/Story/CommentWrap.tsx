import React, { useMemo, useState } from 'react'
import Comment from 'components/Story/Comment'
import WriteComment from 'components/Story/WriteComment'
import { dbService } from 'firebase-config'
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'
import { CommentData } from 'redux/slice/story/storySlice'
import { useSelector } from 'react-redux'
import { RootState } from 'redux/store'

type CommentWrapProps = {
  id: number
}

const CommentWrap: React.FC<CommentWrapProps> = ({ id }) => {
  const [commentList, setCommentList] = useState<CommentData[]>([])
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

  const getNewCommentList = (obj: CommentData) => {
    setCommentList(prev => [...prev, obj])
  }

  const onDelete = (createAt: number) => {
    setCommentList(prev => prev.filter(data => data.createdAt !== createAt))

    const q = query(
      collection(dbService, 'commentInfo'),
      where('createdAt', '==', createAt),
    )

    const deleteComment = async () => {
      try {
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach(async doc => {
          await deleteDoc(doc.ref)
        })
      } catch (error) {
        console.error('댓글을 삭제할 수 없습니다.')
      }
    }

    deleteComment()
  }

  const onEdit = async (createAt: number, newComment: string) => {
    const q = query(
      collection(dbService, 'commentInfo'),
      where('createdAt', '==', createAt),
    )

    try {
      const querySnapshot = await getDocs(q)
      const comment: any = []
      querySnapshot.forEach(doc => {
        comment.push({ ...doc.data(), comment: newComment })
      })

      const commentDocRef = doc(
        dbService,
        'commentInfo',
        querySnapshot.docs[0].id,
      )

      const commentDocSnapshot = await getDoc(commentDocRef)
      if (commentDocSnapshot.exists()) {
        await updateDoc(commentDocRef, {
          comment: newComment,
        })
      }
    } catch (error) {
      console.error('댓글을 수정할 수 없습니다.')
    }
  }

  return (
    <div className={'border-t py-5 px-1 flex flex-col gap-5'}>
      {commentList.map((data, i) => (
        <Comment
          key={i}
          data={data}
          uid={userUid}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
      <WriteComment getNewComment={getNewCommentList} id={id} />
    </div>
  )
}

export default CommentWrap
