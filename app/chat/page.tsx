'use client'
import { FC, useCallback, useEffect, useState } from 'react'
import styles from '@/app/chat/chat.module.sass'
import { useAppSelector } from '@/redux'
import ChatBox from '@/app/chat/ChatBox'
import ChatTextArea from '@/app/chat/ChatTextArea'
import { firebaseAuth } from '@/utils/firebaseConfig'
import SignIn from '@/components/layouts/SignIn'
import { signOut, onAuthStateChanged } from 'firebase/auth'
import ChatLoading from './ChatLoading'
import Button from '@/components/forms/Button'
import { PiSignOutLight } from 'react-icons/pi'
import { getColorLevel, mainColor, redColor, whiteColor } from '@/variables/variables'

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
                        <SignIn />
                    )}
                </>
            )}
        </div>
    )
}

export default Chat