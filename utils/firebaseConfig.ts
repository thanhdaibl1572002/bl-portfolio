import { initializeApp } from 'firebase/app'
import { Auth, GoogleAuthProvider , OAuthCredentialOptions, UserCredential, getAuth, onAuthStateChanged, signInWithPopup } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyDSCapWEzdvG9tiNyqh7Wm-VsXBy-lNRac',
  authDomain: 'bl-folio.firebaseapp.com',
  projectId: 'bl-folio',
  storageBucket: 'bl-folio.appspot.com',
  messagingSenderId: '595661788815',
  appId: '1:595661788815:web:d1450362faa49256e582fa',
  measurementId: 'G-WX1VHZPMPD'
}

const firebaseApp = initializeApp(firebaseConfig)

export const firebaseAuth = getAuth(firebaseApp)
const googleAuthProvider = new GoogleAuthProvider()

export const googleSignIn = async (): Promise<
{ 
  token: OAuthCredentialOptions['accessToken'] | null, 
  user: UserCredential['user'] | null, 
}
> => {
  try {
    const result = await signInWithPopup(firebaseAuth, googleAuthProvider)
    if (!result) throw new Error('Google Auth Error: Không nhận được kết quả.')
    const credential = GoogleAuthProvider.credentialFromResult(result)
    if (!credential) throw new Error('Google Auth Error: Không thể xác thực.')
    return { token: credential.accessToken, user: result.user }
  } catch (error: any) {
    console.error(error)
    return { token: null, user: null }
  }
}