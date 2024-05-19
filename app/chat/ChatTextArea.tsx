import { FC } from 'react'
import styles from '@/app/chat/chattextarea.module.sass'
import { useAppSelector } from '@/redux'
import { getColorLevel, mainColor, mainGradientColor, whiteColor } from '@/variables/variables'
import { PiImageSquareLight, PiPaperPlaneRightLight } from 'react-icons/pi'
import Button from '@/components/forms/Button'

interface IChatTextAreaProps {

}

const ChatTextArea: FC<IChatTextAreaProps> = ({

}) => {
    const { theme } = useAppSelector(state => state.theme)
    return (
        <div className={styles[`_container__${theme}`]}>
            <Button
                className={styles._switch__mode}
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
            <textarea placeholder='Nhập vào tin nhắn của bạn' />
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
            />
        </div>
    )
}

export default ChatTextArea