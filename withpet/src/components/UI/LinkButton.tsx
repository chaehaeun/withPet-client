import React from 'react'

type BtnProps = {
  text: string | number
  type: 'button' | 'submit' | 'reset' | undefined
  onClick: (() => void) | (() => Promise<void>)
  isValid: boolean
}

const LinkButton: React.FC<BtnProps> = ({ text, type, onClick, isValid }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={
        'h-14 w-full text-white flex justify-center items-center font-black border border-black shadow-100 bg-primary-200 mt-5 hover:bg-Gray-400 focus:bg-Gray-400 duration-200 disabled:bg-Gray-300'
      }
      disabled={!isValid}
    >
      {text}
    </button>
  )
}

export default LinkButton
