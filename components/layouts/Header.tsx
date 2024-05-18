import { FC } from 'react'
import styles from '@/components/layouts/header.module.sass'
import { useAppDispatch, useAppSelector } from '@/redux'
import Link from 'next/link'
import Logo from '@/components/layouts/Logo'
import Button from '@/components/forms/Button'
import { PiChatTeardropTextLight, PiMoonLight, PiPhoneOutgoing, PiSunDimLight } from 'react-icons/pi'
import { getColorLevel, mainColor, mainGradientColor, whiteColor } from '@/variables/variables'
import { setTheme } from '@/redux/slices/themeSlice'
import { IoGridOutline, IoHomeOutline } from 'react-icons/io5'
import { AiOutlineThunderbolt } from 'react-icons/ai'
import { useRouter } from 'next/navigation'

const Header: FC = () => {
    const { theme } = useAppSelector(state => state.theme)
    const dispatch = useAppDispatch()
    const router = useRouter()
    return (
        <header className={styles[`_container__${theme}`]}>
            <Logo />
            <ul className={styles._menu}>
                <li>
                    <Link href={'/'} className={styles._active}><IoHomeOutline style={{ fontSize: 20 }}/> Tổng quan</Link>
                </li>
                <li>
                    <Link href={'skill'}><AiOutlineThunderbolt style={{ fontSize: 22 }}/> Kỹ năng</Link>
                </li>
                <li>
                    <Link href={'project'}><IoGridOutline style={{ fontSize: 20 }}/> Dự án</Link>
                </li>
                <li>
                    <Link href={'/contact'}><PiPhoneOutgoing style={{ fontSize: 22 }}/> Liên hệ</Link>
                </li>
            </ul>
            <div className={styles._tool}>
                <Button
                    width={40}
                    height={40}
                    icon={theme === 'light' ? <PiMoonLight /> : <PiSunDimLight />}
                    iconSize={24}
                    iconColor={mainColor}
                    background={theme === 'light' ? getColorLevel(mainColor, 7) : getColorLevel(mainColor, 20)}
                    animateDuration={300}
                    boxShadow={`0 1px 1.5px 0 ${getColorLevel(theme === 'light' ? mainColor : whiteColor, 10)}`}
                    bubbleColor={theme === 'light' ? mainColor : whiteColor}
                    onClick={() => dispatch(setTheme(theme === 'light' ? 'dark' : 'light'))}
                />
                <Button
                    width={'fit-content'}
                    height={40}
                    icon={<PiChatTeardropTextLight />}
                    iconSize={24}
                    text={'Nhắn tin với tôi'}
                    textColor={whiteColor}
                    iconColor={whiteColor}
                    background={mainGradientColor}
                    animateDuration={500}
                    boxShadow={`0 1px 1.5px 0 ${getColorLevel(theme === 'light' ? whiteColor : mainColor, 10)}`}
                    bubbleColor={whiteColor}
                    onClick={() => router.push('/chat')}
                />
            </div>
        </header>
    )
}

export default Header