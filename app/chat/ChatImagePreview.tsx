/* eslint-disable @next/next/no-img-element */
import { ChangeEvent, FC, ReactElement, ReactNode, lazy, memo, useId, useRef, useState } from 'react'
import styles from '@/app/chat/chatimagepreview.module.sass'
import { useAppSelector } from '@/redux'
import { PiImageSquareLight, PiPaperPlaneRightFill } from 'react-icons/pi'
import Button from '@/components/forms/Button'
import { getColorLevel, mainColor, whiteColor } from '@/variables/variables'

interface IChatImagePreviewProps { }

const ChatImagePreview: FC<IChatImagePreviewProps> = ({

}) => {
    const { theme } = useAppSelector(state => state.theme)

    const [images, setImages] = useState<Array<File>>([])
    const [previews, setPreviews] = useState<Array<string>>([])

    const fileInputTd = useId()

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return
        const files = Array.from(event.target.files)
        setImages(prevImages => [...prevImages, ...files])
        const newPreviews = files.map(file => URL.createObjectURL(file))
        setPreviews(newPreviews)
    }

    return (
        <div className={styles[`_container__${theme}`]}>
            <label htmlFor={fileInputTd}>
                <PiImageSquareLight fontSize={28} />
                <input
                    type='file'
                    accept='image/*'
                    multiple
                    id={fileInputTd}
                    onChange={handleImageChange}
                />
            </label>
            <div className={styles._preview}>
                <div className={styles._send}>
                    <strong>{previews.length} hình ảnh</strong>
                    <PiPaperPlaneRightFill fontSize={25}/>
                </div>
                <div className={styles._images} style={{ columnCount: Math.min(2, previews.length) }}>
                    {previews.map((preview, index) => (
                        <div key={index} className={styles._image}>
                            <img src={preview} alt={`Ảnh ${index}`} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default memo(ChatImagePreview)