import { FC, memo } from 'react'
import styles from '@/app/chat/chatsignin.module.sass'
import { useAppSelector } from '@/redux'
import Button from '../../components/forms/Button'
import { FcGoogle } from 'react-icons/fc'
import { darkColor, getColorLevel, mainColor, whiteColor } from '@/variables/variables'
import { googleSignIn } from '@/utils/firebase'

const ChatSignIn: FC = () => {
    const { theme } = useAppSelector(state => state.theme)
    return (
        <div className={styles._container}>
            <Button
                className={styles._switch__mode}
                width={180}
                height={40}
                icon={<FcGoogle />}
                iconSize={24}
                text={'Đăng nhập Google'}
                textColor={theme === 'light' ? darkColor : whiteColor}
                textSize={14}
                background={theme === 'light' ? getColorLevel(mainColor, 7) : getColorLevel(mainColor, 20)}
                animateDuration={300}
                boxShadow={`0 1px 1.5px 0 ${getColorLevel(theme === 'light' ? mainColor : whiteColor, 10)}`}
                bubbleColor={theme === 'light' ? mainColor : whiteColor}
                onClick={() => googleSignIn()}
            />
        </div>
    )
}

export default memo(ChatSignIn)