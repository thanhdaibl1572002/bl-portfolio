import { useRef, forwardRef, useImperativeHandle, ForwardRefRenderFunction } from 'react'
import styles from '@/app/chat/chatlist.module.sass'
import { useAppSelector } from '@/redux'
import Image from 'next/image'
import Link from 'next/link'
import Button from '@/components/forms/Button'
import { getColorLevel, mainColor, whiteColor } from '@/variables/variables'
import { PiMagnifyingGlassLight } from 'react-icons/pi'
import { useParams } from 'next/navigation'

interface IChatListProps { 
    conversations: Array<{
        conversationId: string
        senderDisplayName: string
        senderPhotoURL: string
        lastMessage: string
        unreadCount?: number
    }>    
}

const ChatList: ForwardRefRenderFunction<{ open: () => void }, IChatListProps> = ({
    conversations
}, ref) => {
    const { theme } = useAppSelector(state => state.theme)
    const params = useParams()

    const chatListContainerRef = useRef<HTMLDivElement>(null)

    const handleCloseChatList = (): void => {
        if (!chatListContainerRef.current) return
        chatListContainerRef.current.style.opacity = '0'
        chatListContainerRef.current.style.visibility = 'hidden'
    }

    useImperativeHandle(ref, () => ({
        open() {
            if (!chatListContainerRef.current) return
            chatListContainerRef.current.style.opacity = '1'
            chatListContainerRef.current.style.visibility = 'visible'
        },
    }), [])

    return (
        <div className={styles[`_container__${theme}`]} ref={chatListContainerRef}>
            <div className={styles._close__chat__list} onClick={handleCloseChatList}></div>
            <div className={styles._content}>
                <div className={styles._tool}>
                    <strong>Cuộc trò chuyện (20)</strong>
                    <div className={styles._search}>
                        <input placeholder='Tìm kiếm cuộc trò chuyện' />
                        <Button
                            className={styles._sign__out}
                            width={40}
                            height={40}
                            icon={<PiMagnifyingGlassLight />}
                            iconSize={22}
                            iconColor={mainColor}
                            background={theme === 'light' ? getColorLevel(mainColor, 7) : getColorLevel(mainColor, 20)}
                            animateDuration={300}
                            boxShadow={`0 1px 1.5px 0 ${getColorLevel(theme === 'light' ? mainColor : whiteColor, 10)}`}
                            bubbleColor={theme === 'light' ? mainColor : whiteColor}
                        />
                    </div>
                </div>
                <ul className={styles._list}>
                    {conversations.map((conversation) => (
                        <li
                            key={conversation.conversationId}
                            className={`${params.conversationId === conversation.conversationId ? styles._active : ''} ${conversation.unreadCount ? styles._unread : ''}`}
                        >
                            <Link href={`/chat/${conversation.conversationId}`}>
                                <Image width={40} height={40} src={conversation.senderPhotoURL} alt='' />
                                <strong>
                                    {conversation.senderDisplayName}
                                    <p>{conversation.lastMessage}</p>
                                </strong>
                                {conversation.unreadCount && <span>{conversation.unreadCount}</span>}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default forwardRef(ChatList)
