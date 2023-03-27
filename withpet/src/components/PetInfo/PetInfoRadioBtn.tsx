import React, { useEffect, useState } from 'react'
import 'components/App/App.css'
import { useSelector } from 'react-redux'
import { RootState } from 'redux/store'

interface ButtonProp extends React.InputHTMLAttributes<HTMLInputElement> {
  children: string
  name: string
  value: string
  tabIndex?: number | undefined
}

const PetInfoRadioBtn: React.FC<ButtonProp> = (props: ButtonProp) => {
  const { children, name, value, ...rest } = props
  const [isCheck, setIsCheck] = useState<boolean>(false)

  const petInfo = useSelector(
    (petInfoState: RootState) => petInfoState.petInfo.petInfoGroup,
  )

  useEffect(() => {
    if (petInfo.petGender === value || petInfo.petNeuter === value) {
      setIsCheck(true)
    } else {
      setIsCheck(false)
    }
  }, [petInfo])

  return (
    <>
      <label tabIndex={0} className="w-full relative">
        {isCheck ? (
          <input
            type="radio"
            name={name}
            value={value || ''}
            checked
            {...rest}
            className="peer absolute right-1/2 top-1/2 -z-40"
          />
        ) : (
          <input
            type="radio"
            name={name}
            value={value || ''}
            {...rest}
            className="peer absolute right-1/2 top-1/2 -z-40"
          />
        )}

        <span
          className="w-11/12 py-4 m-2 inline-block box-border border-2 border-black bg-white text-base text-center font-bold cursor-pointer
          peer-checked:bg-primary-200 peer-checked:text-white peer-checked:shadow-100
          "
        >
          {children}
        </span>
      </label>
    </>
  )
}

export default PetInfoRadioBtn
