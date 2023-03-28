import React from 'react'
import { Link } from 'react-router-dom'

type LinkProps = {
  text: string
  to: string
}

const SignInLink: React.FC<LinkProps> = ({ text, to }) => {
  return (
    <div className="mb-2 text-center">
      <Link
        to={to}
        className={
          'relative text-center text-primary-200 after:content-[" "] after:absolute after:w-full after:h-[1px] after:bg-primary-200 after:-bottom-[2px] after:left-0'
        }
      >
        {text}
      </Link>
    </div>
  )
}

export default SignInLink
