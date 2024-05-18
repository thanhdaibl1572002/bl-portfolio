import { FC } from 'react'
import styles from '@/app/chat/chattextarea.module.sass'
import { useAppSelector } from '@/redux'
import { getColorLevel, mainColor, mainGradientColor, whiteColor } from '@/variables/variables'
import { PiPaperPlaneRight } from 'react-icons/pi'
import Button from '@/components/forms/Button'

interface IChatTextAreaProps {

}

const ChatTextArea: FC<IChatTextAreaProps> = ({

}) => {
    const { theme } = useAppSelector(state => state.theme)
    return (
        <div className={styles[`_container__${theme}`]}>
            <textarea placeholder='Nhập vào tin nhắn của bạn' />
            <div className={styles._submit}>
                <Button
                    width={40}
                    height={40}
                    icon={<PiPaperPlaneRight />}
                    iconSize={25}
                    iconColor={whiteColor}
                    background={mainGradientColor}
                    animateDuration={300}
                    boxShadow={`0 1px 1.5px 0 ${getColorLevel(theme === 'light' ? whiteColor : mainColor, 10)}`}
                    bubbleColor={whiteColor}
                />
            </div>
        </div>
    )
}

export default ChatTextArea