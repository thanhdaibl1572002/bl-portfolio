'use client'
import { FC, ReactElement, ReactNode, MouseEvent, useState, useRef, useCallback, memo, CSSProperties, useLayoutEffect } from 'react'
import styles from '@/components/forms/button.module.sass'
import { AiOutlineLoading } from 'react-icons/ai'
import { getColorLevel } from '@/variables/variables'
import { useRouter } from 'next/navigation'

interface ButtonCssProperties extends CSSProperties {
    '--animate-duration': string
}

export interface IButtonProps {
    width?: number | string
    height?: number | string
    padding?: number
    gap?: number
    text?: string
    textSize?: number
    textColor?: string
    textWeight?: number
    icon?: ReactNode | ReactElement
    iconSize?: number
    iconColor?: string
    iconPosition?: 'left' | 'right'
    border?: string
    borderRadius?: string
    boxShadow?: string
    isLoading?: boolean
    background?: string
    bubbleColor?: string
    animateDuration?: number
    link?: string
    className?: string
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void
}

const Button: FC<IButtonProps> = ({
    width,
    height,
    padding = 10,
    gap = 5,
    text,
    textSize = 15,
    textColor = 'rgb(255, 255, 255)',
    textWeight = 400,
    icon,
    iconSize = 18,
    iconColor = 'rgb(255, 255, 255)',
    iconPosition = 'left',
    border,
    borderRadius = 5,
    boxShadow,
    isLoading,
    background = 'rgb(39, 142, 255)',
    bubbleColor = 'rgb(255, 255, 255)',
    animateDuration = 400,
    link,
    className,
    onClick
}) => {

    const router = useRouter()

    const [bubbles, setBubbles] = useState<{ x: number, y: number }[]>([])

    const buttonRef = useRef<HTMLButtonElement>(null)
    const bubbleRef = useRef<HTMLSpanElement>(null)

    const handleClick = useCallback(
        async (event: MouseEvent<HTMLButtonElement>): Promise<void> => {
            const rect = event.currentTarget.getBoundingClientRect()
            const x: number = event.clientX - rect.left
            const y: number = event.clientY - rect.top
            setBubbles([...bubbles, { x, y }])
            setTimeout(() => setBubbles(bubbles.slice(1)), animateDuration)
            onClick && onClick(event)
            link && router.push(link)
        },
        [bubbles, animateDuration, onClick, link, router]
    )

    const buttonStyles: ButtonCssProperties = {
        width: width,
        height: height,
        padding: padding,
        gap: gap,
        border: border,
        borderRadius: borderRadius,
        background: background,
        boxShadow: boxShadow,
        flexDirection: iconPosition === 'left' ? 'row' : 'row-reverse',
        '--animate-duration': `${animateDuration}ms`,
    }

    return (
        <button
            className={`${styles._container} ${className || ''}`.trim()}
            style={buttonStyles}
            onClick={handleClick}
            ref={buttonRef}
        >
            {icon &&
                <div className={isLoading ? styles._loading : styles._icon} style={{ fontSize: iconSize, color:iconColor }}>
                    {isLoading ? <AiOutlineLoading /> : icon}
                </div>
            }
            {text &&
                <div className={styles._text} style={{ fontSize: textSize, fontWeight: textWeight, color: textColor }}>
                    {text}
                </div>
            }
            {bubbles.length > 0 && bubbles.map((bubble, index) => (
                <span
                    key={index}
                    ref={bubbleRef}
                    className={styles._bubble}
                    style={{
                        width: buttonRef.current ? buttonRef.current?.clientWidth * 2.5 : undefined,
                        height: buttonRef.current ? buttonRef.current?.clientWidth * 2.5 : undefined,
                        left: bubble.x,
                        top: bubble.y,
                        background: getColorLevel(bubbleColor!, 40),
                    }}
                >
                </span>
            ))}
        </button>
    )
}

export default memo(Button)
