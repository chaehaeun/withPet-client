import React from 'react'
import Comment from 'components/Story/Comment'
import WriteComment from 'components/Story/WriteComment'

const CommentWrap = () => {
  return (
    <div className={'border-t py-5 px-1 flex flex-col gap-5'}>
      <Comment />
      <Comment />
      <Comment />
      <WriteComment />
    </div>
  )
}

export default CommentWrap
