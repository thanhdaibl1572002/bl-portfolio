import { useRef, forwardRef, useImperativeHandle, ForwardRefRenderFunction, useEffect, useState, memo } from 'react'
import styles from '@/app/chat/chatlist.module.sass'
import { useAppSelector } from '@/redux'
import Image from 'next/image'
import Link from 'next/link'
import Button from '@/components/forms/Button'
import { getColorLevel, mainColor, whiteColor } from '@/variables/variables'
import { PiMagnifyingGlassLight } from 'react-icons/pi'
import { useParams } from 'next/navigation'
import { socket } from '@/utils/socket'
import axios from 'axios'
import { firebaseAuth } from '@/utils/firebase'

interface IChat {
    userId: string
    displayName: string
    photoURL: string
    lastMessage: string
    unreadCount?: number
}

interface IChatListProps { }

const ChatList: ForwardRefRenderFunction<{ open: () => void }, IChatListProps> = ({}, ref) => {
    const { theme } = useAppSelector(state => state.theme)
    const params = useParams()

    const [chats, setChats] = useState<Array<IChat>>([])

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

    useEffect(() => {
        (async (): Promise<void> => {
            try {
                const response = await axios.get(
                    `${process.env.SERVER_URL as string}/chat/get-chat-list`, 
                    { headers: { Authorization: `Bearer ${await firebaseAuth.currentUser!.getIdToken(true)}` } }
                )
                setChats(response.data.data)
            } catch (error) {
                setChats([])
            }
        })()
    }, [])

    useEffect(() => {
        socket.on('getNewChat', chat => setChats(prevChat => [chat, ...prevChat]))
        return () => {
            socket.off('getNewChat')
        }
    }, [])

    return (
        <div className={styles[`_container__${theme}`]} ref={chatListContainerRef}>
            <div className={styles._close__chat__list} onClick={handleCloseChatList}></div>
            <div className={styles._content}>
                <div className={styles._tool}>
                    <strong>Cuộc trò chuyện ({chats.length})</strong>
                    <div className={styles._search}>
                        <input placeholder='Tìm kiếm cuộc trò chuyện' />
                        <Button
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
                    {chats.length > 0 ? chats.map((chat) => (
                        <li
                            key={chat.userId}
                            className={`${params.userId === chat.userId ? styles._active : ''} ${chat.unreadCount ? styles._unread : ''}`}
                        >
                            <Link href={`/chat/${chat.userId}`}>
                                <Image width={40} height={40} src={chat.photoURL} alt='' />
                                <strong>
                                    {chat.displayName}
                                    {chat.lastMessage && <p>{chat.lastMessage.length > 25 ? chat.lastMessage?.substring(0, 25) + '...' : chat.lastMessage}</p> }
                                   
                                </strong>
                                {chat.unreadCount ? <span>{chat.unreadCount}</span> : null}
                            </Link>
                        </li>
                    )) : (
                        <>Trống</>
                    )}
                </ul>
            </div>
        </div>
    )
}

export default memo(forwardRef(ChatList))
