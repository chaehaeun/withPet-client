import { auth, dbService } from 'firebase-config'
import { onAuthStateChanged } from 'firebase/auth'
import {
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
} from 'firebase/firestore'
import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react'

// const user = auth.currentUser
const ChangeProfile = () => {
  const [newUserNickName, setNewUserNickName] = useState('')
  // const [users, setUsers] = useState([] as any)

  /*   useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        const uid = user.uid
        console.log(uid)
        const q = query(collection(dbService, 'userInfo'))
        onSnapshot(q, snapshot => {
          const userArray = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }))
          setUsers(userArray)
        })
      } else {
        console.log('1')
      }
    })
  }, []) */

  // console.log(users)

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const userNickName = doc(
      dbService,
      'userInfo',
      auth.currentUser ? auth.currentUser.uid : '',
    )
    try {
      const res = await updateDoc(userNickName, {
        userNickName: newUserNickName,
      })
      console.log(res)
      setNewUserNickName('')
    } catch (error) {
      console.log(error)
    }
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e
    setNewUserNickName(value)
  }

  return (
    <div>
      <form
        onSubmit={onSubmit}
        className="max-w-scr pt-5 px-6 flex flex-row flex-nowrap justify-between"
      >
        <label htmlFor="changeNickName" className="text-base font-bold">
          닉네임 변경
        </label>
        <div className="flex flex-row gap-2">
          <input
            type="text"
            name="changeNickName"
            id="changeNickName"
            required
            value={newUserNickName}
            onChange={onChange}
            className="w-36 h-8 border border-Gray-200"
          />
          <input
            type="submit"
            value="수정"
            className="w-7 h-8 bg-Gray-200 text-xs"
          />
        </div>
      </form>
    </div>
  )
}

export default ChangeProfile
