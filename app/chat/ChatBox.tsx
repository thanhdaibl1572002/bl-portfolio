import { FC } from 'react'
import styles from '@/app/chat/chatbox.module.sass'
import { useAppSelector } from '@/redux'
import Message from '@/app/chat/Message'
import Image from 'next/image'

interface IChatBoxProps {

}

const ChatBox: FC<IChatBoxProps> = ({

}) => {
    const { theme } = useAppSelector(state => state.theme)
    return (
        <div className={styles[`_container__${theme}`]}>
            <div className={styles._group}>
                <strong><Image width={28} height={28} src={'/message.jpeg'} alt='' />Trương Thành Đại</strong>
                <Message type='text' text='Xin chào, tôi tên là Trương Thành Đại. Bạn có muốn xem các dự án cá nhân của tôi? 😄' role='receiver' />
            </div>
            <div className={styles._group}>
                <Message type='text' text='Chào Đại! Tất nhiên, mình rất muốn xem.' role='sender' emotion='❤️' />
            </div>
            <div className={styles._group}>
                <strong><Image width={28} height={28} src={'/message.jpeg'} alt='' />Trương Thành Đại</strong>
                <Message type='text' text='Đây là hình ảnh dự án mới nhất của mình.' role='receiver' />
                <Message type='text' text='Bạn có thể xem nó tại đây.' role='receiver' />
                <Message type='image' imageSrc='/message.jpeg' role='receiver' />
            </div>
            <div className={styles._group}>
                <Message type='image' imageSrc='/message.jpeg' role='sender' />
            </div>
            <div className={styles._group}>
                <strong><Image width={28} height={28} src={'/message.jpeg'} alt='' />Trương Thành Đại</strong>
                <Message type='text' text='Wow, trông rất ấn tượng! Bạn có thể chia sẻ thêm chi tiết về dự án này không?' role='receiver' />
            </div>
            <div className={styles._group}>
                <Message type='text' text='Cảm ơn! Đây là một dự án về trí tuệ nhân tạo.' role='sender' />
                <Message type='text' text='Nghe thú vị quá! Mình cũng đang làm việc với một dự án AI.' role='sender' />
            </div>
            <div className={styles._group}>
                <strong><Image width={28} height={28} src={'/message.jpeg'} alt='' />Trương Thành Đại</strong>
                <Message type='image' imageSrc='/message.jpeg' role='receiver' emotion='❤️'/>
            </div>
            <div className={styles._group}>
                <Message type='image' imageSrc='/message.jpeg' role='sender' emotion='❤️'/>
            </div>
            <div className={styles._group}>
                <Message replyText='Cảm ơn! Đây là một dự án về trí tuệ nhân tạo.' type='text' text='Đây là tin nhắn có phản hồi' role='sender' emotion='❤️'/>
            </div>
            <div className={styles._group}>
                <Message replyText='Cảm ơn! Đây là một dự án về trí tuệ nhân tạo.' type='text' text='Đây là tin nhắn có phản hồi' role='receiver' />
                <Message replyText='Wow, trông rất ấn tượng! Bạn có thể chia sẻ thêm chi tiết về dự án này không?' type='text' text='Đây là tin nhắn có phản hồi' role='receiver' emotion='❤️'/>
            </div>
            <div className={styles._group}>
                <Message type='text' text='Chào' role='sender' emotion='❤️' />
            </div>
            <div className={styles._group}>
                <Message replyImageSrc='/message.jpeg' role='sender' text='Bạn rất đẹp trai đấy!' type='text' />
            </div>
            <div className={styles._group}>
                <Message replyImageSrc='/message.jpeg' role='sender' imageSrc='/message.jpeg' type='image' />
            </div>
            <div className={styles._group}>
                <Message recall type='text' text='Chào' role='sender' emotion='❤️' />
            </div>
            <div className={styles._group}>
                <Message recall type='text' text='Chào' role='receiver' emotion='❤️' />
            </div>
        </div>
    )
}

export default ChatBox