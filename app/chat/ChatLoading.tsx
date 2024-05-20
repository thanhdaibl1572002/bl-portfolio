import { FC } from 'react'
import styles from '@/app/chat/chatloading.module.sass'
import { useAppSelector } from '@/redux'

const ChatLoading: FC = () => {
    const { theme } = useAppSelector(state => state.theme)
    return (
        <div className={styles[`_container__${theme}`]}>
            <span className={styles._loading}></span>
            Đang tải đoạn hội thoại
        </div>
    )
}

export default ChatLoading