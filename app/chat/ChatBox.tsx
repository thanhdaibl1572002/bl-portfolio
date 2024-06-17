import { FC, useEffect, useRef, useState } from 'react'
import styles from '@/app/chat/chatbox.module.sass'
import { useAppSelector } from '@/redux'
import ChatMessage from '@/app/chat/ChatMessage'
import ChatWelcome from '@/app/chat/ChatWelcome'
import { useParams } from 'next/navigation'
import { firebaseAuth } from '@/utils/firebase'
import axios from 'axios'
import { socket } from '@/utils/socket'
import { PiChatTeardropSlashThin } from 'react-icons/pi'

const ChatBox: FC = () => {
    const { theme } = useAppSelector(state => state.theme)
    const params = useParams()

    // const [messages, setMessages] = useState<Array<IMessage>>([])

    const userId = firebaseAuth.currentUser?.uid
    const tokenId = firebaseAuth.currentUser?.getIdToken(true)
    const isAdmin = userId === process.env.ADMIN_ID

    const chatBoxRef = useRef<HTMLDivElement>(null)

    // const groupedMessages: Array<Array<IMessage>> = messages.reduce((acc: Array<Array<IMessage>>, message: IMessage) => {
    //     const lastGroup = acc[acc.length - 1]
    //     if (lastGroup && lastGroup[lastGroup.length - 1].from === message.from) {
    //         lastGroup.push(message)
    //     } else {
    //         acc.push([message])
    //     }
    //     return acc
    // }, [])

    // useEffect(() => {
    //     (async () => {
    //         try {
    //             const response = await axios.get(
    //                 `${process.env.SERVER_URL as string}/message/get-all-message-by-user-id/${isAdmin ? params.userId : userId}`,
    //                 { headers: { Authorization: `Bearer ${await tokenId}` } }
    //             )
    //             const messages = response.data.data
    //             setMessages(messages)
    //         } catch (error) {
    //             setMessages([])
    //         }
    //     })()
    // }, [isAdmin, params.userId])

    // useEffect(() => {
    //     const handleReceiveMessage = (message: IMessage): void => {
    //         setMessages(prevMessages => [...prevMessages, message])
    //     }
    //     if (isAdmin) socket.on('receiveMessage', handleReceiveMessage)
    //     else socket.on('receiveMessage', handleReceiveMessage)
    //     return () => {
    //         if (isAdmin) socket.off('receiveMessage', handleReceiveMessage)
    //         else socket.off('receiveMessage', handleReceiveMessage)
    //     }
    // }, [isAdmin])

    // useEffect(() => {
    //     const handleUpdateMessage = (message: IMessage): void => {
    //         setMessages(prevMessages => {
    //             const messageIndex = prevMessages.findIndex(msg => msg._id === message._id)
    //             if (messageIndex !== -1) {
    //                 const updatedMessages = [...prevMessages]
    //                 updatedMessages[messageIndex] = message
    //                 return updatedMessages
    //             }
    //             return prevMessages
    //         })
    //     }
    //     if (isAdmin) socket.on('updateMessage', handleUpdateMessage)
    //     else socket.on('updateMessage', handleUpdateMessage)
    //     return () => {
    //         if (isAdmin) socket.off('updateMessage', handleUpdateMessage)
    //         else socket.off('updateMessage', handleUpdateMessage)
    //     }
    // }, [isAdmin])

    // useEffect(() => {
    //     if (!chatBoxRef.current) return
    //     const isNearBottom = chatBoxRef.current.scrollHeight - chatBoxRef.current.scrollTop <= chatBoxRef.current.clientHeight + 250
    //     const isAtTop = chatBoxRef.current.scrollTop === 0
    //     if (isNearBottom || isAtTop) {

    //     }
    //     chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight
    // }, [messages.length])

    // console.log('Chat Box re-render')

    return (
        <div className={styles[`_container__${theme}`]} ref={chatBoxRef}>
            {/* User gửi */}
            <ChatMessage
                sender={{
                    userId: '6d6dfHt6UcbT4ATiA0QymsClnrl1',
                    displayName: 'Boy\'s Love',
                    photoURL: 'https://lh3.googleusercontent.com/a/ACg8ocKhy5DmkS6gCeHgJeFLMKsJbfbjjWHbEcMCTEEuvCwXZWBxyQ=s96-c',
                }}
                receiver={{
                    userId: 'RBxEAehri7NF4EpR6zqJOsCDrbd2',
                    displayName: '⚡️Quản trị viên⚡️',
                    photoURL: '/avatar.png',
                }}
                messageId={'1'}
                type={'text'}
                text={'T'}
                files={[]}
                emotion={{
                    sender: '',
                    receiver: '',
                }}
                reply={{
                    replyToId: '',
                    replyText: '',
                    replyFiles: [],
                }}
                recall={false}
                unread={false}
                createdAt={'2024-06-10T15:39:20.856+00:00'}
                chatBoxRef={chatBoxRef}
            />
            {/* Admin gửi */}
            <ChatMessage
                sender={{
                    userId: 'RBxEAehri7NF4EpR6zqJOsCDrbd2',
                    displayName: '⚡️Quản trị viên⚡️',
                    photoURL: '/avatar.png',
                }}
                receiver={{
                    userId: '6d6dfHt6UcbT4ATiA0QymsClnrl1',
                    displayName: 'Boy\'s Love',
                    photoURL: 'https://lh3.googleusercontent.com/a/ACg8ocKhy5DmkS6gCeHgJeFLMKsJbfbjjWHbEcMCTEEuvCwXZWBxyQ=s96-c',
                }}
                messageId={'2'}
                type={'text'}
                text={'Tôi là Admin'}
                files={[]}
                emotion={{
                    sender: '❤️',
                    receiver: '😂',
                }}
                reply={{
                    replyToId: '',
                    replyText: '',
                    replyFiles: [],
                }}
                recall={false}
                unread={false}
                createdAt={'2024-06-10T15:39:20.856+00:00'}
                chatBoxRef={chatBoxRef}
            />

            <ChatMessage
                sender={{
                    userId: 'RBxEAehri7NF4EpR6zqJOsCDrbd2',
                    displayName: '⚡️Quản trị viên⚡️',
                    photoURL: '/avatar.png',
                }}
                receiver={{
                    userId: '6d6dfHt6UcbT4ATiA0QymsClnrl1',
                    displayName: 'Boy\'s Love',
                    photoURL: 'https://lh3.googleusercontent.com/a/ACg8ocKhy5DmkS6gCeHgJeFLMKsJbfbjjWHbEcMCTEEuvCwXZWBxyQ=s96-c',
                }}
                messageId={'2'}
                type={'image'}
                text={'Đây là hình ảnh'}
                files={[
                    { src: '/light-box-1.jpg', alt: '' },
                    { src: '/light-box-2.jpg', alt: '' },
                    { src: '/light-box-3.jpg', alt: '' },
                    { src: '/light-box-4.jpg', alt: '' },
                    { src: '/light-box-5.jpg', alt: '' },
                ]}
                emotion={{
                    sender: '',
                    receiver: '',
                }}
                reply={{
                    replyToId: '',
                    replyText: '',
                    replyFiles: [],
                }}
                recall={false}
                unread={false}
                createdAt={'2024-06-10T15:39:20.856+00:00'}
                chatBoxRef={chatBoxRef}
            />
            {/* {groupedMessages.length > 0 ? groupedMessages.map((group, index) => (
                <div className={styles._group} key={index}>
                    {group.map((message, index) => (
                        
                    ))}
                </div>
            )) : (
                <ChatWelcome
                    icon={<PiChatTeardropSlashThin />}
                    message={'Chưa có tin nhắn'}
                    description={'Hãy gửi tin nhắn đầu tiên của bạn'}
                />
            )} */}
        </div>
    )
}

export default ChatBox