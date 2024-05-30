'use client'
import { FC, lazy, useRef, useState } from 'react'
import styles from '@/app/chat/[conversationId]/page.module.sass'
import { useAppSelector } from '@/redux'
import { firebaseAuth } from '@/utils/firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { PiChatCenteredTextLight, PiSignOutLight } from 'react-icons/pi'
import { getColorLevel, mainColor, redColor, whiteColor } from '@/variables/variables'
import ChatLoading from '@/app/chat/ChatLoading'
import ChatBox from '@/app/chat/ChatBox'
import ChatTextArea from '@/app/chat/ChatTextArea'
import Button from '@/components/forms/Button'
import { socket } from '@/utils/socket'
import { useRouter } from 'next/navigation'

const ChatList = lazy(() => import('@/app/chat/ChatList'))

const ChatAdmin: FC = () => {
    const { theme } = useAppSelector(state => state.theme)

    const navigation = useRouter()

    const [isLoading, setIsLoading] = useState<boolean>(true)

    onAuthStateChanged(firebaseAuth, async user => {
        user ? socket.open() : socket.close()
        if (!user || user.email !== process.env.ADMIN_EMAIL) {
            navigation.push('/chat')
        } else {
            setIsLoading(false)
        }
    })

    const chatListContainerRef = useRef<{ open: () => void }>(null)

    const handleOpenChatList = (): void => {
        if (!chatListContainerRef.current) return
        chatListContainerRef.current.open()
    }

    return (
        <div className={styles[`_container__${theme}`]}>
            <>
                {isLoading ? (
                    <ChatLoading />
                ) : (
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
                        <Button
                            className={styles._open__chat__list}
                            width={55}
                            height={35}
                            icon={<PiChatCenteredTextLight />}
                            iconSize={24}
                            iconColor={mainColor}
                            text='9+'
                            textSize={12}
                            textColor={mainColor}
                            textWeight={500}
                            background={theme === 'light' ? getColorLevel(mainColor, 7) : getColorLevel(mainColor, 20)}
                            animateDuration={300}
                            boxShadow={`0 1px 1.5px 0 ${getColorLevel(theme === 'light' ? mainColor : whiteColor, 10)}`}
                            bubbleColor={theme === 'light' ? mainColor : whiteColor}
                            onClick={handleOpenChatList}
                        />
                        <ChatList ref={chatListContainerRef} />
                    </>
                )}
            </>
        </div>
    )
}

export default ChatAdmin