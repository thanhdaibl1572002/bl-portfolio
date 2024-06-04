'use client'
import { FC, useEffect, useState } from 'react'
import styles from '@/app/chat/page.module.sass'
import { useAppSelector } from '@/redux'
import { firebaseAuth } from '@/utils/firebase'
import { GoogleAuthProvider, onAuthStateChanged, signInWithRedirect, signOut } from 'firebase/auth'
import { PiSignOutLight, PiUserCheckThin } from 'react-icons/pi'
import { FcGoogle } from 'react-icons/fc'
import { darkColor, getColorLevel, mainColor, redColor, whiteColor } from '@/variables/variables'
import ChatLoading from '@/app/chat/ChatLoading'
import ChatBox from '@/app/chat/ChatBox'
import ChatText from '@/app/chat/ChatText'
import ChatWelcome from '@/app/chat/ChatWelcome'
import Button from '@/components/forms/Button'
import { socket } from '@/utils/socket'
import { useRouter } from 'next/navigation'
import axios from 'axios'

const Chat: FC = () => {
    const { theme } = useAppSelector(state => state.theme)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    const [isAdmin, setIsAdmin] = useState<boolean>(false)
    const navigation = useRouter()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(firebaseAuth, async user => {
            if (user) {
                if (user.uid === process.env.ADMIN_ID) setIsAdmin(true)
                setIsLoggedIn(true)
                socket.open()
                socket.emit('updateSocketId', { userId: user.uid })
                // const response = await axios.post(
                //     `${process.env.SERVER_URL as string}/auth/sign-in`,
                //     {
                //         userId: user.uid,
                //         email: user.email,
                //         displayName: user.displayName,
                //         photoURL: user.photoURL,
                //     },
                //     { headers: { Authorization: `Bearer ${await user.getIdToken(true)}` } }
                // )
                // if (response.status === 200 || response.status === 201) {
                //     setIsLoggedIn(true)
                //     socket.open()
                //     socket.emit('updateSocketId', { userId: user.uid })
                // }
                // if (response.status === 201)
                //     socket.emit('newChat', { userId: user.uid })
            } else {
                socket.close()
                setIsLoggedIn(false)
            }
            setIsLoading(false)
        })
        return () => unsubscribe()
    }, [navigation])

    const handleSignIn = async (): Promise<void> => {
        try {
            const googleAuthProvider = new GoogleAuthProvider()
            await signInWithRedirect(firebaseAuth, googleAuthProvider)
        } catch (error) {
            console.error(error)
        }
    }

    const handleSignOut = (): void => {
        signOut(firebaseAuth)
        setIsLoggedIn(false)
        localStorage.removeItem('BLFOLIO_USER_ID')
    }

    return (
        <div className={styles[`_container__${theme}`]}>
            {isLoading ? (
                <ChatLoading />
            ) : (
                isLoggedIn ? (
                    <>
                        <Button
                            className={styles._sign__out}
                            width={35}
                            height={35}
                            icon={<PiSignOutLight />}
                            iconSize={22}
                            iconColor={redColor}
                            background={theme === 'light' ? getColorLevel(redColor, 7) : getColorLevel(redColor, 20)}
                            animateDuration={300}
                            boxShadow={`0 1px 1.5px 0 ${getColorLevel(theme === 'light' ? redColor : whiteColor, 10)}`}
                            bubbleColor={theme === 'light' ? redColor : whiteColor}
                            onClick={handleSignOut}
                        />
                        {isAdmin ? (
                            <ChatWelcome 
                                icon={<PiUserCheckThin />}
                                message={'Xin chào Admin'}
                                description={'Hãy xem danh sách trò chuyện của bạn'}
                                isShowChatList
                            />
                        ) : (
                            <>
                                <ChatBox />
                                <ChatText />
                            </>
                        )}
                    </>
                ) : (
                    <div className={styles._sign__in}>
                        <Button
                            width={180}
                            height={40}
                            icon={<FcGoogle />}
                            iconSize={24}
                            text={'Đăng nhập Google'}
                            textColor={theme === 'light' ? darkColor : whiteColor}
                            textSize={14}
                            background={theme === 'light' ? getColorLevel(mainColor, 7) : getColorLevel(mainColor, 20)}
                            animateDuration={300}
                            boxShadow={`0 1px 1.5px 0 ${getColorLevel(theme === 'light' ? mainColor : whiteColor, 10)}`}
                            bubbleColor={theme === 'light' ? mainColor : whiteColor}
                            onClick={handleSignIn}
                        />
                    </div>
                )
            )}
        </div>
    )
}

export default Chat


