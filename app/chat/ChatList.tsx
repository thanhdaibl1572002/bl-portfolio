import { useRef, forwardRef, useImperativeHandle, ForwardRefRenderFunction } from 'react'
import styles from '@/app/chat/chatlist.module.sass'
import { useAppSelector } from '@/redux'
import Image from 'next/image'
import Link from 'next/link'

interface IChatListProps {}

const ChatList: ForwardRefRenderFunction<{ open: () => void }, IChatListProps> = (props, ref) => {
    const { theme } = useAppSelector(state => state.theme)
    const chatListContainerRef = useRef<HTMLDivElement>(null)
    const chatListRef = useRef<HTMLUListElement>(null)

    const handleCloseChatList = (): void => {
        if (!chatListContainerRef.current || !chatListRef.current) return
        chatListContainerRef.current.style.opacity = '0'
        chatListContainerRef.current.style.visibility = 'hidden'
    }

    useImperativeHandle(ref, () => ({
        open() {
            if (!chatListContainerRef.current || !chatListRef.current) return
            chatListContainerRef.current.style.opacity = '1'
            chatListContainerRef.current.style.visibility = 'visible'
        },
    }), [])

    return (
        <div className={styles[`_container__${theme}`]} ref={chatListContainerRef}>
            <div className={styles._close__chat__list} onClick={handleCloseChatList}></div>
            <ul ref={chatListRef}>
                <li>
                    <h3>Tin nhắn (20)</h3>
                </li>
                <li className={styles._unread}>
                    <Link href={'#'}>
                        <Image width={40} height={40} src={'/message.jpeg'} alt='' />
                        <strong>Trương Thành Đại <p>Xin chào, tôi tên là...</p></strong>
                    </Link>
                </li>
                <li className={styles._active}>
                    <Link href={'#'}>
                        <Image width={40} height={40} src={'/message.jpeg'} alt='' />
                        <strong>Trương Thành Đại <p>Xin chào, tôi tên là...</p></strong>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default forwardRef(ChatList)
