import React from 'react'
import 'components/App/App.css'

type RegisterProps = {
  id: string
  type: 'submit'
  value: string
}

const PetInfoRegister: React.FC<RegisterProps> = ({ id, type, value }) => {
  return (
    <>
      <input
        id={id}
        type={type}
        value={value}
        className="w-11/12 py-4 mt-12 bg-primary-200 text-white font-bold shadow-200 cursor-pointer"
      />
    </>
  )
}

export default PetInfoRegister
