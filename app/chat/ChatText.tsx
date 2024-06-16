/* eslint-disable @next/next/no-img-element */
import { ChangeEvent, FC, KeyboardEvent, lazy, memo, useCallback, useContext, useRef, useState } from 'react'
import styles from '@/app/chat/chattext.module.sass'
import { useAppSelector } from '@/redux'
import { PiPaperPlaneRightFill } from 'react-icons/pi'
import { firebaseAuth } from '@/utils/firebase'
import { socket } from '@/utils/socket'
import { useParams } from 'next/navigation'
import { RiChatSmile2Fill } from 'react-icons/ri'
import { mainColor } from '@/variables/variables'
import { ReplyContext } from '@/app/chat/ReplyProvider'
import ChatReply from '@/app/chat/ChatReply'

const ChatEmoji = lazy(() => import('@/app/chat/ChatEmoji'))
const ChatImage = lazy(() => import('@/app/chat/ChatImage'))

const ChatText: FC = () => {
    const { theme } = useAppSelector(state => state.theme)
    const params = useParams()

    const [text, setText] = useState<string>('')

    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const chatEmojiContainerRef = useRef<{ open: () => void }>(null)

    const userId = firebaseAuth.currentUser?.uid
    const isAdmin = userId === process.env.ADMIN_ID

    const { reply, updateReply } = useContext(ReplyContext)

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
        setText(event.target.value)
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'
            textareaRef.current.style.height = `${Math.min(100, textareaRef.current.scrollHeight)}px`
        }
    }

    const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>): void => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault()
            handleSubmit()
        }
    }

    const handleSubmit = async (): Promise<void> => {
        if (!text) return
        if (reply) {
            socket.emit('sendReplyText', {
                userId: isAdmin ? decodeURIComponent(params.userId as string) : userId,
                content: text,
                from: isAdmin ? 'admin' : userId,
                replyMessageId: reply.replyMessageId,
                replyMessageType: reply.replyMessageType,
            })
        } else {
            socket.emit('sendText', {
                userId: isAdmin ? decodeURIComponent(params.userId as string) : userId,
                content: text,
                from: isAdmin ? 'admin' : userId,
            })
        }
        setText('')
        updateReply(null)
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
            {reply && <ChatReply />}
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
                onKeyDown={handleKeyDown}
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

export default memo(ChatText)