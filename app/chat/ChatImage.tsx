/* eslint-disable @next/next/no-img-element */
import { ChangeEvent, FC, memo, useContext, useEffect, useId, useRef, useState } from 'react'
import styles from '@/app/chat/chatimage.module.sass'
import { useAppSelector } from '@/redux'
import { PiImageSquareLight, PiPaperPlaneRightLight } from 'react-icons/pi'
import { darkColor, mainColor, redColor, whiteColor } from '@/variables/variables'
import { firebaseAuth } from '@/utils/firebase'
import { socket } from '@/utils/socket'
import { useParams } from 'next/navigation'
import { ReplyContext } from '@/app/chat/ReplyProvider'

interface IChatImageProps { }

const ChatImage: FC<IChatImageProps> = ({ }) => {
    const { theme } = useAppSelector(state => state.theme)

    const params = useParams()

    const [images, setImages] = useState<Array<File>>([])
    const [previews, setPreviews] = useState<Array<string>>([])
    const [isOpenPreview, setIsOpenPreview] = useState<boolean>(false)
    const [totalSizeMB, setTotalSizeMB] = useState<number>(0)

    const fileInputTd = useId()
    const previewRef = useRef<HTMLDivElement>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const userId = firebaseAuth.currentUser?.uid
    const isAdmin = userId === process.env.ADMIN_ID

    const { reply, updateReply } = useContext(ReplyContext)

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return
        const files = Array.from(event.target.files)
        setImages(prevImages => [...prevImages, ...files])
        const newPreviews = files.map(file => URL.createObjectURL(file))
        setPreviews(newPreviews)
        setIsOpenPreview(newPreviews.length > 0)
        const totalSize = files.reduce((acc, file) => acc + file.size, 0)
        const totalSizeInMB = totalSize / (1024 * 1024)
        setTotalSizeMB(totalSizeInMB)
    }

    const handleSubmit = async (): Promise<void> => {
        if (images.length === 0 || images.length > 5 || totalSizeMB > 5) return
        const formData = new FormData()
        images.forEach((image, index) => {
            formData.append(`images[${index}]`, image)
        })
        if (reply) {
            socket.emit('sendReplyImage', {
                userId: isAdmin ? decodeURIComponent(params.userId as string) : userId,
                images: images,
                from: isAdmin ? 'admin' : userId,
                replyMessageId: reply.replyMessageId,
                replyMessageType: reply.replyMessageType,
            })
        } else {
            socket.emit('sendImage', {
                userId: isAdmin ? decodeURIComponent(params.userId as string) : userId,
                images: images,
                from: isAdmin ? 'admin' : userId
            })
        }
        setIsOpenPreview(false)
        updateReply(null)
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (!previewRef.current) return
            if (previewRef.current.contains(event.target as Node)) return
            setIsOpenPreview(false)
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    useEffect(() => {
        if (isOpenPreview) return
        setImages([])
        setPreviews([])
        if (!fileInputRef.current) return
        fileInputRef.current.value = ''
    }, [isOpenPreview])

    return (
        <div className={styles[`_container__${theme}`]}>
            <label htmlFor={fileInputTd}>
                <PiImageSquareLight fontSize={28} color={mainColor} />
                <input
                    type='file'
                    accept='image/*'
                    multiple
                    id={fileInputTd}
                    onChange={handleChange}
                    ref={fileInputRef}
                />
            </label>
            {isOpenPreview && (
                <div className={styles._preview} ref={previewRef}>
                    <div
                        className={styles._send}
                        style={{
                            color: (previews.length > 5 || totalSizeMB > 5)
                                ? redColor : theme === 'light'
                                ? darkColor : whiteColor
                        }}
                    >
                        {previews.length}/5 Ảnh - {totalSizeMB.toFixed(2)}/5 MB
                        <PiPaperPlaneRightLight 
                            fontSize={25} 
                            color={mainColor} 
                            onClick={handleSubmit} 
                        />
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

export default memo(ChatImage)