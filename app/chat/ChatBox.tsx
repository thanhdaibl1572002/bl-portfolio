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
    emotion: string
    replyTo: Object | null
    recall: boolean
    unread: boolean
    createdAt: string
    updatedAt: string
    __v?: number
}

const ChatBox: FC = () => {
    const { theme } = useAppSelector(state => state.theme)
    const params = useParams()

    const [messages, setMessages] = useState<Array<IMessage>>([])

    const isAdmin = firebaseAuth.currentUser?.uid === process.env.ADMIN_ID

    const groupedMessages: Array<Array<IMessage>> = messages.reduce((acc: Array<Array<IMessage>>, message: IMessage) => {
        const lastGroup = acc[acc.length - 1]
        if (lastGroup && lastGroup[lastGroup.length - 1].from === message.from) {
            lastGroup.push(message)
        } else {
            acc.push([message])
        }
        return acc
    }, [])

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(
                    `${process.env.SERVER_URL as string}/message/get-all-message-by-user-id/${isAdmin ? params.userId : firebaseAuth.currentUser?.uid}`,
                    { headers: { Authorization: `Bearer ${await firebaseAuth.currentUser?.getIdToken(true)}` } }
                )
                const messages = response.data.data
                setMessages(messages)
            } catch (error) {
                setMessages([])
            }
        })()
    }, [isAdmin, params.userId])

    useEffect(() => {
        const handleReceiveMessage = (message: IMessage) => {
            setMessages(prevMessages => [...prevMessages, message])
        }
        if (isAdmin) socket.on('receiveMessage', handleReceiveMessage)    
        else socket.on('receiveMessage', handleReceiveMessage)
        return () => {
            if (isAdmin) socket.off('receiveMessage', handleReceiveMessage)
            else socket.off('receiveMessage', handleReceiveMessage)
        }
    }, [isAdmin])

    return (
        <div className={styles[`_container__${theme}`]}>
            {groupedMessages.length > 0 ? groupedMessages.map((group, index) => (
                <div className={styles._group} key={index}>
                    {group.map((message, index) => (
                        <ChatMessage
                            key={message._id}
                            type={message.type}
                            text={message.content}
                            imageSrc={message.content}
                            role={
                                isAdmin 
                                ? message.from === 'admin' ? 'sender' : 'receiver' 
                                : message.from === 'admin' ? 'receiver' : 'sender'
                            }
                            emotion={message.emotion}
                            replyText={''}
                            recall={message.recall}
                            createdAt={message.createdAt}
                            isNameVisible={index === 0}
                            nameVisible={isAdmin ? message.user.displayName : 'Trương Thành Đại BL'}
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