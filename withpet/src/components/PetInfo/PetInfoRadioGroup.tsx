import React from 'react'
import 'components/App/App.css'

type GroupProp = {
  children: React.ReactNode
  label: string
  tabIndex?: number | undefined
}

const PetInfoRadioGroup:React.FC<GroupProp> = (props: GroupProp) => {
  const { children, label } = props

  return (
    <fieldset className="my-2 w-11/12 flex justify-center" tabIndex={0}>
      <legend className="text-xs decoration-Gray-400 font-semibold">
        {label}
      </legend>
      {children}
    </fieldset>
  )
}

export default PetInfoRadioGroup
