/* eslint-disable @next/next/no-img-element */
import { ChangeEvent, FC, ForwardRefRenderFunction, forwardRef, memo, useEffect, useId, useImperativeHandle, useRef, useState } from 'react'
import styles from '@/app/chat/chatimagepreview.module.sass'
import { useAppSelector } from '@/redux'
import { PiImageSquareLight, PiPaperPlaneRightLight } from 'react-icons/pi'
import Button from '@/components/forms/Button'
import { getColorLevel, mainColor, mainGradientColor, whiteColor } from '@/variables/variables'

interface IChatImagePreviewProps { }

const ChatImagePreview: FC<IChatImagePreviewProps> = ({ }) => {
    const { theme } = useAppSelector(state => state.theme)

    const [images, setImages] = useState<Array<File>>([])
    const [previews, setPreviews] = useState<Array<string>>([])
    const [isOpenPreview, setIsOpenPreview] = useState<boolean>(false)

    const fileInputTd = useId()
    const previewRef = useRef<HTMLDivElement>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return
        const files = Array.from(event.target.files)
        setImages(prevImages => [...prevImages, ...files])
        const newPreviews = files.map(file => URL.createObjectURL(file))
        setPreviews(newPreviews)
        setIsOpenPreview(newPreviews.length > 0)
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (!previewRef.current) return
            if (previewRef.current.contains(event.target as Node)) return
            setIsOpenPreview(false)
            if (!fileInputRef.current) return
            fileInputRef.current.value = ''
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (
        <div className={styles[`_container__${theme}`]}>
            <label htmlFor={fileInputTd}>
                <PiImageSquareLight fontSize={28} color={mainColor} />
                <input
                    type='file'
                    accept='image/*'
                    multiple
                    id={fileInputTd}
                    onChange={handleImageChange}
                    ref={fileInputRef}
                />
            </label>
            {isOpenPreview && (
                <div className={styles._preview} ref={previewRef}>
                    <div className={styles._send}>
                        {previews.length} Hình Ảnh
                        <PiPaperPlaneRightLight fontSize={25} color={mainColor} />
                    </div>
                    <div className={styles._images} style={{ columnCount: Math.min(2, previews.length) }}>
                        {previews.map((preview, index) => (
                            <div key={index} className={styles._image}>
                                <img src={preview} alt={`Ảnh ${index}`} />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default memo(ChatImagePreview)