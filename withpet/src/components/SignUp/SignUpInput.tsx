import React, { ChangeEvent } from 'react'

interface InputProps {
  id: string
  name: string
  type: string
  value: string
  placeholder: string
  required: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const SignUpInput = ({
  id = '',
  name = '',
  type = '',
  value = '',
  placeholder = '',
  required,
  onChange,
}: InputProps) => {
  return (
    <>
      <label htmlFor={id} />
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="py-4 pl-4 text-xs font-black border-2 border-black border-solid w-85 h-14 text-Gray-400"
      />
    </>
  )
}

export default SignUpInput
