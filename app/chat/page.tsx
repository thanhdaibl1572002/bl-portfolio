'use client'
import { FC, useState } from 'react'
import styles from '@/app/chat/chat.module.sass'
import { useAppSelector } from '@/redux'
import { firebaseAuth } from '@/utils/firebaseConfig'
import { signOut, onAuthStateChanged } from 'firebase/auth'
import { PiSignOutLight } from 'react-icons/pi'
import { getColorLevel, redColor, whiteColor } from '@/variables/variables'
import ChatBox from '@/app/chat/ChatBox'
import ChatTextArea from '@/app/chat/ChatTextArea'
import ChatSignIn from '@/app/chat/ChatSignIn'
import ChatLoading from '@/app/chat/ChatLoading'
import Button from '@/components/forms/Button'

const Chat: FC = () => {
    const { theme } = useAppSelector(state => state.theme)
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    onAuthStateChanged(firebaseAuth, user => {
        setIsLoggedIn(user ? true : false)
        setIsLoading(false)
    })

    return (
        <div className={styles[`_container__${theme}`]}>
            {isLoading ? (
                <ChatLoading />
            ) : (
                <>
                    {isLoggedIn ? (
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
                                onClick={() => signOut(firebaseAuth)}
                            />
                            <ChatBox />
                            <ChatTextArea />
                        </>
                    ) : (
                        <ChatSignIn />
                    )}
                </>
            )}
        </div>
    )
}

export default Chat