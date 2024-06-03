import { ChangeEvent, FC, lazy, memo, useRef, useState } from 'react'
import styles from '@/app/chat/chattextarea.module.sass'
import { useAppSelector } from '@/redux'
import { PiImageSquareLight, PiPaperPlaneRightFill } from 'react-icons/pi'
import { firebaseAuth } from '@/utils/firebase'
import { socket } from '@/utils/socket'
import { useParams } from 'next/navigation'
import { RiChatSmile2Fill } from 'react-icons/ri'

const ChatEmoji = lazy(() => import('@/app/chat/ChatEmoji'))

const ChatTextArea: FC = () => {
    const { theme } = useAppSelector(state => state.theme)

    const params = useParams()

    const [messageText, setMessageText] = useState<string>('')

    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const chatEmojiContainerRef = useRef<{ open: () => void }>(null)

    const isAdmin = firebaseAuth.currentUser?.uid === process.env.ADMIN_ID

    const handleMessageTextChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
        setMessageText(event.target.value)
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
        }
    }

    const handleSendMessageText = async (): Promise<void> => {
        if (!messageText) return
        if (isAdmin) {
            socket.emit('adminTextSendMessage', { 
                userId: decodeURIComponent(params.userId as string), 
                content: messageText, 
                type: 'text' 
            })
        } else {
            socket.emit('userSendTextMessage', { 
                userId: firebaseAuth.currentUser?.uid, 
                content: messageText, 
                type: 'text' 
            })
        }
        setMessageText('')
    }

    return (
        <div className={styles[`_container__${theme}`]}>
            <ChatEmoji ref={chatEmojiContainerRef} />
            <PiImageSquareLight />
            <RiChatSmile2Fill 
                onClick={() => {
                    if (!chatEmojiContainerRef.current) return
                    chatEmojiContainerRef.current.open()
                }}
            />
            <textarea
                placeholder='Nhập vào tin nhắn của bạn'
                value={messageText}
                onChange={handleMessageTextChange}
                rows={1}
                ref={textareaRef}
            />
            <PiPaperPlaneRightFill
                onClick={handleSendMessageText}
            />
        </div>
    )
}

export default memo(ChatTextArea)