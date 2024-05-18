import { FC } from 'react'
import styles from '@/components/layouts/introduction.module.sass'
import { useAppSelector } from '@/redux'
import Button from '../forms/Button'
import { getColorLevel, mainColor, whiteColor } from '@/variables/variables'
import { SiFacebook, SiGithub, SiGmail } from 'react-icons/si'
import Image from 'next/image'

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
                    width={38}
                    height={38}
                    icon={<SiFacebook />}
                    iconSize={20}
                    iconColor={mainColor}
                    background={theme === 'light' ? whiteColor : getColorLevel(mainColor, 20)}
                    animateDuration={250}
                    boxShadow={`0 1px 1.5px 0 ${getColorLevel(theme === 'light' ? mainColor : whiteColor, 10)}`}
                    bubbleColor={theme === 'light' ? mainColor : whiteColor}
                />
                <Button
                    width={38}
                    height={38}
                    icon={<SiGithub />}
                    iconSize={20}
                    iconColor={mainColor}
                    background={theme === 'light' ? whiteColor : getColorLevel(mainColor, 20)}
                    animateDuration={250}
                    boxShadow={`0 1px 1.5px 0 ${getColorLevel(theme === 'light' ? mainColor : whiteColor, 10)}`}
                    bubbleColor={theme === 'light' ? mainColor : whiteColor}
                />
                <Button
                    width={38}
                    height={38}
                    icon={<SiGmail />}
                    iconSize={20}
                    iconColor={mainColor}
                    background={theme === 'light' ? whiteColor : getColorLevel(mainColor, 20)}
                    animateDuration={250}
                    boxShadow={`0 1px 1.5px 0 ${getColorLevel(theme === 'light' ? mainColor : whiteColor, 10)}`}
                    bubbleColor={theme === 'light' ? mainColor : whiteColor}
                />
            </div>
        </div>
    )
}

export default Introduction