import React from 'react'
import 'components/App/App.css'
import Logo from 'assets/Logo/petinfoLogo.webp'
import Container from 'components/UI/Container'
import PetInfoForm from 'components/PetInfo/PetInfoForm'

const PetInfo: React.FC = () => {
  
  return (
    <Container style={'bg-primary-100 justify-center pb-20'}>
        <h2 className="flex justify-center ">
          <img src={Logo} alt="Pet Information Logo" width="100%" height="100%" className="w-full"></img>
        </h2>
        <PetInfoForm />
    </Container>
  )
}

export default PetInfo