import { FC, memo } from 'react'
import styles from '@/components/layouts/signin.module.sass'
import { useAppSelector } from '@/redux'
import Button from '../forms/Button'
import { FcGoogle } from 'react-icons/fc'
import { darkColor, getColorLevel, mainColor, whiteColor } from '@/variables/variables'
import { PiUserCircleLight } from 'react-icons/pi'
import { googleSignIn } from '@/utils/firebaseConfig'


const SignIn: FC = () => {
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
            <Button
                className={styles._switch__mode}
                width={180}
                height={40}
                icon={<PiUserCircleLight />}
                iconColor={mainColor}
                iconSize={24}
                text={'Đăng nhập Ẩn danh'}
                textColor={theme === 'light' ? darkColor : whiteColor}
                textSize={14}
                background={theme === 'light' ? getColorLevel(mainColor, 7) : getColorLevel(mainColor, 20)}
                animateDuration={300}
                boxShadow={`0 1px 1.5px 0 ${getColorLevel(theme === 'light' ? mainColor : whiteColor, 10)}`}
                bubbleColor={theme === 'light' ? mainColor : whiteColor}
            />
        </div>
    )
}

export default memo(SignIn)