import { initializeApp } from 'firebase/app'
import { GoogleAuthProvider , getAuth, signInWithPopup } from 'firebase/auth'
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
const googleAuthProvider = new GoogleAuthProvider()

export const googleSignIn = async (): Promise<boolean> => {
  try {
    const result = await signInWithPopup(firebaseAuth, googleAuthProvider)
    if (!result) throw new Error('Google Auth Error: Không nhận được kết quả.')
    const credential = GoogleAuthProvider.credentialFromResult(result)
    if (!credential) throw new Error('Google Auth Error: Không thể xác thực.')
    await axios.post(
      `${process.env.SERVER_URL as string}/auth/sign-in`, 
      {
        email: result.user.email,
        displayName: result.user.displayName,
        photoURL: result.user.photoURL,
      },
      { headers: { Authorization: `Bearer ${await result.user.getIdToken(true)}` } }
    )
    socket.emit('updateSocketId', { email: result.user.email })
    return true
  } catch (error: any) {
    console.error(error)
    return false
  }
}