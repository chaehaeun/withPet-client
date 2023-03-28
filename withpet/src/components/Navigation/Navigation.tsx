import React, { FC, useMemo, useState, useLayoutEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import { Link } from 'react-router-dom'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { dbService } from 'firebase-config'
import logoSprite from 'assets/sprites_icon.png'

type NavigationProps = {
  title?: string
}

const NAV_ITEMS = [
  { name: 'story', x: 0, y: 0 },
  { name: 'chatting', x: -41, y: -2 },
  { name: 'diary', x: -82, y: 0 },
  { name: 'walkindex', x: -124, y: -1 },
]

const Navigation: FC<NavigationProps> = ({ title = '' }) => {
  const [activeNav, setActiveNav] = useState(title)
  const [myPetImg, setMyPetImg] = useState<string>('')

  const userUid = useSelector((state: RootState) => state.auth.userUid)

  const handleClick = (name: string) => {
    setActiveNav(name)
  }

  const navItems = useMemo(
    () =>
      NAV_ITEMS.map(({ name, x, y }) => ({
        name,
        style: {
          backgroundImage: `url(${logoSprite})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: `${x}px ${y}px`,
        },
      })),
    [],
  )

  const getMyPet = async () => {
    const q = query(
      collection(dbService, 'petInfo'),
      where('user', '==', userUid),
    )
    const myPetList = await getDocs(q)
    const myFirstPet = myPetList.docs.map(doc => doc.data())
    setMyPetImg(myFirstPet[0]?.petImg)
  }

  useLayoutEffect(() => {
    if (myPetImg === '') {
      getMyPet()
    }
  }, [])

  return (
    <nav className="w-full max-w-scr h-16 bg-white mx-auto fixed bottom-0 left-0 right-0 z-50">
      <div className="flex flex-nowrap flex-row justify-between leading-8 px-6 py-4 border-t border-solid border-gray-400">
        {navItems.map(({ name, style }) => (
          <Link to={`/${name}`} key={name}>
            <button
              type="button"
              className="w-8.9 h-8.9"
              style={
                activeNav === name
                  ? { ...style }
                  : { ...style, backgroundPositionY: '-45px' }
              }
              onClick={() => handleClick(name)}
              aria-label={`${name} 버튼 선택`}
            />
          </Link>
        ))}

        {myPetImg ? (
          <Link to={'/mypage'} key={'mypage'}>
            <button
              type="button"
              onClick={() => handleClick('mypage')}
              aria-label={'mypage 버튼 선택'}
            >
              <img
                className="w-8.9 h-8.9 rounded-[50%] border-2 border-black border-solid object-cover"
                src={myPetImg}
                alt="나의 프로필 사진"
              />
            </button>
          </Link>
        ) : (
          <Link to={'/mypage'} key={'mypage'}>
            <button
              type="button"
              className="w-8.9 h-8.9"
              style={
                activeNav === 'mypage'
                  ? {
                      backgroundImage: `url(${logoSprite})`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: '-164px 0px',
                    }
                  : {
                      backgroundImage: `url(${logoSprite})`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: '-164px -45px',
                    }
              }
              onClick={() => handleClick('mypage')}
              aria-label={'mypage 버튼 선택'}
            />
          </Link>
        )}
      </div>
    </nav>
  )
}

export default Navigation
