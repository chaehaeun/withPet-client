import React from 'react'
import 'components/App/App.css'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string
  name?: string
  type: 'text' | 'date' | 'radio'
  children?: string
  className?: string
}

const PetInfoInput:React.FC<InputProps> = (props: InputProps) => {
  const { id, name, type, children, ...rest } = props

  return (
    <div className="relative py-2 w-11/12 ">
      <label
        htmlFor={id}
        className="inline-box absolute top-7 left-6 text-xs decoration-Gray-400 font-semibold"
      >
        {children}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        className="inline-box box-border w-full h-14 text-right px-3 border-2 border-black"
        {...rest}
        required
      />
    </div>
  )
}

export default PetInfoInput
