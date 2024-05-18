'use client'
import { FC } from 'react'
import styles from '@/app/chat/chat.module.sass'
import { useAppSelector } from '@/redux'
import ChatBox from '@/app/chat/ChatBox'
import ChatTextArea from '@/app/chat/ChatTextArea'

const Chat: FC = () => {
    const { theme } = useAppSelector(state => state.theme)
    return (
        <div className={styles[`_container__${theme}`]}>
            <ChatBox />
            <ChatTextArea />
        </div>
    )
}

export default Chat