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

interface IChatMessageProps {
    role: 'sender' | 'receiver'
    type: 'text' | 'image'
    text?: string
    emotion?: string
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

const ReactionIcons: FC = () => (
    <ul className={styles._tool}>
        <li>👍</li>
        <li>❤️</li>
        <li>😂</li>
        <li>😮</li>
        <li>😢</li>
        <li>😡</li>
        <li><IoArrowUndoOutline /></li>
        <li><IoRefreshOutline /></li>
    </ul>
)

const ChatMessage: FC<IChatMessageProps> = ({
    role,
    text,
    type,
    emotion,
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
                <div className={styles._text}>
                    {text}
                    <ReactionIcons />
                    {emotion && <div className={styles._emotion}>{emotion}</div>}
                    <span className={styles._timestamp}><span>{formattedTime}</span> {formattedDate}</span>
                </div>
            )
        }
        if (type === 'image' && imageSrc) {
            return (
                <div className={styles._image}>
                    <LightBoxImage image={{ src: imageSrc, title: imageAlt }} iconColor={mainColor} />
                    <ReactionIcons />
                    {emotion && <div className={styles._emotion}>{emotion}</div>}
                    <span className={styles._timestamp}><span>{formattedTime}</span> {formattedDate}</span>
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
                    <div className={styles._urls}>
                        {URLs && URLs.length > 0 && URLs.map((url, index) => (
                            <Link key={index} href={url} target='_blank'>{new URL(url).hostname} <PiArrowSquareOutLight /></Link>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

export default memo(ChatMessage)