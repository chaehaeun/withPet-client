import React from 'react'
import Comment from 'components/Story/Comment'

const CommentWrap = () => {
  return (
    <div className={'border-t py-5 px-1 flex flex-col gap-5'}>
      <Comment />
      <Comment />
      <Comment />
    </div>
  )
}

export default CommentWrap
