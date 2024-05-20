import { FC } from 'react'
import styles from '@/components/layouts/introduction.module.sass'
import { useAppSelector } from '@/redux'
import Button from '@/components/forms/Button'
import { getColorLevel, mainColor, redColor, whiteColor } from '@/variables/variables'
import Image from 'next/image'
import { VscClose, VscGithubAlt } from 'react-icons/vsc'
import { PiMessengerLogoLight } from 'react-icons/pi'
import { SlSocialFacebook } from 'react-icons/sl'
import { AiOutlineThunderbolt } from 'react-icons/ai'

const Introduction: FC = ({ }) => {
    const { theme } = useAppSelector(state => state.theme)
    return (
        <div className={styles[`_container__${theme}`]}>
            <Button
                className={styles._close_introduction}
                width={38}
                height={38}
                icon={<VscClose />}
                iconSize={21}
                iconColor={redColor}
                background={theme === 'light' ? getColorLevel(redColor, 7) : getColorLevel(redColor, 20)}
                animateDuration={300}
                boxShadow={`0 1px 1.5px 0 ${getColorLevel(theme === 'light' ? redColor : whiteColor, 10)}`}
                bubbleColor={theme === 'light' ? redColor : whiteColor}
            />
            <div className={styles._avatar}>
                <Image width={300} height={300} src='/avatar.png' alt='' />
            </div>
            <div className={styles._info}>
                <h2>Trương Thành Đại</h2>
                <ul>
                    <li><AiOutlineThunderbolt /> Sinh viên K20</li>
                    <li><AiOutlineThunderbolt /> Trường đại học Sài Gòn</li>
                    <li><AiOutlineThunderbolt /> Frontend Deverloper (React/Next.js)</li>
                    <li><AiOutlineThunderbolt /> Backend Deverloper (Express/Nest.js)</li>
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