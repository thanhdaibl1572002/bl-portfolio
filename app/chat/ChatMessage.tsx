/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
'use client'
import { FC, memo } from 'react'
import styles from '@/app/chat/chatmessage.module.sass'
import { useAppSelector } from '@/redux'
import { IoArrowUndoOutline, IoRefreshOutline } from 'react-icons/io5'
import { Image as LightBoxImage } from 'lightbox.js-react'
import 'lightbox.js-react/dist/index.css'
import { mainColor } from '@/variables/variables'
import { formatDateTime } from '@/utils/format'
import Image from 'next/image'
import Link from 'next/link'
import { PiArrowSquareOutLight } from 'react-icons/pi'
import { socket } from '@/utils/socket'
import { firebaseAuth } from '@/utils/firebase'
import { useParams } from 'next/navigation'

interface IChatMessageProps {
    messageId: string
    role: 'sender' | 'receiver'
    type: 'text' | 'image'
    text?: string
    emotions?: {
        admin?: string
        user?: string
    }
    imageSrc?: string
    imageAlt?: string
    replyText?: string
    replyImageSrc?: string
    replyImageAlt?: string
    recall?: boolean
    createdAt: string
    nameVisible?: string
    isNameVisible: boolean,
    avatarSrc?: string
}

const emojis = ['👍', '❤️', '😂', '😮', '😢', '😡']

interface IEmojiProps {
    messageId: string
}

const Emoji: FC<IEmojiProps> = memo(({ messageId }) => {
    const userId = firebaseAuth.currentUser?.uid
    const isAdmin = userId === process.env.ADMIN_ID
    const params = useParams()
    const handleUpdateEmotion = (emoji: string): void => {
        socket.emit('updateEmotion', { 
            userId: isAdmin ? decodeURIComponent(params.userId as string) : userId,
            messageId: messageId, 
            emotion: emoji, 
            from: isAdmin ? 'admin' : userId, 
        })
    }
    return (
        <ul className={styles._emojis}>
            {emojis.map((emoji, index) => (
                <li key={index} onClick={() => handleUpdateEmotion(emoji)}>{emoji}</li>
            ))}
            <li><IoArrowUndoOutline /></li>
            <li><IoRefreshOutline /></li>
        </ul>
    )
})
Emoji.displayName = 'Emoji'

const ChatMessage: FC<IChatMessageProps> = ({
    messageId,
    role,
    text,
    type,
    emotions,
    imageSrc,
    imageAlt,
    replyText,
    replyImageSrc,
    replyImageAlt,
    recall,
    createdAt,
    nameVisible,
    isNameVisible,
    avatarSrc,
}) => {
    const { theme } = useAppSelector(state => state.theme)

    const { formattedDate, formattedTime } = formatDateTime(createdAt)

    const URLs = text ? text.match(/(https?:\/\/[^\s]+)/g) : []

    const userId = firebaseAuth.currentUser?.uid
    const isAdmin = userId === process.env.ADMIN_ID

    const renderReply = () => (
        <>
            {replyText && <p className={styles._reply__text}>Trả lời: {replyText.length >= 80 ? `${replyText.substring(0, 80)}...` : replyText}</p>}
            {replyImageSrc && (
                <div className={styles._reply__image}>
                    Trả lời:
                    <img src={replyImageSrc} alt={replyImageAlt || ''} />
                </div>
            )}
        </>
    )

    const renderContent = () => {
        if (type === 'text' && text) {
            return (
                <div className={styles._text} style={{ marginBottom: emotions ? 15 : 0 }}>
                    <div className={styles._tool}>
                        {text}
                        <Emoji messageId={messageId}/>
                        <span className={styles._timestamp}><span>{formattedTime}</span> {formattedDate}</span>
                    </div>
                    {emotions && (
                        <ul className={styles._emotions}>
                            {emotions.admin && <li>{emotions.admin} <span>{isAdmin ? 'Bạn' : 'QTV' }</span></li>}
                            {emotions.user && <li>{emotions.user} <span>{isAdmin ? 'ND' : 'Bạn' }</span></li>}
                        </ul>
                    )}
                </div>
            )
        }
        if (type === 'image' && imageSrc) {
            return (
                <div className={styles._image} style={{ marginBottom: emotions ? 15 : 0 }}>
                    <div className={styles._tool}>
                        <LightBoxImage 
                            image={{ src: `${process.env.SERVER_URL}/${imageSrc}`, title: imageAlt }} 
                            iconColor={mainColor} 
                        />
                        <Emoji messageId={messageId}/>
                        <span className={styles._timestamp}><span>{formattedTime}</span> {formattedDate}</span>
                    </div>
                    {emotions && (
                        <ul className={styles._emotions}>
                            {emotions.admin && <li>{emotions.admin} <span>{isAdmin ? 'Bạn' : 'QTV' }</span></li>}
                            {emotions.user && <li>{emotions.user} <span>{isAdmin ? 'ND' : 'Bạn' }</span></li>}
                        </ul>
                    )}
                </div>
            )
        }
        return null
    }

    return (
        <div className={styles[`_container__${theme}__${role}`]}>
            {role === 'receiver' && isNameVisible && (
                <strong>
                    <Image width={28} height={28} src={avatarSrc ?? '/message.jpeg'} alt='' /> {nameVisible ?? 'Trương Thành Đại'}
                </strong>
            )}
            {recall ? (
                <div className={styles._message}>
                    <div className={styles._recall__text}>Tin nhắn đã bị thu hồi</div>
                </div>
            ) : (
                <>
                    <div className={styles._message}>
                        {renderReply()}
                        {renderContent()}
                    </div>
                    {URLs && URLs.length > 0 && (
                        <div className={styles._urls}>
                            {URLs.map((url, index) => (
                                <Link key={index} href={url} target='_blank'>{new URL(url).hostname} <PiArrowSquareOutLight /></Link>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default memo(ChatMessage)