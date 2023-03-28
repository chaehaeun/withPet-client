import React from 'react'
import 'components/App/App.css'

type PetInfoProps = {
  title: React.ReactNode
  value: React.ReactNode
}

const MyPetInfo: React.FC<PetInfoProps> = ({ title, value }) => {
  return (
    <div className="flex justify-between wrap text-ellipsis">
      <dt className="w-6/12">{title}</dt>
      <dd className="w-6/12 text-right text-ellipsis line-clamp-1">{value}</dd>
    </div>
  )
}

export default MyPetInfo
