import { ForwardRefRenderFunction, forwardRef, memo, useEffect, useImperativeHandle, useRef, useState } from 'react'
import styles from '@/app/chat/chatemoji.module.sass'
import { useAppSelector } from '@/redux'
import { emojiItems, emojis } from '@/utils/emojis'

interface IEmoji {
    name: string
    emoji: string
}

interface IChatEmojiProps {
    onSelectEmoji: (emoji: string) => void
}

const ChatEmoji: ForwardRefRenderFunction<{ open: () => void }, IChatEmojiProps> = ({
    onSelectEmoji
}, ref) => {
    const { theme } = useAppSelector(state => state.theme)

    const [selectedIndex, setSelectdIndex] = useState<number>(0)
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [filteredEmojiItems, setFilteredEmojiItems] = useState<Array<IEmoji>>([])
    const chatEmojiContainerRef = useRef<HTMLDivElement>(null)

    console.log('ChatEmoji')

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (chatEmojiContainerRef.current && !chatEmojiContainerRef.current.contains(event.target as Node)) {
                chatEmojiContainerRef.current.style.display = 'none'
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    useImperativeHandle(ref, () => ({
        open() {
            if (!chatEmojiContainerRef.current) return
            chatEmojiContainerRef.current.style.display = 'flex'
        },
    }), [])

    useEffect(() => {
        if (searchTerm.trim() === '') {
            setFilteredEmojiItems(emojis[selectedIndex].items)
        } else {
            const results = emojiItems.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
            setFilteredEmojiItems(results)
        }
    }, [searchTerm])

    return (
        <div className={styles[`_container__${theme}`]} ref={chatEmojiContainerRef}>
            <div className={styles._search}>
                <input
                    placeholder='Tìm kiếm biểu tượng'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            {searchTerm ? (
                <>
                    <ul className={styles._items}>
                        {filteredEmojiItems.map((item, index) => (
                            <li
                                key={index}
                                onClick={() => onSelectEmoji(item.emoji)}
                            >
                                {item.emoji}
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                <>
                    <ul className={styles._tabs}>
                        {emojis.map((emoji, index) => (
                            <li
                                key={index}
                                onClick={() => setSelectdIndex(index)}
                                className={`${selectedIndex === index ? styles._active : ''}`}
                            >
                                {emoji.icon}
                            </li>
                        ))}
                    </ul>
                    <strong className={styles._title}>{emojis[selectedIndex].title}</strong>
                    <ul className={styles._items}>
                        {emojis[selectedIndex].items.map((item: any, index: number) => (
                            <li
                                key={index}
                                onClick={() => onSelectEmoji(item.emoji)}
                            >
                                {item.emoji}
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    )
}

export default memo(forwardRef(ChatEmoji))