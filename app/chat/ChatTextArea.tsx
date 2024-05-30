import { ChangeEvent, FC, memo, use, useEffect, useState } from 'react'
import styles from '@/app/chat/chattextarea.module.sass'
import { useAppSelector } from '@/redux'
import { getColorLevel, mainColor, mainGradientColor, whiteColor } from '@/variables/variables'
import { PiImageSquareLight, PiPaperPlaneRightLight } from 'react-icons/pi'
import Button from '@/components/forms/Button'
import { firebaseAuth } from '@/utils/firebase'
import { socket } from '@/utils/socket'

const ChatTextArea: FC = () => {
    const { theme } = useAppSelector(state => state.theme)

    useEffect(() => {
        socket.emit('updateSocketId', { email: firebaseAuth.currentUser?.email })
        return () => {
            socket.off('updateSocketId')
        }
    }, [])

    useEffect(() => {
        socket.on('receiveUser', (data) => {
            console.log(data)
        })
        return () => {
            socket.off('receiveUser')
        }
    }, [])

    useEffect(() => {
        socket.on('receiveAdmin', (data) => {
            console.log(data)
        })
        return () => {
            socket.off('receiveAdmin')
        }
    }, [])

    const [messageText, setMessageText] = useState<string>('')

    const handleMessageTextChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
        setMessageText(event.target.value)
    }

    const handleSendMessageText = async (): Promise<void> => {
        if (!messageText) return
        if (firebaseAuth.currentUser?.email === process.env.ADMIN_EMAIL) {
            socket.emit('sendToUser', { message: messageText, email: 'thanhdai11733621@gmail.com' })
        } else {
            socket.emit('sendToAdmin', { message: messageText, email: firebaseAuth.currentUser?.email })
        }
        setMessageText('')
    }

    return (
        <div className={styles[`_container__${theme}`]}>
            <Button
                width={40}
                height={40}
                icon={<PiImageSquareLight />}
                iconSize={24}
                iconColor={mainColor}
                background={theme === 'light' ? getColorLevel(mainColor, 7) : getColorLevel(mainColor, 20)}
                animateDuration={300}
                boxShadow={`0 1px 1.5px 0 ${getColorLevel(theme === 'light' ? mainColor : whiteColor, 10)}`}
                bubbleColor={theme === 'light' ? mainColor : whiteColor}
            />
            <textarea
                placeholder='Nhập vào tin nhắn của bạn'
                value={messageText}
                onChange={handleMessageTextChange}
            />
            <Button
                width={40}
                height={40}
                icon={<PiPaperPlaneRightLight />}
                iconSize={25}
                iconColor={whiteColor}
                background={mainGradientColor}
                animateDuration={300}
                boxShadow={`0 1px 1.5px 0 ${getColorLevel(theme === 'light' ? whiteColor : mainColor, 10)}`}
                bubbleColor={whiteColor}
                onClick={handleSendMessageText}
            />
        </div>
    )
}

export default memo(ChatTextArea)