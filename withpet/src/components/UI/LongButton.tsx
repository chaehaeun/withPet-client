import React from 'react'

type BtnProps = {
  type: 'button' | 'submit' | 'reset' | undefined
  value?: string
  onClick: (() => void) | (() => Promise<void>)
  className?: string
}

const LongButton: React.FC<BtnProps> = ({
  type,
  value,
  onClick,
  className,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-11/12 py-4 mt-6 mb-2 font-bold shadow-200 cursor-pointer ${className}`}
    >
      {value}
    </button>
  )
}

export default LongButton
