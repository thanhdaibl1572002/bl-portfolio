import { ChangeEvent, FC, lazy, memo, useCallback, useRef, useState } from 'react'
import styles from '@/app/chat/chattext.module.sass'
import { useAppSelector } from '@/redux'
import { PiPaperPlaneRightFill } from 'react-icons/pi'
import { firebaseAuth } from '@/utils/firebase'
import { socket } from '@/utils/socket'
import { useParams } from 'next/navigation'
import { RiChatSmile2Fill } from 'react-icons/ri'
import { mainColor } from '@/variables/variables'

const ChatEmoji = lazy(() => import('@/app/chat/ChatEmoji'))
const ChatImage = lazy(() => import('@/app/chat/ChatImage'))

const ChatTextArea: FC = () => {
    const { theme } = useAppSelector(state => state.theme)

    const params = useParams()

    const [text, setText] = useState<string>('')

    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const chatEmojiContainerRef = useRef<{ open: () => void }>(null)

    const userId = firebaseAuth.currentUser?.uid
    const isAdmin = userId === process.env.ADMIN_ID

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
        setText(event.target.value)
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
        }
    }

    const handleSubmit = async (): Promise<void> => {
        if (!text) return
        socket.emit('sendText', {
            userId: isAdmin ? decodeURIComponent(params.userId as string) : userId,
            content: text,
            from: isAdmin ? 'admin' : userId,
        })
        setText('')
    }

    const handleSelectEmoji = (emoji: string) => {
        if (textareaRef.current) {
            const start = textareaRef.current.selectionStart
            const end = textareaRef.current.selectionEnd
            setText(prevtext => {
                return prevtext.substring(0, start) + emoji + prevtext.substring(end)
            })
            textareaRef.current.selectionStart = start + emoji.length
            textareaRef.current.selectionEnd = start + emoji.length
        }
    }

    return (
        <div className={styles[`_container__${theme}`]}>
            <ChatEmoji
                ref={chatEmojiContainerRef}
                onSelectEmoji={useCallback(emoji => handleSelectEmoji(emoji), [])}
            />
            <ChatImage />
            <RiChatSmile2Fill
                color={mainColor}
                fontSize={28}
                onClick={() => {
                    if (!chatEmojiContainerRef.current) return
                    chatEmojiContainerRef.current.open()
                }}
            />
            <textarea
                placeholder='Nhập vào tin nhắn của bạn'
                value={text}
                onChange={handleChange}
                rows={1}
                ref={textareaRef}
            />
            <PiPaperPlaneRightFill
                color={mainColor}
                onClick={handleSubmit}
                fontSize={30}
            />
        </div>
    )
}

export default memo(ChatTextArea)