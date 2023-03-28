import React, { FC, useMemo, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import logoSprite from 'assets/sprites_icon.png'
import navBack from 'assets/navBack.png'
import { RootState } from 'redux/store'
import { useSelector } from 'react-redux'
import {
  collection,
  getDocs,
  DocumentData,
  query,
  where,
} from 'firebase/firestore'
import { dbService } from 'firebase-config'

type NavigationProps = {
  title?: string
}

const NAV_ITEMS = [
  { name: 'story', x: 0, y: 0 },
  { name: 'chatting', x: -41, y: -2 },
  { name: 'diary', x: -82, y: 0 },
  { name: 'walkindex', x: -124, y: -1 },
  { name: 'mypage', x: -164, y: 0 },
  { name: 'setting', x: -164, y: 0 },
]

const Navigation: FC<NavigationProps> = ({ title = '' }) => {
  const [activeNav, setActiveNav] = useState(title)
  const [myPets, setMyPets] = useState<DocumentData[]>([])

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

  useEffect(() => {
    const getMyPet = async () => {
      const q = query(
        collection(dbService, 'petInfo'),
        where('user', '==', userUid),
      )
      const myPetList = await getDocs(q)
      setMyPets(myPetList.docs.map(doc => doc.data()))
    }
    getMyPet()
  }, [])

  const anotherItems = navItems.filter((e, i) => i <= 3)

  return (
    <nav className="w-full max-w-scr h-16 bg-white mx-auto fixed bottom-0 left-0 right-0 z-50">
      <div className="flex flex-nowrap flex-row justify-between leading-8 px-6 py-4 border-t border-solid border-gray-400">
        {userUid && myPets
          ? anotherItems.map(({ name, style }) => (
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
            ))
          : navItems.map(({ name, style }) => (
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
        {userUid && myPets ? (
          <Link to={'/mypage'} key={'mypage'}>
            <button
              type="button"
              onClick={() => handleClick('mypage')}
              aria-label={'mypage 버튼 선택'}
            >
              <img
                className="w-8.9 h-8.9 rounded-[50%] border-2 border-black border-solid"
                src={myPets[0] ? myPets[0].petImg : navBack}
                alt="나의 프로필 사진"
              />
            </button>
          </Link>
        ) : (
          ''
        )}
      </div>
    </nav>
  )
}

export default Navigation
