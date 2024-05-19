import { FC } from 'react'
import styles from '@/components/layouts/introduction.module.sass'
import { useAppSelector } from '@/redux'
import Button from '@/components/forms/Button'
import { getColorLevel, mainColor, whiteColor } from '@/variables/variables'
import Image from 'next/image'
import { VscGithubAlt } from 'react-icons/vsc'
import { PiMessengerLogoLight } from 'react-icons/pi'
import { SlSocialFacebook } from 'react-icons/sl'

const Introduction: FC = ({ }) => {
    const { theme } = useAppSelector(state => state.theme)
    return (
        <div className={styles[`_container__${theme}`]}>
            <div className={styles._avatar}>
                <Image width={300} height={300} src='/avatar.png' alt='' />
            </div>
            <div className={styles._info}>
                <h2>👋 Trương Thành Đại 👋</h2>
                <ul>
                    <li><span>&#x25CF;</span> Sinh viên K20</li>
                    <li><span>&#x25CF;</span> Trường đại học Sài Gòn</li>
                    <li><span>&#x25CF;</span> Frontend Deverloper (React/Next.js)</li>
                    <li><span>&#x25CF;</span> Backend Deverloper (Express/Nest.js)</li>
                </ul>
            </div>
            <div className={styles._social}>
                <Button
                    className={styles._switch__mode}
                    width={38}
                    height={38}
                    icon={<VscGithubAlt />}
                    iconSize={21}
                    iconColor={mainColor}
                    background={theme === 'light' ? getColorLevel(mainColor, 7) : getColorLevel(mainColor, 20)}
                    animateDuration={300}
                    boxShadow={`0 1px 1.5px 0 ${getColorLevel(theme === 'light' ? mainColor : whiteColor, 10)}`}
                    bubbleColor={theme === 'light' ? mainColor : whiteColor}
                />
                <Button
                    className={styles._switch__mode}
                    width={38}
                    height={38}
                    icon={<SlSocialFacebook />}
                    iconSize={21}
                    iconColor={mainColor}
                    background={theme === 'light' ? getColorLevel(mainColor, 7) : getColorLevel(mainColor, 20)}
                    animateDuration={300}
                    boxShadow={`0 1px 1.5px 0 ${getColorLevel(theme === 'light' ? mainColor : whiteColor, 10)}`}
                    bubbleColor={theme === 'light' ? mainColor : whiteColor}
                />
                <Button
                    className={styles._switch__mode}
                    width={38}
                    height={38}
                    icon={<PiMessengerLogoLight />}
                    iconSize={22}
                    iconColor={mainColor}
                    background={theme === 'light' ? getColorLevel(mainColor, 7) : getColorLevel(mainColor, 20)}
                    animateDuration={300}
                    boxShadow={`0 1px 1.5px 0 ${getColorLevel(theme === 'light' ? mainColor : whiteColor, 10)}`}
                    bubbleColor={theme === 'light' ? mainColor : whiteColor}
                />
            </div>
        </div>
    )
}

export default Introduction