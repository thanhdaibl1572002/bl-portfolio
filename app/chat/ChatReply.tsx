/* eslint-disable @next/next/no-img-element */
import { FC, memo, useContext } from 'react'
import styles from '@/app/chat/chatreply.module.sass'
import { useAppSelector } from '@/redux'
import { ReplyContext } from '@/app/chat/ReplyProvider'
import { PiXLight } from 'react-icons/pi'
import { redColor } from '@/variables/variables'

const ChatReply: FC = () => {
    const { theme } = useAppSelector(state => state.theme)

    const { reply, updateReply } = useContext(ReplyContext)

    return (
        <div className={styles[`_container__${theme}`]}>
            {reply!.replyMessageType === 'text' && (
                <div className={styles._reply__text}>
                    <span>
                        <strong>Trả lời:</strong>
                        <PiXLight fontSize={20} color={redColor} onClick={() => updateReply(null)} />
                    </span>
                    <p>
                        {
                            reply!.replyMessageContent.length >= 120
                                ? `${reply!.replyMessageContent.substring(0, 120)}...`
                                : reply!.replyMessageContent
                        }
                    </p>
                </div>
            )}
            {reply!.replyMessageType === 'image' && (
                <div className={styles._reply__image}>
                    <span>
                        <strong>Trả lời:</strong>
                        <PiXLight fontSize={20} color={redColor} onClick={() => updateReply(null)} />
                    </span>
                    <img src={reply!.replyMessageContent} alt='' />
                </div>
            )}
        </div>
    )
}

export default memo(ChatReply)