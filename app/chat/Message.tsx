/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
'use client'
import { FC, memo, useEffect } from 'react'
import styles from '@/app/chat/message.module.sass'
import { useAppSelector } from '@/redux'
import { IoArrowUndoOutline, IoRefreshOutline } from 'react-icons/io5'
import { Image } from 'lightbox.js-react'
import 'lightbox.js-react/dist/index.css'
import { blackColor, darkColor, getColorLevel, mainColor, whiteColor } from '@/variables/variables'

interface IMessageProps {
    role: 'sender' | 'receiver',
    type: 'text' | 'image'
    text?: string
    emotion?: string
    imageSrc?: string
    imageAlt?: string
    replyText?: string
    replyImageSrc?: string
    replyImageAlt?: string
}

const Message: FC<IMessageProps> = ({
    role,
    text,
    type,
    emotion,
    imageSrc,
    imageAlt,
    replyText,
    replyImageSrc,
    replyImageAlt,
}) => {
    const { theme } = useAppSelector(state => state.theme)

    return (
        <div className={styles[`_container__${theme}__${role}`]}>
            <div className={styles._message}>
                {replyText && <p className={styles._reply__text}>Trả lời: {replyText}</p>}
                {replyImageSrc && <img className={styles._reply__image} src={replyImageSrc} alt={replyImageAlt} />}
                {text && type === 'text' && (
                    <div className={styles._text}>
                        {text}
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
                        <div className={styles._emotion}>{emotion}</div>
                    </div>
                )}
                {imageSrc && type === 'image' && (
                    <div className={styles._image}>
                        <Image
                            image={{ src: imageSrc, title: imageAlt }}
                            iconColor={mainColor}
                        />
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
                        <div className={styles._emotion}>{emotion}</div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default memo(Message)