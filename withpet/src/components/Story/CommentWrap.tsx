import React from 'react'
import Comment from 'components/Story/Comment'
import WriteComment from 'components/Story/WriteComment'

type CommentWrapProps = {
  id: number
}

const CommentWrap: React.FC<CommentWrapProps> = ({ id }) => {
  return (
    <div className={'border-t py-5 px-1 flex flex-col gap-5'}>
      <Comment />
      <Comment />
      <Comment />
      <WriteComment id={id} />
    </div>
  )
}

export default CommentWrap
