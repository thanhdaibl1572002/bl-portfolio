'use client'
import { FC, RefObject, memo, useEffect, useId, useRef, useState } from 'react'
import styles from '@/app/chat/chatmessage.module.sass'
import { useAppSelector } from '@/redux'
import { IoArrowUndoOutline, IoRefreshOutline } from 'react-icons/io5'
import 'lightbox.js-react/dist/index.css'
import { formatDateTime } from '@/utils/format'
import Image from 'next/image'
import Link from 'next/link'
import { PiArrowSquareOutLight, PiChatCenteredDotsLight } from 'react-icons/pi'
import { socket } from '@/utils/socket'
import { firebaseAuth } from '@/utils/firebase'
import { useParams } from 'next/navigation'
import { ReplyContext } from '@/app/chat/ReplyProvider'

interface IFile {
    src: string,
    alt: string
}

interface IReply {
    replyToId?: string,
    replyText?: string,
    replyFiles?: Array<IFile>
}

interface IEmotion {
    sender?: string
    receiver?: string
}

interface IUser {
    userId: string
    socketId?: string
    displayName: string
    photoURL?: string
    createdAt?: Date
    updatedAt?: Date
}

interface IChatMessageProps {
    sender: IUser
    receiver: IUser
    messageId: string
    type: 'text' | 'image' | 'video' | 'pdf'
    text: string
    files?: Array<IFile>
    emotion?: IEmotion
    reply?: IReply
    recall: boolean
    unread: boolean
    createdAt: string
    chatBoxRef: RefObject<HTMLDivElement>
}

const ChatMessage: FC<IChatMessageProps> = ({
    sender,
    receiver,
    messageId,
    type,
    text,
    files,
    emotion,
    reply,
    recall,
    unread,
    createdAt,
    chatBoxRef,
}) => {

    const { theme } = useAppSelector(state => state.theme)

    const URLs = text ? text.match(/(https?:\/\/[^\s]+)/g) : []

    const side = sender.userId === firebaseAuth.currentUser?.uid ? 'send' : 'receive'

    const lightboxIdentifier = useId()

    const messageRef = useRef<HTMLDivElement>(null)

    const [isShowEmojis, setIsShowEmojis] = useState<boolean>(false)

    const render = (): JSX.Element | null => {
        switch (type) {
            case 'text':
                if (recall) return <p className={styles._recall}>Tin nhắn đã bị thu hồi</p>
                return (
                    <div className={styles._text}>
                        <div className={styles._content}>
                            {text}
                            {emotion && (emotion.sender || emotion.receiver) && (
                                <ul className={styles._emotion}>
                                    <li>{emotion.sender}</li>
                                    <li>{emotion.receiver}</li>
                                </ul>
                            )}
                            <span className={styles._tool} onClick={() => setIsShowEmojis(true)}><PiChatCenteredDotsLight /></span>
                            <Emojis 
                                side={side} 
                                createdAt={createdAt}
                                isShowEmojis={isShowEmojis}
                                setIsShowEmojis={setIsShowEmojis} 
                            />
                        </div>
                        {URLs && URLs.length > 0 && (
                            <div className={styles._urls}>
                                {URLs.map((url, index) => (
                                    <Link key={index} href={url} target='_blank'>{new URL(url).hostname} <PiArrowSquareOutLight /></Link>
                                ))}
                            </div>
                        )}
                    </div>
                )
            case 'image':
                if (recall) return <p className={styles._recall}>Tin nhắn đã bị thu hồi</p>
                if (!files || files.length === 0) return null
                return (
                    <div
                        className={styles._images}
                        style={{ columnCount: Math.min(2, files.length) }}
                    >
                        {files.slice(0, 4).map((image, index) => (
                            <div
                                key={index}
                                className={styles._image}
                                onClick={() => { }}
                            >
                                <Image width={200} height={200} src={image.src} alt={image.alt} />
                                {index === 3 && files.length > 4 && <span>+{files.length - 4}</span>}
                            </div>
                        ))}
                        {emotion && (emotion.sender || emotion.receiver) && (
                            <ul className={styles._emotion}>
                                <li>{emotion.sender}</li>
                                <li>{emotion.receiver}</li>
                            </ul>
                        )}
                        <span className={styles._tool} onClick={() => setIsShowEmojis(true)}><PiChatCenteredDotsLight /></span>
                        <Emojis 
                            side={side} 
                            createdAt={createdAt}
                            isShowEmojis={isShowEmojis}
                            setIsShowEmojis={setIsShowEmojis} 
                        />
                    </div>
                )
            case 'video':
                if (recall) return <p className={styles._recall}>Tin nhắn đã bị thu hồi</p>
                return null
            case 'pdf':
                if (recall) return <p className={styles._recall}>Tin nhắn đã bị thu hồi</p>
                return null
            default:
                return null
        }
    }

    return (
        <div
            className={styles[`_container__${theme}__${side}`]}
            ref={messageRef}
            data-message-id={messageId}
        >
            {side === 'receive' && (
                <strong className={styles._name}>
                    <Image width={28} height={28} src={sender.photoURL || ''} alt='' style={{ borderRadius: '50%' }} />
                    {sender.displayName}
                </strong>
            )}
            {render()}
        </div>
    )
}

export default memo(ChatMessage)

// <SlideshowLightbox 
//     downloadImages
//     showArrows={false}
//     images={files} 
//     showThumbnails
//     open={isOpenLightBox} 
//     lightboxIdentifier={lightboxIdentifier}
//     iconColor={mainColor}
//     onClose={() => setIsOpenLightBox(false)} 
// />


interface IEmojiProps {
    side: 'send' | 'receive'
    createdAt: string
    isShowEmojis: boolean
    setIsShowEmojis: (value: boolean) => void
}

const Emojis: FC<IEmojiProps> = ({
    side,
    createdAt,
    isShowEmojis,
    setIsShowEmojis,
}) => {
    const emojisRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (!emojisRef.current) return
            if (emojisRef.current.contains(event.target as Node)) return
            setIsShowEmojis(false)
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [setIsShowEmojis])

    const handleUpdateEmotion = (emoji: string): void => {
        setIsShowEmojis(false)
    }

    const handleReCall = (): void => {
        setIsShowEmojis(false)
    }

    const handleReply = (): void => {
        setIsShowEmojis(false)
    }

    if (!isShowEmojis) return null
    return (
        <div className={styles._emojis} ref={emojisRef}>
            <ul>
                {['👍', '❤️', '😂', '😮', '😢', '😡'].map(emoji => (
                    <li key={emoji} onClick={() => handleUpdateEmotion(emoji)}>{emoji}</li>
                ))}
                {side === 'send' && <li onClick={handleReCall}><IoRefreshOutline /></li>}
                <li onClick={handleReply}><IoArrowUndoOutline /></li>
            </ul>
            <time className={styles._timestamp}>{formatDateTime(createdAt)}</time>
        </div>
    )
}