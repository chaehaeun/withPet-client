import { initializeApp } from 'firebase/app'
import 'firebase/compat/firestore'
import firebase from 'firebase/compat/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
  appId: process.env.REACT_APP_APP_ID,
}

firebase.initializeApp(firebaseConfig)

export const dbService = getFirestore()
export const firestore = firebase.firestore()
export const storageService = getStorage()
