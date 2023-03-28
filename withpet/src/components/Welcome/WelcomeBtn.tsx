import React from 'react'
import { Link } from 'react-router-dom'

type WelcomeBtnProps = {
  page: string
  style: string
  linkText: string | number
  pointer: string
}

const WelcomeBtn: React.FC<WelcomeBtnProps> = ({
  page,
  style,
  linkText,
  pointer,
}) => {
  return (
    <Link
      to={page}
      className={`h-14 w-[47%] flex justify-center items-center font-black border border-black shadow-100 duration-200 hover:bg-Gray-400 focus:bg-Gray-400 ${style} ${pointer}`}
    >
      {linkText}
    </Link>
  )
}

export default WelcomeBtn
