import React, { ReactElement, ReactNode, createContext, useState } from 'react'

interface IReply {
    replyMessageId: string
    replyMessageContent: string,
    replyMessageType: 'text' | 'image'
}

interface IReplyContext {
    reply: IReply | null
    updateReply: (reply: IReply | null) => void
}

const ReplyContext = createContext<IReplyContext>({
    reply: null,
    updateReply: (reply: IReply | null) => {},
})

const ReplyProvider = ({ children } : { children: ReactNode | ReactElement }) => {
    const [reply, setReply] = useState<IReply | null>(null)

    const updateReply = (reply: IReply | null): void => setReply(reply)

    return (
        <ReplyContext.Provider value={{ reply, updateReply }}>
            {children}
        </ReplyContext.Provider>
    )
}

export { ReplyProvider, ReplyContext }