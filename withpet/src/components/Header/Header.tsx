import React, { FC } from 'react'
import logoHeader from 'assets/Logo/headerLogo.webp'
import logoSprite from 'assets/sprites_icon.png'

type HeaderProps = {
  title?: string
}

const Header: FC<HeaderProps> = ({ title }) => {
  let headerContent = null

  switch (title) {
    case 'Diary':
      headerContent = (
        <div
          className="w-8 h-8"
          style={{
            backgroundImage: `url(${logoSprite})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '-13px -252px',
          }}
        />
      )
      break
    case 'MyPage':
      headerContent = (
        <div
          className="w-5 h-5"
          style={{
            backgroundImage: `url(${logoSprite})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '-12px -286px',
          }}
        />
      )
      break
    default:
      headerContent = (
        <div
          className="w-8 h-8"
          style={{
            backgroundImage: `url(${logoSprite})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '-10px -395px',
          }}
        />
      )
      break
  }

  return (
    <header className="w-full max-w-scr h-14 leading-12 flex flex-nowrap flex-row justify-between gap-10">
      <img src={logoHeader} alt="logo" />
      <p className="font-bold">{title}</p>
      <button type="button">{headerContent}</button>
    </header>
  )
}

export default Header
