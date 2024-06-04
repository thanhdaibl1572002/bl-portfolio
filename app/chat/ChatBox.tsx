import { FC, useEffect, useState } from 'react'
import styles from '@/app/chat/chatbox.module.sass'
import { useAppSelector } from '@/redux'
import ChatMessage from '@/app/chat/ChatMessage'
import ChatWelcome from '@/app/chat/ChatWelcome'
import { useParams } from 'next/navigation'
import { firebaseAuth } from '@/utils/firebase'
import axios from 'axios'
import { socket } from '@/utils/socket'
import { PiChatTeardropSlashThin } from 'react-icons/pi'

interface IMessage {
    _id: string
    user: {
        _id: string
        userId: string
        displayName: string
        photoURL: string
    }
    from: string
    type: 'text' | 'image'
    content: string
    emotions?: {
        admin?: string
        user?: string
    }
    replyTo?: Object | null
    recall?: boolean
    unread?: boolean
    createdAt: string
    updatedAt: string
    __v?: number
}

const ChatBox: FC = () => {
    const { theme } = useAppSelector(state => state.theme)
    const params = useParams()

    // const [messages, setMessages] = useState<Array<IMessage>>([])

    const messages: Array<IMessage> = [{"emotions":{"admin":"❤️"},"_id":"665f22e73e44e88f9eee55da","user":{"_id":"665d3b0a3130bd7ee525f7bc","userId":"6d6dfHt6UcbT4ATiA0QymsClnrl1","displayName":"Thành Đại Trương","photoURL":"https://lh3.googleusercontent.com/a/ACg8ocKhy5DmkS6gCeHgJeFLMKsJbfbjjWHbEcMCTEEuvCwXZWBxyQ=s96-c"},"from":"6d6dfHt6UcbT4ATiA0QymsClnrl1","type":"text","content":"Xin chào Admin","recall":false,"unread":true,"createdAt":"2024-06-04T14:21:27.722Z","updatedAt":"2024-06-04T14:21:27.722Z","__v":0},{"emotions":{"user":"😂"},"_id":"665f2b91b6521424c986ef67","user":{"_id":"665d3b0a3130bd7ee525f7bc","userId":"6d6dfHt6UcbT4ATiA0QymsClnrl1","displayName":"Thành Đại Trương","photoURL":"https://lh3.googleusercontent.com/a/ACg8ocKhy5DmkS6gCeHgJeFLMKsJbfbjjWHbEcMCTEEuvCwXZWBxyQ=s96-c"},"from":"admin","type":"text","content":"Chào bạn","recall":false,"unread":true,"createdAt":"2024-06-04T14:58:25.969Z","updatedAt":"2024-06-04T14:58:25.969Z","__v":0},{"_id":"665f33c2b6521424c986eff4","user":{"_id":"665d3b0a3130bd7ee525f7bc","userId":"6d6dfHt6UcbT4ATiA0QymsClnrl1","displayName":"Thành Đại Trương","photoURL":"https://lh3.googleusercontent.com/a/ACg8ocKhy5DmkS6gCeHgJeFLMKsJbfbjjWHbEcMCTEEuvCwXZWBxyQ=s96-c"},"from":"admin","type":"text","content":"Bạn khỏe chứ 😁","recall":false,"unread":true,"createdAt":"2024-06-04T15:33:22.790Z","updatedAt":"2024-06-04T15:33:22.790Z","__v":0},{"emotions":{"admin":"😮"},"_id":"665f3407b6521424c986effa","user":{"_id":"665d3b0a3130bd7ee525f7bc","userId":"6d6dfHt6UcbT4ATiA0QymsClnrl1","displayName":"Thành Đại Trương","photoURL":"https://lh3.googleusercontent.com/a/ACg8ocKhy5DmkS6gCeHgJeFLMKsJbfbjjWHbEcMCTEEuvCwXZWBxyQ=s96-c"},"from":"6d6dfHt6UcbT4ATiA0QymsClnrl1","type":"image","content":"45ef48f6-50d9-4726-a0c5-9dcb38299236.png","recall":false,"unread":true,"createdAt":"2024-06-04T15:34:31.449Z","updatedAt":"2024-06-04T15:34:31.449Z","__v":0},{"_id":"665f3407b6521424c986effb","user":{"_id":"665d3b0a3130bd7ee525f7bc","userId":"6d6dfHt6UcbT4ATiA0QymsClnrl1","displayName":"Thành Đại Trương","photoURL":"https://lh3.googleusercontent.com/a/ACg8ocKhy5DmkS6gCeHgJeFLMKsJbfbjjWHbEcMCTEEuvCwXZWBxyQ=s96-c"},"from":"6d6dfHt6UcbT4ATiA0QymsClnrl1","type":"image","content":"68daf3c0-95ff-4e50-ae5c-b18a2df511e7.png","recall":false,"unread":true,"createdAt":"2024-06-04T15:34:31.451Z","updatedAt":"2024-06-04T15:34:31.451Z","__v":0},{"_id":"665f3496b6521424c986f003","user":{"_id":"665d3b0a3130bd7ee525f7bc","userId":"6d6dfHt6UcbT4ATiA0QymsClnrl1","displayName":"Thành Đại Trương","photoURL":"https://lh3.googleusercontent.com/a/ACg8ocKhy5DmkS6gCeHgJeFLMKsJbfbjjWHbEcMCTEEuvCwXZWBxyQ=s96-c"},"from":"6d6dfHt6UcbT4ATiA0QymsClnrl1","type":"text","content":"Ảnh đẹp chứ?","recall":false,"unread":true,"createdAt":"2024-06-04T15:36:54.197Z","updatedAt":"2024-06-04T15:36:54.197Z","__v":0},{"_id":"665f34abb6521424c986f009","user":{"_id":"665d3b0a3130bd7ee525f7bc","userId":"6d6dfHt6UcbT4ATiA0QymsClnrl1","displayName":"Thành Đại Trương","photoURL":"https://lh3.googleusercontent.com/a/ACg8ocKhy5DmkS6gCeHgJeFLMKsJbfbjjWHbEcMCTEEuvCwXZWBxyQ=s96-c"},"from":"admin","type":"text","content":"Quá trời đẹp luôn","recall":false,"unread":true,"createdAt":"2024-06-04T15:37:15.396Z","updatedAt":"2024-06-04T15:37:15.396Z","__v":0}]

    const userId = firebaseAuth.currentUser?.uid
    const tokenId = firebaseAuth.currentUser?.getIdToken(true)
    const isAdmin = userId === process.env.ADMIN_ID

    const groupedMessages: Array<Array<IMessage>> = messages.reduce((acc: Array<Array<IMessage>>, message: IMessage) => {
        const lastGroup = acc[acc.length - 1]
        if (lastGroup && lastGroup[lastGroup.length - 1].from === message.from) {
            lastGroup.push(message)
        } else {
            acc.push([message])
        }
        return acc
    }, [])

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
    //     const handleReceiveMessage = (message: IMessage) => {
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
    //     const handleUpdateMessage = (message: IMessage) => {
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

    return (
        <div className={styles[`_container__${theme}`]}>
            {groupedMessages.length > 0 ? groupedMessages.map((group, index) => (
                <div className={styles._group} key={index}>
                    {group.map((message, index) => (
                        <ChatMessage
                            key={message._id}
                            messageId={message._id}
                            type={message.type}
                            text={message.content}
                            imageSrc={message.content}
                            role={
                                isAdmin 
                                ? message.from === 'admin' ? 'sender' : 'receiver' 
                                : message.from === 'admin' ? 'receiver' : 'sender'
                            }
                            emotions={message.emotions}
                            replyText={''}
                            recall={message.recall}
                            createdAt={message.createdAt}
                            isNameVisible={index === 0}
                            nameVisible={isAdmin ? message.user.displayName : '⚡QTV⚡'}
                            avatarSrc={isAdmin ? message.user.photoURL : '/message.jpeg'}
                        />
                    ))}
                </div>
            )) : (
                <ChatWelcome 
                    icon={<PiChatTeardropSlashThin />}
                    message={'Chưa có tin nhắn'}
                    description={'Hãy gửi tin nhắn đầu tiên của bạn'}
                />
            )}
        </div>
    )
}

export default ChatBox