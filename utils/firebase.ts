import { initializeApp } from 'firebase/app'
import { GoogleAuthProvider , UserCredential, getAuth, signInWithPopup, signInWithRedirect } from 'firebase/auth'
import axios from 'axios'
import { socket } from '@/utils/socket'

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
}

const firebaseApp = initializeApp(firebaseConfig)

export const firebaseAuth = getAuth(firebaseApp)