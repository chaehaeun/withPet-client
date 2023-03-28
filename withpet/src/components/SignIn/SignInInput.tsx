import React, { useState } from 'react'

type InputProps = {
  type: string
  id: string
  label: string | number
  inputValHandler: (value: string) => void
}

const SignInInput: React.FC<InputProps> = ({
  type,
  id,
  label,
  inputValHandler,
}) => {
  const [labelLocation, setLabelLocation] = useState(false)
  const [enteredText, setEnteredText] = useState('')

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEnteredText(e.target.value)
    inputValHandler(e.target.value)
  }

  const inputFocusHandler = (): void => {
    setLabelLocation(true)
  }

  const inputBlurHandler = (): void => {
    if (enteredText.trim().length !== 0) {
      setLabelLocation(true)
    } else {
      setLabelLocation(false)
    }
  }

  return (
    <div className="relative">
      <label
        htmlFor={id}
        className={`absolute text-sm font-black duration-200   ${
          labelLocation
            ? 'left-2 top-1 text-Gray-200 text-xs'
            : '-translate-y-1/2 top-1/2 left-4 text-Gray-400'
        }`}
      >
        {label}
      </label>
      <input
        className="block w-full px-4 py-4 text-sm border border-black"
        id={id}
        type={type}
        onFocus={inputFocusHandler}
        onBlur={inputBlurHandler}
        onChange={inputHandler}
        value={enteredText}
      />
    </div>
  )
}

export default SignInInput
