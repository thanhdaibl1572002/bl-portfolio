import { FC, ReactElement, ReactNode, lazy, useRef } from 'react'
import styles from '@/app/chat/chatwelcome.module.sass'
import { useAppSelector } from '@/redux'
import { PiChatCenteredTextLight } from 'react-icons/pi'
import Button from '@/components/forms/Button'
import { getColorLevel, mainColor, whiteColor } from '@/variables/variables'

const ChatList = lazy(() => import('@/app/chat/ChatList'))

interface IChatWelcomeProps {
    icon: ReactNode | ReactElement
    message: string
    description: string
    isShowChatList?: boolean
}

const ChatWelcome: FC<IChatWelcomeProps> = ({
    icon,
    message,
    description,
    isShowChatList = false,
}) => {
    const { theme } = useAppSelector(state => state.theme)

    const chatListContainerRef = useRef<{ open: () => void }>(null)

    return (
        <div className={styles[`_container__${theme}`]}>
            <ChatList ref={chatListContainerRef} />
            <div className={styles._icon}>{icon}</div>
            <strong>{message}</strong>
            <p>{description}<span>⚡</span></p>
            {isShowChatList && (
                <Button
                    width={121}
                    height={40}
                    icon={<PiChatCenteredTextLight />}
                    iconSize={24}
                    iconColor={mainColor}
                    text='Tin Nhắn'
                    textSize={15}
                    textColor={mainColor}
                    background={theme === 'light' ? getColorLevel(mainColor, 7) : getColorLevel(mainColor, 20)}
                    animateDuration={300}
                    boxShadow={`0 1px 1.5px 0 ${getColorLevel(theme === 'light' ? mainColor : whiteColor, 10)}`}
                    bubbleColor={theme === 'light' ? mainColor : whiteColor}
                    onClick={() => {
                        if (!chatListContainerRef.current) return
                        chatListContainerRef.current.open()
                    }}
                />
            )}
        </div>
    )
}

export default ChatWelcome